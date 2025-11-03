import type { MealScan, NutritionData } from "@/types/nutrition";
import type { DailyProgress } from "@/types/user";

/**
 * Calculate daily nutrition totals from meals
 */
export function calculateDailyTotals(meals: MealScan[], date: Date): NutritionData {
  const dateString = date.toDateString();
  const dayMeals = meals.filter(
    (meal) => new Date(meal.timestamp).toDateString() === dateString
  );

  return dayMeals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.nutrition.calories,
      protein: totals.protein + meal.nutrition.protein,
      carbs: totals.carbs + meal.nutrition.carbs,
      fat: totals.fat + meal.nutrition.fat,
      fiber: totals.fiber + meal.nutrition.fiber,
      sugar: totals.sugar + meal.nutrition.sugar,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  );
}

/**
 * Get daily progress for a specific date
 */
export function getDailyProgress(meals: MealScan[], date: Date): DailyProgress {
  const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const totals = calculateDailyTotals(meals, date);
  const dayMeals = meals.filter(
    (meal) => new Date(meal.timestamp).toDateString() === date.toDateString()
  );

  return {
    date: dateString,
    calories: totals.calories,
    protein: totals.protein,
    carbs: totals.carbs,
    fat: totals.fat,
    mealsCount: dayMeals.length,
  };
}

/**
 * Get weekly progress (last 7 days)
 */
export function getWeeklyProgress(meals: MealScan[]): DailyProgress[] {
  const progress: DailyProgress[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    progress.push(getDailyProgress(meals, date));
  }

  return progress;
}

/**
 * Calculate average health score for a period
 */
export function calculateAverageScore(meals: MealScan[]): number {
  if (meals.length === 0) return 0;
  const total = meals.reduce((sum, meal) => sum + meal.healthAnalysis.score, 0);
  return Math.round(total / meals.length);
}

/**
 * Get nutrition insights based on goals
 */
export interface NutritionInsight {
  type: "success" | "warning" | "info";
  message: string;
  metric: string;
}

export function getNutritionInsights(
  current: NutritionData,
  goals: { dailyCalories: number; dailyProtein: number; dailyCarbs: number; dailyFat: number }
): NutritionInsight[] {
  const insights: NutritionInsight[] = [];

  const calorieProgress = (current.calories / goals.dailyCalories) * 100;
  const proteinProgress = (current.protein / goals.dailyProtein) * 100;
  const carbsProgress = (current.carbs / goals.dailyCarbs) * 100;
  const fatProgress = (current.fat / goals.dailyFat) * 100;

  // Calorie insights
  if (calorieProgress >= 90 && calorieProgress <= 110) {
    insights.push({
      type: "success",
      message: "Perfect calorie balance for the day!",
      metric: "calories",
    });
  } else if (calorieProgress < 50) {
    insights.push({
      type: "warning",
      message: "You're significantly under your calorie goal. Consider adding a meal or snack.",
      metric: "calories",
    });
  } else if (calorieProgress > 120) {
    insights.push({
      type: "warning",
      message: "You've exceeded your calorie goal. Consider lighter options for your next meal.",
      metric: "calories",
    });
  }

  // Protein insights
  if (proteinProgress >= 90 && proteinProgress <= 110) {
    insights.push({
      type: "success",
      message: "Excellent protein intake!",
      metric: "protein",
    });
  } else if (proteinProgress < 60) {
    insights.push({
      type: "warning",
      message: "Your protein intake is low. Add some lean protein to your next meal.",
      metric: "protein",
    });
  }

  // Carbs insights
  if (carbsProgress > 120) {
    insights.push({
      type: "info",
      message: "High carb intake today. Balance with protein and healthy fats.",
      metric: "carbs",
    });
  }

  // General insights
  if (current.fiber >= 25) {
    insights.push({
      type: "success",
      message: "Great fiber intake! This supports digestive health.",
      metric: "fiber",
    });
  } else if (current.fiber < 10 && current.calories > 1000) {
    insights.push({
      type: "info",
      message: "Try adding more fiber-rich foods like vegetables, fruits, or whole grains.",
      metric: "fiber",
    });
  }

  return insights;
}

/**
 * Format nutrition data for export
 */
export function formatMealForExport(meal: MealScan): string {
  const date = new Date(meal.timestamp);
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return `
Date: ${dateStr} at ${timeStr}
Foods: ${meal.foodItems.map((f) => `${f.name} (${f.quantity})`).join(", ")}

Nutrition:
- Calories: ${meal.nutrition.calories} kcal
- Protein: ${meal.nutrition.protein}g
- Carbs: ${meal.nutrition.carbs}g
- Fat: ${meal.nutrition.fat}g
- Fiber: ${meal.nutrition.fiber}g
- Sugar: ${meal.nutrition.sugar}g

Health Analysis:
- Score: ${meal.healthAnalysis.score}/100
- Status: ${meal.healthAnalysis.status}
- Feedback: ${meal.healthAnalysis.feedback}
${meal.healthAnalysis.allergens.length > 0 ? `- Allergens: ${meal.healthAnalysis.allergens.join(", ")}` : ""}
${meal.healthAnalysis.healthyAlternative ? `- Healthier Alternative: ${meal.healthAnalysis.healthyAlternative}` : ""}
---
  `.trim();
}

/**
 * Export all meals to text format
 */
export function exportAllMeals(meals: MealScan[]): string {
  const sortedMeals = [...meals].sort((a, b) => b.timestamp - a.timestamp);
  const header = `NutriScan Export
Total Meals: ${meals.length}
Export Date: ${new Date().toLocaleDateString()}

=====================================
`;

  const mealsData = sortedMeals.map(formatMealForExport).join("\n\n");

  return header + mealsData;
}

/**
 * Get streak information (consecutive days with meals logged)
 */
export function getStreak(meals: MealScan[]): { current: number; longest: number } {
  if (meals.length === 0) return { current: 0, longest: 0 };

  const dates = new Set(
    meals.map((meal) => new Date(meal.timestamp).toDateString())
  );
  const sortedDates = Array.from(dates).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Calculate current streak
  if (sortedDates[0] === today || sortedDates[0] === yesterday.toDateString()) {
    currentStreak = 1;
    const startDate = new Date(sortedDates[0]);

    for (let i = 1; i < sortedDates.length; i++) {
      const expectedDate = new Date(startDate);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (sortedDates[i] === expectedDate.toDateString()) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const dayDiff = Math.floor(
      (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (dayDiff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak, 1);

  return { current: currentStreak, longest: longestStreak };
}
