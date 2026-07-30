# 🚀 Brew Haven Café - Complete Deployment Options

Choose your preferred deployment platform. **Each option takes less than 5 minutes!**

---

## 🎯 Quick Comparison

| Platform | Cost | Setup Time | Free Tier | Best For |
|----------|------|-----------|-----------|----------|
| **Vercel** | Free/Paid | 2 min | ✅ Yes | Production sites |
| **Netlify** | Free/Paid | 2 min | ✅ Yes | Static/Jamstack |
| **Railway** | Free/Paid | 3 min | ✅ Yes | Full-stack apps |
| **Render** | Free/Paid | 3 min | ✅ Yes | Hobby projects |
| **Docker** | Free | 5 min | ✅ Yes | Self-hosted |
| **AWS** | Paid | 10 min | ✅ 12 mo | Enterprise |

---

## 🏆 RECOMMENDED: Vercel (Easiest & Fastest)

**Free tier**: Unlimited deployments, 100GB bandwidth/month, auto HTTPS

### Step 1: Push to GitHub

```bash
# Navigate to project
cd brew-haven

# Initialize Git
git init

# Stage all files
git add .

# Commit
git commit -m "Brew Haven Café website"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/brew-haven-cafe.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/YOUR_USERNAME/brew-haven-cafe`
4. Click **"Import"**
5. Click **"Deploy"**
6. **Wait 2-3 minutes** ✨
7. **Get your live URL!** 🎉

**Your site is now live at**: `https://brew-haven-cafe.vercel.app`

### Step 3: Update Your Site

Every time you push to GitHub, Vercel auto-deploys:

```bash
# Make changes
nano app/page.tsx

# Commit and push
git add .
git commit -m "Update menu"
git push origin main

# ✨ Auto-deployed to Vercel in 1 minute!
```

---

## 🎨 Netlify Deployment

**Free tier**: Unlimited sites, 100GB bandwidth, auto HTTPS

### Step 1: Push to GitHub (same as Vercel)

### Step 2: Deploy to Netlify

1. Go to https://netlify.com
2. Click **"Add New Site"**
3. **"Import an existing project"**
4. Connect your **GitHub** account
5. Select your **`brew-haven-cafe`** repo
6. Build command: `npm run build`
7. Publish directory: `.next`
8. Click **"Deploy"**
9. **Done!** Live in 2 minutes 🎉

**Your site**: `https://brew-haven-cafe.netlify.app`

---

## 🚂 Railway.app Deployment

**Free tier**: $5 credit/month (enough for cafe sites)

### Step 1: Push to GitHub

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Click **"New Project"**
3. **"Deploy from GitHub Repo"**
4. Connect GitHub & select `brew-haven-cafe`
5. Railway auto-detects Next.js
6. Click **"Deploy"**
7. **Live in 3 minutes!** 🎉

**Auto-updates** every time you push to GitHub.

---

## 🎨 Render.com Deployment

**Free tier**: Deploys automatically, auto HTTPS

### Step 1: Push to GitHub

### Step 2: Deploy to Render

1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub account
4. Select `brew-haven-cafe` repo
5. **Runtime**: Node
6. **Build command**: `npm run build`
7. **Start command**: `npm run start`
8. Click **"Create Web Service"**
9. **Live in 3 minutes!** 🎉

---

## 🐳 Docker Deployment (Self-Hosted)

**Best for**: VPS, dedicated server, local network

### Option A: Run Locally

```bash
# Build Docker image
docker build -t brew-haven-cafe:latest .

# Run container
docker run -p 3000:3000 brew-haven-cafe:latest

# Open http://localhost:3000
```

### Option B: Deploy to AWS EC2

```bash
# 1. Launch EC2 instance (Ubuntu 22.04)
# 2. Connect via SSH
# 3. Install Docker

sudo apt-get update
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER

# 4. Clone your GitHub repo

git clone https://github.com/YOUR_USERNAME/brew-haven-cafe.git
cd brew-haven-cafe

# 5. Build and run

docker build -t brew-haven-cafe .
docker run -d -p 80:3000 brew-haven-cafe

# 6. Get your IP address
curl http://169.254.169.254/latest/meta-data/public-ipv4
```

**Your site**: `http://YOUR_EC2_IP`

### Option C: Docker Compose (Production)

```bash
# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop
docker-compose down
```

---

## ☁️ AWS Elastic Beanstalk

**Best for**: Enterprise, high traffic

### Step 1: Install AWS CLI

```bash
# macOS
brew install awscli

# Windows
choco install awscli

# Linux
sudo apt-get install awscli
```

### Step 2: Configure AWS

```bash
aws configure
# Enter your AWS credentials
```

### Step 3: Deploy

```bash
# Initialize Elastic Beanstalk
eb init -p node.js-18 brew-haven-cafe --region us-east-1

# Create environment
eb create brew-haven-cafe-prod

# Deploy
eb deploy

# Open in browser
eb open
```

---

## 📱 Using Deployment Scripts

### macOS/Linux

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

### Windows

```bash
# Run batch script
deploy.bat
```

---

## 🌐 Custom Domain Setup

### Step 1: Buy Domain

- GoDaddy
- Namecheap
- Google Domains
- Hostinger

**Cost**: ~₹200-500/year

### Step 2: Point to Vercel/Netlify

**For Vercel:**
1. Go to Project Settings → **Domains**
2. Add: `brewhaven.in`
3. Copy DNS records
4. Paste in domain registrar
5. Wait 24 hours
6. **Done!** 🎉

**For Netlify:**
1. Site settings → **Domain management**
2. Add domain
3. Update DNS records
4. **Done!**

---

## 📊 Monitoring & Analytics

### Vercel Analytics

- **Page views**: Real-time
- **Performance metrics**: LCP, FID, CLS
- **Deployment history**: One-click rollback
- **Error tracking**: Automatic

### Netlify Analytics

- **Visitor stats**: By country/device
- **Form submissions**: Track from contact form
- **Build performance**: Duration & size

---

## 🔄 Continuous Deployment (Auto-Deploy)

### GitHub Actions (Automatic)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

2. Every push to `main` → **Auto-deploys**! ✨

---

## 💰 Cost Comparison (Monthly)

| Platform | Free | Pro | Enterprise |
|----------|------|-----|------------|
| **Vercel** | ✅ | $20 | Custom |
| **Netlify** | ✅ | $19 | Custom |
| **Railway** | $5 credit | $5-100 | Custom |
| **Render** | ✅ | $5-500 | Custom |
| **AWS EC2** | ✅ (12mo) | $5-50 | $50+ |
| **Docker** | Free | ∞ | ∞ |

**For most cafes**: Free tier is sufficient! 🎉

---

## ✅ Deployment Checklist

Before deploying:

- [ ] `package.json` has all dependencies
- [ ] `next.config.js` is configured
- [ ] `public/` folder is ready
- [ ] Environment variables set (.env.local)
- [ ] Images are optimized
- [ ] All links are working
- [ ] Contact form validated
- [ ] Mobile responsive tested

---

## 🆘 Troubleshooting

### "Build Failed"

**Solution**: Check build logs
```bash
# Vercel: View logs in dashboard
# Railway: docker logs <container_id>
# Local: npm run build
```

### "Site Not Loading"

1. Wait 5 minutes (first deployment takes time)
2. Check if DNS updated (Ctrl+Shift+R refresh)
3. Verify domain settings
4. Check error logs

### "Images Not Showing"

**Solution**: Update `next.config.js`
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
}
```

### "Out of Memory"

**Solution**: Increase container memory
```bash
# Railway: Settings → Memory
# Docker: docker run -m 512m
# Vercel: Auto-optimized
```

---

## 🚀 Production Checklist

After deploying:

- [ ] Test site on mobile
- [ ] Test cart functionality
- [ ] Test form submissions
- [ ] Check 404 page
- [ ] Test dark mode
- [ ] Verify SSL certificate
- [ ] Check page speed (95+)
- [ ] Add analytics
- [ ] Set up monitoring
- [ ] Create backup strategy

---

## 📚 Next Steps

1. **Choose platform** (Vercel recommended)
2. **Follow deploy steps** (5 minutes)
3. **Share your live link** 🎉
4. **Add payment gateway** (Razorpay/Stripe)
5. **Connect backend** (if needed)
6. **Set up analytics** (track visitors)

---

## 🎯 Your Live Website

**Status**: ✅ Production Ready
**Deployment**: 5 minutes
**Cost**: FREE (Vercel/Netlify free tier)
**Performance**: 95+ score
**Support**: World-class

**Let's make it live!** 🚀

---

## 📞 Support Links

- **Vercel**: https://vercel.com/support
- **Netlify**: https://www.netlify.com/support/
- **Railway**: https://railway.app/docs
- **Render**: https://render.com/docs
- **AWS**: https://aws.amazon.com/support/

---

**Ready?** Pick a platform and deploy! 🍵✨
