import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.set('trust proxy', true);
const __dirname = dirname(fileURLToPath(import.meta.url));

// In Vercel, the DB file needs to be handled carefully. 
// For now, we use a path that might work for reading, but writing will be lost.
const dbPath = join(process.cwd(), 'users.db');
const db = new Database(dbPath);

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1467061458419318825/V9tnZRXr8Ugr-yvnD3YzN5oe9de8Vc_wen5r34VTGF_uRAWtwyFuDUSX3DFq8rVTkERp';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database
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

// Migration: Check if coupon_code exists
try {
  const columns = db.prepare("PRAGMA table_info(users)").all();
  const hasCouponCode = columns.some(col => col.name === 'coupon_code');
  if (!hasCouponCode) {
    db.exec("ALTER TABLE users ADD COLUMN coupon_code TEXT");
  }
} catch (error) {
  console.error("Migration Error:", error.message);
}

const generateCoupon = () => `BYTE-${randomBytes(3).toString('hex').toUpperCase()}-TX${new Date().getFullYear()}`;

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

const CLIENT_ID = process.env.VITE_DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

app.get('/auth/discord', (req, res) => {
  const redirectUri = `${req.protocol}://${req.get('host')}/auth/discord/callback`;
  
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email`;
  res.redirect(url);
});

app.get('/auth/discord/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('No code provided');

  const redirectUri = `${req.protocol}://${req.get('host')}/auth/discord/callback`;

  try {
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = userResponse.data;
    let existingUser = null;
    try {
        existingUser = db.prepare('SELECT * FROM users WHERE discord_id = ?').get(userData.id);
    } catch (e) {
        console.error("DB Read Error:", e.message);
    }
    
    let couponCode;
    let isNewUser = false;

    if (existingUser) {
        couponCode = existingUser.coupon_code || generateCoupon();
        try {
            if (!existingUser.coupon_code) {
                 db.prepare('UPDATE users SET coupon_code = ? WHERE discord_id = ?').run(couponCode, userData.id);
            }
            db.prepare('UPDATE users SET username = ?, avatar = ?, email = ? WHERE discord_id = ?')
              .run(userData.username, userData.avatar, userData.email || null, userData.id);
        } catch (e) {
            console.error("DB Update Error (Read-only?):", e.message);
        }
    } else {
        isNewUser = true;
        couponCode = generateCoupon();
        try {
            db.prepare('INSERT INTO users (discord_id, username, avatar, email, coupon_code) VALUES (?, ?, ?, ?, ?)')
              .run(userData.id, userData.username, userData.avatar, userData.email || null, couponCode);
        } catch (e) {
            console.warn("DB Insert Failed (Read-only?):", e.message);
        }
    }

    userData.coupon_code = couponCode;
    if (isNewUser) {
        // We still send the webhook so you get notified of the login attempt
        sendWebhook(userData, couponCode);
    }

    const userPayload = Buffer.from(JSON.stringify(userData)).toString('base64');
    res.redirect(`/dashboard?user=${userPayload}`);

  } catch (error) {
    const errorData = error.response?.data;
    console.error('Discord Auth Error:', errorData || error.message);
    res.status(500).json({
        error: 'Authentication failed',
        details: errorData || error.message,
        hint: 'Check if your Discord Redirect URI exactly matches https://bytetx.in/auth/discord/callback'
    });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const count = db.prepare('SELECT COUNT(*) as count FROM users').get();
    res.json({ totalUsers: count.count });
  } catch (e) {
    res.json({ totalUsers: 0, error: e.message });
  }
});

export default app;
