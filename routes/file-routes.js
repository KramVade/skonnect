import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIME types for common file formats
const mimeTypes = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.txt': 'text/plain',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// Files that should be displayed inline in browser
const inlineTypes = ['.pdf', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.svg'];

/**
 * Route to serve files with proper headers for inline display
 * GET /file/:type/:filename
 * - type: attachments, financials, announcements, receipts
 * - filename: the actual filename
 */
router.get('/file/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  
  // Validate file type directory
  const allowedTypes = ['attachments', 'financials', 'announcements', 'receipts'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }
  
  // Construct file path
  const filePath = path.join(process.cwd(), 'public', 'uploads', type, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Get file extension and determine MIME type
  const ext = path.extname(filename).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  
  // Set appropriate headers
  res.setHeader('Content-Type', mimeType);
  
  // Determine if file should be displayed inline or as attachment
  if (inlineTypes.includes(ext)) {
    // Display inline in browser
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  } else {
    // Force download for other file types
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  }
  
  // Send the file
  res.sendFile(filePath);
});

/**
 * Route to force download of any file
 * GET /download/:type/:filename
 */
router.get('/download/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  
  // Validate file type directory
  const allowedTypes = ['attachments', 'financials', 'announcements', 'receipts'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }
  
  // Construct file path
  const filePath = path.join(process.cwd(), 'public', 'uploads', type, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Force download
  res.download(filePath, filename);
});

export default router;