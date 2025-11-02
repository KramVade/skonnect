/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { FinancialReport } from "../models/financialReportModel.js";
import { Project } from "../models/projectModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// --- File Upload Directory for Financial Reports ---
const uploadDir = 'public/uploads/financials/';

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
    cb(null, 'financial-report-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


export const dashboardPage = (req, res) => {
  // Static data for the treasurer dashboard. To be replaced with database queries.
  const dashboardData = {
    pendingApprovals: 3,
    reportsSubmitted: 2,
    totalAllocated: "50,000",
    recentActivities: [
      { action: 'You submitted a financial report for "Community Pantry".', time: '1 day ago' },
      { action: 'Chairperson approved the budget for "Summer Sports Fest".', time: '3 days ago' },
      { action: 'You uploaded receipts for the last monthly meeting.', time: '5 days ago' }
    ],
    notifications: [
      { message: 'The financial report for "Youth Seminar" was flagged for review.', type: 'flagged' },
      { message: 'New budget proposal for "Tree Planting" is due next week.', type: 'reminder' }
    ]
  };

  if (!req.session.userId || req.session.position !== 'treasurer') return res.redirect("/login");

  res.render("treasdashboard", { title: "Treasurer Dashboard", ...dashboardData, active: 'dashboard' });
};

/**
 * Renders the financial reports page.
 * In the future, this will fetch reports from the database.
 */
export const financialReportsPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    // Placeholder data - replace with actual database query for FinancialReport model
    const reports = []; 

    res.render("financial-reports", { 
      title: "Financial Reports", 
      reports,
      active: 'reports' // For active link highlighting
    });
  } catch (error) {
    console.error("Error fetching financial reports:", error);
    res.status(500).send("Failed to fetch financial reports.");
  }
};

/**
 * Renders the page for creating a new financial report.
 */
export const createFinancialReportPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    // Fetch approved or in-progress projects to associate the report with
    const projects = await Project.findAll({
      where: { status: ['Approved', 'In Progress', 'Completed'] },
      order: [['project_title', 'ASC']],
      raw: true
    });

    res.render("create-financial-report", { 
      title: "Create Financial Report", 
      projects,
      active: 'reports'
    });
  } catch (error) {
    console.error("Error fetching projects for financial report:", error);
    res.status(500).send("Failed to load page.");
  }
};

/**
 * Handles the submission of a new financial report.
 */
export const createFinancialReport = [upload.single('attachment'), async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    const { project_id, amount_allocated, amount_spent, remarks } = req.body;
    const balance = parseFloat(amount_allocated) - parseFloat(amount_spent);
    const attachment_path = req.file ? req.file.path.replace(/\\/g, "/").replace('public/', '') : null;

    await FinancialReport.create({
      project_id,
      amount_allocated,
      amount_spent,
      balance,
      remarks,
      attachments: attachment_path,
      submitted_by: req.session.userId,
      status: 'Pending'
    });

    res.redirect('/treasurer/financial-reports');
  } catch (error) {
    console.error("Error creating financial report:", error);
    res.status(500).send("Failed to create financial report.");
  }
}];