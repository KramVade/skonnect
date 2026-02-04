import 'dotenv/config';
import bcrypt from 'bcrypt';
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

console.log("🌱 Seeding mock data for SKONNECT...\n");

try {
  await sequelize.authenticate();
  console.log("✅ Connected to Supabase!\n");

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("🗑️  Clearing existing data...");
  await Expenditure.destroy({ where: {} });
  await FinancialReport.destroy({ where: {} });
  await ProjectFile.destroy({ where: {} });
  await Announcement.destroy({ where: {} });
  await Project.destroy({ where: {} });
  await Feedback.destroy({ where: {} });
  await User.destroy({ where: {} });
  await SysUser.destroy({ where: {} });
  console.log("✅ Cleared\n");

  // Create System Users
  console.log("👥 Creating system users...");
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const sysUsers = await SysUser.bulkCreate([
    { name: 'Maria Santos', email: 'chairperson@barangay.gov', password: hashedPassword, position: 'chairperson' },
    { name: 'Juan Dela Cruz', email: 'secretary@barangay.gov', password: hashedPassword, position: 'secretary' },
    { name: 'Ana Reyes', email: 'treasurer@barangay.gov', password: hashedPassword, position: 'treasurer' },
    { name: 'Pedro Garcia', email: 'councilor1@barangay.gov', password: hashedPassword, position: 'councilor' },
    { name: 'Rosa Martinez', email: 'councilor2@barangay.gov', password: hashedPassword, position: 'councilor' },
    { name: 'Admin User', email: 'admin@barangay.gov', password: hashedPassword, position: 'admin' },
    { name: 'Carlos Mendoza', email: 'public1@gmail.com', password: hashedPassword, position: 'publicuser' },
    { name: 'Linda Fernandez', email: 'public2@gmail.com', password: hashedPassword, position: 'publicuser' },
  ]);
  console.log(`✅ Created ${sysUsers.length} system users\n`);

  // Create Regular Users
  console.log("👤 Creating regular users...");
  const users = await User.bulkCreate([
    { name: 'Test User 1', email: 'user1@test.com', password: hashedPassword },
    { name: 'Test User 2', email: 'user2@test.com', password: hashedPassword },
  ]);
  console.log(`✅ Created ${users.length} regular users\n`);

  // Create Projects
  console.log("📁 Creating projects...");
  const now = new Date();
  const projects = await Project.bulkCreate([
    {
      project_title: 'Community Sports Complex',
      description: 'Construction of a multi-purpose sports complex with basketball court, volleyball court, and covered gym.',
      category: 'Sports & Recreation',
      proposed_by: sysUsers[3].id, // Councilor 1
      approved_by: sysUsers[0].id, // Chairperson
      budget_estimate: 2500000.00,
      actual_budget: 2450000.00,
      status: 'In Progress',
      date_proposed: new Date(now.getFullYear(), now.getMonth() - 2, 15),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 2, 20),
      start_date: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      remarks: 'Construction is 60% complete',
      last_updated: now,
      attachment_path: 'uploads/attachments/sports-complex-proposal.pdf'
    },
    {
      project_title: 'Youth Leadership Training Program',
      description: 'A comprehensive 3-month training program for youth leaders covering leadership skills, community organizing, and project management.',
      category: 'Youth Development',
      proposed_by: sysUsers[1].id, // Secretary
      approved_by: sysUsers[0].id,
      budget_estimate: 150000.00,
      status: 'Approved',
      date_proposed: new Date(now.getFullYear(), now.getMonth(), 5),
      date_approved: new Date(now.getFullYear(), now.getMonth(), 10),
      remarks: 'Scheduled to start next month',
      last_updated: now,
      attachment_path: 'uploads/attachments/youth-training.pdf'
    },
    {
      project_title: 'Scholarship Program for Underprivileged Students',
      description: 'Financial assistance program providing scholarships to 50 deserving students from low-income families.',
      category: 'Education',
      proposed_by: sysUsers[1].id,
      approved_by: sysUsers[0].id,
      budget_estimate: 500000.00,
      actual_budget: 500000.00,
      status: 'Completed',
      date_proposed: new Date(now.getFullYear(), now.getMonth() - 6, 1),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 6, 5),
      start_date: new Date(now.getFullYear(), now.getMonth() - 5, 1),
      end_date: new Date(now.getFullYear(), now.getMonth() - 1, 30),
      remarks: 'Successfully distributed scholarships to 50 students',
      last_updated: now,
      attachment_path: 'uploads/attachments/scholarship-program.pdf'
    },
    {
      project_title: 'Free Medical and Dental Mission',
      description: 'Free health services including medical consultation, dental check-up, and medicine distribution for senior citizens and children.',
      category: 'Health & Wellness',
      proposed_by: sysUsers[4].id, // Councilor 2
      approved_by: sysUsers[0].id,
      budget_estimate: 200000.00,
      actual_budget: 185000.00,
      status: 'Completed',
      date_proposed: new Date(now.getFullYear(), now.getMonth() - 3, 10),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 3, 12),
      start_date: new Date(now.getFullYear(), now.getMonth() - 2, 15),
      end_date: new Date(now.getFullYear(), now.getMonth() - 2, 16),
      remarks: 'Served 300+ residents',
      last_updated: now,
      attachment_path: 'uploads/attachments/medical-mission.pdf'
    },
    {
      project_title: 'Tree Planting and Coastal Clean-up Drive',
      description: 'Environmental initiative to plant 1,000 trees and clean coastal areas to promote environmental awareness.',
      category: 'Environment',
      proposed_by: sysUsers[3].id,
      budget_estimate: 80000.00,
      status: 'Pending',
      date_proposed: new Date(now.getFullYear(), now.getMonth(), 1),
      remarks: 'Awaiting chairperson approval',
      last_updated: now,
      attachment_path: 'uploads/attachments/tree-planting.pdf'
    },
    {
      project_title: 'Livelihood Skills Training for Women',
      description: 'Training program for women on baking, sewing, and handicraft making to promote entrepreneurship.',
      category: 'Livelihood',
      proposed_by: sysUsers[1].id,
      approved_by: sysUsers[0].id,
      budget_estimate: 120000.00,
      status: 'In Progress',
      date_proposed: new Date(now.getFullYear(), now.getMonth() - 1, 5),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 1, 8),
      start_date: new Date(now.getFullYear(), now.getMonth(), 1),
      remarks: 'Currently on week 2 of 8-week program',
      last_updated: now,
      attachment_path: 'uploads/attachments/livelihood-training.pdf'
    },
    {
      project_title: 'Street Lighting Installation Project',
      description: 'Installation of 50 solar-powered street lights in dark areas to improve safety and security.',
      category: 'Infrastructure',
      proposed_by: sysUsers[3].id,
      approved_by: sysUsers[0].id,
      budget_estimate: 750000.00,
      actual_budget: 720000.00,
      status: 'Completed',
      date_proposed: new Date(now.getFullYear(), now.getMonth() - 4, 1),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 4, 5),
      start_date: new Date(now.getFullYear(), now.getMonth() - 3, 1),
      end_date: new Date(now.getFullYear(), now.getMonth() - 2, 15),
      remarks: 'All 50 lights installed and operational',
      last_updated: now,
      attachment_path: 'uploads/attachments/street-lighting.pdf'
    },
    {
      project_title: 'Senior Citizens Monthly Assistance Program',
      description: 'Monthly financial assistance and grocery packs for senior citizens aged 60 and above.',
      category: 'Social Services',
      proposed_by: sysUsers[4].id,
      budget_estimate: 300000.00,
      status: 'Rejected',
      date_proposed: new Date(now.getFullYear(), now.getMonth(), 3),
      remarks: 'Budget constraints - to be reconsidered next quarter',
      last_updated: now
    }
  ]);
  console.log(`✅ Created ${projects.length} projects\n`);

  // Create Announcements
  console.log("📢 Creating announcements...");
  const announcements = await Announcement.bulkCreate([
    {
      title: 'Barangay Assembly Meeting - December 2025',
      content: 'All residents are invited to attend the quarterly barangay assembly meeting. Topics include: budget presentation, upcoming projects, and community concerns. Snacks will be provided.',
      category: 'Notice',
      author_id: sysUsers[1].id, // Secretary
      approved_by: sysUsers[0].id,
      status: 'Approved',
      publish_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 9, 0),
      date_created: now,
      last_updated: now,
      image: 'uploads/announcements/assembly-meeting.jpg'
    },
    {
      title: 'Christmas Festival and Gift-Giving 2025',
      content: 'Join us for our annual Christmas celebration! Activities include: parlor games, raffle draw, gift-giving for children, and free dinner for all residents. Bring your family and friends!',
      category: 'Event',
      author_id: sysUsers[1].id,
      approved_by: sysUsers[0].id,
      status: 'Approved',
      publish_date: new Date(now.getFullYear(), 11, 20, 15, 0),
      date_created: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
      last_updated: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
      image: 'uploads/announcements/christmas-festival.jpg'
    },
    {
      title: 'New Curfew Hours for Minors',
      content: 'Effective immediately, curfew hours for minors (below 18 years old) are from 10:00 PM to 5:00 AM. Parents are responsible for ensuring compliance. Violators will be brought to the barangay hall.',
      category: 'Notice',
      author_id: sysUsers[1].id,
      approved_by: sysUsers[0].id,
      status: 'Approved',
      publish_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
      date_created: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12),
      last_updated: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12)
    },
    {
      title: 'Basketball League Registration Now Open',
      content: 'Calling all basketball enthusiasts! Registration for the Inter-Purok Basketball League is now open. Form your teams (minimum 10 players) and register at the barangay hall. Registration fee: ₱500 per team. Limited slots available!',
      category: 'Event',
      author_id: sysUsers[3].id, // Councilor
      approved_by: sysUsers[0].id,
      status: 'Approved',
      publish_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
      date_created: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
      last_updated: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
      image: 'uploads/announcements/basketball-league.jpg'
    },
    {
      title: 'Free Skills Training for Out-of-School Youth',
      content: 'The barangay is offering free skills training programs for out-of-school youth. Available courses: Computer Literacy, Welding, Electrical Installation, and Food Service. Register now at the barangay hall.',
      category: 'News',
      author_id: sysUsers[1].id,
      status: 'Pending Approval',
      publish_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      date_created: now,
      last_updated: now
    },
    {
      title: 'Garbage Collection Schedule Update',
      content: 'New garbage collection schedule: Biodegradable waste - Monday and Thursday. Non-biodegradable waste - Tuesday and Friday. Recyclables - Saturday. Please segregate your waste properly.',
      category: 'Notice',
      author_id: sysUsers[1].id,
      status: 'Draft',
      publish_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      date_created: now,
      last_updated: now
    }
  ]);
  console.log(`✅ Created ${announcements.length} announcements\n`);

  // Create Financial Reports
  console.log("💰 Creating financial reports...");
  const financialReports = await FinancialReport.bulkCreate([
    {
      project_id: projects[0].id, // Sports Complex
      submitted_by: sysUsers[2].id, // Treasurer
      approved_by: sysUsers[0].id,
      amount_allocated: 2500000.00,
      amount_spent: 1500000.00,
      balance: 1000000.00,
      attachments: 'uploads/financials/sports-complex-report-q1.pdf',
      remarks: 'First quarter expenses - foundation and structural work completed',
      status: 'Approved',
      date_submitted: new Date(now.getFullYear(), now.getMonth() - 1, 5),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 1, 7),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 1, 7)
    },
    {
      project_id: projects[2].id, // Scholarship Program
      submitted_by: sysUsers[2].id,
      approved_by: sysUsers[0].id,
      amount_allocated: 500000.00,
      amount_spent: 500000.00,
      balance: 0.00,
      attachments: 'uploads/financials/scholarship-final-report.pdf',
      remarks: 'All funds disbursed to 50 scholars. Program completed successfully.',
      status: 'Verified',
      date_submitted: new Date(now.getFullYear(), now.getMonth() - 1, 15),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 1, 18),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 1, 18)
    },
    {
      project_id: projects[3].id, // Medical Mission
      submitted_by: sysUsers[2].id,
      approved_by: sysUsers[0].id,
      amount_allocated: 200000.00,
      amount_spent: 185000.00,
      balance: 15000.00,
      attachments: 'uploads/financials/medical-mission-report.pdf',
      remarks: 'Savings from bulk medicine purchase. Excess to be returned to general fund.',
      status: 'Approved',
      date_submitted: new Date(now.getFullYear(), now.getMonth() - 2, 20),
      date_approved: new Date(now.getFullYear(), now.getMonth() - 2, 22),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 2, 22)
    },
    {
      project_id: projects[5].id, // Livelihood Training
      submitted_by: sysUsers[2].id,
      amount_allocated: 120000.00,
      amount_spent: 45000.00,
      balance: 75000.00,
      attachments: 'uploads/financials/livelihood-interim-report.pdf',
      remarks: 'Interim report - training materials and instructor fees for first 2 weeks',
      status: 'Pending',
      date_submitted: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
      last_updated: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2)
    }
  ]);
  console.log(`✅ Created ${financialReports.length} financial reports\n`);

  // Create Expenditures
  console.log("💸 Creating expenditures...");
  const expenditures = await Expenditure.bulkCreate([
    {
      project_id: projects[0].id, // Sports Complex
      description: 'Construction materials - cement, steel bars, gravel, sand',
      category: 'Materials',
      amount: 850000.00,
      date_incurred: new Date(now.getFullYear(), now.getMonth() - 1, 10),
      receipt_path: 'uploads/receipts/construction-materials-001.pdf',
      recorded_by: sysUsers[2].id,
      remarks: 'Bulk purchase from ABC Hardware',
      status: 'Approved',
      reviewed_by: sysUsers[0].id,
      date_reviewed: new Date(now.getFullYear(), now.getMonth() - 1, 12),
      date_created: new Date(now.getFullYear(), now.getMonth() - 1, 11),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 1, 12)
    },
    {
      project_id: projects[0].id,
      description: 'Labor costs - construction workers (2 weeks)',
      category: 'Labor',
      amount: 320000.00,
      date_incurred: new Date(now.getFullYear(), now.getMonth() - 1, 25),
      receipt_path: 'uploads/receipts/labor-costs-001.pdf',
      recorded_by: sysUsers[2].id,
      remarks: '16 workers x 14 days',
      status: 'Approved',
      reviewed_by: sysUsers[0].id,
      date_reviewed: new Date(now.getFullYear(), now.getMonth() - 1, 26),
      date_created: new Date(now.getFullYear(), now.getMonth() - 1, 25),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 1, 26)
    },
    {
      project_id: projects[0].id,
      description: 'Heavy equipment rental - backhoe and concrete mixer',
      category: 'Equipment',
      amount: 180000.00,
      date_incurred: new Date(now.getFullYear(), now.getMonth() - 1, 15),
      receipt_path: 'uploads/receipts/equipment-rental-001.pdf',
      recorded_by: sysUsers[2].id,
      remarks: '10 days rental',
      status: 'Approved',
      reviewed_by: sysUsers[0].id,
      date_reviewed: new Date(now.getFullYear(), now.getMonth() - 1, 16),
      date_created: new Date(now.getFullYear(), now.getMonth() - 1, 15),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 1, 16)
    },
    {
      project_id: projects[3].id, // Medical Mission
      description: 'Medical supplies and medicines',
      category: 'Supplies',
      amount: 120000.00,
      date_incurred: new Date(now.getFullYear(), now.getMonth() - 2, 10),
      receipt_path: 'uploads/receipts/medical-supplies-001.pdf',
      recorded_by: sysUsers[2].id,
      remarks: 'Bulk purchase from Mercury Drug',
      status: 'Approved',
      reviewed_by: sysUsers[0].id,
      date_reviewed: new Date(now.getFullYear(), now.getMonth() - 2, 11),
      date_created: new Date(now.getFullYear(), now.getMonth() - 2, 10),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 2, 11)
    },
    {
      project_id: projects[3].id,
      description: 'Professional fees - doctors and dentists',
      category: 'Services',
      amount: 45000.00,
      date_incurred: new Date(now.getFullYear(), now.getMonth() - 2, 16),
      receipt_path: 'uploads/receipts/professional-fees-001.pdf',
      recorded_by: sysUsers[2].id,
      remarks: '3 doctors, 2 dentists for 2 days',
      status: 'Approved',
      reviewed_by: sysUsers[0].id,
      date_reviewed: new Date(now.getFullYear(), now.getMonth() - 2, 17),
      date_created: new Date(now.getFullYear(), now.getMonth() - 2, 16),
      last_updated: new Date(now.getFullYear(), now.getMonth() - 2, 17)
    },
    {
      project_id: projects[5].id, // Livelihood Training
      description: 'Training materials and equipment',
      category: 'Materials',
      amount: 35000.00,
      date_incurred: new Date(now.getFullYear(), now.getMonth(), 2),
      receipt_path: 'uploads/receipts/training-materials-001.pdf',
      recorded_by: sysUsers[2].id,
      remarks: 'Sewing machines, baking tools, craft supplies',
      status: 'Pending',
      date_created: new Date(now.getFullYear(), now.getMonth(), 3),
      last_updated: new Date(now.getFullYear(), now.getMonth(), 3)
    }
  ]);
  console.log(`✅ Created ${expenditures.length} expenditures\n`);

  // Create Feedback
  console.log("💬 Creating feedback...");
  const feedbacks = await Feedback.bulkCreate([
    {
      subject: 'Suggestion: Add More Street Lights on Main Road',
      message: 'Good day! I would like to suggest adding more street lights along the main road near the elementary school. The area is very dark at night and poses safety concerns for students and residents.',
      category: 'Suggestion',
      submitted_by: sysUsers[6].id, // Public user
      status: 'In Progress',
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
      updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2)
    },
    {
      subject: 'Complaint: Noise from Basketball Court',
      message: 'The basketball court is being used until very late at night (past 11 PM) and the noise is disturbing nearby residents. Can we implement a curfew for the facility?',
      category: 'Complaint',
      submitted_by: sysUsers[7].id,
      status: 'Resolved',
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15),
      updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10)
    },
    {
      subject: 'Inquiry: How to Apply for Barangay Clearance',
      message: 'Hello, I need to get a barangay clearance for my job application. What are the requirements and how much is the fee? What are your office hours?',
      category: 'Inquiry',
      submitted_by: null,
      submitted_by_name: 'Anonymous Resident',
      status: 'Resolved',
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
      updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4)
    },
    {
      subject: 'Appreciation: Thank You for the Medical Mission',
      message: 'I want to express my gratitude for the free medical mission last month. My family and I were able to get free check-ups and medicines. More power to the barangay!',
      category: 'Appreciation',
      submitted_by: sysUsers[6].id,
      status: 'Archived',
      createdAt: new Date(now.getFullYear(), now.getMonth() - 2, 20),
      updatedAt: new Date(now.getFullYear(), now.getMonth() - 2, 21)
    },
    {
      subject: 'Complaint: Uncollected Garbage',
      message: 'The garbage in our area has not been collected for 3 days now. It is starting to smell and attracting flies. Please send the garbage truck as soon as possible.',
      category: 'Complaint',
      submitted_by: null,
      submitted_by_name: 'Concerned Resident',
      status: 'New',
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
      updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    }
  ]);
  console.log(`✅ Created ${feedbacks.length} feedback entries\n`);

  // Summary
  console.log("✨ Mock data seeding complete!\n");
  console.log("📊 Summary:");
  console.log(`  - ${sysUsers.length} system users (all with password: password123)`);
  console.log(`  - ${users.length} regular users`);
  console.log(`  - ${projects.length} projects (various statuses)`);
  console.log(`  - ${announcements.length} announcements`);
  console.log(`  - ${financialReports.length} financial reports`);
  console.log(`  - ${expenditures.length} expenditures`);
  console.log(`  - ${feedbacks.length} feedback entries`);
  
  console.log("\n🔐 Login Credentials (all passwords: password123):");
  console.log("  - Chairperson: chairperson@barangay.gov");
  console.log("  - Secretary: secretary@barangay.gov");
  console.log("  - Treasurer: treasurer@barangay.gov");
  console.log("  - Councilor 1: councilor1@barangay.gov");
  console.log("  - Councilor 2: councilor2@barangay.gov");
  console.log("  - Admin: admin@barangay.gov");
  console.log("  - Public User 1: public1@gmail.com");
  console.log("  - Public User 2: public2@gmail.com");
  
  console.log("\n🎉 Your SKONNECT system is now populated with realistic mock data!");

} catch (err) {
  console.error("❌ Seeding failed:", err.message);
  console.error(err);
} finally {
  process.exit();
}
