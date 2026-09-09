import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import Content from './models/Content.js';
import Admin from './models/Admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// -------------------------------------------------------------
// Security Utilities: Salted Password Hashing & Timing-Safe Verification
// -------------------------------------------------------------
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.SESSION_SECRET || 'redash-secure-token-salt-key-2026';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword || !password) return false;
  if (storedPassword.startsWith('scrypt:')) {
    const parts = storedPassword.split(':');
    if (parts.length !== 3) return false;
    const [, salt, originalHash] = parts;
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    const hashBuf = Buffer.from(hash, 'hex');
    const origBuf = Buffer.from(originalHash, 'hex');
    if (hashBuf.length !== origBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, origBuf);
  }
  // Plaintext backward compatibility fallback
  return password === storedPassword;
}

// -------------------------------------------------------------
// Security: Brute-Force Rate Limiting (5 failed attempts = 15 min lock)
// -------------------------------------------------------------
const loginRateLimitMap = new Map();

function checkLoginRateLimit(ip) {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);
  if (!record) return { allowed: true };

  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
    return { allowed: false, remainingMinutes };
  }

  // Reset window after 15 minutes
  if (now - record.firstAttempt > 15 * 60 * 1000) {
    loginRateLimitMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedLogin(ip) {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip) || { count: 0, firstAttempt: now };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000;
  }
  loginRateLimitMap.set(ip, record);
}

function clearFailedLogin(ip) {
  loginRateLimitMap.delete(ip);
}

// -------------------------------------------------------------
// Security: Cryptographically Signed Session Token
// -------------------------------------------------------------
function generateAuthToken(email) {
  const payload = Buffer.from(JSON.stringify({
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payload)
    .digest('base64url');
    
  return `${payload}.${signature}`;
}

function verifyAuthToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payload)
    .digest('base64url');
    
  if (signature !== expectedSig) return null;
  
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.exp && Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

// Admin Authentication Middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Admin authentication token required' });
  }
  const token = authHeader.split(' ')[1];
  const verified = verifyAuthToken(token);
  if (!verified) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired session token' });
  }
  req.admin = verified;
  next();
}

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
        password: hashPassword(adminPassword)
      });
      await newAdmin.save();
      console.log('Admin credentials securely initialized from environment variables');
    }
  } catch (error) {
    console.error('Error initializing admin credentials:', error);
  }
}

// Initialize admin credentials when server starts
initializeAdminCredentials();

// Validate Admin Login with Brute-Force Rate Limiting & Secure Token
app.post('/api/admin/login', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';

    // 1. Check rate limit
    const rateCheck = checkLoginRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: `Too many failed login attempts. For security, access is locked for ${rateCheck.remainingMinutes} more minute(s).`
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const emailLower = String(email).trim().toLowerCase();

    // 2. Lookup Admin in DB
    const admin = await Admin.findOne({ email: emailLower });

    if (admin && verifyPassword(password, admin.password)) {
      // If legacy unhashed password, automatically upgrade to salted hash
      if (!admin.password.startsWith('scrypt:')) {
        admin.password = hashPassword(password);
        await admin.save();
      }
      clearFailedLogin(clientIp);
      const token = generateAuthToken(admin.email);
      return res.json({ success: true, token, email: admin.email, message: 'Login successful' });
    }

    // Fall back to environment variables for backward compatibility
    const defaultEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    if (defaultEmail && defaultPassword && emailLower === defaultEmail.trim().toLowerCase() && password === defaultPassword) {
      clearFailedLogin(clientIp);
      const token = generateAuthToken(defaultEmail.trim().toLowerCase());
      return res.json({ success: true, token, email: defaultEmail.trim().toLowerCase(), message: 'Login successful' });
    }

    // Record failed attempt
    recordFailedLogin(clientIp);
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Error during login' });
  }
});

// Change Admin Password Endpoint
app.post('/api/admin/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    const defaultEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    // Find admin by provided email, configured default email, or existing admin document
    let admin = null;
    if (email) {
      admin = await Admin.findOne({ email: String(email).trim().toLowerCase() });
    }
    if (!admin && defaultEmail) {
      admin = await Admin.findOne({ email: String(defaultEmail).trim().toLowerCase() });
    }
    if (!admin) {
      admin = await Admin.findOne();
    }

    if (!admin) {
      if (!defaultEmail) {
        return res.status(500).json({ message: 'Admin email not configured' });
      }
      admin = new Admin({
        email: String(defaultEmail).trim().toLowerCase(),
        password: hashPassword(defaultPassword || currentPassword)
      });
      await admin.save();
    }

    // Validate current password against DB password or default password
    const isCurrentValid = verifyPassword(currentPassword, admin.password) ||
      (defaultPassword && currentPassword === defaultPassword);

    if (!isCurrentValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password with secure salted hash
    admin.password = hashPassword(newPassword);
    admin.updatedAt = new Date();
    await admin.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
});

// Change Admin Email Endpoint
app.post('/api/admin/change-email', async (req, res) => {
  try {
    const { email, currentPassword, newEmail } = req.body;

    if (!currentPassword || !newEmail) {
      return res.status(400).json({ message: 'Current password and new email are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const defaultEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    // Find admin by provided email, configured default email, or existing admin document
    let admin = null;
    if (email) {
      admin = await Admin.findOne({ email: String(email).trim().toLowerCase() });
    }
    if (!admin && defaultEmail) {
      admin = await Admin.findOne({ email: String(defaultEmail).trim().toLowerCase() });
    }
    if (!admin) {
      admin = await Admin.findOne();
    }

    if (!admin) {
      if (!defaultEmail) {
        return res.status(500).json({ message: 'Admin email not configured' });
      }
      admin = new Admin({
        email: String(defaultEmail).trim().toLowerCase(),
        password: hashPassword(defaultPassword || currentPassword)
      });
      await admin.save();
    }

    // Validate current password against DB password or default password
    const isCurrentValid = verifyPassword(currentPassword, admin.password) ||
      (defaultPassword && currentPassword === defaultPassword);

    if (!isCurrentValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Check if new email already exists (for a different admin)
    const existingAdmin = await Admin.findOne({ email: newEmail.toLowerCase() });
    if (existingAdmin && existingAdmin._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'Email address is already in use' });
    }

    // Update email and timestamp
    admin.email = newEmail.toLowerCase();
    admin.updatedAt = new Date();
    await admin.save();

    res.json({ success: true, message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ message: 'Error changing email', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
