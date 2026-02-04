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
import inquirer from "inquirer";

console.log("🔄 Starting fresh Supabase migration...");

const { confirmMigration } = await inquirer.prompt([
  { 
    type: "confirm", 
    name: "confirmMigration", 
    message: "⚠️  This will DROP and recreate all tables (data will be lost). Continue?", 
    default: false 
  }
]);

if (!confirmMigration) {
  console.log("❌ Migration cancelled");
  process.exit();
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to Supabase (PostgreSQL)!");
  
  // Drop and recreate all tables
  await sequelize.sync({ force: true });
  console.log("✅ All tables recreated successfully!");
  
  console.log("\n📋 Tables created:");
  console.log("  - users");
  console.log("  - sysusers");
  console.log("  - announcements");
  console.log("  - projects");
  console.log("  - expenditures");
  console.log("  - financial_reports");
  console.log("  - feedback");
  console.log("  - project_files");
  
  console.log("\n✨ Fresh migration complete! You can now run the app.");
} catch (err) {
  console.error("❌ Migration failed:", err.message);
} finally {
  process.exit();
}