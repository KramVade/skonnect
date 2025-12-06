import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Feedback = sequelize.define("feedback", {
  feedback_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100)
  },
  submitted_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sysusers',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('New', 'In Progress', 'Resolved', 'Archived'),
    defaultValue: 'New'
  },
  submitted_by_name: {
    type: DataTypes.STRING(255)
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});
