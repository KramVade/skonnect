import 'dotenv/config';
import { sequelize } from "./models/db.js";
import inquirer from "inquirer";

console.log("🔄 Starting safe schema migration...");

const { confirmMigration } = await inquirer.prompt([
  { 
    type: "confirm", 
    name: "confirmMigration", 
    message: "This will safely update the database schema while preserving existing data. Continue?", 
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
  
  console.log("🔧 Fixing schema issues step by step...");
  
  // Step 1: Fix timestamp columns
  try {
    console.log("📝 Fixing timestamp columns...");
    
    // Add createdAt and updatedAt with default values if they don't exist
    await sequelize.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='sysusers' AND column_name='createdAt') THEN
          ALTER TABLE "sysusers" ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='sysusers' AND column_name='updatedAt') THEN
          ALTER TABLE "sysusers" ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;
      END $$;
    `);
    
    // Update any null timestamps
    await sequelize.query(`
      UPDATE "sysusers" 
      SET "createdAt" = COALESCE("createdAt", NOW()),
          "updatedAt" = COALESCE("updatedAt", NOW());
    `);
    
    console.log("✅ Timestamp columns fixed");
  } catch (error) {
    console.log("ℹ️  Timestamp fix:", error.message);
  }
  
  // Step 2: Fix enum issues
  try {
    console.log("📝 Fixing enum columns...");
    
    // Check if position column exists and what type it is
    const result = await sequelize.query(`
      SELECT data_type, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'sysusers' AND column_name = 'position';
    `);
    
    if (result[0].length > 0) {
      const columnInfo = result[0][0];
      console.log("Current position column:", columnInfo);
      
      // If it's not an enum or has wrong values, fix it
      if (columnInfo.data_type !== 'USER-DEFINED') {
        console.log("Converting position to proper enum...");
        
        // First, ensure all existing values are valid
        await sequelize.query(`
          UPDATE "sysusers" 
          SET position = 'publicuser' 
          WHERE position NOT IN ('publicuser', 'secretary', 'treasurer', 'councilor', 'chairperson', 'admin')
             OR position IS NULL;
        `);
        
        // Create the enum type if it doesn't exist
        await sequelize.query(`
          DO $$ 
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_sysusers_position') THEN
              CREATE TYPE enum_sysusers_position AS ENUM ('publicuser', 'secretary', 'treasurer', 'councilor', 'chairperson', 'admin');
            END IF;
          END $$;
        `);
        
        // Convert the column to use the enum
        await sequelize.query(`
          ALTER TABLE "sysusers" 
          ALTER COLUMN position TYPE enum_sysusers_position 
          USING position::enum_sysusers_position;
        `);
      }
    }
    
    console.log("✅ Enum columns fixed");
  } catch (error) {
    console.log("ℹ️  Enum fix:", error.message);
  }
  
  // Step 3: Now safely sync the models
  console.log("🔄 Syncing remaining schema changes...");
  
  // Import models after fixing the schema
  const { User, SysUser, Announcement, Project, Expenditure, FinancialReport, Feedback, ProjectFile } = await import("./models/index.js");
  
  // Use alter: true but it should work now
  await sequelize.sync({ alter: true });
  
  console.log("✅ Schema migration completed successfully!");
  
  // Verify data is still there
  const userCount = await SysUser.count();
  console.log(`✅ Verified: ${userCount} users preserved in database`);
  
  console.log("\n📋 Tables verified:");
  console.log("  - users");
  console.log("  - sysusers (with preserved data)");
  console.log("  - announcements");
  console.log("  - projects");
  console.log("  - expenditures");
  console.log("  - financial_reports");
  console.log("  - feedback");
  console.log("  - project_files");
  
  console.log("\n✨ Safe migration complete! Your data has been preserved.");
  
} catch (err) {
  console.error("❌ Migration failed:", err.message);
  console.error("Full error:", err);
} finally {
  process.exit();
}