import 'dotenv/config';
import {
  sequelize,
  User,
  SysUser,
  Announcement,
  Project,
  Expenditure,
  FinancialReport,
  Feedback,
  ProjectFile
} from "./models/index.js";

console.log("📦 Starting data import from MySQL dump...\n");

try {
  await sequelize.authenticate();
  console.log("✅ Connected to Supabase!\n");

  // Import SysUsers first (they're referenced by other tables)
  console.log("👥 Importing system users...");
  const sysUsers = [
    { id: 1, name: 'Gregor Santiago', email: 'chair@gmail.com', password: '$2b$10$TdB4z6tfFdvVdB85HwK5ZeBqzChtpD7n0t7qXv1hScmg.9pXxUj8S', position: 'chairperson', createdAt: new Date('2025-10-31 02:32:31'), updatedAt: new Date('2025-11-01 05:35:40') },
    { id: 4, name: 'Mark Dave Manobo', email: 'markdaveako@gmail.com', password: '$2b$10$uQRGu2DsxBy5RzWI25vYBOQKi3FAye58tjXl3/28q1.RAnDKw6UVa', position: 'admin', createdAt: new Date('2025-11-01 06:15:20'), updatedAt: new Date('2025-11-01 06:15:20') },
    { id: 5, name: 'Samantha Aguila', email: 'secretary@gmail.com', password: '$2b$10$tloaWti1GBE/G.z7sK5JtelhV/rTG7rQIDYBjsByLHBItBbeTdmM6', position: 'secretary', createdAt: new Date('2025-11-01 06:21:24'), updatedAt: new Date('2025-11-01 06:21:58') },
    { id: 6, name: 'Juan Dela Cruz', email: 'treasurer@gmail.com', password: '$2b$10$g2a3R1/dKrM2v8EdOqDFYO2LccOD9a8xHwdr6NxakaMfBdpOTkZ02', position: 'treasurer', createdAt: new Date('2025-11-01 06:40:54'), updatedAt: new Date('2025-11-01 06:41:21') },
    { id: 7, name: 'Noel Fabella', email: 'councilor@gmail.com', password: '$2b$10$Y7mbZoD0WaAhBSuRk2CnEeHldZR/7AwxPDDnIgyxcECbuwzw33jf2', position: 'councilor', createdAt: new Date('2025-11-01 06:52:14'), updatedAt: new Date('2025-11-01 06:52:31') },
    { id: 8, name: 'Pedro Penduko', email: 'pedro@gmail.com', password: '$2b$10$VMdA8QAsQnDCpi56FwRbTu6GkCpH0hbN.DIyaqiLxnAn5RkSLS0tO', position: 'publicuser', createdAt: new Date('2025-11-01 07:05:24'), updatedAt: new Date('2025-11-01 07:05:24') }
  ];
  await SysUser.bulkCreate(sysUsers);
  console.log(`✅ Imported ${sysUsers.length} system users\n`);

  // Import regular Users
  console.log("👤 Importing regular users...");
  const users = [
    { id: 1, name: 'Kram', email: 'markdaveako@gmail.com', password: '$2b$10$ZHiM9px1kmuRQeS3cgfbrenyDINgdOsapeZK/nuqNWjAduoHa499O', createdAt: new Date('2025-09-17 01:37:29'), updatedAt: new Date('2025-09-17 01:37:29') },
    { id: 2, name: 'Kram Ako', email: 'kramvadeako@gmail.com', password: '$2b$10$ADCpHgf8b5GWw3sOqJrMmuYU75mR0vQ.IQ0fxZS8lNVM3zWLm3HRe', createdAt: new Date('2025-11-01 05:55:51'), updatedAt: new Date('2025-11-01 05:55:51') }
  ];
  await User.bulkCreate(users);
  console.log(`✅ Imported ${users.length} regular users\n`);

  // Import Projects
  console.log("📁 Importing projects...");
  const projects = [
    { project_id: 1, project_title: 'mcksc', description: 'msvmsk', category: 'kscskc', proposed_by: 5, approved_by: 1, budget_estimate: 2999.00, status: 'Approved', date_proposed: new Date('2025-11-01 11:34:54'), date_approved: new Date('2025-11-01 11:35:54'), last_updated: new Date('2025-11-01 11:35:54') },
    { project_id: 2, project_title: 'vdv sdv', description: 'vsdvsv', category: 'vdvdvdv', proposed_by: 5, approved_by: 1, budget_estimate: 234567876.00, status: 'Approved', date_proposed: new Date('2025-11-01 12:18:27'), date_approved: new Date('2025-11-01 12:24:43'), last_updated: new Date('2025-11-01 12:24:43'), attachment_path: 'uploads/attachments/attachment-1761999507524-226756862.docx' },
    { project_id: 3, project_title: 'Community Library Renovation', description: 'Renovate and expand the local community library to provide better resources for students.', category: 'Education', proposed_by: 5, approved_by: null, budget_estimate: 50000.00, actual_budget: 48000.00, status: 'Approved', date_proposed: new Date('2025-11-02 10:00:00'), date_approved: new Date('2025-11-03 09:00:00'), start_date: new Date('2025-11-04 08:00:00'), end_date: new Date('2025-11-15 17:00:00'), remarks: 'Project completed successfully.', last_updated: new Date('2025-11-15 17:10:00'), attachment_path: 'uploads/attachments/library-proposal.docx' },
    { project_id: 4, project_title: 'Health Awareness Campaign', description: 'Organize workshops and seminars to promote healthy lifestyles in the community.', category: 'Health', proposed_by: 5, approved_by: 1, budget_estimate: 20000.00, actual_budget: 19500.00, status: 'Approved', date_proposed: new Date('2025-11-03 11:00:00'), start_date: new Date('2025-11-05 09:00:00'), end_date: new Date('2025-11-10 16:00:00'), remarks: 'Campaign achieved high participation.', last_updated: new Date('2025-11-10 16:30:00'), attachment_path: 'uploads/attachments/health-campaign.docx' },
    { project_id: 5, project_title: 'Basketball Court Construction', description: 'Construct a new basketball court in the barangay for youth sports activities.', category: 'Sports', proposed_by: 7, budget_estimate: 75000.00, actual_budget: 72000.00, status: 'Pending', date_proposed: new Date('2025-11-04 09:30:00'), start_date: new Date('2025-11-06 08:00:00'), last_updated: new Date('2025-11-20 09:00:00'), attachment_path: 'uploads/attachments/basketball-court-plan.docx' },
    { project_id: 6, project_title: 'Tree Planting Drive', description: 'Plant 500 trees around the community park to promote environmental awareness.', category: 'Environment', proposed_by: 7, approved_by: 1, budget_estimate: 15000.00, actual_budget: 12000.00, status: 'Completed', date_proposed: new Date('2025-11-05 13:00:00'), date_approved: new Date('2025-11-06 14:00:00'), start_date: new Date('2025-11-07 08:00:00'), end_date: new Date('2025-11-08 15:00:00'), remarks: 'Successfully planted 500 trees.', last_updated: new Date('2025-11-08 15:30:00'), attachment_path: 'uploads/attachments/tree-planting.docx' },
    { project_id: 7, project_title: 'Scholarship Fund Setup', description: 'Establish a scholarship fund for underprivileged students in the community.', category: 'Education', proposed_by: 5, approved_by: 1, budget_estimate: 100000.00, actual_budget: 95000.00, status: 'Pending', date_proposed: new Date('2025-11-06 10:00:00'), date_approved: new Date('2025-11-07 11:00:00'), remarks: 'Fund approved, awaiting disbursement.', last_updated: new Date('2025-11-07 11:30:00'), attachment_path: 'uploads/attachments/scholarship-fund.docx' }
  ];
  await Project.bulkCreate(projects);
  console.log(`✅ Imported ${projects.length} projects\n`);

  // Import Announcements
  console.log("📢 Importing announcements...");
  const announcements = [
    { announcement_id: 1, title: 'Fiesta', content: 'smckmkcskcns', category: 'News', author_id: 5, approved_by: 1, status: 'Approved', publish_date: new Date('2025-11-03 11:30:11'), date_created: new Date('2025-11-03 11:13:34'), last_updated: new Date('2025-11-03 11:30:11') },
    { announcement_id: 2, title: 'Barangay Clean-Up Drive', content: 'Join us this Saturday for a community clean-up drive at the town plaza. Let\'s keep our surroundings clean!', category: 'Event', author_id: 5, approved_by: 1, image: 'uploads/announcements/cleanup.png', status: 'Approved', publish_date: new Date('2025-11-22 08:00:00'), date_created: new Date('2025-11-20 09:00:00'), last_updated: new Date('2025-11-20 09:00:00') },
    { announcement_id: 3, title: 'New Scholarship Program', content: 'We are launching a new scholarship program for deserving students. Applications are now open!', category: 'News', author_id: 5, approved_by: 1, status: 'Approved', publish_date: new Date('2025-11-21 10:00:00'), date_created: new Date('2025-11-20 09:10:00'), last_updated: new Date('2025-11-20 09:10:00') },
    { announcement_id: 4, title: 'Monthly Health Check-Up', content: 'The monthly free health check-up will be held at the barangay hall next Friday. Everyone is encouraged to participate.', category: 'Notice', author_id: 5, approved_by: 1, image: 'uploads/announcements/health-checkup.jpg', status: 'Approved', publish_date: new Date('2025-11-25 09:00:00'), date_created: new Date('2025-11-20 09:20:00'), last_updated: new Date('2025-11-20 09:20:00') },
    { announcement_id: 5, title: 'Sports Tournament Registration', content: 'Registration for the barangay sports tournament is now open! Sign up your teams and join the fun.', category: 'Event', author_id: 7, approved_by: 1, status: 'Pending Approval', publish_date: new Date('2025-11-23 09:00:00'), date_created: new Date('2025-11-20 09:30:00'), last_updated: new Date('2025-11-20 09:30:00') },
    { announcement_id: 6, title: 'Holiday Celebration Schedule', content: 'Here is the schedule of activities for the upcoming holiday celebration. Everyone is welcome to join!', category: 'News', author_id: 5, image: 'uploads/images/holiday.jpg', status: 'Draft', publish_date: new Date('2025-12-01 08:00:00'), date_created: new Date('2025-11-20 09:40:00'), last_updated: new Date('2025-11-20 09:40:00') }
  ];
  await Announcement.bulkCreate(announcements);
  console.log(`✅ Imported ${announcements.length} announcements\n`);

  // Import Financial Reports
  console.log("💰 Importing financial reports...");
  const financialReports = [
    { report_id: 1, project_id: 1, submitted_by: 6, approved_by: 1, amount_allocated: 1000000.00, amount_spent: 20000.00, balance: 980000.00, attachments: 'uploads/financials/financial-report-1762155233841-584570418.docx', remarks: 'wala', status: 'Approved', date_submitted: new Date('2025-11-03 07:33:53'), date_approved: new Date('2025-11-03 08:03:54'), last_updated: new Date('2025-11-03 08:03:54') },
    { report_id: 2, project_id: 3, submitted_by: 6, approved_by: 1, amount_allocated: 50000.00, amount_spent: 48000.00, balance: 2000.00, attachments: 'uploads/financials/library-report.docx', remarks: 'Expenses mostly for construction materials.', status: 'Approved', date_submitted: new Date('2025-11-15 17:15:00'), date_approved: new Date('2025-11-16 09:00:00'), last_updated: new Date('2025-11-16 09:05:00') },
    { report_id: 3, project_id: 4, submitted_by: 6, approved_by: 1, amount_allocated: 20000.00, amount_spent: 19500.00, balance: 500.00, attachments: 'uploads/financials/health-report.docx', remarks: 'Covers logistics and promotional materials.', status: 'Approved', date_submitted: new Date('2025-11-10 16:35:00'), date_approved: new Date('2025-11-11 10:00:00'), last_updated: new Date('2025-11-11 10:05:00') },
    { report_id: 4, project_id: 5, submitted_by: 6, amount_allocated: 75000.00, amount_spent: 72000.00, balance: 3000.00, attachments: 'uploads/financials/basketball-report.docx', remarks: 'Ongoing construction expenses.', status: 'Pending', date_submitted: new Date('2025-11-20 09:05:00'), last_updated: new Date('2025-11-20 09:05:00') },
    { report_id: 5, project_id: 6, submitted_by: 6, approved_by: 1, amount_allocated: 15000.00, amount_spent: 12000.00, balance: 3000.00, attachments: 'uploads/financials/tree-planting-report.docx', remarks: 'Expenses for seedlings and gardening tools.', status: 'Verified', date_submitted: new Date('2025-11-08 15:35:00'), date_approved: new Date('2025-11-09 11:00:00'), last_updated: new Date('2025-11-09 11:05:00') },
    { report_id: 6, project_id: 7, submitted_by: 6, amount_allocated: 100000.00, amount_spent: 95000.00, balance: 5000.00, attachments: 'uploads/financials/scholarship-report.docx', remarks: 'Scholarship fund disbursement planned next month.', status: 'Pending', date_submitted: new Date('2025-11-07 11:35:00'), last_updated: new Date('2025-11-07 11:35:00') }
  ];
  await FinancialReport.bulkCreate(financialReports);
  console.log(`✅ Imported ${financialReports.length} financial reports\n`);

  // Import Expenditures
  console.log("💸 Importing expenditures...");
  const expenditures = [
    { expenditure_id: 1, project_id: 3, description: 'Food Supply', category: 'Food', amount: 100000.00, date_incurred: new Date('2025-11-20 00:00:00'), receipt_path: 'uploads/financials/financial-report-1763644554838-307404396.pdf', recorded_by: 6, remarks: '', date_created: new Date('2025-11-20 13:15:54'), last_updated: new Date('2025-11-20 13:15:54'), status: 'Pending' }
  ];
  await Expenditure.bulkCreate(expenditures);
  console.log(`✅ Imported ${expenditures.length} expenditures\n`);

  // Import Feedback
  console.log("💬 Importing feedback...");
  const feedbacks = [
    { feedback_id: 1, subject: 'ewfwef', message: 'gewvgrwfwe', status: 'New', createdAt: new Date('2025-11-05 12:09:52'), updatedAt: new Date('2025-11-20 10:19:53'), submitted_by_name: 'Kram Vade' }
  ];
  await Feedback.bulkCreate(feedbacks);
  console.log(`✅ Imported ${feedbacks.length} feedback entries\n`);

  console.log("✨ Data import complete!");
  console.log("\n📊 Summary:");
  console.log(`  - ${sysUsers.length} system users`);
  console.log(`  - ${users.length} regular users`);
  console.log(`  - ${projects.length} projects`);
  console.log(`  - ${announcements.length} announcements`);
  console.log(`  - ${financialReports.length} financial reports`);
  console.log(`  - ${expenditures.length} expenditures`);
  console.log(`  - ${feedbacks.length} feedback entries`);
  console.log("\n🎉 Your data is now in Supabase!");

} catch (err) {
  console.error("❌ Import failed:", err.message);
  console.error("\nMake sure you ran 'npm run migrate' first to create the tables.");
} finally {
  process.exit();
}
