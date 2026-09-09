import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import Content from './models/Content.js';
import Admin from './models/Admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploads statically
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '-'))
  }
});
const upload = multer({ storage: storage });

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/redash';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

let cachedContentMap = null;

// Helper to fetch and cache content
async function refreshCache() {
  try {
    const contents = await Content.find();
    const contentMap = {};
    contents.forEach(item => {
      contentMap[item.key] = item.data;
    });
    cachedContentMap = contentMap;
  } catch (error) {
    console.error('Error fetching cache:', error);
  }
}

// GET all content
app.get('/api/content', async (req, res) => {
  try {
    if (!cachedContentMap) {
      await refreshCache();
    }
    res.json(cachedContentMap);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

// PUT update specific content section
app.put('/api/content/:key', async (req, res) => {
  const { key } = req.params;
  const { data } = req.body;
  
  try {
    const updatedContent = await Content.findOneAndUpdate(
      { key },
      { data },
      { new: true, upsert: true } // upsert creates it if it doesn't exist
    );
    
    // Update cache
    if (cachedContentMap) {
      cachedContentMap[key] = data;
    } else {
      await refreshCache();
    }
    
    res.json({ message: 'Content updated successfully', content: updatedContent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error: error.message });
  }
});

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

app.post('/api/quotation', async (req, res) => {
  const { name, email, phone, company, requirement } = req.body || {};
  const fields = { name, email, phone, company, requirement };

  if (Object.values(fields).some(value => !String(value || '').trim())) {
    return res.status(400).json({ message: 'All quotation fields are required.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.QUOTATION_TO_EMAIL || !process.env.RESEND_FROM_EMAIL) {
    return res.status(503).json({ message: 'Quotation email service is not configured.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeFields = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)]));
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.QUOTATION_TO_EMAIL],
      replyTo: email,
      subject: `New quotation request from ${safeFields.name}`,
      html: `
        <h2>New quotation request</h2>
        <p><strong>Name:</strong> ${safeFields.name}</p>
        <p><strong>Email:</strong> ${safeFields.email}</p>
        <p><strong>Phone:</strong> ${safeFields.phone}</p>
        <p><strong>Company:</strong> ${safeFields.company}</p>
        <p><strong>Requirement:</strong> ${safeFields.requirement}</p>
      `
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return res.status(502).json({ message: 'Unable to send quotation request.' });
    }

    return res.json({ message: 'Quotation request sent successfully.' });
  } catch (error) {
    console.error('Quotation email error:', error);
    return res.status(500).json({ message: 'Unable to send quotation request.' });
  }
});

// POST upload file
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the URL path to access the file
    const fileUrl = `https://redash-final-design.onrender.com/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Initialize admin credentials from environment variables if not already in DB
async function initializeAdminCredentials() {
  try {
    const adminEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const adminPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('Admin credentials not configured in environment variables');
      return;
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      const newAdmin = new Admin({
        email: adminEmail.toLowerCase(),
        password: adminPassword
      });
      await newAdmin.save();
      console.log('Admin credentials initialized from environment variables');
    }
  } catch (error) {
    console.error('Error initializing admin credentials:', error);
  }
}

// Initialize admin credentials when server starts
initializeAdminCredentials();

// Validate Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailLower = String(email).trim().toLowerCase();

    // First try database credentials
    const admin = await Admin.findOne({ email: emailLower });

    if (admin && admin.password === password) {
      return res.json({ success: true, message: 'Login successful' });
    }

    // Fall back to environment variables for backward compatibility
    const defaultEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    if (defaultEmail && defaultPassword && emailLower === defaultEmail.trim().toLowerCase() && password === defaultPassword) {
      return res.json({ success: true, message: 'Login successful' });
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Change Admin Password Endpoint
app.post('/api/admin/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    // Get default email and password from environment
    const defaultEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    if (!defaultEmail) {
      return res.status(500).json({ message: 'Admin email not configured' });
    }

    const adminEmailLower = String(defaultEmail).trim().toLowerCase();

    // Try to find the admin in the database
    let admin = await Admin.findOne({ email: adminEmailLower });

    if (!admin) {
      // If not in DB, create with default credentials first
      admin = new Admin({
        email: adminEmailLower,
        password: defaultPassword
      });
      await admin.save();
    }

    // Validate current password - check both DB password and environment password
    if (currentPassword !== admin.password && currentPassword !== defaultPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password and timestamp
    admin.password = newPassword;
    admin.updatedAt = new Date();
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
});

// Change Admin Email Endpoint
app.post('/api/admin/change-email', async (req, res) => {
  try {
    const { currentPassword, newEmail } = req.body;

    if (!currentPassword || !newEmail) {
      return res.status(400).json({ message: 'Current password and new email are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Get the current admin email from environment or database
    const defaultEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    if (!defaultEmail) {
      return res.status(500).json({ message: 'Admin email not configured' });
    }

    const adminEmailLower = String(defaultEmail).trim().toLowerCase();

    // Try to find the admin in the database
    let admin = await Admin.findOne({ email: adminEmailLower });

    if (!admin) {
      // If not in DB, create with default credentials first
      admin = new Admin({
        email: adminEmailLower,
        password: defaultPassword
      });
      await admin.save();
    }

    // Validate current password - check both DB password and environment password
    if (currentPassword !== admin.password && currentPassword !== defaultPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Check if new email already exists (but not the current one)
    const existingAdmin = await Admin.findOne({ email: newEmail.toLowerCase() });
    if (existingAdmin && existingAdmin._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'Email address is already in use' });
    }

    // Update email and timestamp
    admin.email = newEmail.toLowerCase();
    admin.updatedAt = new Date();
    await admin.save();

    res.json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ message: 'Error changing email', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
