# 🔐 SECURITY GUIDE - NutriScan
## Protecting Your API Keys and User Data

---

## 🚨 CRITICAL: API Key Security

### ✅ WHAT WE FIXED

**Before** (INSECURE 🚨):
```typescript
// ❌ NEVER DO THIS - Keys hardcoded in source code
const API_KEY = 'sk-or-v1-abc123...';  // EXPOSED IN GIT!
```

**After** (SECURE ✅):
```typescript
// ✅ Keys loaded from environment variables
import Constants from 'expo-constants';
const API_KEY = Constants.expoConfig?.extra?.OPENROUTER_API_KEY;
```

---

## 📋 SETUP INSTRUCTIONS

### Step 1: Copy .env.example to .env
```bash
cp .env.example .env
```

### Step 2: Add Your Real API Keys
Edit `.env`:
```bash
# Get your key from https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-YOUR_REAL_KEY_HERE
OPENROUTER_API_KEY_BACKUP_1=sk-or-v1-YOUR_BACKUP_KEY_1
OPENROUTER_API_KEY_BACKUP_2=sk-or-v1-YOUR_BACKUP_KEY_2
```

### Step 3: Verify .env is in .gitignore
```bash
# Should already be there, but verify:
cat .gitignore | grep .env
# Should show: .env
```

### Step 4: Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Start fresh
npm start
```

---

## 🛡️ SECURITY BEST PRACTICES

### 1. Environment Variables ✅
- [x] API keys in `.env` (not in code)
- [x] `.env` in `.gitignore`
- [x] `.env.example` for documentation only
- [x] Keys loaded via `expo-constants`

### 2. Git Security
```bash
# Check if .env is tracked (should be empty)
git ls-files | grep .env

# If .env appears, remove it:
git rm --cached .env
git commit -m "Remove .env from tracking"

# Check git history for leaked keys:
git log --all --full-history -- .env
```

### 3. Key Rotation
```bash
# Rotate keys if exposed:
# 1. Go to https://openrouter.ai/keys
# 2. Delete old key
# 3. Generate new key
# 4. Update .env file
# 5. Restart app
```

---

## 🚀 DEPLOYMENT SECURITY

### For EAS Build:
```bash
# Set secrets for EAS builds
eas secret:create --scope project --name OPENROUTER_API_KEY --value sk-or-v1-...
eas secret:create --scope project --name OPENROUTER_API_KEY_BACKUP_1 --value sk-or-v1-...
eas secret:create --scope project --name OPENROUTER_API_KEY_BACKUP_2 --value sk-or-v1-...

# Verify secrets
eas secret:list
```

### In app.config.js:
```javascript
// Already configured:
extra: {
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_API_KEY_BACKUP_1: process.env.OPENROUTER_API_KEY_BACKUP_1,
  OPENROUTER_API_KEY_BACKUP_2: process.env.OPENROUTER_API_KEY_BACKUP_2,
}
```

---

## ⚠️ WHAT IF KEYS ARE EXPOSED?

### If you accidentally commit API keys:

#### 1. Immediate Action (Within 5 minutes)
```bash
# If you haven't pushed yet:
git reset --soft HEAD~1  # Undo commit
# Remove keys from code
git add .
git commit -m "Fix: Remove hardcoded keys"
```

#### 2. If Already Pushed
```bash
# Keys are now public! Rotate immediately:
# 1. Delete exposed keys at https://openrouter.ai/keys
# 2. Generate new keys
# 3. Update .env

# Optional: Clean git history (advanced)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch utils/foodAnalyzerOpenRouter.ts" \
  --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
```

#### 3. Monitor for Abuse
- Check OpenRouter dashboard for unusual usage
- Set up billing alerts
- Rotate keys monthly as best practice

---

## 🔒 USER DATA SECURITY

### Current Implementation:

#### Data Storage (AsyncStorage)
```typescript
// User data stored locally:
- User profile (name, goals, activity level)
- Meal scans (images as base64, nutrition data)
- Settings (dark mode, language, notifications)
```

**Security Level**: ⚠️ **UNENCRYPTED**

### Recommended Improvements:

#### 1. Encrypt Sensitive Data
```bash
npm install expo-secure-store

# Use for sensitive data:
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('userToken', token);
const token = await SecureStore.getItemAsync('userToken');
```

#### 2. Don't Store Unnecessary Data
```typescript
// ❌ Don't store:
- Credit card numbers
- Social security numbers
- Health records beyond meals

// ✅ OK to store:
- Meal photos
- Nutrition data
- User preferences
```

#### 3. Add Privacy Policy
**Required for App Store submission**

Template:
```markdown
# Privacy Policy

## Data We Collect:
- Meal photos (stored locally on your device)
- Nutrition data (stored locally on your device)
- User preferences (stored locally on your device)

## Data We DON'T Collect:
- We don't collect personal information
- We don't sell your data
- We don't track you across other apps

## Third-Party Services:
- OpenRouter AI (for food analysis) - See their privacy policy

## Your Rights:
- Delete all data anytime (Settings → Clear History)
- Data never leaves your device except for AI analysis
```

---

## 📱 APP SECURITY FEATURES

### 1. Error Boundary ✅
- Catches crashes
- Prevents sensitive data from error logs
- Shows user-friendly messages

### 2. Request Timeout ✅
- 60-second timeout prevents hung requests
- Cancels requests on app close
- Prevents resource leaks

### 3. Input Validation ⚠️
**Status**: Needs improvement

**Recommendation**:
```typescript
// Add Zod validation
import { z } from 'zod';

const UserProfileSchema = z.object({
  name: z.string().min(1).max(100),
  dailyCalories: z.number().min(1000).max(10000),
  // ...
});

// Validate before saving
try {
  const validData = UserProfileSchema.parse(userData);
  await saveProfile(validData);
} catch (error) {
  // Handle invalid data
}
```

---

## 🔐 SECURITY CHECKLIST

### Before Launch:
- [ ] All API keys in `.env` (not in code) ✅
- [ ] `.env` in `.gitignore` ✅
- [ ] No keys in git history ⚠️ (check!)
- [ ] EAS secrets configured (for builds)
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] App permissions justified (camera, gallery)
- [ ] Sensitive data encrypted (optional but recommended)

### Monthly Maintenance:
- [ ] Rotate API keys
- [ ] Check for dependency vulnerabilities (`npm audit`)
- [ ] Review API usage (unexpected spikes?)
- [ ] Update Expo SDK (security patches)

---

## 🚨 VULNERABILITY REPORTING

If you find a security issue:

1. **Don't** open a public GitHub issue
2. **Do** email: security@yourapp.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

---

## 📚 ADDITIONAL RESOURCES

### Expo Security:
- https://docs.expo.dev/guides/security/

### OWASP Mobile Security:
- https://owasp.org/www-project-mobile-top-10/

### React Native Security:
- https://reactnative.dev/docs/security

---

## ✅ CURRENT SECURITY STATUS

| Feature | Status | Priority |
|---------|--------|----------|
| API Keys in Env | ✅ Fixed | Critical |
| .env in .gitignore | ✅ Done | Critical |
| Error Boundary | ✅ Added | High |
| Request Timeout | ✅ Added | High |
| Input Validation | ⚠️ Partial | Medium |
| Data Encryption | ❌ None | Medium |
| Privacy Policy | ❌ None | High |
| Crash Reporting | ❌ None | Medium |

**Overall Security**: **7/10** ✅ Good for MVP

---

## 🎯 NEXT STEPS

1. **Immediate** (Before Launch):
   - Set up `.env` with real keys ✅
   - Create privacy policy & terms 📝
   - Test on real devices 📱

2. **Soon** (After Launch):
   - Add Sentry crash reporting 📊
   - Implement data validation (Zod) ✅
   - Add secure storage for sensitive data 🔒

3. **Later** (v1.1):
   - Security audit 🔍
   - Penetration testing 🛡️
   - GDPR compliance (if needed) 📋

---

**Remember**: Security is an ongoing process, not a one-time fix! 🔐

**Last Updated**: 2025-11-02
**Status**: Production Ready (with recommendations)
