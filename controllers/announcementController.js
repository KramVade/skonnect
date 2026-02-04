/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { Announcement, SysUser } from "../models/index.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// --- File Upload Directory for Announcements ---
const uploadDir = 'public/uploads/announcements/';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'announcement-image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/**
 * Middleware to check if the user is authorized to create announcements (secretary or councilor).
 */
const isAuthorizedToCreate = (req, res, next) => {
  if (!req.session.userId || !['secretary', 'councilor'].includes(req.session.position)) {
    return res.redirect("/login");
  }
  next();
};

/**
 * Middleware to check if the user is the chairperson.
 */
const isChairperson = (req, res, next) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    return res.redirect("/login");
  }
  next();
};

/**
 * Renders the page for creating a new announcement.
 */
export const createAnnouncementPage = [isAuthorizedToCreate, (req, res) => {
  res.render("create-announcement", { 
    title: "Create Announcement", 
    layout: false,
    userPosition: req.session.position
  });
}];

/**
 * Handles the submission of a new announcement.
 * It can be saved as a 'Draft' or submitted for 'Pending Approval'.
 */
export const createAnnouncement = [isAuthorizedToCreate, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/").replace('public/', '') : null;

    await Announcement.create({
      title,
      content,
      category,
      author_id: req.session.userId,
      image: imagePath,
      status: status || 'Draft', // 'Draft' or 'Pending Approval'
    });

    // Redirect based on user's role
    res.redirect(`/${req.session.position}/dashboard`);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).send("Failed to create announcement.");
  }
}];

/**
 * Renders the announcement management page for the chairperson.
 */
export const announcementApprovalPage = [isChairperson, async (req, res) => {
  try {
    const pendingAnnouncements = await Announcement.findAll({
      where: { status: 'Pending Approval' },
      include: [{ model: SysUser, as: 'author', attributes: ['name', 'position'] }],
      order: [['date_created', 'ASC']],
      raw: true,
      nest: true
    });

    const otherAnnouncements = await Announcement.findAll({
      where: { status: ['Approved', 'Rejected'] },
      include: [
        { model: SysUser, as: 'author', attributes: ['name', 'position'] },
        { model: SysUser, as: 'approver', attributes: ['name'] }
      ],
      order: [['last_updated', 'DESC']],
      limit: 20, // Limit to recent ones
      raw: true,
      nest: true
    });

    res.render("chairannouncementproposal", {
      title: "Announcement Approval",
      pendingAnnouncements,
      otherAnnouncements,
      layout: false
    });
  } catch (error) {
    console.error("Error fetching announcements for approval:", error);
    res.status(500).send("Failed to load page.");
  }
}];

/**
 * Approves an announcement. (Chairperson only)
 */
export const approveAnnouncement = [isChairperson, async (req, res) => {
  try {
    await Announcement.update(
      {
        status: 'Approved',
        approved_by: req.session.userId,
        publish_date: new Date() // Or use a date from the form
      },
      { where: { announcement_id: req.params.id } }
    );
    res.redirect('/chairperson/announcements');
  } catch (error) {
    console.error("Error approving announcement:", error);
    res.status(500).send("Failed to approve announcement.");
  }
}];

/**
 * Rejects an announcement. (Chairperson only)
 */
export const rejectAnnouncement = [isChairperson, async (req, res) => {
  try {
    await Announcement.update(
      {
        status: 'Rejected',
        approved_by: req.session.userId
      },
      { where: { announcement_id: req.params.id } }
    );
    res.redirect('/chairperson/announcements');
  } catch (error) {
    console.error("Error rejecting announcement:", error);
    res.status(500).send("Failed to reject announcement.");
  }
}];

/**
 * Renders the list of announcements created by the current user (secretary or councilor).
 */
export const listAnnouncementsPage = [isAuthorizedToCreate, async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      where: { author_id: req.session.userId },
      include: [
        { model: SysUser, as: 'author', attributes: ['name'] },
        { model: SysUser, as: 'approver', attributes: ['name'] }
      ],
      order: [['last_updated', 'DESC']],
      raw: true,
      nest: true
    });

    res.render("announcement-list", {
      title: "My Announcements",
      announcements,
      layout: false,
      userPosition: req.session.position
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).send("Failed to load announcements page.");
  }
}];

/**
 * Renders the page for editing an announcement.
 * Only the author can edit.
 */
export const editAnnouncementPage = [isAuthorizedToCreate, async (req, res) => {
  try {
    const announcement = await Announcement.findOne({
      where: {
        announcement_id: req.params.id,
        author_id: req.session.userId // Ensure only the author can access
      },
      raw: true
    });

    if (!announcement) {
      return res.status(404).send("Announcement not found or you are not authorized to edit it.");
    }

    res.render("edit-announcement", {
      title: "Edit Announcement",
      announcement,
      layout: false,
      userPosition: req.session.position
    });
  } catch (error) {
    console.error("Error fetching announcement for editing:", error);
    res.status(500).send("Failed to load edit page.");
  }
}];

/**
 * Handles the update of an announcement.
 * Only the author can update.
 */
export const updateAnnouncement = [isAuthorizedToCreate, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    const announcementId = req.params.id;

    const announcement = await Announcement.findOne({
      where: {
        announcement_id: announcementId,
        author_id: req.session.userId
      }
    });

    if (!announcement) {
      return res.status(404).send("Announcement not found or you are not authorized to update it.");
    }

    announcement.title = title;
    announcement.content = content;
    announcement.category = category;
    announcement.status = status || announcement.status; // 'Draft' or 'Pending Approval'

    if (req.file) {
      announcement.image = req.file.path.replace(/\\/g, "/").replace('public/', '');
    }

    await announcement.save();

    res.redirect('/announcements');
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).send("Failed to update announcement.");
  }
}];

/**
 * Deletes an announcement.
 * Only the author can delete, and only if it's a Draft or Rejected.
 */
export const deleteAnnouncement = [isAuthorizedToCreate, async (req, res) => {
  try {
    const announcementId = req.params.id;

    const result = await Announcement.destroy({
      where: {
        announcement_id: announcementId,
        author_id: req.session.userId,
        status: ['Draft', 'Rejected'] // Safety check
      }
    });

    if (result === 0) {
      // This could be because it doesn't exist, user is not the author, or status is not Draft/Rejected
      return res.status(403).send("Could not delete this announcement. It might be pending approval or already approved.");
    }

    res.redirect('/announcements');
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).send("Failed to delete announcement.");
  }
}];