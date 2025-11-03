# 🚀 DEPLOYMENT QUICK REFERENCE

Copy-paste these commands in order!

---

## 📦 PART 1: PUSH TO GITHUB

```bash
# 1. Navigate to project
cd f:/my_education/My_project/NutriScan

# 2. Initialize git (if needed)
git init

# 3. Add all files
git add .

# 4. Create first commit
git commit -m "🚀 Initial commit - NutriScan v1.0.0 production ready"

# 5. Create GitHub repo (via browser)
# Go to: https://github.com/new
# Name: nutriscan-app
# Visibility: Private
# DO NOT initialize with README
# Click "Create repository"

# 6. Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nutriscan-app.git

# 7. Rename branch to main (if needed)
git branch -M main

# 8. Push to GitHub
git push -u origin main

# ✅ DONE! Check https://github.com/YOUR_USERNAME/nutriscan-app
```

---

## 📱 PART 2: DEPLOY TO MOBILE (EAS)

```bash
# 1. Install EAS CLI
npm install -g @expo/eas-cli

# 2. Login to Expo
eas login
# Or if no account: eas register

# 3. Initialize EAS
eas init

# 4. Add API keys to EAS (REPLACE WITH YOUR REAL KEYS!)
eas secret:create --scope project --name OPENROUTER_API_KEY --value "sk-or-v1-YOUR-REAL-KEY-HERE"
eas secret:create --scope project --name OPENROUTER_API_KEY_BACKUP_1 --value "sk-or-v1-YOUR-BACKUP-KEY-1"
eas secret:create --scope project --name OPENROUTER_API_KEY_BACKUP_2 --value "sk-or-v1-YOUR-BACKUP-KEY-2"

# 5. Verify secrets
eas secret:list

# 6. Build for Android (FIRST BUILD - EASIER)
eas build --platform android --profile production

# 7. Build for iOS (NEEDS APPLE DEVELOPER ACCOUNT)
eas build --platform ios --profile production

# 8. Check build status
eas build:list

# 9. Submit to stores (after build completes)
eas submit --platform android
eas submit --platform ios

# ✅ DONE! Your app is deploying!
```

---

## 🤖 PART 3: GITHUB ACTIONS (OPTIONAL - AUTO DEPLOY)

```bash
# 1. Get Expo token
# Go to: https://expo.dev/accounts/[YOUR_USERNAME]/settings/access-tokens
# Create token named "GitHub Actions"
# Copy the token

# 2. Add to GitHub secrets
# Go to: https://github.com/YOUR_USERNAME/nutriscan-app/settings/secrets/actions
# Click "New repository secret"
# Name: EXPO_TOKEN
# Value: [paste token]
# Click "Add secret"

# 3. Push the workflow file (already created)
git add .github/workflows/eas-build.yml
git commit -m "🤖 Add GitHub Actions workflow"
git push

# 4. Watch it work!
# Go to: https://github.com/YOUR_USERNAME/nutriscan-app/actions

# ✅ DONE! Now every push auto-builds!
```

---

## 🔄 FUTURE UPDATES

```bash
# Make changes to your code
# Then:

# 1. Stage changes
git add .

# 2. Commit with message
git commit -m "✨ Add new feature"

# 3. Push to GitHub
git push

# 4. If GitHub Actions enabled: BUILD STARTS AUTOMATICALLY! 🎉
# If not: Run manually:
eas build --platform all --profile production

# That's it! ✅
```

---

## 📊 USEFUL COMMANDS

```bash
# Check git status
git status

# View commit history
git log --oneline

# Check EAS builds
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Check EAS secrets
eas secret:list

# Delete a secret
eas secret:delete --name SECRET_NAME

# View EAS configuration
cat eas.json

# Test build locally (faster)
eas build --platform android --local

# Build both platforms at once
eas build --platform all --profile production
```

---

## 🆘 TROUBLESHOOTING

### "Not a git repository"
```bash
git init
```

### "Remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nutriscan-app.git
```

### "Permission denied"
```bash
# Use HTTPS instead of SSH:
git remote set-url origin https://github.com/YOUR_USERNAME/nutriscan-app.git
```

### ".env file in git"
```bash
# If you accidentally committed .env:
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

### "Build failed"
```bash
# Check logs
eas build:list
eas build:view [BUILD_ID]

# Try again
eas build --platform android --profile production
```

---

## 📱 TESTING YOUR BUILDS

### Android (APK):
1. Download from EAS build page
2. Transfer to Android phone
3. Enable "Install from unknown sources"
4. Install APK
5. Test app

### iOS (IPA):
1. Need Apple Developer account
2. Register test device UDID
3. Download via TestFlight
4. Or install via Xcode

---

## 🎯 QUICK DEPLOY (AFTER FIRST TIME)

Once everything is set up, deploying is just:

```bash
# Make changes
# ...

# Deploy
git add .
git commit -m "Update app"
git push

# If auto-deploy enabled: DONE! ✅
# If not:
eas build --platform all --profile production
```

---

## 🎉 YOU'RE READY!

Start with **PART 1** (GitHub), then **PART 2** (EAS).

**PART 3** (GitHub Actions) is optional but recommended!

---

**Total time**: 
- Part 1 (GitHub): 5 minutes
- Part 2 (EAS): 15-20 minutes (build time)
- Part 3 (Actions): 5 minutes

**Let's go! 🚀**
