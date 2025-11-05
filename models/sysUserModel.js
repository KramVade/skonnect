/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    This file is part of the SKONNECT project.
*/
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const SysUser = sequelize.define("sysuser", {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  position: {
    type: DataTypes.ENUM('publicuser', 'secretary', 'treasurer', 'councilor', 'chairperson', 'admin'),
    defaultValue: 'publicuser',
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Path to the user's profile picture."
  }
});

export { sequelize };