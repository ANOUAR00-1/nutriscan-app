export interface FoodItem {
    name: string;
    quantity: string;
    confidence?: number;
  }
  
  export interface NutritionData {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  }
  
  export interface HealthAnalysis {
    score: number;
    status: "excellent" | "good" | "moderate" | "poor";
    feedback: string;
    warnings: string[];
    allergens: string[];
    healthyAlternative?: string;
  }
  
  export interface MealScan {
    id: string;
    imageUri: string;
    foodItems: FoodItem[];
    nutrition: NutritionData;
    healthAnalysis: HealthAnalysis;
    timestamp: number;
    notes?: string;
  }
  
  export interface AnalysisState {
    isAnalyzing: boolean;
    error: string | null;
    currentScan: MealScan | null;
  }
  