require('dotenv').config();

module.exports = {
  expo: {
    name: "NutriScan",
    slug: "nutriscan-wixsqxo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "rork-app",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      eas: {
        projectId: "624ed693-0014-49d4-882c-1d93d8fe3cd9"
      },
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
      OPENROUTER_API_KEY_BACKUP_1: process.env.OPENROUTER_API_KEY_BACKUP_1,
      OPENROUTER_API_KEY_BACKUP_2: process.env.OPENROUTER_API_KEY_BACKUP_2,
    },
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "app.rork.nutriscan-wixsqxo",
      infoPlist: {
        NSPhotoLibraryUsageDescription: "Allow $(PRODUCT_NAME) to access your photos",
        NSCameraUsageDescription: "Allow $(PRODUCT_NAME) to access your camera",
        NSMicrophoneUsageDescription: "Allow $(PRODUCT_NAME) to access your microphone",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "app.rork.nutriscan_wixsqxo",
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://rork.com/",
        },
      ],
      "expo-font",
      "expo-web-browser",
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};