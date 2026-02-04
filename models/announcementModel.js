import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import { SysUser } from "./sysUserModel.js";

export const Announcement = sequelize.define("announcements", {
  announcement_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('News', 'Event', 'Notice'),
    defaultValue: 'News'
  },
  author_id: {
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
  image: {
    type: DataTypes.STRING(500)
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Pending Approval', 'Approved', 'Rejected'),
    defaultValue: 'Draft'
  },
  publish_date: {
    type: DataTypes.DATE
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
  }
}, {
  timestamps: false
});
