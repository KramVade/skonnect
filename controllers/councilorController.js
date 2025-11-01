/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

export const dashboardPage = (req, res) => {
  // Static data for the councilor dashboard. To be replaced with database queries.
  const dashboardData = {
    projectsSubmitted: 4,
    eventsPosted: 2,
    pendingReviews: 1,
    recentActivities: [
      { action: 'You submitted a project proposal for "Barangay Sports League".', time: '1 day ago' },
      { action: 'Chairperson approved your announcement for "Youth Week".', time: '2 days ago' },
      { action: 'You submitted an activity report for the "Coastal Cleanup Drive".', time: '4 days ago' }
    ],
    notifications: [
      { message: 'Your project proposal "Barangay Sports League" is awaiting review.', type: 'pending' },
      { message: 'New feedback received on your "Free Wi-Fi" project.', type: 'feedback' }
    ]
  };

  if (!req.session.userId || req.session.position !== 'councilor') return res.redirect("/login");

  res.render("coundashboard", { title: "Councilor Dashboard", ...dashboardData });
};