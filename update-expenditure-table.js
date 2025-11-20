/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This script updates the expenditures table to add approval fields.
*/

import { sequelize } from "./models/db.js";
import { Expenditure } from "./models/expenditureModel.js";

async function updateExpenditureTable() {
  try {
    console.log("🔄 Updating expenditures table with approval fields...");
    
    // Sync the Expenditure model with the database (alter: true will add new columns)
    await Expenditure.sync({ alter: true });
    
    console.log("✅ Expenditures table updated successfully!");
    console.log("   Added fields: status, reviewed_by, date_reviewed");
    
    // Close the database connection
    await sequelize.close();
    console.log("🔌 Database connection closed.");
  } catch (error) {
    console.error("❌ Error updating expenditures table:", error);
    process.exit(1);
  }
}

updateExpenditureTable();
