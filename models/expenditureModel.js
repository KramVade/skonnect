import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Expenditure = sequelize.define("expenditures", {
  expenditure_id: {
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
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100)
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  date_incurred: {
    type: DataTypes.DATE
  },
  receipt_path: {
    type: DataTypes.STRING(500)
  },
  recorded_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sysusers',
      key: 'id'
    }
  },
  remarks: {
    type: DataTypes.TEXT
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    defaultValue: 'Pending'
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sysusers',
      key: 'id'
    }
  },
  date_reviewed: {
    type: DataTypes.DATE
  }
}, {
  timestamps: false
});
