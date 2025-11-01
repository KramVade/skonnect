/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

export const dashboardPage = (req, res) => {
  // Static data for the secretary dashboard, to be replaced with database queries later.
  const dashboardData = {
    meetingsRecorded: 12,
    proposeProjectLink: "/project/create", // Link to create a project
    projectsUploaded: 5,
    pendingReview: 4,
    recentActivities: [
      { action: 'You uploaded minutes for the "Monthly SK Meeting".', time: '2 days ago' },
      { action: 'Chairperson approved the "Community Pantry" project documentation.', time: '3 days ago' },
      { action: 'You drafted a new announcement for the "Youth Fun Run".', time: '4 days ago' }
    ],
    notifications: [
      { message: 'Meeting minutes from Oct 15 are pending Chairperson review.', type: 'pending' },
      { message: 'Chairperson added a comment on the "Basketball League" project proposal.', type: 'comment' }
    ]
  };

  if (!req.session.userId || req.session.position !== 'secretary') return res.redirect("/login");

  res.render("secdashboard", { title: "Secretary Dashboard", ...dashboardData });
};