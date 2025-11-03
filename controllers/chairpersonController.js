/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { Project } from "../models/projectModel.js";
import { SysUser } from "../models/sysUserModel.js";
import { FinancialReport } from "../models/financialReportModel.js";

export const dashboardPage = (req, res) => {
  // In a real application, you would fetch this data from your database.
  const dashboardData = {
    pendingProjects: 3,
    feedbackToReview: 2,
    budgetUsage: 45, // as a percentage
    recentActivities: [
      { officer: 'SK Secretary', action: 'uploaded minutes for the last meeting.', time: '1 hour ago' },
      { officer: 'SK Treasurer', action: 'submitted a new budget proposal.', time: '4 hours ago' },
      { officer: 'SK Councilor', action: 'updated the "Community Pantry" project status.', time: '1 day ago' }
    ],
    notifications: [
      { message: 'Project "Summer Basketball League" is awaiting your approval.', type: 'approval' },
      { message: 'New feedback received regarding community safety.', type: 'feedback' }
    ]
  };

  if (!req.session.userId || req.session.position !== 'chairperson') return res.redirect("/login");

  res.render("chairdashboard", { title: "Chairperson Dashboard", ...dashboardData, active: 'dashboard' });
};

/**
 * Renders the project approval page with a list of pending projects.
 */
export const projectApprovalPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    return res.redirect("/login");
  }

  try {
    const pendingProjectInstances = await Project.findAll({
      where: { status: 'Pending' },
      include: [{ model: SysUser, as: 'proposer', attributes: ['name'] }],
      order: [['date_proposed', 'ASC']],
    });

    const approvedProjectInstances = await Project.findAll({
      where: { status: 'Approved' },
      include: [
        { model: SysUser, as: 'proposer', attributes: ['name'] },
        { model: SysUser, as: 'approver', attributes: ['name'] }
      ],
      order: [['date_approved', 'DESC']],
    });

    const pendingProjects = pendingProjectInstances.map(p => p.get({ plain: true }));
    const approvedProjects = approvedProjectInstances.map(p => p.get({ plain: true }));

    res.render("project-approval", { 
      title: "Project Approval", 
      pendingProjects, 
      approvedProjects,
      active: 'projects', 
      layout: false 
    });
  } catch (error) {
    console.error("Error fetching pending projects:", error);
    res.status(500).send("Failed to fetch pending projects.");
  }
};

/**
 * Renders the financial reports management page for the chairperson.
 */
export const financialReportsPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    return res.redirect("/login");
  }

  try {
    const reportInstances = await FinancialReport.findAll({
      include: [
        { model: Project, attributes: ['project_title'] },
        { model: SysUser, as: 'submitter', attributes: ['name'] }
      ],
      order: [['date_submitted', 'DESC']],
    });
    const reports = reportInstances.map(r => r.get({ plain: true }));

    res.render("chair-financial-reports", {
      title: "Financial Reports",
      reports,
      active: 'reports',
      layout: false
    });
  } catch (error) {
    console.error("Error fetching financial reports:", error);
    res.status(500).send("Failed to fetch financial reports.");
  }
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
 * Approves a financial report. (Chairperson only)
 */
export const approveFinancialReport = [isChairperson, async (req, res) => {
  try {
    await FinancialReport.update(
      {
        status: 'Approved',
        approved_by: req.session.userId,
        date_approved: new Date(),
      },
      { where: { report_id: req.params.id } }
    );
    res.redirect('/chairperson/financial-reports');
  } catch (error) {
    console.error("Error approving financial report:", error);
    res.status(500).send("Failed to approve report.");
  }
}];

/**
 * Rejects a financial report. (Chairperson only)
 */
export const rejectFinancialReport = [isChairperson, async (req, res) => {
  try {
    await FinancialReport.update(
      { status: 'Rejected', approved_by: req.session.userId },
      { where: { report_id: req.params.id } }
    );
    res.redirect('/chairperson/financial-reports');
  } catch (error) {
    console.error("Error rejecting financial report:", error);
    res.status(500).send("Failed to reject report.");
  }
}];