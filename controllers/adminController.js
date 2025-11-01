/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { SysUser } from "../models/sysUserModel.js";

export const dashboardPage = (req, res) => {
  // In a real application, you would fetch this data from your database.
  const dashboardData = {
    totalProjects: 15,
    pendingApprovals: 3,
    feedbackCount: 27,
    recentActivities: [
      { officer: 'SK Secretary', action: 'uploaded a new project proposal.', time: '2 hours ago' },
      { officer: 'SK Chairperson', action: 'approved a financial report.', time: '5 hours ago' },
      { officer: 'SK Treasurer', action: 'posted a new announcement.', time: '1 day ago' }
    ],
    notifications: [
      { message: 'New project "Community Cleanup" awaits approval.', type: 'submission' },
      { message: 'Feedback received on "Youth Basketball League".', type: 'feedback' }
    ]
  };

  if (!req.session.userId) return res.redirect("/login");

  res.render("admindashboard", { title: "Admin Dashboard", ...dashboardData });
};

export const userManagementPage = async (req, res) => {
  if (!req.session.userId) return res.redirect("/login");

  try {
    const users = await SysUser.findAll({ raw: true });
    res.render("user-management", { title: "User Management", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users.");
  }
};

export const updateUserPage = async (req, res) => {
  if (!req.session.userId) return res.redirect("/login");

  try {
    const user = await SysUser.findByPk(req.params.id, { raw: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const positions = ['publicuser', 'secretary', 'treasurer', 'councilor', 'chairperson'];
    res.render("update-user", { title: "Update User Role", user, positions });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user.");
  }
};

export const updateUserRole = async (req, res) => {
  await SysUser.update({ position: req.body.position }, { where: { id: req.params.id } });
  res.redirect("/admin/user-management");
};

export const deleteUser = async (req, res) => {
  await SysUser.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/user-management");
};