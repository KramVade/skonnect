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

class Expenditure extends Model {}

Expenditure.init(
  {
    expenditure_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Unique ID for each expenditure entry.",
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "project_id",
      },
      comment: "The project this expenditure belongs to.",
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "Description of the expenditure (e.g., 'Venue rental', 'Food supplies').",
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Category of expenditure (e.g., 'Materials', 'Services', 'Transportation').",
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      comment: "Amount spent for this item.",
    },
    date_incurred: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: "Date when the expenditure was made.",
    },
    receipt_path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "File path to the uploaded receipt or proof of payment.",
    },
    recorded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SysUser,
        key: "id",
      },
      comment: "Treasurer who recorded this expenditure.",
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Additional notes about the expenditure.",
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending',
      comment: "Approval status of the expenditure.",
    },
    reviewed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SysUser,
        key: "id",
      },
      comment: "Chairperson who reviewed this expenditure.",
    },
    date_reviewed: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Date when the expenditure was reviewed.",
    },
  },
  {
    sequelize,
    modelName: "Expenditure",
    tableName: "expenditures",
    timestamps: true,
    updatedAt: 'last_updated',
    createdAt: 'date_created',
  }
);

Expenditure.belongsTo(Project, { foreignKey: 'project_id' });
Expenditure.belongsTo(SysUser, { as: 'recorder', foreignKey: 'recorded_by' });
Expenditure.belongsTo(SysUser, { as: 'reviewer', foreignKey: 'reviewed_by' });

export { Expenditure };
