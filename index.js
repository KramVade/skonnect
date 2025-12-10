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

// Load environment variables from .env file
import 'dotenv/config';
    
import express from "express";
import path from "path";
import session from "express-session";
import router from "./routes/index.js";
import fileRoutes from "./routes/file-routes.js";
import fs from 'fs';
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(session({
  secret: "xianfire-secret-key",
  resave: false,
  saveUninitialized: false
}));

app.engine("xian", async (filePath, options, callback) => {
  try {
     const originalPartialsDir = hbs.partialsDir;
    hbs.partialsDir = path.join(__dirname, 'views');

    const result = await new Promise((resolve, reject) => {
      hbs.__express(filePath, options, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });

    hbs.partialsDir = originalPartialsDir;
    callback(null, result);
  } catch (err) {
    callback(err);
  }
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "xian");

const registerPartials = async () => {
  const partialsDir = path.join(__dirname, "views/partials");
  try {
    const files = await fs.promises.readdir(partialsDir);
    for (const file of files) {
      if (file.endsWith('.xian')) {
        const partialName = file.replace('.xian', '');
        const fullPath = path.join(partialsDir, file);
        try {
          const content = await fs.promises.readFile(fullPath, 'utf8');
          hbs.registerPartial(partialName, content);
        } catch (readErr) {
          console.error(`❌ Failed to read partial: ${file}`, readErr);
        }
      }
    }
  } catch (dirErr) {
    console.error("❌ Could not read partials directory:", dirErr);
  }
};


hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

hbs.registerHelper('or', function (a, b) {
  return a || b;
});

hbs.registerHelper('formatDate', function (date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
});

hbs.registerHelper('formatCurrency', function (number) {
    if (number == null) return '0.00';
    return parseFloat(number).toFixed(2);
});

hbs.registerHelper('json', function (context) {
    return JSON.stringify(context);
});

hbs.registerHelper('getFilename', function (filePath) {
    if (!filePath) return '';
    return filePath.split('/').pop();
});

hbs.registerHelper('getFileType', function (filePath) {
    if (!filePath) return '';
    const parts = filePath.split('/');
    if (parts.length >= 2) {
        return parts[1]; // e.g., 'attachments', 'financials', etc.
    }
    return 'attachments'; // default
});

const startServer = async () => {
  await registerPartials();
  app.use("/", fileRoutes);
  app.use("/", router);

  if (!process.env.ELECTRON) {
    app.listen(PORT, () => console.log(`🔥 XianFire running at http://localhost:${PORT}`));
  }
};

// ensure body parsing is enabled (add if not present)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Place this BEFORE any auth middleware or before mounting routes that require auth
app.post('/feedback/submit', async (req, res) => {
    try {
        const { feedback_type, message, name } = req.body;
        const submitterName = (name && name.trim()) ? name.trim() : 'Anonymous';

        // persist/send/log as needed
        // const Feedback = require('./models/Feedback');
        // await new Feedback({ type: feedback_type, message, name: submitterName, createdAt: new Date() }).save();

        return res.redirect('/feedback?sent=1');
    } catch (err) {
        console.error('Feedback submit error:', err);
        return res.status(500).send('Error submitting feedback');
    }
});

startServer();

export default app;
