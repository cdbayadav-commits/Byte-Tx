# Deploying Byte-TX on Ubuntu VPS

Follow these commands line-by-line on your fresh Ubuntu VPS.

## 1. Install System Dependencies
Update system and install Node.js, NPM, and Git.

```bash
# Update System
sudo apt update && sudo apt upgrade -y

# Install Curl & Git
sudo apt install -y curl git unzip

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

## 2. Clone the Repository
Replace the URL with your GitHub link.

```bash
# Clone remote repo
git clone https://github.com/cdbayadav-commits/Byte-Tx.git

# Enter directory
cd Byte-Tx
```

## 3. Install App Dependencies

```bash
# Install backend & frontend packages
npm install
```

## 4. Setup Environment Variables
Create the secret configuration file.

```bash
nano .env
```
👉 **Paste your content inside:**
```ini
VITE_DISCORD_CLIENT_ID=your_id_here
DISCORD_CLIENT_SECRET=your_secret_here
DISCORD_REDIRECT_URI=http://YOUR_VPS_IP_OR_DOMAIN:3000/auth/discord/callback
```
*(Press `Ctrl + X`, then `Y`, then `Enter` to save)*

## 5. Build the Frontend
Compiles React into the `dist/` folder for the server to use.

```bash
npm run build
```

## 6. Run with PM2 (Production Manager)
PM2 keeps your site running 24/7, even if the server restarts.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the server
pm2 start server.js --name "byte-tx"

# Save list so it restarts on reboot
pm2 save
pm2 startup
```

---

## 🛑 Firewall Config (If needed)
If you can't access the site, open port 3000.
```bash
sudo ufw allow 3000
```

**Your site is now live at:** `http://YOUR_VPS_IP:3000`
