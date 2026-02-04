
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
    
import bcrypt from "bcrypt";
import { User, SysUser, sequelize } from "../models/index.js";

// Disable sync in production to avoid schema conflicts
// Use migration scripts instead for production deployments
if (process.env.NODE_ENV !== 'production') {
  // Temporarily disable sync to avoid schema conflicts
  // await sequelize.sync({ alter: true });
  console.log("⚠️  Database sync disabled - run migration script separately if needed");
} else {
  console.log("🚀 Production mode - database sync disabled");
}

// --- Admin Seeder ---
// This function checks for and creates a default admin user if one doesn't exist.
const createAdminAccount = async () => {
  try {
    const adminEmail = 'markdaveako@gmail.com'; // Use a secure, non-public email
    const adminPassword = 'adminpassword'; // IMPORTANT: Use a strong, unique password

    const [user, created] = await SysUser.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'Administrator',
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
        position: 'admin'
      }
    });

    if (created) console.log('Admin account created successfully.');
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
};

createAdminAccount();

export const sysRegisterPage = (req, res) => res.render("sysregister", { title: "System User Registration" });
export const loginPage = (req, res) => res.render("login", { title: "Login" });
export const registerPage = (req, res) => res.render("register", { title: "Register" });
export const forgotPasswordPage = (req, res) => res.render("forgotpassword", { title: "Forgot Password" });
export const dashboardPage = (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.render("dashboard", { title: "Dashboard" });
};

export const waitForApprovalPage = (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  if (req.session.position !== 'publicuser') return res.redirect(`/${req.session.position}/dashboard`);

  res.render("waitforapproval", { title: "Pending Approval" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await SysUser.findOne({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // If login fails, re-render the login page with an error message.
    return res.render("login", {
      title: "Login",
      error: "Invalid email or password. Please try again.",
      email: email, // Pass back the email to repopulate the field
    });
  }

  // Store user info in session
  req.session.userId = user.id;
  req.session.position = user.position;

  // Redirect based on position
  if (user.position === 'chairperson') {
    return res.redirect("/chairperson/dashboard");
  } else if (user.position === 'secretary') {
    return res.redirect("/secretary/dashboard");
  } else if (user.position === 'treasurer') {
    return res.redirect("/treasurer/dashboard");
  } else if (user.position === 'councilor') {
    return res.redirect("/councilor/dashboard");
  } else if (user.position === 'publicuser') {
    return res.redirect("/wait-for-approval");
  }
  
  // Default redirect for 'publicuser' and any other unhandled roles.
  // Also handles the case where an admin logs in.
  res.redirect("/admin/dashboard");
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  req.session.userId = user.id;
  res.redirect("/dashboard");
};

export const registerSysUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user with the same email already exists
  const existingUser = await SysUser.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).send("User with this email already exists.");
  }

  const hashed = await bcrypt.hash(password, 10);
  // The 'position' will default to 'publicuser' as defined in the model
  const user = await SysUser.create({ name, email, password: hashed });

  // Automatically log in the user and redirect them
  req.session.userId = user.id;
  req.session.position = user.position; // which is 'publicuser'
  res.redirect("/wait-for-approval");
};

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
