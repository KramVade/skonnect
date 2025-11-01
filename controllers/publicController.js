/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

export const dashboardPage = (req, res) => {
  // Static data for the public dashboard. This would be fetched from the database.
  const publicData = {
    recentProjects: [
      { title: 'Community Pantry Initiative', description: 'Provided essential goods to 150 families.', status: 'Completed' },
      { title: 'Youth Basketball League', description: 'Summer sports program for local youth.', status: 'Ongoing' },
      { title: 'Barangay-wide Coastal Cleanup', description: 'A joint effort to clean our coastal areas.', status: 'Completed' }
    ],
    upcomingEvents: [
      { title: 'SK General Assembly', date: new Date('2025-11-30'), location: 'Barangay Hall' },
      { title: 'Christmas Gift Giving', date: new Date('2025-12-22'), location: 'Covered Court' }
    ].map(event => {
      return {
        ...event,
        month: event.date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        day: event.date.getDate()
      };
    }),
    latestAnnouncements: [
      { title: 'Voter Registration Schedule', content: 'The local Comelec office will be open for new voter registrations from Dec 1-5. Please bring a valid ID.', date: '3 days ago' },
      { title: 'Call for Volunteers', content: 'We are looking for volunteers for our upcoming Christmas Gift Giving event. Please contact any SK official to sign up.', date: '1 week ago' }
    ]
  };

  res.render("publicdashboard", { title: "SK Public Portal", ...publicData });
};