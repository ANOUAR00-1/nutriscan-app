/**
 * Zod Validation Schemas for NutriScan
 * Provides runtime type validation for API responses and user input
 * 
 * Install: npm install zod
 */

import { z } from 'zod';

/**
 * Food Item Schema
 * Validates individual food items from AI analysis
 */
export const FoodItemSchema = z.object({
  name: z.string().min(1).max(200),
  quantity: z.string().min(1).max(100),
  confidence: z.number().min(0).max(1).optional(),
});

/**
 * Nutrition Data Schema
 * Validates nutrition information
 */
export const NutritionDataSchema = z.object({
  calories: z.number().min(0).max(10000),
  protein: z.number().min(0).max(1000),
  carbs: z.number().min(0).max(1000),
  fat: z.number().min(0).max(1000),
  fiber: z.number().min(0).max(500),
  sugar: z.number().min(0).max(1000),
});

/**
 * Health Analysis Schema
 * Validates health analysis from AI
 */
export const HealthAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  status: z.enum(['excellent', 'good', 'moderate', 'poor']),
  feedback: z.string().min(10).max(1000),
  warnings: z.array(z.string()).optional().default([]),
  allergens: z.array(z.string()).optional().default([]),
  healthyAlternative: z.string().optional(),
});

/**
 * Meal Scan Schema
 * Validates complete meal scan data
 */
export const MealScanSchema = z.object({
  id: z.string().min(1),
  imageUri: z.string().min(1),
  foodItems: z.array(FoodItemSchema).min(1),
  nutrition: NutritionDataSchema,
  healthAnalysis: HealthAnalysisSchema,
  timestamp: z.number().min(0),
  notes: z.string().optional(),
});

/**
 * User Profile Schema
 * Validates user profile data
 */
export const UserProfileSchema = z.object({
  name: z.string().min(1).max(100),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'veryActive']),
  dietaryPreferences: z.array(z.string()).optional().default([]),
  goals: z.object({
    dailyCalories: z.number().min(1000).max(10000),
    dailyProtein: z.number().min(10).max(500),
    dailyCarbs: z.number().min(50).max(1000),
    dailyFat: z.number().min(10).max(300),
  }),
});

/**
 * User Settings Schema
 * Validates user settings
 */
export const UserSettingsSchema = z.object({
  notifications: z.boolean(),
  darkMode: z.boolean(),
  measurementSystem: z.enum(['metric', 'imperial']),
  language: z.enum(['en', 'fr', 'ar']),
});

/**
 * OpenRouter API Response Schema
 * Validates AI API responses
 */
export const OpenRouterResponseSchema = z.object({
  foodItems: z.array(z.object({
    name: z.string(),
    quantity: z.string(),
    confidence: z.number().optional(),
  })),
  nutrition: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
    fiber: z.number(),
    sugar: z.number(),
  }),
  healthScore: z.number(),
  status: z.enum(['excellent', 'good', 'moderate', 'poor']),
  feedback: z.string(),
  warnings: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  healthyAlternative: z.string().optional(),
  error: z.string().optional(),
});

/**
 * Type exports (inferred from schemas)
 */
export type FoodItem = z.infer<typeof FoodItemSchema>;
export type NutritionData = z.infer<typeof NutritionDataSchema>;
export type HealthAnalysis = z.infer<typeof HealthAnalysisSchema>;
export type MealScan = z.infer<typeof MealScanSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;
export type OpenRouterResponse = z.infer<typeof OpenRouterResponseSchema>;

/**
 * Validation Helper Functions
 */

/**
 * Safely parse and validate data
 * Returns validated data or throws descriptive error
 */
export function validateMealScan(data: unknown): MealScan {
  try {
    return MealScanSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Invalid meal scan data: ${issues}`);
    }
    throw error;
  }
}

export function validateUserProfile(data: unknown): UserProfile {
  try {
    return UserProfileSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Invalid user profile: ${issues}`);
    }
    throw error;
  }
}

export function validateUserSettings(data: unknown): UserSettings {
  try {
    return UserSettingsSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Invalid user settings: ${issues}`);
    }
    throw error;
  }
}

export function validateOpenRouterResponse(data: unknown): OpenRouterResponse {
  try {
    return OpenRouterResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Invalid AI response: ${issues}`);
    }
    throw error;
  }
}

/**
 * Safe parse (returns result with success flag instead of throwing)
 */
export function safeParseMealScan(data: unknown) {
  return MealScanSchema.safeParse(data);
}

export function safeParseUserProfile(data: unknown) {
  return UserProfileSchema.safeParse(data);
}

export function safeParseUserSettings(data: unknown) {
  return UserSettingsSchema.safeParse(data);
}

export function safeParseOpenRouterResponse(data: unknown) {
  return OpenRouterResponseSchema.safeParse(data);
}
