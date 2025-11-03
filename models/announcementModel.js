/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/

import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";
import { SysUser } from "./sysUserModel.js";

class Announcement extends Model {}

Announcement.init(
  {
    announcement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Primary key for the announcements table.",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "The title of the announcement.",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "The full content of the announcement.",
    },
    category: {
      type: DataTypes.ENUM('News', 'Event', 'Notice'),
      defaultValue: 'News',
      comment: "The category of the announcement.",
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SysUser,
        key: 'id',
      },
      comment: "Foreign key referencing the user (Secretary/Councilor) who created the announcement.",
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SysUser,
        key: 'id',
      },
      comment: "Foreign key referencing the user (Chairperson) who approved the announcement.",
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "Path to an optional image for the announcement.",
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Pending Approval', 'Approved', 'Rejected'),
      defaultValue: 'Draft',
      comment: "The current status of the announcement.",
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The date when the announcement should become public.",
    },
  },
  {
    sequelize,
    modelName: "Announcement",
    tableName: "announcements",
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: 'last_updated',
  }
);

Announcement.belongsTo(SysUser, { as: 'author', foreignKey: 'author_id' });
Announcement.belongsTo(SysUser, { as: 'approver', foreignKey: 'approved_by' });

export { Announcement };