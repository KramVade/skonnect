import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const ProjectFile = sequelize.define("project_files", {
  file_id: {
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
    },
    onDelete: 'CASCADE'
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  uploaded_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});
