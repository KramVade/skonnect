const express = require('express');
const session = require('express-session');
const app = express();

// session (persist logged-in user)
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set secure: true when using HTTPS
}));

// parse form bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mount auth/routes files below

module.exports = app;