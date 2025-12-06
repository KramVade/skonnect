/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

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

  res.render("treasdashboard", { title: "Treasurer Dashboard", ...dashboardData });
};