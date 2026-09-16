import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
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

app.get('/', (req, res) => {
  res.status(200).send('RedAsh API Server is running');
});

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

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const createSmtpTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error('SMTP credentials are not fully configured in environment variables.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    tls: {
      rejectUnauthorized: false,
      checkServerIdentity: () => undefined
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000
  });
};

app.get('/api/quotation/preview', (req, res) => {
  const safeName = 'Rohit Sharma';
  const safeEmail = 'rohit.sharma@example.com';
  const safePhone = '+91 98765 43210';
  const safeCompany = 'Apex Brand Media Pvt Ltd';
  const safeRequirement = 'We are looking for a complete end-to-end production of a 60-second digital brand commercial for our upcoming product launch in Mumbai.<br/><br/>Scope includes scriptwriting, cast & crew, 2 days of shoot, and full post-production (color grading, VFX, sound design).';

  const previewHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RedAsh Quotation Email Preview</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.05);">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #1672ef 0%, #E20002 100%);"></td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; padding: 28px 20px 20px 20px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px;">
                      💼 Ad Agency Division Lead
                    </span>
                    <h1 style="margin: 6px 0 4px 0; color: #0f172a; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                      New <span style="color: #1672ef;">Quotation</span> Request
                    </h1>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">
                      Submitted via RedAsh Agency Quotation Portal
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 22px 18px;">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                Client Information
              </div>

              <!-- Item 1: Name -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      👤 Client Name
                    </div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a;">
                      ${safeName}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 2: Company -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      🏢 Company
                    </div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a;">
                      ${safeCompany}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 3: Email -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      ✉️ Email Address
                    </div>
                    <div style="font-size: 14px; font-weight: 600;">
                      <a href="mailto:${safeEmail}" style="color: #1672ef; text-decoration: none;">
                        ${safeEmail}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 4: Phone -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      📞 Phone Number
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #0f172a;">
                      <a href="tel:${safePhone}" style="color: #0f172a; text-decoration: none;">
                        ${safePhone}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 5: Requirement Box -->
              <div>
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                  📋 Project Requirement
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #1672ef; border-radius: 0 8px 8px 0; padding: 16px 18px;">
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">
                    ${safeRequirement}
                  </p>
                </div>
              </div>

              <div style="margin-top: 22px; text-align: center;">
                <a href="mailto:${safeEmail}?subject=Re:%20RedAsh%20Quotation%20Request" style="display: inline-block; background-color: #1672ef; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px; box-shadow: 0 3px 10px rgba(22, 114, 239, 0.2);">
                  ✉️ Reply to ${safeName}
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 20px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">
                This lead was generated automatically by the <strong>RedAsh</strong> website quotation system.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                You can directly reply to this email to get in touch with the client.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  res.send(previewHtmlContent);
});

app.post('/api/quotation', async (req, res) => {
  try {
    const { name, email, phone, phoneNumber, company, requirement, source, formType } = req.body || {};
    const effectivePhone = phone || phoneNumber;
    const isEntertainment = (source === 'Entertainment Division' || formType === 'Investment / Sponsorship Query');

    // Validate all required fields
    if (
      !name || !String(name).trim() ||
      !email || !String(email).trim() ||
      !effectivePhone || !String(effectivePhone).trim() ||
      !company || !String(company).trim() ||
      !requirement || !String(requirement).trim()
    ) {
      return res.status(400).json({ 
        message: 'All fields (Name, Email, Phone Number, Company, Requirement) are required.' 
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address.' 
      });
    }

    // Check SMTP configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Quotation error: Missing SMTP_HOST, SMTP_USER, or SMTP_PASSWORD in backend environment variables.');
      return res.status(500).json({ 
        message: 'Quotation email service is currently unavailable. Please contact info@redashfilms.com directly.' 
      });
    }

    // Sanitize user inputs for safe HTML email rendering
    const safeName = escapeHtml(String(name).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safePhone = escapeHtml(String(effectivePhone).trim());
    const safeCompany = escapeHtml(String(company).trim());
    const safeRequirement = escapeHtml(String(requirement).trim()).replace(/\n/g, '<br/>');

    const emailTitle = isEntertainment ? 'New Investment / Sponsorship Query' : 'New Quotation Request';
    const emailSubtitle = isEntertainment ? 'Submitted via RedAsh Entertainment Division' : 'Submitted via RedAsh Ad Agency Division';
    const badgeText = isEntertainment ? '🎬 Entertainment Division Lead' : '💼 Ad Agency Division Lead';
    const badgeBg = isEntertainment ? '#fef2f2' : '#eff6ff';
    const badgeColor = isEntertainment ? '#dc2626' : '#1d4ed8';
    const badgeBorder = isEntertainment ? '#fecaca' : '#bfdbfe';
    const accentColor = isEntertainment ? '#E20002' : '#1672ef';
    const requirementTitle = isEntertainment ? 'Investment Query / Proposal' : 'Project Requirement';

    const transporter = createSmtpTransporter();
    const recipientEmail = process.env.QUOTATION_TO_EMAIL || 'info@redashfilms.com';
    const senderDisplayName = process.env.SMTP_FROM_NAME || (isEntertainment ? 'RedAsh Films Lead' : 'Quotation Form');
    const fromSender = process.env.SMTP_FROM || `"${senderDisplayName}" <${process.env.SMTP_USER || 'quotes@redashfilms.com'}>`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailTitle}</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.05);">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, ${accentColor} 0%, #111827 100%);"></td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; padding: 28px 20px 20px 20px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px;">
                      ${badgeText}
                    </span>
                    <h1 style="margin: 6px 0 4px 0; color: #0f172a; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                      ${emailTitle}
                    </h1>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">
                      ${emailSubtitle}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 22px 18px;">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                Client Information
              </div>

              <!-- Item 1: Name -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      👤 Client Name
                    </div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a;">
                      ${safeName}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 2: Company -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      🏢 Company
                    </div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a;">
                      ${safeCompany}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 3: Email -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      ✉️ Email Address
                    </div>
                    <div style="font-size: 14px; font-weight: 600;">
                      <a href="mailto:${safeEmail}" style="color: ${accentColor}; text-decoration: none;">
                        ${safeEmail}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 4: Phone -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                <tr>
                  <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
                      📞 Phone Number
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #0f172a;">
                      <a href="tel:${safePhone}" style="color: #0f172a; text-decoration: none;">
                        ${safePhone}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Item 5: Requirement Box -->
              <div>
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                  📋 ${requirementTitle}
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid ${accentColor}; border-radius: 0 8px 8px 0; padding: 16px 18px;">
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">
                    ${safeRequirement}
                  </p>
                </div>
              </div>

              <div style="margin-top: 22px; text-align: center;">
                <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(emailTitle)}" style="display: inline-block; background-color: ${accentColor}; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                  ✉️ Reply to ${safeName}
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 20px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">
                This lead was generated automatically by the <strong>RedAsh</strong> website quotation system.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                You can directly reply to this email to get in touch with <strong>${safeName}</strong> at ${safeEmail}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const plainTextContent = `${emailTitle}\n${emailSubtitle}\n\n` +
      `Name: ${String(name).trim()}\n` +
      `Email: ${String(email).trim()}\n` +
      `Phone: ${String(effectivePhone).trim()}\n` +
      `Company: ${String(company).trim()}\n\n` +
      `${requirementTitle}\n${String(requirement).trim()}`;

    const emailSubject = isEntertainment
      ? `[RedAsh Films] New Investment Query from ${String(name).trim()} (${String(company).trim()})`
      : `[RedAsh Agency] New Quotation Request from ${String(name).trim()} (${String(company).trim()})`;

    await transporter.sendMail({
      from: fromSender,
      to: recipientEmail,
      replyTo: `${String(name).trim()} <${String(email).trim()}>`,
      subject: emailSubject,
      text: plainTextContent,
      html: htmlContent
    });

    return res.status(200).json({ 
      message: 'Thank you. Your quotation request has been sent.' 
    });
  } catch (error) {
    console.error('Quotation email error:', error);
    return res.status(500).json({ 
      message: 'Unable to send quotation request. Please try again later or contact info@redashfilms.com.' 
    });
  }
});

// POST upload file
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the URL path to access the file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Initialize admin credentials from environment variables ONLY if no admin exists in DB
async function initializeAdminCredentials() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@redash.in';
      const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

      const newAdmin = new Admin({
        email: adminEmail.toLowerCase().trim(),
        password: hashPassword(adminPassword)
      });
      await newAdmin.save();
      console.log('Admin credentials securely initialized in database.');
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

    if (admin) {
      if (verifyPassword(password, admin.password)) {
        // If legacy unhashed password, automatically upgrade to salted hash
        if (!admin.password.startsWith('scrypt:')) {
          admin.password = hashPassword(password);
          await admin.save();
        }
        clearFailedLogin(clientIp);
        const token = generateAuthToken(admin.email);
        return res.json({ success: true, token, email: admin.email, message: 'Login successful' });
      }
      
      // Admin found with this email, but password does not match DB!
      recordFailedLogin(clientIp);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Fallback ONLY if database is completely empty (first-time bootstrapping)
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@redash.in';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

      if (emailLower === defaultEmail.trim().toLowerCase() && password === defaultPassword) {
        const newAdmin = new Admin({
          email: defaultEmail.trim().toLowerCase(),
          password: hashPassword(defaultPassword)
        });
        await newAdmin.save();

        clearFailedLogin(clientIp);
        const token = generateAuthToken(newAdmin.email);
        return res.json({ success: true, token, email: newAdmin.email, message: 'Login successful' });
      }
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

    // Find admin by provided email, or find the single admin document
    let admin = null;
    if (email) {
      admin = await Admin.findOne({ email: String(email).trim().toLowerCase() });
    }
    if (!admin) {
      admin = await Admin.findOne();
    }

    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found in database' });
    }

    // Validate current password ONLY against DB stored password
    const isCurrentValid = verifyPassword(currentPassword, admin.password);

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

    // Find admin by provided email, or find the single admin document
    let admin = null;
    if (email) {
      admin = await Admin.findOne({ email: String(email).trim().toLowerCase() });
    }
    if (!admin) {
      admin = await Admin.findOne();
    }

    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found in database' });
    }

    // Validate current password ONLY against DB stored password
    const isCurrentValid = verifyPassword(currentPassword, admin.password);

    if (!isCurrentValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Check if new email already exists (for a different admin)
    const existingAdmin = await Admin.findOne({ email: newEmail.toLowerCase().trim() });
    if (existingAdmin && existingAdmin._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'Email address is already in use' });
    }

    // Update email and timestamp
    admin.email = newEmail.toLowerCase().trim();
    admin.updatedAt = new Date();
    await admin.save();

    res.json({ success: true, message: 'Email updated successfully', email: admin.email });
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ message: 'Error changing email', error: error.message });
  }
});

// DELETE uploaded file when blog/content image is removed
app.delete('/api/delete-file', authenticateAdmin, async (req, res) => {
  try {
    const { fileUrl } = req.body;
    if (!fileUrl || typeof fileUrl !== 'string') {
      return res.status(400).json({ success: false, message: 'fileUrl is required' });
    }

    // Extract relative path from URL — support /uploads/... and /uploads/blogs/...
    let relativePath = null;
    if (fileUrl.startsWith('/uploads/')) {
      relativePath = fileUrl;
    } else {
      // Handle full URL like https://api.redash.in/uploads/blogs/xyz.jpg
      const match = fileUrl.match(/\/uploads\/.+/);
      if (match) relativePath = match[0];
    }

    if (!relativePath) {
      return res.status(400).json({ success: false, message: 'Could not resolve file path from URL' });
    }

    // Only allow deleting from uploads directory (security: no path traversal)
    const filePath = path.join(__dirname, relativePath.replace(/\.\./g, ''));
    const safeUploadsDir = path.resolve(uploadDir);
    const resolvedFilePath = path.resolve(filePath);

    if (!resolvedFilePath.startsWith(safeUploadsDir)) {
      return res.status(403).json({ success: false, message: 'Access denied: file outside uploads directory' });
    }

    if (!fs.existsSync(resolvedFilePath)) {
      return res.json({ success: true, message: 'File already removed or does not exist' });
    }

    fs.unlinkSync(resolvedFilePath);
    console.log(`Deleted file: ${resolvedFilePath}`);
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ success: false, message: 'Error deleting file', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
