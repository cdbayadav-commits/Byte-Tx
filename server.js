import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomBytes } from 'crypto';

dotenv.config();

const app = express();
const db = new Database('users.db');
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1467061458419318825/V9tnZRXr8Ugr-yvnD3YzN5oe9de8Vc_wen5r34VTGF_uRAWtwyFuDUSX3DFq8rVTkERp';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database (Schema Migration)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    avatar TEXT,
    email TEXT,
    coupon_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Migration: Check if coupon_code exists, if not add it
try {
  const columns = db.prepare("PRAGMA table_info(users)").all();
  const hasCouponCode = columns.some(col => col.name === 'coupon_code');
  if (!hasCouponCode) {
    console.log("Migrating Database: Adding coupon_code column...");
    db.exec("ALTER TABLE users ADD COLUMN coupon_code TEXT");
  }
} catch (error) {
  console.error("Migration Error:", error.message);
}

// Helper: Generate Coupon
const generateCoupon = () => {
    return `BYTE-${randomBytes(3).toString('hex').toUpperCase()}-TX${new Date().getFullYear()}`;
};

// Helper: Send Webhook
const sendWebhook = async (user, coupon) => {
    try {
        await axios.post(WEBHOOK_URL, {
            content: "🚨 **NEW OPERATOR DETECTED** 🚨",
            embeds: [{
                title: "New User Registration",
                color: 0x00ff00,
                fields: [
                    { name: "Username", value: user.username, inline: true },
                    { name: "Discord ID", value: user.id, inline: true },
                    { name: "Email", value: user.email || "N/A", inline: false },
                    { name: "Assigned Coupon", value: `\`${coupon}\``, inline: false }
                ],
                thumbnail: { url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` },
                timestamp: new Date()
            }]
        });
    } catch (err) {
        console.error("Webhook Failed:", err.message);
    }
};

// Discord Config
const CLIENT_ID = process.env.VITE_DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/auth/discord/callback';

// Routes

app.get('/auth/discord', (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;
  res.redirect(url);
});

app.get('/auth/discord/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).send('No code provided');

  try {
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = userResponse.data;
    
    // Check if user exists to prevent regenerating coupon
    const existingUser = db.prepare('SELECT * FROM users WHERE discord_id = ?').get(userData.id);
    
    let couponCode;
    let isNewUser = false;

    if (existingUser) {
        couponCode = existingUser.coupon_code;
        // Migration support: if old user has no coupon, give one
        if (!couponCode) {
             couponCode = generateCoupon();
             db.prepare('UPDATE users SET coupon_code = ? WHERE discord_id = ?').run(couponCode, userData.id);
        }
        
        // Update other fields
        const update = db.prepare(`
            UPDATE users SET username = ?, avatar = ?, email = ? WHERE discord_id = ?
        `);
        update.run(userData.username, userData.avatar, userData.email || null, userData.id);
        
    } else {
        isNewUser = true;
        couponCode = generateCoupon();
        const insert = db.prepare(`
          INSERT INTO users (discord_id, username, avatar, email, coupon_code)
          VALUES (?, ?, ?, ?, ?)
        `);
        insert.run(userData.id, userData.username, userData.avatar, userData.email || null, couponCode);
    }

    // Attach coupon to payload
    userData.coupon_code = couponCode;

    // Send Webhook (Fire and forget, don't await blocking response)
    if (isNewUser) sendWebhook(userData, couponCode);

    const userPayload = Buffer.from(JSON.stringify(userData)).toString('base64');
    res.redirect(`http://localhost:5173/dashboard?user=${userPayload}`);

  } catch (error) {
    console.error('Discord Auth Error:', error.response?.data || error.message);
    res.status(500).send('Authentication failed');
  }
});

app.get('/api/stats', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as count FROM users').get();
  res.json({ totalUsers: count.count });
});

// Serve React Frontend (Production)
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'dist')));

// SPA Fallback (Must be last)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
