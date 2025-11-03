/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { Announcement } from "../models/announcementModel.js";
import { SysUser } from "../models/sysUserModel.js";

export const dashboardPage = async (req, res) => {
  try {
    // Fetch latest 3 approved announcements
    const latestAnnouncements = await Announcement.findAll({
      where: { status: 'Approved' },
      order: [['publish_date', 'DESC']],
      limit: 3,
      include: [{ model: SysUser, as: 'author', attributes: ['name'] }],
      raw: true,
      nest: true
    });

    // Static data for other sections (can be made dynamic later)
    const publicData = {
      recentProjects: [
        { title: 'Community Pantry Initiative', description: 'Provided essential goods to 150 families.', status: 'Completed' },
        { title: 'Youth Basketball League', description: 'Summer sports program for local youth.', status: 'Ongoing' },
        { title: 'Barangay-wide Coastal Cleanup', description: 'A joint effort to clean our coastal areas.', status: 'Completed' }
      ],
      upcomingEvents: [
        { title: 'SK General Assembly', date: new Date('2025-11-30'), location: 'Barangay Hall' },
        { title: 'Christmas Gift Giving', date: new Date('2025-12-22'), location: 'Covered Court' }
      ].map(event => ({
        ...event,
        month: event.date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        day: event.date.getDate()
      }))
    };

    res.render("publicdashboard", {
      title: "SK Public Portal",
      ...publicData,
      latestAnnouncements
    });
  } catch (error) {
    console.error("Error fetching public dashboard data:", error);
    res.status(500).send("Could not load the public portal.");
  }
};

export const publicAnnouncementsPage = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      where: { status: 'Approved' },
      order: [['publish_date', 'DESC']],
      include: [{ model: SysUser, as: 'author', attributes: ['name'] }]
    });
    res.render('public-announcements', { title: 'Announcements & News', announcements, active: 'announcements' });
  } catch (error) {
    console.error("Error fetching public announcements:", error);
    res.status(500).send("Could not load announcements.");
  }
};