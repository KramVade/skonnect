/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { FinancialReport, Project, Expenditure, SysUser } from "../models/index.js";
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
    // Fetch all financial reports submitted by the currently logged-in treasurer
    const reportInstances = await FinancialReport.findAll({
      where: { submitted_by: req.session.userId },
      include: [{ model: Project, attributes: ['project_title'] }],
      order: [['date_submitted', 'DESC']],
    });

    // Convert Sequelize instances to plain objects for the template
    const reports = reportInstances.map(r => r.get({ plain: true }));

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
 * Renders the page for viewing a single financial report.
 */
export const viewFinancialReportPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    const reportId = req.params.id;
    const reportInstance = await FinancialReport.findOne({
      where: { 
        report_id: reportId,
        submitted_by: req.session.userId // Ensure treasurer can only view their own reports
      },
      include: [{ model: Project, attributes: ['project_title'] }],
    });

    if (!reportInstance) {
      return res.status(404).send("Financial report not found or you do not have permission to view it.");
    }

    const report = reportInstance.get({ plain: true });
    report.isBalancePositive = parseFloat(report.balance) > 0;

    res.render("view-financial-report", {
      title: `View Financial Report - ${report.Project.project_title}`,
      report,
      active: 'reports'
    });
  } catch (error) {
    console.error("Error fetching financial report:", error);
    res.status(500).send("Failed to load page.");
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

/**
 * Renders the public-facing financial transparency page.
 * Fetches only 'Approved' financial reports.
 */
export const publicFinancialReportsPage = async (req, res) => {
  try {
    const reportInstances = await FinancialReport.findAll({
      where: { status: 'Approved' },
      include: [{ model: Project, attributes: ['project_title'] }],
      order: [['date_approved', 'DESC']],
    });

    const reports = reportInstances.map(r => r.get({ plain: true }));

    res.render("public-financial-reports", {
      title: "Financial Transparency",
      reports,
      active: 'financials', // For active link highlighting in a public sidebar
      layout: false // Assuming a different layout for public pages
    });
  } catch (error) {
    console.error("Error fetching public financial reports:", error);
    res.status(500).send("Failed to load financial reports.");
  }
};


/**
 * Renders the expenditure tracking page with all expenditures.
 */
export const expenditureTrackingPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    const expenditureInstances = await Expenditure.findAll({
      include: [
        { model: Project, attributes: ['project_title', 'project_id'] },
        { model: SysUser, as: 'recorder', attributes: ['name'] }
      ],
      order: [['date_incurred', 'DESC']],
    });

    const expenditures = expenditureInstances.map(e => e.get({ plain: true }));

    // Calculate summary statistics
    const totalExpenditure = expenditures.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const expendituresByCategory = {};
    expenditures.forEach(exp => {
      const cat = exp.category || 'Uncategorized';
      expendituresByCategory[cat] = (expendituresByCategory[cat] || 0) + parseFloat(exp.amount || 0);
    });

    // Convert category object to array for Handlebars
    const categoryBreakdown = Object.keys(expendituresByCategory).map(key => ({
      category: key,
      amount: expendituresByCategory[key]
    }));

    res.render("expenditure-tracking", {
      title: "Expenditure Tracking",
      expenditures,
      totalExpenditure: totalExpenditure.toFixed(2),
      categoryBreakdown,
      categoryCount: categoryBreakdown.length,
      active: 'expenditure'
    });
  } catch (error) {
    console.error("Error fetching expenditures:", error);
    res.status(500).send("Failed to load expenditure tracking page.");
  }
};

/**
 * Renders the page for adding a new expenditure.
 */
export const addExpenditurePage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    // Fetch approved or in-progress projects
    const projects = await Project.findAll({
      where: { status: ['Approved', 'In Progress', 'Completed'] },
      order: [['project_title', 'ASC']],
      raw: true
    });

    res.render("add-expenditure", {
      title: "Add Expenditure",
      projects,
      active: 'expenditure'
    });
  } catch (error) {
    console.error("Error loading add expenditure page:", error);
    res.status(500).send("Failed to load page.");
  }
};

/**
 * Handles the submission of a new expenditure.
 */
export const addExpenditure = [upload.single('receipt'), async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    const { project_id, description, category, amount, date_incurred, remarks } = req.body;
    const receipt_path = req.file ? req.file.path.replace(/\\/g, "/").replace('public/', '') : null;

    await Expenditure.create({
      project_id,
      description,
      category,
      amount,
      date_incurred: date_incurred || new Date(),
      receipt_path,
      recorded_by: req.session.userId,
      remarks
    });

    res.redirect('/treasurer/expenditure-tracking');
  } catch (error) {
    console.error("Error adding expenditure:", error);
    res.status(500).send("Failed to add expenditure.");
  }
}];

/**
 * Deletes an expenditure entry.
 */
export const deleteExpenditure = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'treasurer') {
    return res.redirect("/login");
  }

  try {
    await Expenditure.destroy({ where: { expenditure_id: req.params.id } });
    res.redirect('/treasurer/expenditure-tracking');
  } catch (error) {
    console.error("Error deleting expenditure:", error);
    res.status(500).send("Failed to delete expenditure.");
  }
};
