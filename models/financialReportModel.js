import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const FinancialReport = sequelize.define("financial_reports", {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'project_id'
    }
  },
  submitted_by: {
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
  amount_allocated: {
    type: DataTypes.DECIMAL(12, 2)
  },
  amount_spent: {
    type: DataTypes.DECIMAL(12, 2)
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2)
  },
  attachments: {
    type: DataTypes.STRING(500)
  },
  remarks: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Verified', 'Rejected'),
    defaultValue: 'Pending'
  },
  date_submitted: {
    type: DataTypes.DATE
  },
  date_approved: {
    type: DataTypes.DATE
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});
