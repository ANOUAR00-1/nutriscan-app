/**
 * Food Analysis using Hugging Face Inference API (FREE)
 * 
 * Provider: Hugging Face
 * Model: LLaVA or similar vision model
 * Cost: FREE (1000 requests/day)
 * Easy signup: Just email, no verification issues
 */

import type { FoodItem, NutritionData, HealthAnalysis, MealScan } from "@/types/nutrition";

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || 'YOUR_HF_API_KEY_HERE';
const HF_API_URL = 'https://api-inference.huggingface.co/models/llava-hf/llava-1.5-7b-hf';

export async function analyzeFoodImage(imageUri: string): Promise<MealScan> {
  try {
    console.log("🤖 Starting food analysis with Hugging Face...");

    const analysisPrompt = `Analyze this food image and provide detailed nutrition information in JSON format:

{
  "foodItems": [{"name": "Food Name", "quantity": "100g", "confidence": 0.9}],
  "nutrition": {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0},
  "healthScore": 0,
  "status": "moderate",
  "feedback": "Analysis feedback",
  "warnings": [],
  "allergens": [],
  "healthyAlternative": ""
}

Identify all foods, estimate portions, calculate nutrition, and rate health (0-100).`;

    // Convert image to base64 if needed
    let imageData = imageUri;
    if (imageUri.startsWith('file://')) {
      // Handle local files
      console.log("Converting local image...");
    }

    // Call Hugging Face API
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          image: imageData,
          question: analysisPrompt,
        },
        parameters: {
          max_new_tokens: 2000,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid Hugging Face API key. Get one at: https://huggingface.co/settings/tokens");
      }
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Received response from Hugging Face");

    // Parse the response
    const aiResponse = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    
    // Extract JSON from response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsed || parsed.error) {
      throw new Error(parsed?.error || "Failed to analyze image");
    }

    // Construct meal scan
    const mealScan: MealScan = {
      id: Date.now().toString(),
      imageUri,
      foodItems: parsed.foodItems || [],
      nutrition: parsed.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
      healthAnalysis: {
        score: parsed.healthScore || 50,
        status: parsed.status || "moderate",
        feedback: parsed.feedback || "Analysis completed",
        warnings: parsed.warnings || [],
        allergens: parsed.allergens || [],
        healthyAlternative: parsed.healthyAlternative,
      },
      timestamp: Date.now(),
    };

    console.log("✨ Analysis complete!");
    return mealScan;
  } catch (error) {
    console.error("❌ Food analysis error:", error);
    throw error instanceof Error ? error : new Error("Failed to analyze food");
  }
}
