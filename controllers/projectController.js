/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { Project } from "../models/projectModel.js";
import { SysUser } from "../models/sysUserModel.js";

/**
 * Middleware to check if the user has the required position (secretary or councilor).
 */
const isAuthorizedToPropose = (req, res, next) => {
  if (!req.session.userId || !['secretary', 'councilor'].includes(req.session.position)) {
    // Redirect to login or a generic dashboard if not authorized
    return res.redirect("/login"); 
  }
  next();
};

/**
 * Middleware to check if the user is the chairperson.
 */
const isChairperson = (req, res, next) => {
  if (!req.session.userId || req.session.position !== 'chairperson') {
    // Redirect to login or a generic dashboard if not authorized
    return res.redirect("/login");
  }
  next();
};

/**
 * Middleware to check if the user is an admin.
 */
const isAdmin = (req, res, next) => {
  if (!req.session.userId || req.session.position !== 'admin') {
    // Redirect to login if not an admin
    return res.redirect("/login");
  }
  next();
};

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
 * Renders the page for creating a new project proposal.
 */
export const createProjectPage = [isAuthorizedToPropose, (req, res) => {
  res.render("create-project", { title: "Propose a New Project", userPosition: req.session.position, layout: false });
}];

/**
 * Handles the submission of a new project proposal.
 */
export const createProject = [isAuthorizedToPropose, async (req, res) => {
  try {
    const { project_title, description, category, budget_estimate } = req.body;

    await Project.create({
      project_title,
      description,
      category,
      budget_estimate,
      proposed_by: req.session.userId, // Set the proposer from the session
      status: 'Pending',
    });

    // Redirect back to the user's specific dashboard
    res.redirect(`/${req.session.position}/dashboard`);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Failed to create project proposal.");
  }
}];

/**
 * Renders the project documentation page with a list of all projects.
 */
export const listProjectsPage = [isSkOfficial, async (req, res) => {
  try {
    const projectInstances = await Project.findAll({
      include: [{ model: SysUser, as: 'proposer', attributes: ['name'] }],
      order: [['date_proposed', 'DESC']],
    });

    // Convert instances to plain objects for rendering
    const projects = projectInstances.map(p => p.get({ plain: true }));

    res.render("project-list", { title: "Project Documentation", projects, userPosition: req.session.position, layout: false });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Failed to fetch projects.");
  }
}];

/**
 * Approves a project proposal. (Chairperson only)
 */
export const approveProject = [isChairperson, async (req, res) => {
  try {
    const projectId = req.params.id;
    await Project.update(
      {
        status: 'Approved',
        approved_by: req.session.userId,
        date_approved: new Date(),
      },
      { where: { project_id: projectId } }
    );
    res.redirect('/chairperson/projects');
  } catch (error) {
    console.error("Error approving project:", error);
    res.status(500).send("Failed to approve project.");
  }
}];

/**
 * Rejects a project proposal. (Chairperson only)
 */
export const rejectProject = [isChairperson, async (req, res) => {
  try {
    const projectId = req.params.id;
    await Project.update(
      {
        status: 'Rejected',
        approved_by: req.session.userId, // Log who rejected it
      },
      { where: { project_id: projectId } }
    );
    res.redirect('/chairperson/projects');
  } catch (error) {
    console.error("Error rejecting project:", error);
    res.status(500).send("Failed to reject project.");
  }
}];

/**
 * Renders the page for editing a project. (Admin only)
 */
export const editProjectPage = [isAdmin, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { raw: true });
    if (!project) {
      return res.status(404).send("Project not found.");
    }
    res.render("edit-project", { title: "Edit Project", project, layout: false });
  } catch (error) {
    console.error("Error fetching project for edit:", error);
    res.status(500).send("Failed to fetch project.");
  }
}];

/**
 * Updates a project. (Admin only)
 */
export const updateProject = [isAdmin, async (req, res) => {
  try {
    const projectId = req.params.id;
    const { project_title, description, category, budget_estimate, status } = req.body;

    await Project.update(
      { project_title, description, category, budget_estimate, status },
      { where: { project_id: projectId } }
    );

    res.redirect('/projects');
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Failed to update project.");
  }
}];

/**
 * Deletes a project. (Admin only)
 */
export const deleteProject = [isAdmin, async (req, res) => {
  try {
    const projectId = req.params.id;
    await Project.destroy({ where: { project_id: projectId } });
    res.redirect('/projects');
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Failed to delete project.");
  }
}];

/**
 * Renders the details page for a single project.
 */
export const viewProjectPage = [isSkOfficial, async (req, res) => {
  try {
    const projectInstance = await Project.findByPk(req.params.id, {
      include: [
        { model: SysUser, as: 'proposer', attributes: ['name', 'position'] },
        { model: SysUser, as: 'approver', attributes: ['name', 'position'] }
      ]
    });

    if (!projectInstance) {
      return res.status(404).send("Project not found.");
    }

    const project = projectInstance.get({ plain: true });

    res.render("project-details", {
      title: project.project_title,
      project,
      userPosition: req.session.position,
      layout: false
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).send("Failed to fetch project details.");
  }
}];