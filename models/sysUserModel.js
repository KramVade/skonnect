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
    unique: true
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  position: {
    type: DataTypes.ENUM('publicuser', 'secretary', 'treasurer', 'councilor', 'chairperson', 'admin'),
    defaultValue: 'publicuser',
    allowNull: false
  }
});

export { sequelize };