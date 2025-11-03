import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { UserProfile, UserSettings } from "@/types/user";

const USER_PROFILE_KEY = "nutriscan_user_profile";
const USER_SETTINGS_KEY = "nutriscan_user_settings";

const DEFAULT_PROFILE: UserProfile = {
  name: "User",
  activityLevel: "moderate",
  dietaryPreferences: [],
  goals: {
    dailyCalories: 2000,
    dailyProtein: 150,
    dailyCarbs: 200,
    dailyFat: 65,
  },
};

const DEFAULT_SETTINGS: UserSettings = {
  notifications: true,
  darkMode: false,
  measurementSystem: "metric",
  language: "en",
};

export const [UserProvider, useUser] = createContextHook(() => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUserData = useCallback(async () => {
    try {
      const [storedProfile, storedSettings] = await Promise.all([
        AsyncStorage.getItem(USER_PROFILE_KEY),
        AsyncStorage.getItem(USER_SETTINGS_KEY),
      ]);

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (newProfile: Partial<UserProfile>) => {
    try {
      const updated = { ...profile, ...newProfile };
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updated));
      setProfile(updated);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }, [profile]);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(updated));
      setSettings(updated);
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  }, [settings]);

  const resetProfile = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      setProfile(DEFAULT_PROFILE);
    } catch (error) {
      console.error("Failed to reset profile:", error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return useMemo(
    () => ({
      profile,
      settings,
      isLoading,
      updateProfile,
      updateSettings,
      resetProfile,
    }),
    [profile, settings, isLoading, updateProfile, updateSettings, resetProfile]
  );
});
