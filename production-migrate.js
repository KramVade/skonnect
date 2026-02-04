import 'dotenv/config';
import { sequelize } from "./models/db.js";

console.log("🚀 Starting production migration...");

try {
  await sequelize.authenticate();
  console.log("✅ Connected to database!");
  
  console.log("🔧 Running production-safe schema updates...");
  
  // Step 1: Ensure basic tables exist without forcing schema changes
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR(255) NOT NULL,
      "email" VARCHAR(255) UNIQUE NOT NULL,
      "password" VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  
  // Step 2: Create sysusers table with proper enum handling
  await sequelize.query(`
    DO $$ 
    BEGIN
      -- Create enum type if it doesn't exist
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_sysusers_position') THEN
        CREATE TYPE enum_sysusers_position AS ENUM ('publicuser', 'secretary', 'treasurer', 'councilor', 'chairperson', 'admin');
      END IF;
      
      -- Create table if it doesn't exist
      IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'sysusers') THEN
        CREATE TABLE "sysusers" (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255) NOT NULL,
          "email" VARCHAR(255) UNIQUE NOT NULL,
          "password" VARCHAR(255) NOT NULL,
          "position" enum_sysusers_position DEFAULT 'publicuser' NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      END IF;
    END $$;
  `);
  
  // Step 3: Create other essential tables
  const tables = [
    `CREATE TABLE IF NOT EXISTS "announcements" (
      "id" SERIAL PRIMARY KEY,
      "title" VARCHAR(255) NOT NULL,
      "content" TEXT NOT NULL,
      "image_path" VARCHAR(255),
      "status" VARCHAR(50) DEFAULT 'pending',
      "author_id" INTEGER REFERENCES "sysusers"("id"),
      "approved_by" INTEGER REFERENCES "sysusers"("id"),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,
    
    `CREATE TABLE IF NOT EXISTS "projects" (
      "id" SERIAL PRIMARY KEY,
      "title" VARCHAR(255) NOT NULL,
      "description" TEXT NOT NULL,
      "budget" DECIMAL(10,2),
      "status" VARCHAR(50) DEFAULT 'pending',
      "proposed_by" INTEGER REFERENCES "sysusers"("id"),
      "approved_by" INTEGER REFERENCES "sysusers"("id"),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,
    
    `CREATE TABLE IF NOT EXISTS "expenditures" (
      "id" SERIAL PRIMARY KEY,
      "project_id" INTEGER REFERENCES "projects"("id"),
      "description" VARCHAR(255) NOT NULL,
      "amount" DECIMAL(10,2) NOT NULL,
      "receipt_path" VARCHAR(255),
      "recorded_by" INTEGER REFERENCES "sysusers"("id"),
      "reviewed_by" INTEGER REFERENCES "sysusers"("id"),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,
    
    `CREATE TABLE IF NOT EXISTS "financial_reports" (
      "id" SERIAL PRIMARY KEY,
      "project_id" INTEGER REFERENCES "projects"("id"),
      "title" VARCHAR(255) NOT NULL,
      "content" TEXT NOT NULL,
      "file_path" VARCHAR(255),
      "status" VARCHAR(50) DEFAULT 'draft',
      "submitted_by" INTEGER REFERENCES "sysusers"("id"),
      "approved_by" INTEGER REFERENCES "sysusers"("id"),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,
    
    `CREATE TABLE IF NOT EXISTS "feedback" (
      "id" SERIAL PRIMARY KEY,
      "type" VARCHAR(100) NOT NULL,
      "message" TEXT NOT NULL,
      "name" VARCHAR(255) DEFAULT 'Anonymous',
      "status" VARCHAR(50) DEFAULT 'pending',
      "submitted_by" INTEGER REFERENCES "sysusers"("id"),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,
    
    `CREATE TABLE IF NOT EXISTS "project_files" (
      "id" SERIAL PRIMARY KEY,
      "project_id" INTEGER REFERENCES "projects"("id"),
      "file_name" VARCHAR(255) NOT NULL,
      "file_path" VARCHAR(255) NOT NULL,
      "file_type" VARCHAR(100),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`
  ];
  
  for (const tableSQL of tables) {
    await sequelize.query(tableSQL);
  }
  
  console.log("✅ Production migration completed successfully!");
  console.log("📋 All essential tables are ready");
  
} catch (err) {
  console.error("❌ Production migration failed:", err.message);
  process.exit(1);
} finally {
  process.exit(0);
}