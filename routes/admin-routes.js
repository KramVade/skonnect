const express = require('express');
const router = express.Router();
const { Project, FinancialReport, Feedback } = require('../models'); // Adjust path to your models
const { isAuthenticated, isAdmin } = require('../middleware/auth'); // Assuming you have auth middleware

/**
 * GET /admin/dashboard
 * Displays the main admin dashboard with summary widgets and recent activity.
 */
router.get('/dashboard', isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Fetch data for the summary widgets
    const totalProjects = await Project.count();
    const pendingApprovals = await FinancialReport.count({ where: { status: 'Pending' } });
    const feedbackCount = await Feedback.count();

    // TODO: Fetch data for Activity Log and Notifications
    const recentActivities = []; // Replace with actual data
    const notifications = [];    // Replace with actual data

    res.render('admindashboard', {
      title: 'Admin Dashboard',
      totalProjects,
      pendingApprovals,
      feedbackCount,
      recentActivities,
      notifications,
      user: req.session.user, // Pass user session data
      active: 'dashboard'     // For active sidebar link
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;