/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";
import { SysUser } from "./sysUserModel.js";

class Project extends Model {}

Project.init(
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Primary key for the projects table.",
    },
    project_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "The official name or title of the project.",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "A detailed description of the project's objectives, scope, and activities.",
    },
    category: {
      type: DataTypes.STRING(100),
      comment: "Category of the project (e.g., Education, Health, Sports, Environment).",
    },
    proposed_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SysUser,
        key: "id",
      },
      comment: "Foreign key referencing the user ID (from sysusers) who proposed the project.",
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SysUser,
        key: "id",
      },
      comment: "Foreign key referencing the user ID (from sysusers) who approved the project. Null if pending or rejected.",
    },
    budget_estimate: {
      type: DataTypes.DECIMAL(12, 2),
      comment: "The estimated budget required for the project proposal.",
    },
    actual_budget: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: "The final, actual cost of the project after completion.",
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'In Progress', 'Completed', 'Rejected'),
      defaultValue: 'Pending',
      comment: "The current status of the project lifecycle.",
    },
    date_proposed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: "The date when the project was initially proposed. Defaults to the current date.",
    },
    date_approved: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The date when the project was approved by the Chairperson.",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The official start date of project implementation.",
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The official end date or completion date of the project.",
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Additional notes, comments, or reasons for rejection.",
    },
    attachment_path: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Path to the project proposal attachment file.",
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true, // Enables timestamps
    updatedAt: 'last_updated',
    createdAt: false, // We use date_proposed instead of the default createdAt
  }
);

Project.belongsTo(SysUser, { as: 'proposer', foreignKey: 'proposed_by' });
Project.belongsTo(SysUser, { as: 'approver', foreignKey: 'approved_by' });


export { Project };