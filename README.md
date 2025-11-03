# 🥗 NutriScan - AI-Powered Nutrition Tracker

**Scan your food, get instant AI-powered nutrition analysis!**

[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success)](./PRODUCTION_READY_SUMMARY.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-lightblue)](https://expo.dev/)

---

## ✨ Features

- 📸 **AI Food Scanning** - Take a photo, get instant nutrition analysis
- 📊 **Nutrition Dashboard** - Track daily calories, protein, carbs, fat
- 📜 **Meal History** - View all your scanned meals
- 🌓 **Dark Mode** - Beautiful dark theme support
- 🌍 **3 Languages** - English, French, Arabic (with RTL support)
- 🎯 **Personal Goals** - Set and track your daily nutrition targets
- 💪 **Activity Levels** - Customize based on your lifestyle
- 📱 **Cross-Platform** - iOS, Android, and Web

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or bun
- Expo Go app on your phone (for testing)

### Installation

```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd NutriScan

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenRouter API key

# Start development server
npm start
```

### Get OpenRouter API Key (Free!)

1. Go to https://openrouter.ai/keys
2. Sign up (Google/GitHub)
3. Create API key
4. Add to `.env` file

---

## 📱 Testing

### On Your Phone (Recommended)
```bash
npm start
# Scan QR code with Expo Go app
```

### In Browser
```bash
npm start
# Press 'w' for web
```

### On Emulator
```bash
# iOS
npm start
# Press 'i' for iOS simulator

# Android  
npm start
# Press 'a' for Android emulator
```

---

## 🏗️ Project Structure

```
NutriScan/
├── app/                          # Screens (Expo Router)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── dashboard.tsx         # Main dashboard
│   │   ├── scan.tsx              # Food scanning
│   │   ├── history.tsx           # Meal history
│   │   └── settings.tsx          # User settings
│   ├── result.tsx                # Scan results
│   └── _layout.tsx               # Root layout
├── components/                   # Reusable components
│   └── ErrorBoundary.tsx         # Global error handler
├── contexts/                     # React contexts
│   ├── UserContext.tsx           # User profile & settings
│   └── MealsContext.tsx          # Meal data management
├── hooks/                        # Custom hooks
│   ├── useTheme.ts               # Theme management
│   └── useTranslation.ts         # Internationalization
├── utils/                        # Utilities
│   └── foodAnalyzerOpenRouter.ts # AI food analysis
├── types/                        # TypeScript types
│   ├── nutrition.ts              # Data structures
│   └── schemas.ts                # Zod validation
├── constants/                    # App constants
│   ├── colors.ts                 # Theme colors
│   └── translations.ts           # i18n strings
└── assets/                       # Images & icons
```

---

## 🚢 Deployment

**See detailed guides:**
- 📋 [**DEPLOYMENT_COMMANDS.md**](./DEPLOYMENT_COMMANDS.md) - Quick copy-paste commands
- 🚀 [**GITHUB_ACTIONS_SETUP.md**](./GITHUB_ACTIONS_SETUP.md) - Auto-deploy on git push
- ✅ [**PRODUCTION_READINESS_CHECKLIST.md**](./PRODUCTION_READINESS_CHECKLIST.md) - Pre-launch checklist

### Quick Deploy to Mobile

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login
eas login

# Configure
eas init

# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production

# Submit to stores
eas submit --platform all
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [**DEPLOYMENT_COMMANDS.md**](./DEPLOYMENT_COMMANDS.md) | 🚀 Quick deployment reference |
| [**PRODUCTION_READY_SUMMARY.md**](./PRODUCTION_READY_SUMMARY.md) | 📊 Complete implementation report |
| [**PRODUCTION_READINESS_CHECKLIST.md**](./PRODUCTION_READINESS_CHECKLIST.md) | ✅ Pre-launch checklist |
| [**SECURITY_GUIDE.md**](./SECURITY_GUIDE.md) | 🔐 API key & data security |
| [**TESTING_GUIDE.md**](./TESTING_GUIDE.md) | 🧪 Writing & running tests |
| [**HOW_TO_USE_VALIDATION.md**](./HOW_TO_USE_VALIDATION.md) | 🛡️ Data validation with Zod |
| [**GITHUB_ACTIONS_SETUP.md**](./GITHUB_ACTIONS_SETUP.md) | 🤖 CI/CD automation |

---

## 🔧 Available Scripts

```bash
# Development
npm start                 # Start Expo dev server
npm run test              # Run tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
npm run type-check        # TypeScript type checking
npm run lint              # Lint code

# Building
eas build --platform ios      # Build for iOS
eas build --platform android  # Build for Android
eas build --platform all      # Build for both

# Deployment
eas submit --platform ios     # Submit to App Store
eas submit --platform android # Submit to Play Store
```

---

## 🔐 Security

- ✅ API keys secured with environment variables
- ✅ No secrets in git repository
- ✅ `.env` file in `.gitignore`
- ✅ Global error boundary
- ✅ Request timeout protection
- ✅ Data validation with Zod

**See [SECURITY_GUIDE.md](./SECURITY_GUIDE.md) for details**

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for details**

---

## 🌍 Internationalization

Supported languages:
- 🇬🇧 English
- 🇫🇷 French (Français)
- 🇸🇦 Arabic (العربية) with RTL support

Translation files: `constants/translations.ts`

---

## 🎨 Theming

- ✅ Light mode
- ✅ Dark mode
- ✅ Consistent colors across all screens
- ✅ Smooth theme transitions

Theme files: `constants/colors.ts`, `hooks/useTheme.ts`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **OpenRouter** - AI food analysis
- **Expo** - React Native framework
- **React Native** - Mobile framework
- **Zod** - Data validation
- **Jest** - Testing framework

---

## 📞 Support

- 📧 Email: support@nutriscan.app
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/nutriscan/issues)
- 📖 Docs: See `/docs` folder

---

## 🎯 Production Status

**Status**: ✅ Production Ready (v1.0.0)

**Production Readiness Score**: 9/10
- ✅ Security hardened
- ✅ Error handling implemented
- ✅ Build system configured
- ✅ Complete translations
- ✅ Testing infrastructure
- ✅ Comprehensive documentation

**See [PRODUCTION_READY_SUMMARY.md](./PRODUCTION_READY_SUMMARY.md) for full report**

---

## 🗺️ Roadmap

### v1.0 (Current) ✅
- AI food scanning
- Nutrition dashboard
- Meal history
- Dark mode
- 3 languages
- Production ready

### v1.1 (Next)
- Crash reporting (Sentry)
- Analytics (Mixpanel)
- Data validation integration
- More unit tests
- Image storage optimization

### v1.2 (Future)
- Cloud data sync
- Social sharing
- Meal planning
- Recipe suggestions
- Barcode scanning

---

**Made with ❤️ by NutriScan Team**

🚀 **Ready to launch!** Start with [DEPLOYMENT_COMMANDS.md](./DEPLOYMENT_COMMANDS.md)
