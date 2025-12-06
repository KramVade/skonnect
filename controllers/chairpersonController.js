/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

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