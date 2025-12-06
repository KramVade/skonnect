/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { SysUser, FinancialReport, Project, Announcement, Feedback, sequelize } from "../models/index.js";
import { Op } from "sequelize";

/**
 * Middleware to ensure the user is an admin.
 */
const isAdmin = (req, res, next) => {
  if (!req.session.userId || req.session.position !== 'admin') {
    return res.redirect("/login");
  }
  next();
};

export const dashboardPage = async (req, res) => {
    if (!req.session.userId || req.session.position !== 'admin') return res.redirect("/login");
    
    try {
        // Fetch widget data
        const totalProjects = await Project.count();
        const pendingApprovals = await Project.count({ where: { status: 'Pending' } });
        const feedbackCount = await Feedback.count();
        
        // Fetch recent activities (optional - you can customize this)
        const recentActivities = [];
        
        // Fetch notifications (optional - you can customize this)
        const notifications = [];
        
        res.render("admindashboard", { 
            title: "Admin Dashboard", 
            active: 'dashboard',
            totalProjects,
            pendingApprovals,
            feedbackCount,
            recentActivities,
            notifications
        });
    } catch (error) {
        console.error("Error loading admin dashboard:", error);
        res.status(500).send("Failed to load dashboard.");
    }
};

export const userManagementPage = async (req, res) => {
    if (!req.session.userId || req.session.position !== 'admin') return res.redirect("/login");
    const users = await SysUser.findAll({ raw: true });
    res.render("user-management", { title: "User Management", users, active: 'users' });
};

export const updateUserPage = async (req, res) => {
    if (!req.session.userId || req.session.position !== 'admin') return res.redirect("/login");
    const user = await SysUser.findByPk(req.params.id, { raw: true });
    res.render("update-user", { title: "Update User", user, active: 'users' });
};

export const updateUserRole = async (req, res) => {
    if (!req.session.userId || req.session.position !== 'admin') return res.redirect("/login");
    await SysUser.update({ position: req.body.position }, { where: { id: req.params.id } });
    res.redirect('/admin/user-management');
};

export const deleteUser = async (req, res) => {
    if (!req.session.userId || req.session.position !== 'admin') return res.redirect("/login");
    await SysUser.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/user-management');
};

/**
 * Renders the financial reports management page for the admin.
 * It fetches and separates reports into 'pending' and 'reviewed'.
 */
export const financialReportsPage = [isAdmin, async (req, res) => {
  try {
    // Fetch reports that are waiting for approval
    const pendingReportsData = await FinancialReport.findAll({
      where: { status: 'Pending' },
      include: [
        { model: Project, attributes: ['project_title'] },
        { model: SysUser, as: 'submitter', attributes: ['name'] }
      ],
      order: [['date_submitted', 'DESC']],
    });

    // Fetch reports that have already been approved or rejected
    const reviewedReportsData = await FinancialReport.findAll({
      where: { status: { [Op.or]: ['Approved', 'Rejected'] } },
      include: [
        { model: Project, attributes: ['project_title'] },
        { model: SysUser, as: 'submitter', attributes: ['name'] },
        { model: SysUser, as: 'approver', attributes: ['name'] }
      ],
      order: [['date_approved', 'DESC']],
    });

    // Convert Sequelize instances to plain objects for rendering
    const pendingReports = pendingReportsData.map(r => r.get({ plain: true }));
    const reviewedReports = reviewedReportsData.map(r => r.get({ plain: true }));

    res.render("admin-financial-reports", {
      title: "Financial Report Management",
      pendingReports,
      reviewedReports,
      active: 'financial-reports'
    });
  } catch (error) {
    console.error("Error fetching financial reports for admin:", error);
    res.status(500).send("Failed to load the financial reports page.");
  }
}];

/**
 * Approves a financial report. (Admin only)
 */
export const approveFinancialReport = [isAdmin, async (req, res) => {
  try {
    await FinancialReport.update({ status: 'Approved', approved_by: req.session.userId, date_approved: new Date() }, { where: { report_id: req.params.id } });
    res.redirect('/admin/financial-reports');
  } catch (error) {
    console.error("Error approving financial report:", error);
    res.status(500).send("Failed to approve report.");
  }
}];

/**
 * Rejects a financial report. (Admin only)
 */
export const rejectFinancialReport = [isAdmin, async (req, res) => {
  try {
    await FinancialReport.update({ status: 'Rejected', approved_by: req.session.userId, date_approved: new Date() }, { where: { report_id: req.params.id } });
    res.redirect('/admin/financial-reports');
  } catch (error) {
    console.error("Error rejecting financial report:", error);
    res.status(500).send("Failed to reject report.");
  }
}];

/**
 * Renders the content and announcement management page for the admin.
 * It fetches all announcements from the database.
 */
export const contentManagementPage = [isAdmin, async (req, res) => {
  try {
    const announcementData = await Announcement.findAll({
      include: [{ model: SysUser, as: 'author', attributes: ['name'] }],
      order: [['publish_date', 'DESC']],
    });

    const announcements = announcementData.map(a => a.get({ plain: true }));

    res.render("admin-content-management", {
      title: "Content Management",
      announcements,
      active: 'content-management'
    });
  } catch (error) {
    console.error("Error fetching announcements for admin:", error);
    res.status(500).send("Failed to load the content management page.");
  }
}];

/**
 * Renders the feedback center page for the admin.
 * It fetches all feedback submissions.
 */
export const feedbackCenterPage = [isAdmin, async (req, res) => {
  try {
    const feedbackData = await Feedback.findAll({
      order: [['createdAt', 'DESC']],
    });

    const feedback = feedbackData.map(f => f.get({ plain: true }));

    res.render("admin-feedback", {
      title: "Feedback Center",
      feedback,
      active: 'feedback'
    });
  } catch (error) {
    console.error("Error fetching feedback for admin:", error);
    res.status(500).send("Failed to load the feedback center page.");
  }
}];