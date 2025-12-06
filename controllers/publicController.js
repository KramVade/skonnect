/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { SysUser, Announcement, Project } from "../models/index.js";

/**
 * Renders the main public dashboard page.
 * It fetches latest announcements and recent projects.
 */
export const dashboardPage = async (req, res) => {
    try {
        const latestAnnouncements = await Announcement.findAll({
            where: { status: 'Approved' },
            order: [['publish_date', 'DESC']],
            limit: 3,
            include: [{ model: SysUser, as: 'author', attributes: ['name'] }],
            raw: true,
            nest: true,
        });

        const recentProjects = await Project.findAll({
            where: { status: 'Completed' },
            order: [['end_date', 'DESC']],
            limit: 5,
            raw: true,
        });

        res.render("publicdashboard", {
            title: "Public Dashboard",
            active: 'home',
            latestAnnouncements,
            recentProjects,
        });
    } catch (error) {
        console.error("Error loading public dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
};

/**
 * Renders the "About Us" page with a list of SK officials.
 */
export const aboutUsPage = async (req, res) => {
    try {
        const officialPositions = ['chairperson', 'secretary', 'treasurer', 'councilor'];
        const officials = await SysUser.findAll({
            where: { position: officialPositions },
            attributes: ['name', 'position'],
            raw: true,
        });

        // Format data for the view
        const formattedOfficials = officials.map(o => ({
            ...o,
            position: o.position.charAt(0).toUpperCase() + o.position.slice(1),
            imageUrl: o.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' // Provide a default image
        }));

        res.render("aboutus", { title: "About Us", officials: formattedOfficials, active: 'about' });
    } catch (error) {
        console.error("Error fetching officials for About Us page:", error);
        res.status(500).send("Failed to load the About Us page.");
    }
};

/**
 * Renders the public announcements page.
 */
export const publicAnnouncementsPage = async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            where: { status: 'Approved' },
            order: [['publish_date', 'DESC']],
            include: [{ model: SysUser, as: 'author', attributes: ['name'] }],
        });
        res.render('public-announcements', { title: 'Announcements', announcements, active: 'announcements' });
    } catch (error) {
        console.error("Error fetching public announcements:", error);
        res.status(500).send("Failed to load announcements.");
    }
};