/**
 * Food Analysis using Groq + Llama 3.2 Vision (FREE Open Source)
 * 
 * Provider: Groq (https://groq.com)
 * Model: Llama 3.2 Vision 11B by Meta
 * Cost: FREE (14,400 requests/day)
 * Speed: 1-3 seconds per analysis
 */

import type { FoodItem, NutritionData, HealthAnalysis, MealScan } from "@/types/nutrition";
import { AI_CONFIG } from "@/config/ai";

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqMessage {
  role: 'user' | 'assistant' | 'system';
  content: Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

export async function analyzeFoodImage(imageUri: string): Promise<MealScan> {
  try {
    console.log("🤖 Starting food analysis with Llama 3.2 Vision (Groq)...");
    console.log("📸 Image URI:", imageUri.substring(0, 100) + "...");

    const analysisPrompt = `You are an expert nutritionist AI. Analyze this food image and provide detailed nutrition information.

**Your Task:**
1. Identify ALL food items visible in the image
2. Estimate portion sizes in grams
3. Calculate total nutrition values (calories, protein, carbs, fat, fiber, sugar)
4. Assign a health score (0-100) based on nutritional balance
5. Identify potential allergens
6. Provide constructive feedback
7. Suggest healthier alternatives if the meal is unhealthy

**CRITICAL: Return ONLY valid JSON, no markdown, no explanation. Use this EXACT format:**

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
  "feedback": "This is a well-balanced meal with lean protein and complex carbs. Great portion control!",
  "warnings": [],
  "allergens": [],
  "healthyAlternative": ""
}

**Status Rules:**
- "excellent": 80-100 (very nutritious, balanced)
- "good": 60-79 (healthy with minor improvements possible)
- "moderate": 40-59 (average, some concerns)
- "poor": 0-39 (unhealthy, needs significant changes)

**If no food is detected, return:**
{"error": "No food detected in this image. Please take a clear photo of your meal."}

**Remember:** ONLY JSON output, nothing else!`;

    // Convert image to base64 if it's a local file URI
    let imageUrl = imageUri;
    if (imageUri.startsWith('file://') || imageUri.startsWith('content://')) {
      // For local files, we need base64 encoding
      // In React Native, we'll handle this differently
      console.log("⚠️ Local image detected, using as-is");
    }

    // Prepare Groq API request
    const messages: GroqMessage[] = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: analysisPrompt,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ];

    console.log("🚀 Sending request to Groq...");

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: messages,
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.maxTokens,
        response_format: { type: "json_object" }, // Force JSON output
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Groq API Error:", errorData);
      
      if (response.status === 401) {
        throw new Error("Invalid Groq API key. Please check your GROQ_API_KEY environment variable.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. You've reached the free tier limit (14,400 requests/day). Please try again later.");
      } else {
        throw new Error(`Groq API error: ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log("✅ Received response from Groq");

    // Extract the AI's response
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("Empty response from Groq API");
    }

    console.log("📝 AI Response:", aiResponse.substring(0, 200) + "...");

    // Parse JSON response
    const cleanedResponse = aiResponse.trim().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    let parsed: any;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      console.error("Response received:", cleanedResponse.substring(0, 500));
      throw new Error("Failed to parse AI response. The model returned invalid JSON.");
    }

    // Check for error response
    if (parsed.error) {
      throw new Error(parsed.error);
    }

    // Validate required fields
    if (!parsed.foodItems || !parsed.nutrition || !parsed.healthScore) {
      console.warn("⚠️ Incomplete response from AI:", parsed);
      throw new Error("AI response is missing required fields. Please try again.");
    }

    // Construct meal scan object
    const foodItems: FoodItem[] = parsed.foodItems.map((item: any) => ({
      name: item.name || "Unknown Food",
      quantity: item.quantity || "Unknown",
      confidence: item.confidence || 0.7,
    }));

    const nutrition: NutritionData = {
      calories: parsed.nutrition?.calories || 0,
      protein: parsed.nutrition?.protein || 0,
      carbs: parsed.nutrition?.carbs || 0,
      fat: parsed.nutrition?.fat || 0,
      fiber: parsed.nutrition?.fiber || 0,
      sugar: parsed.nutrition?.sugar || 0,
    };

    const healthAnalysis: HealthAnalysis = {
      score: Math.min(100, Math.max(0, parsed.healthScore || 50)),
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

    console.log("✨ Analysis complete!");
    console.log(`📊 Found ${foodItems.length} food items`);
    console.log(`🔥 ${nutrition.calories} calories`);
    console.log(`⭐ Health score: ${healthAnalysis.score}/100`);

    return mealScan;
  } catch (error) {
    console.error("❌ Food analysis error:", error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Failed to analyze food image. Please try again.");
  }
}

/**
 * Check if Groq API key is configured
 */
export function isGroqConfigured(): boolean {
  return GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE' && GROQ_API_KEY.length > 0;
}

/**
 * Get Groq API status and limits
 */
export async function getGroqStatus(): Promise<{
  configured: boolean;
  model: string;
  freeLimit: string;
}> {
  return {
    configured: isGroqConfigured(),
    model: "Llama 3.2 Vision 11B (Meta)",
    freeLimit: "14,400 requests/day (FREE)",
  };
}
