# 🤖 GitHub Actions CI/CD Setup Guide

## Automatic Deployment on Every Push!

This guide shows you how to set up automatic builds using GitHub Actions + EAS.

---

## 🎯 What This Does

Every time you push to GitHub:
- ✅ Runs type checking
- ✅ Runs tests
- ✅ Automatically builds iOS & Android
- ✅ Notifies you when done

Just like Vercel auto-deploy! 🚀

---

## 📋 Setup Steps

### Step 1: Get Your Expo Token

```bash
# Login to EAS
eas login

# Generate access token
eas whoami
# This shows your username

# Create token
# Go to: https://expo.dev/accounts/[YOUR_USERNAME]/settings/access-tokens
# Click "Create token"
# Name it: "GitHub Actions"
# Copy the token (you'll need it in next step)
```

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repo: `https://github.com/YOUR_USERNAME/nutriscan-app`
2. Click **"Settings"** tab
3. Click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**
5. Name: `EXPO_TOKEN`
6. Value: Paste the token from Step 1
7. Click **"Add secret"**

### Step 3: Push GitHub Actions Workflow

The workflow file is already created at `.github/workflows/eas-build.yml`

```bash
# Add the workflow file
git add .github/workflows/eas-build.yml

# Commit
git commit -m "🤖 Add GitHub Actions CI/CD workflow"

# Push to GitHub
git push
```

### Step 4: Watch It Work!

1. Go to your GitHub repo
2. Click **"Actions"** tab
3. You'll see the workflow running! 🎉

---

## 🔧 Workflow Triggers

The workflow runs on:

### Automatic:
- ✅ Every push to `main` branch
- ✅ Every pull request to `main`

### Manual:
```bash
# Go to GitHub Actions tab
# Select "EAS Build" workflow
# Click "Run workflow" button
```

---

## 📊 What Happens on Each Push

```
📦 Checkout code
    ↓
🔧 Setup Node.js
    ↓
📥 Install dependencies
    ↓
🔍 Type check (TypeScript)
    ↓
🧪 Run tests (Jest)
    ↓
🚀 Build on EAS (iOS + Android)
    ↓
✅ Done! Get notification
```

---

## 🎯 Customizing the Workflow

### Build Only on Tags (For Releases)

Edit `.github/workflows/eas-build.yml`:

```yaml
on:
  push:
    tags:
      - 'v*' # Only on version tags like v1.0.0
```

Then deploy:
```bash
git tag v1.0.0
git push origin v1.0.0
# Automatically builds and deploys!
```

### Build Different Profiles

```yaml
# Development builds on feature branches
- name: Build Development
  if: github.ref != 'refs/heads/main'
  run: eas build --platform all --profile development --non-interactive

# Production builds on main
- name: Build Production
  if: github.ref == 'refs/heads/main'
  run: eas build --platform all --profile production --non-interactive
```

### Add Slack/Discord Notifications

```yaml
- name: Notify Slack
  if: always()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Build ${{ job.status }}: ${{ github.event.head_commit.message }}"
      }
```

---

## 🔒 Security Best Practices

### Environment Secrets on GitHub

Add all your secrets to GitHub:

1. Go to **Settings** → **Secrets** → **Actions**
2. Add these secrets:
   - `EXPO_TOKEN` (required)
   - `OPENROUTER_API_KEY` (optional - can use EAS secrets)
   - `SENTRY_DSN` (if using Sentry)

### Don't Store in Code

❌ **Never**:
```yaml
env:
  API_KEY: "sk-or-v1-abc123..." # BAD!
```

✅ **Always**:
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }} # GOOD!
```

---

## 🐛 Troubleshooting

### Error: "EXPO_TOKEN not found"
```bash
# Make sure you added EXPO_TOKEN to GitHub secrets
# Check: Settings → Secrets → Actions
```

### Error: "Build failed"
```bash
# Check EAS build logs
eas build:list
eas build:view [BUILD_ID]
```

### Error: "Tests failed"
```bash
# Run tests locally first
npm test

# Fix failing tests, then push again
```

---

## 📊 Monitoring Builds

### View in GitHub Actions
- Go to **Actions** tab on GitHub
- Click on any workflow run
- See detailed logs

### View in EAS Dashboard
- Go to https://expo.dev
- Check **Builds** section
- See all your builds

### Email Notifications
GitHub will email you:
- ✅ When build succeeds
- ❌ When build fails

---

## 🚀 Advanced: Auto-Submit to Stores

Want to automatically submit to app stores after successful build?

```yaml
- name: Submit to App Stores
  if: github.ref == 'refs/heads/main'
  run: |
    eas submit --platform ios --latest --non-interactive
    eas submit --platform android --latest --non-interactive
```

**⚠️ Warning**: Only do this after thorough testing!

---

## 🎉 Benefits

With GitHub Actions + EAS you get:

✅ **Continuous Integration**
- Automatic testing on every commit
- Type checking before build
- Catch bugs early

✅ **Continuous Deployment**
- Automatic builds on push
- No manual commands needed
- Consistent build environment

✅ **Team Collaboration**
- Review builds in PRs
- Test before merging
- Deploy from anywhere

✅ **Version History**
- All builds tracked
- Easy rollbacks
- Audit trail

---

## 📚 Next Steps

1. ✅ Set up EXPO_TOKEN secret
2. ✅ Push workflow file
3. ✅ Watch first build run
4. ✅ Customize for your needs
5. ✅ Add more secrets as needed

---

## 🎓 Learn More

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Expo GitHub Action](https://github.com/expo/expo-github-action)

---

**Now you have Vercel-like auto-deployment for your mobile app!** 🚀
