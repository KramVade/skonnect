/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";
import { Project } from "./projectModel.js";
import { SysUser } from "./sysUserModel.js";

class FinancialReport extends Model {}

FinancialReport.init(
  {
    report_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Unique ID for each financial report.",
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "project_id",
      },
      comment: "The project this financial report belongs to.",
    },
    submitted_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SysUser,
        key: "id",
      },
      comment: "SK Treasurer who uploaded or created the report.",
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SysUser,
        key: "id",
      },
      comment: "SK Chairperson who verified the report.",
    },
    amount_allocated: {
      type: DataTypes.DECIMAL(12, 2),
      comment: "The budget approved for the project.",
    },
    amount_spent: {
      type: DataTypes.DECIMAL(12, 2),
      comment: "The total funds actually spent.",
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
      comment: "Remaining funds (amount_allocated - amount_spent).",
    },
    attachments: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "File path or link to uploaded receipts or reports.",
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Notes or financial clarifications.",
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Verified', 'Rejected'),
      defaultValue: 'Pending',
      comment: "Current review stage of the report.",
    },
    date_submitted: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: "Date the Treasurer submitted the report.",
    },
    date_approved: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Date the Chairperson approved it.",
    },
  },
  {
    sequelize,
    modelName: "FinancialReport",
    tableName: "financial_reports",
    timestamps: true,
    updatedAt: 'last_updated',
    createdAt: false,
  }
);

FinancialReport.belongsTo(Project, { foreignKey: 'project_id' });
FinancialReport.belongsTo(SysUser, { as: 'submitter', foreignKey: 'submitted_by' });
FinancialReport.belongsTo(SysUser, { as: 'approver', foreignKey: 'approved_by' });

export { FinancialReport };