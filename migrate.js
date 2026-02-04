
    /*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    
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

console.log("🔄 Starting Supabase migration...");

const { confirmMigration } = await inquirer.prompt([
  { 
    type: "confirm", 
    name: "confirmMigration", 
    message: "This will create all tables in your Supabase database. Continue?", 
    default: true 
  }
]);

if (!confirmMigration) {
  console.log("❌ Migration cancelled");
  process.exit();
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to Supabase (PostgreSQL)!");
  
  // Sync all models (creates tables)
  await sequelize.sync({ alter: true });
  console.log("✅ All tables created/updated successfully!");
  
  console.log("\n📋 Tables created:");
  console.log("  - users");
  console.log("  - sysusers");
  console.log("  - announcements");
  console.log("  - projects");
  console.log("  - expenditures");
  console.log("  - financial_reports");
  console.log("  - feedback");
  console.log("  - project_files");
  
  console.log("\n✨ Migration complete! Check your Supabase dashboard.");
} catch (err) {
  console.error("❌ Migration failed:", err.message);
  console.error("\nTroubleshooting:");
  console.error("1. Check your .env file has correct Supabase credentials");
  console.error("2. Verify your Supabase project is active");
  console.error("3. Make sure DATABASE_URL is correct");
} finally {
  process.exit();
};
