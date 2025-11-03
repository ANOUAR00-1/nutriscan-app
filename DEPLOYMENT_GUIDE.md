# NutriScan Deployment Guide

## 🌐 Web Deployment (Vercel, Netlify, etc.)

Your app uses `react-native-web`, so you can deploy it as a website!

### Option A: Deploy to Vercel (Recommended for Web)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Export your web app**
   ```bash
   npx expo export --platform web
   ```
   This creates a `dist` folder with your web build.

3. **Deploy to Vercel**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set build command: `npx expo export --platform web`
   - Set output directory: `dist`

4. **Or use Vercel Auto-Deploy (via GitHub)**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure:
     - **Framework Preset**: Other
     - **Build Command**: `npx expo export --platform web`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

### Option B: Deploy to Netlify

1. **Export web app**
   ```bash
   npx expo export --platform web
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=dist --prod
   ```

3. **Or use Netlify Auto-Deploy (via GitHub)**
   - Push to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Import repository
   - Configure:
     - **Build command**: `npx expo export --platform web`
     - **Publish directory**: `dist`

---

## 📱 Mobile App Deployment (iOS & Android)

Deploy to App Store and Google Play Store using **Expo Application Services (EAS)**.

### Prerequisites

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure your project**
   
   You already have `eas.json`! Update these values:
   
   **For iOS:**
   - Get Apple Developer account
   - Update `bundleIdentifier` in `eas.json` (already set to `com.nutriscan.app`)
   - Update Apple credentials in submit section
   
   **For Android:**
   - Get Google Play Developer account
   - Create a service account key for Google Play
   - Update `serviceAccountKeyPath` in `eas.json`

### Build & Deploy Steps

#### 1. Build for Android

**Preview/Test Build (APK):**
```bash
eas build --platform android --profile preview
```

**Production Build (AAB for Play Store):**
```bash
eas build --platform android --profile production
```

Download and test the APK/AAB from your Expo dashboard.

#### 2. Build for iOS

**Preview Build:**
```bash
eas build --platform ios --profile preview
```

**Production Build:**
```bash
eas build --platform ios --profile production
```

#### 3. Submit to App Stores

**Submit to Google Play:**
```bash
eas submit --platform android --latest
```

**Submit to Apple App Store:**
```bash
eas submit --platform ios --latest
```

### Quick Deploy Commands

```bash
# Build both platforms for production
eas build --platform all --profile production

# Submit both platforms
eas submit --platform all --latest
```

---

## 🚀 Quick Start Checklist

### For Web Deployment:
- [ ] Run `npx expo export --platform web`
- [ ] Deploy `dist` folder to Vercel/Netlify
- [ ] Set up custom domain (optional)

### For Mobile Deployment:
- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login: `eas login`
- [ ] Update `eas.json` with your credentials
- [ ] Create app icons and splash screens
- [ ] Build: `eas build --platform all --profile production`
- [ ] Submit: `eas submit --platform all --latest`

---

## 📝 Important Notes

1. **Environment Variables**: Create a `.env.production` file for production secrets
2. **App Icons**: Generate icons using `npx expo-optimize` or online tools
3. **Privacy Policy**: Required for app stores - create one before submission
4. **App Store Accounts**:
   - Apple Developer: $99/year
   - Google Play: $25 one-time fee

---

## 🔄 Updates After Deployment

### Web Updates
Just redeploy:
```bash
npx expo export --platform web
vercel --prod
```

### Mobile OTA Updates (without app store review)
```bash
eas update --branch production --message "Bug fixes"
```

---

## Need Help?

- Expo Docs: https://docs.expo.dev/
- EAS Build: https://docs.expo.dev/build/introduction/
- Vercel Docs: https://vercel.com/docs
