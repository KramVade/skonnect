/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";
import { SysUser } from "./sysUserModel.js";

class Feedback extends Model {}

Feedback.init(
    {
    feedback_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Primary key for the feedback table.",
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "The subject or title of the feedback.",
      
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "The detailed content of the feedback.",
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Category of the feedback (e.g., Suggestion, Complaint, Inquiry).",
    },
    submitted_by: {
      type: DataTypes.INTEGER,
      allowNull: true, // Changed to true to allow anonymous feedback
      // references: {
      //   model: SysUser,
      //   key: "id",
      // },
      // onDelete: "SET NULL",
      // onUpdate: "CASCADE",
      comment: "Foreign key referencing the user ID (from sysusers) who submitted the feedback.",
    },
    submitted_by_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Name of the person who submitted feedback, if not a registered user.",
    },
    status: {
      type: DataTypes.ENUM('New', 'In Progress', 'Resolved', 'Archived'),
      defaultValue: 'New',
      comment: "The current status of the feedback.",
    }
  },
  {
    sequelize,
    modelName: "Feedback",
    tableName: "feedback",
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

Feedback.belongsTo(SysUser, { as: 'submitter', foreignKey: 'submitted_by' });

export { Feedback };