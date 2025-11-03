# 🛡️ How to Use Zod Validation in NutriScan

## Installation

First, install Zod:
```bash
npm install zod
```

## What We Created

We've created validation schemas in `types/schemas.ts` for:
- ✅ Food Items
- ✅ Nutrition Data
- ✅ Health Analysis
- ✅ Meal Scans
- ✅ User Profile
- ✅ User Settings
- ✅ OpenRouter API Responses

---

## Quick Start

### 1. Validate API Responses

In `utils/foodAnalyzerOpenRouter.ts`, add validation:

```typescript
import { validateOpenRouterResponse } from '@/types/schemas';

// After parsing AI response (line ~337):
try {
  parsed = JSON.parse(cleanedResponse);
  
  // 🛡️ ADD THIS: Validate the parsed response
  const validatedData = validateOpenRouterResponse(parsed);
  
  // Now use validatedData instead of parsed
  const foodItems: FoodItem[] = validatedData.foodItems.map(...)
  
} catch (parseError) {
  console.error("❌ Validation Error:", parseError);
  throw new Error("AI returned invalid data format");
}
```

### 2. Validate User Input

In `contexts/UserContext.tsx`:

```typescript
import { validateUserProfile, validateUserSettings } from '@/types/schemas';

const updateProfile = useCallback(async (newProfile: Partial<UserProfile>) => {
  try {
    const updated = { ...profile, ...newProfile };
    
    // 🛡️ Validate before saving
    const validProfile = validateUserProfile(updated);
    
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(validProfile));
    setProfile(validProfile);
  } catch (error) {
    console.error("Invalid profile data:", error);
    // Show error to user
  }
}, [profile]);
```

### 3. Validate Loaded Data

In `contexts/MealsContext.tsx`:

```typescript
import { safeParseMealScan } from '@/types/schemas';

const loadMeals = useCallback(async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // 🛡️ Validate each meal
      const validMeals = parsed.filter((meal: any) => {
        const result = safeParseMealScan(meal);
        if (!result.success) {
          console.warn('Invalid meal data:', result.error);
          return false;
        }
        return true;
      }).map((meal: any) => safeParseMealScan(meal).data);
      
      setMeals(validMeals);
    }
  } catch (error) {
    console.error("Failed to load meals:", error);
  }
}, []);
```

---

## Validation Methods

### 1. `validate*()` - Throws on Invalid Data
```typescript
import { validateMealScan } from '@/types/schemas';

try {
  const validMeal = validateMealScan(unknownData);
  // validMeal is guaranteed to be valid
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

**Use when**: You want to enforce validation (API responses, critical data)

### 2. `safeParse*()` - Returns Result Object
```typescript
import { safeParseMealScan } from '@/types/schemas';

const result = safeParseMealScan(unknownData);
if (result.success) {
  // result.data is the validated meal
  console.log('Valid meal:', result.data);
} else {
  // result.error contains validation errors
  console.error('Invalid meal:', result.error.issues);
}
```

**Use when**: You want to handle validation gracefully (user input, loaded data)

---

## Integration Examples

### Example 1: Validate AI Response

```typescript
// In foodAnalyzerOpenRouter.ts
import { validateOpenRouterResponse } from '@/types/schemas';

async function handleApiResponse(response: Response, imageUri: string): Promise<MealScan> {
  const data = await response.json();
  const aiResponse = data.choices?.[0]?.message?.content;
  
  const cleanedResponse = aiResponse.trim().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  
  let parsed: any;
  try {
    parsed = JSON.parse(cleanedResponse);
    
    // 🛡️ Validate the response
    const validatedResponse = validateOpenRouterResponse(parsed);
    
    // Check for error in response
    if (validatedResponse.error) {
      throw new Error(validatedResponse.error);
    }
    
    // Construct meal scan from validated data
    const mealScan: MealScan = {
      id: Date.now().toString(),
      imageUri,
      foodItems: validatedResponse.foodItems,
      nutrition: validatedResponse.nutrition,
      healthAnalysis: {
        score: validatedResponse.healthScore,
        status: validatedResponse.status,
        feedback: validatedResponse.feedback,
        warnings: validatedResponse.warnings || [],
        allergens: validatedResponse.allergens || [],
        healthyAlternative: validatedResponse.healthyAlternative,
      },
      timestamp: Date.now(),
    };
    
    return mealScan;
    
  } catch (error) {
    console.error("❌ Validation Error:", error);
    throw new Error("AI returned invalid data format. Please try again.");
  }
}
```

### Example 2: Validate User Settings

```typescript
// In contexts/UserContext.tsx
import { validateUserSettings } from '@/types/schemas';

const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
  try {
    const updated = { ...settings, ...newSettings };
    
    // 🛡️ Validate settings
    const validSettings = validateUserSettings(updated);
    
    await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(validSettings));
    setSettings(validSettings);
    
  } catch (error) {
    console.error("Invalid settings:", error);
    Alert.alert('Error', 'Invalid settings values');
  }
}, [settings]);
```

### Example 3: Validate on Load

```typescript
// In contexts/MealsContext.tsx
import { MealScanSchema } from '@/types/schemas';

const loadMeals = useCallback(async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // 🛡️ Validate and filter invalid meals
      const validMeals = parsed.filter((meal: any) => {
        const result = MealScanSchema.safeParse(meal);
        if (!result.success) {
          console.warn('Skipping invalid meal:', result.error.message);
          return false;
        }
        return true;
      });
      
      setMeals(validMeals);
    }
  } catch (error) {
    console.error("Failed to load meals:", error);
  } finally {
    setIsLoading(false);
  }
}, []);
```

---

## Benefits

### 1. Runtime Type Safety
```typescript
// Without validation:
const calories = data.nutrition.calories;  // Could be undefined or string!

// With validation:
const validData = validateMealScan(data);
const calories = validData.nutrition.calories;  // Guaranteed to be a number!
```

### 2. Clear Error Messages
```typescript
// Instead of: "Cannot read property 'calories' of undefined"
// You get: "Invalid meal scan data: nutrition.calories: Expected number, received string"
```

### 3. Data Sanitization
```typescript
// Automatically filters out invalid entries:
const result = safeParseMealScan(corruptedData);
if (result.success) {
  // Only valid data makes it through
}
```

### 4. Type Inference
```typescript
// TypeScript knows the exact shape:
const validMeal = validateMealScan(unknownData);
// validMeal.nutrition.calories ← autocomplete works!
```

---

## When to Use Validation

### ✅ Always Validate:
- API responses from external services (OpenRouter)
- User input from forms
- Data loaded from AsyncStorage
- Data received from deep links or notifications

### ⚠️ Optional but Recommended:
- Internal function parameters (if coming from external sources)
- Props passed to components (from external data)

### ❌ Don't Validate:
- Hardcoded constants
- Data you just created and control
- Internal calculations (waste of performance)

---

## Testing Validation

Create tests for your schemas:

```typescript
// types/__tests__/schemas.test.ts
import { validateMealScan } from '../schemas';

describe('MealScan Validation', () => {
  it('should validate correct meal scan', () => {
    const validMeal = {
      id: '123',
      imageUri: 'file:///path/to/image.jpg',
      foodItems: [{ name: 'Apple', quantity: '100g', confidence: 0.9 }],
      nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10 },
      healthAnalysis: {
        score: 85,
        status: 'good',
        feedback: 'Healthy snack',
        warnings: [],
        allergens: [],
      },
      timestamp: Date.now(),
    };
    
    expect(() => validateMealScan(validMeal)).not.toThrow();
  });
  
  it('should reject invalid meal scan', () => {
    const invalidMeal = {
      id: '123',
      // Missing required fields
    };
    
    expect(() => validateMealScan(invalidMeal)).toThrow();
  });
});
```

---

## Performance Considerations

Zod is fast, but validation has a cost. Optimize:

```typescript
// ❌ Don't validate on every render
const Component = () => {
  const validData = validateMealScan(data);  // Runs every render!
};

// ✅ Validate once when data changes
const Component = () => {
  const validData = useMemo(() => validateMealScan(data), [data]);
};

// ✅ Or validate at the boundary (API/storage)
const loadData = async () => {
  const data = await fetchData();
  const validData = validateMealScan(data);  // Validate once
  return validData;
};
```

---

## Migration Path

### Phase 1: Add validation to API responses ✅ (Most Critical)
- Validate OpenRouter responses
- Validate any external API calls

### Phase 2: Add validation to data loading
- Validate data from AsyncStorage
- Filter out corrupted data

### Phase 3: Add validation to user input
- Validate form submissions
- Validate settings changes

### Phase 4: Add comprehensive tests
- Test validation schemas
- Test error handling

---

## FAQ

**Q: Does this replace TypeScript?**
A: No! TypeScript is compile-time, Zod is runtime. You need both.

**Q: Is Zod slow?**
A: Very fast! But don't validate unnecessarily (see Performance section).

**Q: What if validation fails in production?**
A: Catch errors gracefully, log them, show user-friendly messages.

**Q: Can I customize error messages?**
A: Yes! Use `.refine()` or custom error maps.

---

## Next Steps

1. **Install Zod**: `npm install zod`
2. **Start with API validation**: Most critical for production
3. **Add data loading validation**: Prevent corrupted data
4. **Write tests**: Verify your schemas work
5. **Monitor errors**: Use Sentry to track validation failures

---

**Remember**: Validation is your safety net! It catches bugs before they crash your app. 🛡️
