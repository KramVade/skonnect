import { sequelize } from "./db.js";
import { User } from "./userModel.js";
import { SysUser } from "./sysUserModel.js";
import { Announcement } from "./announcementModel.js";
import { Project } from "./projectModel.js";
import { Expenditure } from "./expenditureModel.js";
import { FinancialReport } from "./financialReportModel.js";
import { Feedback } from "./feedbackModel.js";
import { ProjectFile } from "./projectFileModel.js";

// Define relationships
// Announcements
Announcement.belongsTo(SysUser, { as: 'author', foreignKey: 'author_id' });
Announcement.belongsTo(SysUser, { as: 'approver', foreignKey: 'approved_by' });

// Projects
Project.belongsTo(SysUser, { as: 'proposer', foreignKey: 'proposed_by' });
Project.belongsTo(SysUser, { as: 'approver', foreignKey: 'approved_by' });
Project.hasMany(Expenditure, { foreignKey: 'project_id' });
Project.hasMany(FinancialReport, { foreignKey: 'project_id' });
Project.hasMany(ProjectFile, { foreignKey: 'project_id' });

// Expenditures
Expenditure.belongsTo(Project, { foreignKey: 'project_id' });
Expenditure.belongsTo(SysUser, { as: 'recorder', foreignKey: 'recorded_by' });
Expenditure.belongsTo(SysUser, { as: 'reviewer', foreignKey: 'reviewed_by' });

// Financial Reports
FinancialReport.belongsTo(Project, { foreignKey: 'project_id' });
FinancialReport.belongsTo(SysUser, { as: 'submitter', foreignKey: 'submitted_by' });
FinancialReport.belongsTo(SysUser, { as: 'approver', foreignKey: 'approved_by' });

// Feedback
Feedback.belongsTo(SysUser, { as: 'submitter', foreignKey: 'submitted_by' });

// Project Files
ProjectFile.belongsTo(Project, { foreignKey: 'project_id' });

export {
  sequelize,
  User,
  SysUser,
  Announcement,
  Project,
  Expenditure,
  FinancialReport,
  Feedback,
  ProjectFile
};
