export interface UserGoals {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
}

export interface UserProfile {
  name: string;
  age?: number;
  weight?: number; // in kg
  height?: number; // in cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryPreferences: string[];
  goals: UserGoals;
}

export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  measurementSystem: 'metric' | 'imperial';
  language: string;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD format
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealsCount: number;
}
