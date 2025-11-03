import {
  validateMealScan,
  validateUserProfile,
  validateUserSettings,
  validateOpenRouterResponse,
  safeParseMealScan,
} from '../schemas';

describe('Validation Schemas', () => {
  describe('MealScan Validation', () => {
    it('should validate a correct meal scan', () => {
      const validMeal = {
        id: '123456',
        imageUri: 'file:///path/to/image.jpg',
        foodItems: [
          { name: 'Apple', quantity: '100g', confidence: 0.95 },
          { name: 'Banana', quantity: '120g', confidence: 0.88 },
        ],
        nutrition: {
          calories: 150,
          protein: 1.5,
          carbs: 35,
          fat: 0.5,
          fiber: 5,
          sugar: 25,
        },
        healthAnalysis: {
          score: 85,
          status: 'good',
          feedback: 'Great healthy snack with natural sugars and fiber',
          warnings: [],
          allergens: [],
        },
        timestamp: Date.now(),
      };

      expect(() => validateMealScan(validMeal)).not.toThrow();
      const result = validateMealScan(validMeal);
      expect(result.id).toBe('123456');
      expect(result.foodItems).toHaveLength(2);
    });

    it('should reject meal scan with invalid calories', () => {
      const invalidMeal = {
        id: '123',
        imageUri: 'file:///image.jpg',
        foodItems: [{ name: 'Food', quantity: '100g' }],
        nutrition: {
          calories: -100,  // Invalid: negative calories
          protein: 10,
          carbs: 20,
          fat: 5,
          fiber: 3,
          sugar: 5,
        },
        healthAnalysis: {
          score: 50,
          status: 'moderate',
          feedback: 'Test',
          warnings: [],
          allergens: [],
        },
        timestamp: Date.now(),
      };

      expect(() => validateMealScan(invalidMeal)).toThrow();
    });

    it('should reject meal scan with missing required fields', () => {
      const invalidMeal = {
        id: '123',
        imageUri: 'file:///image.jpg',
        // Missing foodItems
        nutrition: {
          calories: 100,
          protein: 5,
          carbs: 15,
          fat: 2,
          fiber: 1,
          sugar: 5,
        },
      };

      expect(() => validateMealScan(invalidMeal)).toThrow(/foodItems/);
    });

    it('should use safeParse for non-throwing validation', () => {
      const invalidMeal = { id: '123' };
      const result = safeParseMealScan(invalidMeal);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toBeDefined();
      }
    });
  });

  describe('UserProfile Validation', () => {
    it('should validate correct user profile', () => {
      const validProfile = {
        name: 'John Doe',
        activityLevel: 'moderate',
        dietaryPreferences: ['vegetarian'],
        goals: {
          dailyCalories: 2000,
          dailyProtein: 150,
          dailyCarbs: 200,
          dailyFat: 65,
        },
      };

      expect(() => validateUserProfile(validProfile)).not.toThrow();
    });

    it('should reject profile with invalid daily calories', () => {
      const invalidProfile = {
        name: 'John Doe',
        activityLevel: 'moderate',
        dietaryPreferences: [],
        goals: {
          dailyCalories: 500,  // Too low
          dailyProtein: 150,
          dailyCarbs: 200,
          dailyFat: 65,
        },
      };

      expect(() => validateUserProfile(invalidProfile)).toThrow();
    });
  });

  describe('UserSettings Validation', () => {
    it('should validate correct settings', () => {
      const validSettings = {
        notifications: true,
        darkMode: false,
        measurementSystem: 'metric',
        language: 'en',
      };

      expect(() => validateUserSettings(validSettings)).not.toThrow();
    });

    it('should reject invalid language', () => {
      const invalidSettings = {
        notifications: true,
        darkMode: false,
        measurementSystem: 'metric',
        language: 'invalid',  // Not 'en', 'fr', or 'ar'
      };

      expect(() => validateUserSettings(invalidSettings)).toThrow();
    });
  });

  describe('OpenRouterResponse Validation', () => {
    it('should validate correct API response', () => {
      const validResponse = {
        foodItems: [
          { name: 'Chicken Breast', quantity: '200g', confidence: 0.92 },
        ],
        nutrition: {
          calories: 330,
          protein: 62,
          carbs: 0,
          fat: 7,
          fiber: 0,
          sugar: 0,
        },
        healthScore: 90,
        status: 'excellent',
        feedback: 'High protein, low fat meal',
        warnings: [],
        allergens: [],
      };

      expect(() => validateOpenRouterResponse(validResponse)).not.toThrow();
    });

    it('should validate response with error field', () => {
      const errorResponse = {
        foodItems: [],
        nutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
        },
        healthScore: 0,
        status: 'poor',
        feedback: '',
        error: 'No food detected in image',
      };

      expect(() => validateOpenRouterResponse(errorResponse)).not.toThrow();
      const result = validateOpenRouterResponse(errorResponse);
      expect(result.error).toBe('No food detected in image');
    });
  });
});
