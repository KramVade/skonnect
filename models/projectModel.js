import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Project = sequelize.define("projects", {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100)
  },
  proposed_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sysusers',
      key: 'id'
    }
  },
  approved_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sysusers',
      key: 'id'
    }
  },
  budget_estimate: {
    type: DataTypes.DECIMAL(12, 2)
  },
  actual_budget: {
    type: DataTypes.DECIMAL(12, 2)
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'In Progress', 'Completed', 'Rejected'),
    defaultValue: 'Pending'
  },
  date_proposed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  date_approved: {
    type: DataTypes.DATE
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  remarks: {
    type: DataTypes.TEXT
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  attachment_path: {
    type: DataTypes.STRING(255)
  }
}, {
  timestamps: false
});
