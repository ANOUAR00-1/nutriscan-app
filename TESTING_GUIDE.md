# 🧪 Testing Guide - NutriScan

## Quick Start

### Install Dependencies
```bash
# Install Jest and testing utilities
npm install --save-dev jest jest-expo @testing-library/react-native @testing-library/jest-native
```

### Run Tests
```bash
# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage

# Type checking
npm run type-check
```

---

## Test Structure

### Files Created:
- ✅ `jest.config.js` - Jest configuration
- ✅ `jest.setup.js` - Test setup and mocks
- ✅ `types/__tests__/schemas.test.ts` - Example validation tests

### Where to Put Tests:
```
app/
├── (tabs)/
│   ├── __tests__/
│   │   ├── dashboard.test.tsx
│   │   └── settings.test.tsx
│   ├── dashboard.tsx
│   └── settings.tsx
utils/
├── __tests__/
│   └── foodAnalyzer.test.ts
└── foodAnalyzerOpenRouter.ts
```

---

## Example Tests

### 1. Unit Test - Utility Function
```typescript
// utils/__tests__/calculations.test.ts
import { calculateDailyCalories } from '../calculations';

describe('Calorie Calculations', () => {
  it('should calculate correct calories for sedentary activity', () => {
    const result = calculateDailyCalories({
      weight: 70, // kg
      height: 175, // cm
      age: 30,
      gender: 'male',
      activityLevel: 'sedentary',
    });
    
    expect(result).toBeCloseTo(2100, 0);
  });
});
```

### 2. Component Test
```typescript
// app/(tabs)/__tests__/dashboard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DashboardScreen from '../dashboard';

// Mock contexts
jest.mock('@/contexts/UserContext', () => ({
  useUser: () => ({
    profile: { name: 'Test User' },
    settings: { darkMode: false, language: 'en' },
  }),
}));

jest.mock('@/contexts/MealsContext', () => ({
  useMeals: () => ({
    meals: [],
    isLoading: false,
  }),
}));

describe('Dashboard Screen', () => {
  it('should render dashboard title', () => {
    render(<DashboardScreen />);
    expect(screen.getByText("Today's Nutrition")).toBeTruthy();
  });
  
  it('should show no meals message when empty', () => {
    render(<DashboardScreen />);
    expect(screen.getByText('No meals tracked yet')).toBeTruthy();
  });
});
```

### 3. Integration Test - API
```typescript
// utils/__tests__/foodAnalyzer.test.ts
import { analyzeFoodImage } from '../foodAnalyzerOpenRouter';

describe('Food Analyzer', () => {
  it('should analyze food image successfully', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              foodItems: [{ name: 'Apple', quantity: '100g' }],
              nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10 },
              healthScore: 85,
              status: 'good',
              feedback: 'Healthy snack',
              warnings: [],
              allergens: [],
            }),
          },
        }],
      }),
    });
    
    const result = await analyzeFoodImage('file:///test.jpg');
    
    expect(result.foodItems).toHaveLength(1);
    expect(result.nutrition.calories).toBe(52);
    expect(result.healthAnalysis.score).toBe(85);
  });
  
  it('should handle API errors gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
    await expect(analyzeFoodImage('file:///test.jpg')).rejects.toThrow();
  });
});
```

---

## Running Tests

### Development Workflow
```bash
# Terminal 1: Run app
npm start

# Terminal 2: Run tests in watch mode
npm run test:watch

# Make changes → Tests auto-run
```

### Pre-Commit
```bash
# Run before committing
npm run type-check  # Check TypeScript
npm test            # Run all tests
npm run lint        # Check code style
```

### CI/CD (GitHub Actions)
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run type-check
      - run: npm test
      - run: npm run lint
```

---

## Coverage Goals

### Minimum Coverage:
- **Critical Utilities**: 80%+ (food analyzer, calculations)
- **Contexts**: 70%+ (UserContext, MealsContext)
- **Components**: 60%+ (screens, UI components)

### Check Coverage:
```bash
npm run test:coverage

# Output:
# ------------------|---------|----------|---------|---------|
# File              | % Stmts | % Branch | % Funcs | % Lines |
# ------------------|---------|----------|---------|---------|
# All files         |   75.23 |    68.12 |   72.45 |   75.89 |
# utils/            |   85.67 |    78.34 |   82.11 |   86.23 |
# contexts/         |   72.45 |    65.78 |   70.34 |   73.12 |
# ------------------|---------|----------|---------|---------|
```

---

## Mocking Guide

### Mock AsyncStorage
```typescript
// Already configured in jest.setup.js
import AsyncStorage from '@react-native-async-storage/async-storage';

beforeEach(() => {
  AsyncStorage.clear();
});

it('should save data', async () => {
  await AsyncStorage.setItem('key', 'value');
  const result = await AsyncStorage.getItem('key');
  expect(result).toBe('value');
});
```

### Mock API Calls
```typescript
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: 'mock' }),
});

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
```

### Mock Image Picker
```typescript
import * as ImagePicker from 'expo-image-picker';

jest.spyOn(ImagePicker, 'launchCameraAsync').mockResolvedValue({
  canceled: false,
  assets: [{ uri: 'file:///mock.jpg' }],
});
```

---

## Best Practices

### 1. Test Behavior, Not Implementation
```typescript
// ❌ Bad - Testing implementation
expect(component.find('.button').length).toBe(1);

// ✅ Good - Testing behavior
fireEvent.press(screen.getByText('Save'));
expect(screen.getByText('Saved!')).toBeTruthy();
```

### 2. Use Meaningful Test Names
```typescript
// ❌ Bad
it('test 1', () => { ... });

// ✅ Good
it('should save user profile when all fields are valid', () => { ... });
```

### 3. Arrange-Act-Assert Pattern
```typescript
it('should calculate total calories', () => {
  // Arrange
  const meals = [
    { calories: 500 },
    { calories: 300 },
  ];
  
  // Act
  const total = calculateTotalCalories(meals);
  
  // Assert
  expect(total).toBe(800);
});
```

### 4. Test Edge Cases
```typescript
describe('calculateBMI', () => {
  it('should handle normal values', () => {
    expect(calculateBMI(70, 1.75)).toBeCloseTo(22.86);
  });
  
  it('should handle zero height', () => {
    expect(() => calculateBMI(70, 0)).toThrow();
  });
  
  it('should handle negative values', () => {
    expect(() => calculateBMI(-70, 1.75)).toThrow();
  });
  
  it('should handle extreme values', () => {
    expect(calculateBMI(200, 2.0)).toBeCloseTo(50);
  });
});
```

---

## Debugging Tests

### Failed Test?
```bash
# Run specific test file
npm test schemas.test.ts

# Run single test
npm test -t "should validate correct meal scan"

# Debug with Node
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Common Issues:

**Issue**: "Cannot find module '@/...'"
```javascript
// Fix: Check jest.config.js moduleNameMapper
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

**Issue**: "TypeError: Cannot read property 'useState' of undefined"
```typescript
// Fix: Component needs React import
import React from 'react';
```

**Issue**: "Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'RNGestureHandlerModule' could not be found"
```javascript
// Fix: Add mock in jest.setup.js
jest.mock('react-native-gesture-handler', () => ({}));
```

---

## Next Steps

### 1. Write Critical Tests (Priority Order):
1. ✅ Validation schemas (Done!)
2. `utils/foodAnalyzerOpenRouter.ts` - API calls
3. `contexts/UserContext.tsx` - User data
4. `contexts/MealsContext.tsx` - Meal data
5. `app/(tabs)/dashboard.tsx` - Main screen

### 2. Set Up CI/CD:
```bash
# Create GitHub Actions workflow
mkdir -p .github/workflows
# Add test.yml (see example above)
```

### 3. Add Pre-Commit Hook:
```bash
npm install --save-dev husky
npx husky init
echo "npm test" > .husky/pre-commit
```

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing React Native Apps (Expo Docs)](https://docs.expo.dev/develop/unit-testing/)

---

**Remember**: Tests are documentation + safety net! 🧪✅

**Current Test Status**: 
- ✅ Infrastructure ready
- ✅ Example tests created
- ⚠️ Need more coverage

**Goal**: 70%+ coverage before v1.0 launch 🎯
