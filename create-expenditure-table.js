/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This script creates the expenditures table in the database.
*/

import { sequelize } from "./models/db.js";
import { Expenditure } from "./models/expenditureModel.js";

async function createExpenditureTable() {
  try {
    console.log("🔄 Creating expenditures table...");
    
    // Sync the Expenditure model with the database
    await Expenditure.sync({ force: false }); // Use force: true to drop and recreate
    
    console.log("✅ Expenditures table created successfully!");
    
    // Close the database connection
    await sequelize.close();
    console.log("🔌 Database connection closed.");
  } catch (error) {
    console.error("❌ Error creating expenditures table:", error);
    process.exit(1);
  }
}

createExpenditureTable();
