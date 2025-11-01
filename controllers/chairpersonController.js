/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { Project } from "../models/projectModel.js";
import { SysUser } from "../models/sysUserModel.js";

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

  res.render("chairdashboard", { title: "Chairperson Dashboard", ...dashboardData });
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

    res.render("project-approval", { title: "Project Approval", pendingProjects, approvedProjects, layout: false });
  } catch (error) {
    console.error("Error fetching pending projects:", error);
    res.status(500).send("Failed to fetch pending projects.");
  }
};