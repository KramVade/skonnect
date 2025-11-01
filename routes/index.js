
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
import { index as page1Index } from "../controllers/page1.js";
const router = express.Router();

router.get("/", homePage);
import { loginPage, registerPage, forgotPasswordPage, dashboardPage, loginUser, registerUser, logoutUser, sysRegisterPage, registerSysUser } from "../controllers/authController.js";

// Public Portal Route
router.get("/portal", publicController.dashboardPage);
// Admin Routes
router.get("/admin/dashboard", adminController.dashboardPage);

router.get("/admin/user-management", adminController.userManagementPage);
router.get("/admin/user-management/update/:id", adminController.updateUserPage);
router.post("/admin/user-management/update/:id", adminController.updateUserRole);
router.post("/admin/user-management/delete/:id", adminController.deleteUser);

// Chairperson Routes
router.get("/chairperson/dashboard", chairpersonController.dashboardPage);

// Secretary Routes
router.get("/secretary/dashboard", secretaryController.dashboardPage);

// Treasurer Routes
router.get("/treasurer/dashboard", treasurerController.dashboardPage);

// Councilor Routes
router.get("/councilor/dashboard", councilorController.dashboardPage);

router.get("/login", loginPage);
router.post("/login", loginUser);

router.get("/sysregister", sysRegisterPage);
router.post("/sysregister", registerSysUser);

router.get("/register", registerPage);
router.post("/register", registerUser);
router.get("/forgot-password", forgotPasswordPage);
router.get("/dashboard", dashboardPage);
router.get("/logout", logoutUser);

router.get("/selection", (req, res) => {
  res.render("selection");
});

//adding akinkalang
router.get("/akinkalang", akinkalangIndex);


//my added routes
router.get("/home.xian", (req, res) => {
  res.render("home"); 
});

router.get("/page1.xian", page1Index);
router.get("/page2.xian", (req, res) => {
  res.render("page2");
});
router.get("/page3.xian", (req, res) => {
  res.render("page3");
}); 
router.get("/page4.xian", (req, res) => {
  res.render("page1");
});
router.get("/page5.xian", (req, res) => {
  res.render("page2");
});
router.get("/page6.xian", (req, res) => {
  res.render("page3");
}); 
router.get("/page7.xian", (req, res) => {
  res.render("page1");
});
router.get("/page8.xian", (req, res) => {
  res.render("page2");
});
router.get("/page9.xian", (req, res) => {
  res.render("page3");
}); 
router.get("/page10.xian", (req, res) => {
  res.render("page3");
}); 


export default router;
