/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { Project, SysUser, FinancialReport, Feedback, Expenditure } from "../models/index.js";

export const dashboardPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'chairperson') return res.redirect("/login");

  try {
    const pendingProjects = await Project.count({ where: { status: 'Pending' } });
    const pendingFinancialReports = await FinancialReport.count({ where: { status: 'Pending' } });
    const feedbackToReview = await Feedback.count({ where: { status: 'New' } });
    const pendingExpenditures = await Expenditure.count({ where: { status: 'Pending' } });

    // This data remains static for now as there are no activity/notification models
    const dashboardData = {
      pendingProjects,
      pendingFinancialReports,
      feedbackToReview,
      pendingExpenditures,
      budgetUsage: 45, // as a percentage
      recentActivities: [
        { officer: 'SK Secretary', action: 'uploaded minutes for the last meeting.', time: '1 hour ago' },
        { officer: 'SK Treasurer', action: 'submitted a new budget proposal.', time: '4 hours ago' },
      ],
      notifications: [
        { message: 'Project "Summer Basketball League" is awaiting your approval.', type: 'approval' },
        { message: 'New feedback received regarding community safety.', type: 'feedback' }
      ]
    };
    res.render("chairdashboard", { title: "Chairperson Dashboard", ...dashboardData, active: 'dashboard' });
  } catch (error) {
    console.error("Error fetching chairperson dashboard data:", error);
    res.status(500).send("Failed to load dashboard.");
  }
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

    // Debug logging
    console.log('=== PROJECT APPROVAL PAGE DEBUG ===');
    console.log('Pending Projects Count:', pendingProjects.length);
    console.log('Approved Projects Count:', approvedProjects.length);
    console.log('Pending Projects:', JSON.stringify(pendingProjects, null, 2));
    console.log('Approved Projects:', JSON.stringify(approvedProjects, null, 2));
    console.log('===================================');

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

/**
 *
 Renders the expenditure review page for the chairperson.
 */
export const expenditureReviewPage = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    return res.redirect("/login");
  }

  try {
    // Fetch pending expenditures
    const pendingExpenditureInstances = await Expenditure.findAll({
      where: { status: 'Pending' },
      include: [
        { model: Project, attributes: ['project_title', 'project_id'] },
        { model: SysUser, as: 'recorder', attributes: ['name'] }
      ],
      order: [['date_incurred', 'DESC']],
    });

    // Fetch approved/rejected expenditures
    const reviewedExpenditureInstances = await Expenditure.findAll({
      where: { status: ['Approved', 'Rejected'] },
      include: [
        { model: Project, attributes: ['project_title', 'project_id'] },
        { model: SysUser, as: 'recorder', attributes: ['name'] },
        { model: SysUser, as: 'reviewer', attributes: ['name'] }
      ],
      order: [['date_reviewed', 'DESC']],
    });

    const pendingExpenditures = pendingExpenditureInstances.map(e => e.get({ plain: true }));
    const reviewedExpenditures = reviewedExpenditureInstances.map(e => e.get({ plain: true }));

    // Calculate totals
    const pendingTotal = pendingExpenditures.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const approvedTotal = reviewedExpenditures
      .filter(e => e.status === 'Approved')
      .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

    res.render("chair-expenditure-review", {
      title: "Expenditure Review",
      pendingExpenditures,
      reviewedExpenditures,
      pendingTotal: pendingTotal.toFixed(2),
      approvedTotal: approvedTotal.toFixed(2),
      active: 'expenditure'
    });
  } catch (error) {
    console.error("Error fetching expenditures for review:", error);
    res.status(500).send("Failed to load expenditure review page.");
  }
};

/**
 * Approves an expenditure. (Chairperson only)
 */
export const approveExpenditure = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    return res.redirect("/login");
  }

  try {
    await Expenditure.update(
      {
        status: 'Approved',
        reviewed_by: req.session.userId,
        date_reviewed: new Date(),
      },
      { where: { expenditure_id: req.params.id } }
    );
    res.redirect('/chairperson/expenditure-review');
  } catch (error) {
    console.error("Error approving expenditure:", error);
    res.status(500).send("Failed to approve expenditure.");
  }
};

/**
 * Rejects an expenditure. (Chairperson only)
 */
export const rejectExpenditure = async (req, res) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    return res.redirect("/login");
  }

  try {
    await Expenditure.update(
      {
        status: 'Rejected',
        reviewed_by: req.session.userId,
        date_reviewed: new Date(),
      },
      { where: { expenditure_id: req.params.id } }
    );
    res.redirect('/chairperson/expenditure-review');
  } catch (error) {
    console.error("Error rejecting expenditure:", error);
    res.status(500).send("Failed to reject expenditure.");
  }
};
