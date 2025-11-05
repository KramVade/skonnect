/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { Feedback } from "../models/feedbackModel.js";
import { SysUser } from "../models/sysUserModel.js";

/**
 * Middleware to check if the user is an authorized SK official.
 */
const isSkOfficial = (req, res, next) => {
  const authorizedPositions = ['secretary', 'councilor', 'chairperson', 'treasurer', 'admin'];
  if (!req.session.userId || !authorizedPositions.includes(req.session.position)) {
    return res.redirect("/login");
  }
  next();
};

/**
 * Renders the page for submitting feedback.
 * Accessible to any logged-in user.
 */
export const createFeedbackPage = (req, res) => {
  res.render("create-feedback", { title: "Submit Feedback", layout: false });
};

/**
 * Handles the submission of new feedback.
 */
export const submitFeedback = async (req, res) => {
  try {
    const { subject, message, category, name } = req.body;
    const feedbackData = {
      subject,
      message,
      category,
    };

    if (req.session.userId) {
      feedbackData.submitted_by = req.session.userId;
    } else {
      feedbackData.submitted_by_name = name || 'Anonymous';
    }

    await Feedback.create(feedbackData);
    
    // Redirect based on if user is logged in
    if (req.session.userId) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/feedback/create?sent=1"); // Or a generic thank you page
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).send("Failed to submit feedback.");
  }
};

/**
 * Renders the page for viewing all feedback. (SK Officials only)
 */
export const viewFeedbackPage = [isSkOfficial, async (req, res) => {
  const feedbackItems = await Feedback.findAll({
    include: [{ model: SysUser, as: 'submitter', attributes: ['name', 'position'] }],
    order: [['createdAt', 'DESC']]
  });
  res.render('reviewfeedback', { title: 'Review Feedback', feedbackItems, layout: false });
}];

/**
 * Renders the page for viewing all feedback for the Secretary.
 */
export const viewSecretaryFeedbackPage = [isSkOfficial, async (req, res) => {
  const feedbackItems = await Feedback.findAll({
    include: [{ model: SysUser, as: 'submitter', attributes: ['name', 'position'] }],
    order: [['createdAt', 'DESC']]
  });
  // Renders the specific view for the secretary
  res.render('secreviewfeedback', { title: 'Review Feedback', feedbackItems, user: req.session, layout: false });
}];