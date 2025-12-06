
  /*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    
import express from "express";
import { homePage } from "../controllers/homeController.js";
import { index as akinkalangIndex } from "../controllers/akinkalang.js";
import * as adminController from "../controllers/adminController.js";
import * as secretaryController from "../controllers/secretaryController.js";
import * as treasurerController from "../controllers/treasurerController.js";
import * as chairpersonController from "../controllers/chairpersonController.js";
import * as publicController from "../controllers/publicController.js";
import * as councilorController from "../controllers/councilorController.js";
import * as projectController from "../controllers/projectController.js";
import * as announcementController from "../controllers/announcementController.js";
import * as feedbackController from "../controllers/feedbackController.js";
const router = express.Router();

router.get("/", homePage);
import { loginPage, registerPage, forgotPasswordPage, dashboardPage, loginUser, registerUser, logoutUser, sysRegisterPage, registerSysUser, waitForApprovalPage } from "../controllers/authController.js";

// Public Portal Route
router.get("/portal", publicController.dashboardPage);
router.get("/about-us", publicController.aboutUsPage);
// Admin Routes
router.get("/admin/dashboard", adminController.dashboardPage);

router.get("/admin/user-management", adminController.userManagementPage);
router.get("/admin/user-management/update/:id", adminController.updateUserPage);
router.post("/admin/user-management/update/:id", adminController.updateUserRole);
router.post("/admin/user-management/delete/:id", adminController.deleteUser);

router.get("/admin/financial-reports", adminController.financialReportsPage);
router.post("/admin/financial-reports/approve/:id", adminController.approveFinancialReport);
router.post("/admin/financial-reports/reject/:id", adminController.rejectFinancialReport);

router.get("/admin/content-management", adminController.contentManagementPage);

router.get("/admin/feedback", adminController.feedbackCenterPage);


// Chairperson Routes
router.get("/chairperson/dashboard", chairpersonController.dashboardPage);
router.get("/chairperson/projects", chairpersonController.projectApprovalPage);
router.get("/chairperson/financial-reports", chairpersonController.financialReportsPage);
router.post("/financial-report/:id/approve", chairpersonController.approveFinancialReport);
router.post("/financial-report/:id/reject", chairpersonController.rejectFinancialReport);
router.get("/chairperson/announcements", announcementController.announcementApprovalPage);
router.post("/announcement/:id/approve", announcementController.approveAnnouncement);
router.post("/announcement/:id/reject", announcementController.rejectAnnouncement);
router.get("/chairperson/expenditure-review", chairpersonController.expenditureReviewPage);
router.post("/expenditure/:id/approve", chairpersonController.approveExpenditure);
router.post("/expenditure/:id/reject", chairpersonController.rejectExpenditure);

// Secretary Routes
router.get("/secretary/dashboard", secretaryController.dashboardPage);
router.get("/secretary/feedback", feedbackController.viewSecretaryFeedbackPage);

// Treasurer Routes
router.get("/treasurer/dashboard", treasurerController.dashboardPage);
router.get("/treasurer/financial-reports", treasurerController.financialReportsPage);
router.get("/treasurer/financial-reports/view/:id", treasurerController.viewFinancialReportPage);
router.get("/treasurer/financial-reports/create", treasurerController.createFinancialReportPage);
router.post("/treasurer/financial-reports/create", treasurerController.createFinancialReport);
router.get("/treasurer/expenditure-tracking", treasurerController.expenditureTrackingPage);
router.get("/treasurer/expenditure-tracking/add", treasurerController.addExpenditurePage);
router.post("/treasurer/expenditure-tracking/add", treasurerController.addExpenditure);
router.post("/treasurer/expenditure-tracking/delete/:id", treasurerController.deleteExpenditure);

// Councilor Routes
router.get("/councilor/dashboard", councilorController.dashboardPage);

// Project Routes (for Secretary and Councilor)
router.get("/project/create", projectController.createProjectPage);
router.post("/project/create", projectController.createProject);
router.get("/projects", projectController.listProjectsPage);
router.post("/project/:id/approve", projectController.approveProject);
router.post("/project/:id/reject", projectController.rejectProject);

// Admin-only project routes
router.get("/project/edit/:id", projectController.editProjectPage);
router.post("/project/update/:id", projectController.updateProject);
router.post("/project/delete/:id", projectController.deleteProject);
router.get("/project/:id", projectController.viewProjectPage);

// Announcement Routes (for Secretary and Councilor)
router.get("/announcement/create", announcementController.createAnnouncementPage);
router.get("/announcements", announcementController.listAnnouncementsPage);
router.post("/announcement/create", announcementController.createAnnouncement);
router.get("/announcement/:id", announcementController.editAnnouncementPage);
router.post("/announcement/update/:id", announcementController.updateAnnouncement);
router.post("/announcement/delete/:id", announcementController.deleteAnnouncement);

// Public project routes
router.get("/projects/approved", projectController.listApprovedProjectsPage);
router.get("/announcements/public", publicController.publicAnnouncementsPage);

// Public financial reports route
router.get("/financial-reports/public", treasurerController.publicFinancialReportsPage);

// Feedback Routes
// Redirect /feedback to the creation page for public users.
// Officials can access the view page via a different, protected route if needed.
router.get("/feedback", (req, res) => res.redirect('/feedback/create'));
router.get("/feedback/view", feedbackController.viewFeedbackPage); // Keep a protected route for officials
router.get("/feedback/create", feedbackController.createFeedbackPage);
router.post("/feedback/create", feedbackController.submitFeedback);
router.post("/feedback/:id/mark-progress", feedbackController.markFeedbackInProgress);
router.post("/feedback/:id/resolve", feedbackController.resolveFeedback);

router.get("/login", loginPage);
router.post("/login", loginUser);

router.get("/sysregister", sysRegisterPage);
router.post("/sysregister", registerSysUser);

router.get("/register", registerPage);
router.post("/register", registerUser);
router.get("/forgot-password", forgotPasswordPage);
router.get("/dashboard", dashboardPage);
router.get("/logout", logoutUser);

// Route for the "wait for approval" page
router.get("/wait-for-approval", waitForApprovalPage);

router.get("/selection", (req, res) => {
  res.render("selection");
});

//adding akinkalang
router.get("/akinkalang", akinkalangIndex);


//my added routes
router.get("/home.xian", (req, res) => {
  res.render("home"); 
});

export default router;
