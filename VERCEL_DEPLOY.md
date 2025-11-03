# 🚀 Deploy to Vercel (No CLI Required!)

## Step-by-Step Guide

### 1. Push Your Code to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/nutriscan.git
git push -u origin main
```

### 2. Go to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Sign in with your **GitHub** account

### 3. Import Your Repository

1. Click **"Add New..."** → **"Project"**
2. Select your **NutriScan** repository from the list
3. Click **"Import"**

### 4. Configure Build Settings

Vercel will show a configuration screen. Set these values:

- **Framework Preset**: `Other` or `Expo`
- **Root Directory**: `./` (leave as is)
- **Build Command**: 
  ```
  npx expo export --platform web
  ```
- **Output Directory**: 
  ```
  dist
  ```
- **Install Command**: 
  ```
  npm install
  ```

### 5. Add Environment Variables (Optional)

If you have any `.env` variables:
- Click **"Environment Variables"**
- Add your variables (API keys, etc.)

### 6. Deploy!

Click **"Deploy"**

Vercel will:
- Install dependencies
- Build your web app
- Deploy it to a URL like: `nutriscan.vercel.app`

⏱️ **Takes about 2-5 minutes**

### 7. Get Your Live URL

Once deployed, you'll get:
- **Production URL**: `https://nutriscan.vercel.app`
- **Preview URLs**: For every new commit/branch

---

## 🔄 Automatic Deployments

**Best Part**: Every time you push to GitHub, Vercel **automatically redeploys**!

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel detects the push and redeploys automatically! 🎉

---

## 🎯 Custom Domain (Optional)

After deployment:
1. Go to your project on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `nutriscan.app`)
4. Follow DNS setup instructions

---

## 📋 Summary Checklist

- [ ] Push code to GitHub
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub
- [ ] Import your repository
- [ ] Set build command: `npx expo export --platform web`
- [ ] Set output directory: `dist`
- [ ] Click Deploy
- [ ] Wait 2-5 minutes
- [ ] Visit your live URL!

---

## 🐛 Troubleshooting

### Build Fails?

**Check the build logs on Vercel**. Common issues:

1. **Missing dependencies**: Make sure `package.json` is committed
2. **TypeScript errors**: Run `npm run type-check` locally first
3. **Environment variables**: Add them in Vercel settings

### App Doesn't Load?

1. Check browser console for errors
2. Verify the `dist` folder was created
3. Try building locally: `npm run build:web`

---

## 💡 Pro Tips

1. **Branch Previews**: Create a new branch, push it → Vercel creates a preview URL
2. **Rollbacks**: Can rollback to previous deployments with one click
3. **Analytics**: Enable Web Analytics in Vercel settings
4. **Performance**: Vercel automatically optimizes your app

---

## Need to Update?

Just push to GitHub:

```bash
git add .
git commit -m "New feature"
git push
```

Vercel automatically redeploys! ✨
