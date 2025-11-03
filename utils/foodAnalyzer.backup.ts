import { generateText } from "@rork/toolkit-sdk";
import type { FoodItem, NutritionData, HealthAnalysis, MealScan } from "@/types/nutrition";

export async function analyzeFoodImage(imageUri: string): Promise<MealScan> {
  try {
    console.log("Starting food analysis for image:", imageUri);

    const analysisPrompt = `You are a nutrition expert AI. Analyze this food image and provide a detailed analysis.

**Instructions:**
1. Identify all food items visible in the image with estimated quantities
2. Calculate total nutrition values (calories, protein, carbs, fat, fiber, sugar)
3. Provide a health score (0-100) based on nutritional balance
4. Identify any potential allergens (gluten, nuts, dairy, soy, eggs, shellfish)
5. Give constructive health feedback
6. Suggest a healthier alternative if the meal is unhealthy

**IMPORTANT:** Respond ONLY with valid JSON in this exact format:
{
  "foodItems": [
    {"name": "Grilled Chicken Breast", "quantity": "150g", "confidence": 0.9},
    {"name": "Brown Rice", "quantity": "100g", "confidence": 0.85}
  ],
  "nutrition": {
    "calories": 450,
    "protein": 35,
    "carbs": 45,
    "fat": 12,
    "fiber": 4,
    "sugar": 2
  },
  "healthScore": 85,
  "status": "excellent",
  "feedback": "This is a well-balanced meal with lean protein and complex carbs.",
  "warnings": [],
  "allergens": [],
  "healthyAlternative": ""
}

**Status options:** "excellent" (80-100), "good" (60-79), "moderate" (40-59), "poor" (0-39)

If no food is detected, respond with:
{"error": "No food detected in this image. Please upload a photo of a meal or food item."}`;

    let response: string;
    try {
      response = await generateText({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: analysisPrompt },
              { type: "image", image: imageUri },
            ],
          },
        ],
      });
    } catch (apiError) {
      console.error("API Error:", apiError);
      throw new Error("Failed to connect to AI service. Please check your internet connection and try again.");
    }

    console.log("AI Response:", response);

    if (!response || typeof response !== 'string') {
      throw new Error("Invalid response from AI service");
    }

    if (response.includes("Internal Server Error") || (response.includes("Error") && response.length < 100)) {
      console.error("Server error response:", response);
      throw new Error("AI service is temporarily unavailable. Please try again in a moment.");
    }

    if (response.startsWith("Error:") || response.startsWith("error:")) {
      console.error("Error response:", response);
      throw new Error(response.replace(/^(Error:|error:)/i, '').trim() || "AI service error occurred");
    }

    const cleanedResponse = response.trim().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    let parsed: any;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Response received:", cleanedResponse.substring(0, 500));
      throw new Error("Failed to analyze the image. The AI service returned an unexpected response. Please try again.");
    }

    if (parsed.error) {
      throw new Error(parsed.error);
    }

    const foodItems: FoodItem[] = parsed.foodItems || [];
    const nutrition: NutritionData = {
      calories: parsed.nutrition?.calories || 0,
      protein: parsed.nutrition?.protein || 0,
      carbs: parsed.nutrition?.carbs || 0,
      fat: parsed.nutrition?.fat || 0,
      fiber: parsed.nutrition?.fiber || 0,
      sugar: parsed.nutrition?.sugar || 0,
    };

    const healthAnalysis: HealthAnalysis = {
      score: parsed.healthScore || 50,
      status: parsed.status || "moderate",
      feedback: parsed.feedback || "Nutritional analysis completed.",
      warnings: parsed.warnings || [],
      allergens: parsed.allergens || [],
      healthyAlternative: parsed.healthyAlternative || undefined,
    };

    const mealScan: MealScan = {
      id: Date.now().toString(),
      imageUri,
      foodItems,
      nutrition,
      healthAnalysis,
      timestamp: Date.now(),
    };

    console.log("Analysis complete:", mealScan);
    return mealScan;
  } catch (error) {
    console.error("Food analysis error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to analyze food. Please try again."
    );
  }
}
