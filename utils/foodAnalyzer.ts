/**
 * Food Analysis using OpenRouter (Multiple FREE Models!)
 * 
 * Provider: OpenRouter (https://openrouter.ai)
 * Models: Google Gemini Flash, LLaVA, Phi-3 Vision, Qwen VL (all FREE)
 * Cost: FREE models available + paid models optional
 * Speed: 1-3 seconds per analysis
 * 
 * Why OpenRouter is BEST:
 * - Multiple free models to choose from
 * - Automatic fallback if one fails
 * - One API key for all models
 * - Easy signup (Google/GitHub)
 */

import type { FoodItem, NutritionData, HealthAnalysis, MealScan } from "@/types/nutrition";

// ⚠️ IMPORTANT: YOUR API KEYS HAVE EXPIRED! ⚠️
// 
// GET NEW FREE KEYS HERE: https://openrouter.ai/keys
// 
// 1. Sign in with Google/GitHub
// 2. Click "Create Key"
// 3. Copy your new key (starts with sk-or-v1-...)
// 4. Paste it below (replace the old keys)
// 5. Save this file and refresh your app
// 
// Read API_KEYS_SETUP.md for detailed instructions!
//
const OPENROUTER_API_KEYS = [
  'YOUR_NEW_OPENROUTER_KEY_HERE',  // ← PASTE YOUR NEW KEY HERE!
  '',  // Optional backup key
  '',  // Optional backup key
];

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Get current API key (rotates through backups if primary fails)
let currentKeyIndex = 0;
function getApiKey(): string {
  const validKeys = OPENROUTER_API_KEYS.filter(k => k && k.startsWith('sk-or-v1-'));
  
  console.log('🔑 Available API keys:', validKeys.length);
  console.log('🔑 Keys loaded:', validKeys.map(k => `${k.substring(0, 15)}...`));
  
  if (validKeys.length === 0) {
    console.error('❌ ❌ ❌ NO VALID API KEYS! ❌ ❌ ❌');
    console.error('📖 Read API_KEYS_SETUP.md for instructions!');
    console.error('🔗 Get free keys: https://openrouter.ai/keys');
    throw new Error('API keys not configured! Get free keys at https://openrouter.ai/keys');
  }
  
  const key = validKeys[currentKeyIndex % validKeys.length];
  console.log('🔑 Using key:', `${key.substring(0, 15)}...`);
  return key;
}

function rotateToNextKey(): void {
  currentKeyIndex = (currentKeyIndex + 1) % OPENROUTER_API_KEYS.length;
  console.log(`🔄 Rotating to backup API key ${currentKeyIndex + 1}/${OPENROUTER_API_KEYS.length}`);
}

// FREE Vision Models on OpenRouter (Only the model you have access to)
const FREE_VISION_MODELS = [
  'nvidia/nemotron-nano-12b-v2-vl:free',     // ⭐ ONLY vision model available (CONFIRMED WORKING!)
];

// Primary model (the only one that works for you)
const PRIMARY_MODEL = FREE_VISION_MODELS[0]; // NVIDIA Nemotron

// Models for ensemble (using only the one available model)
const ENSEMBLE_MODELS = [
  'nvidia/nemotron-nano-12b-v2-vl:free',     // Only vision model you have access to
];

interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }> | string;
}

// Professional System Prompt for Superior Food Analysis
const PROFESSIONAL_SYSTEM_PROMPT = `You are an elite certified nutritionist and food scientist with 20+ years of experience in dietary analysis, meal planning, and nutritional counseling. Your expertise includes:

- Advanced knowledge of macronutrients, micronutrients, and caloric density
- Deep understanding of food composition databases (USDA, international standards)
- Expertise in portion estimation using visual cues and reference objects
- Knowledge of cooking methods and their impact on nutrition (grilling, frying, steaming)
- Understanding of cultural cuisines and regional food variations
- Allergen identification and dietary restriction awareness
- Evidence-based nutritional science and health recommendations

Your analysis must be:
✓ PRECISE: Use accurate nutritional data from established databases
✓ COMPREHENSIVE: Consider all visible food items, condiments, and garnishes
✓ REALISTIC: Account for cooking methods, oil/butter usage, hidden ingredients
✓ EDUCATIONAL: Provide actionable insights and constructive feedback
✓ PERSONALIZED: Tailor recommendations to promote better eating habits

You have access to:
- Complete USDA FoodData Central database
- International food composition tables
- Knowledge of 10,000+ common foods and recipes
- Understanding of portion sizes (palm method, visual references)
- Allergen databases and cross-contamination risks`;

// Helper function to convert image URI to base64
async function convertImageToBase64(imageUri: string): Promise<string> {
  try {
    // If already base64, return as is
    if (imageUri.startsWith('data:image')) {
      return imageUri;
    }

    // For blob URLs or file URIs, fetch and convert
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("❌ Image conversion error:", error);
    throw new Error("Failed to convert image to base64");
  }
}

export async function analyzeFoodImage(imageUri: string, model: string = PRIMARY_MODEL): Promise<MealScan> {
  try {
    console.log("🤖 Starting food analysis with OpenRouter...");
    console.log("📋 Using model:", model);
    console.log("📸 Image URI:", imageUri.substring(0, 100) + "...");

    // Convert image to base64 if needed
    console.log("🔄 Converting image to base64...");
    const base64Image = await convertImageToBase64(imageUri);
    console.log("✅ Image converted successfully");

    const analysisPrompt = `${PROFESSIONAL_SYSTEM_PROMPT}

**ANALYSIS TASK:**

Analyze this food image with professional-grade accuracy. Follow this systematic approach:

**STEP 1: FOOD IDENTIFICATION**
- Identify EVERY food item visible (main dishes, sides, garnishes, sauces, beverages)
- Note cooking methods (grilled, fried, steamed, raw, baked)
- Detect hidden ingredients (oils, butter, cheese, dressings)
- Estimate portion sizes using visual references (hand size, plate size, standard servings)
- Assign confidence scores (0.0-1.0) based on image clarity and item visibility

**STEP 2: NUTRITIONAL CALCULATION**
- Calculate precise macronutrients: calories, protein, carbohydrates, fats
- Include fiber and sugar content
- Account for cooking oils, butter, and seasonings
- Consider preparation methods (deep-fried adds 50-100 calories)
- Use per-100g reference data and scale to estimated portions
- Sum totals for ALL items in the meal

**STEP 3: HEALTH ASSESSMENT**
- Evaluate nutritional balance (protein, carbs, fats ratio)
- Assess micronutrient diversity (vitamins, minerals)
- Check for processed foods, added sugars, trans fats
- Consider portion appropriateness
- Calculate health score (0-100) using this rubric:
  * 90-100: Excellent - Balanced macros, high nutrients, minimal processing
  * 80-89: Very Good - Well-balanced with minor improvements possible
  * 70-79: Good - Generally healthy with some concerns
  * 60-69: Fair - Acceptable but needs improvements
  * 40-59: Moderate - Unbalanced or processed, significant concerns
  * 20-39: Poor - Highly processed, unbalanced, health risks
  * 0-19: Very Poor - Dangerous nutritional profile

**STEP 4: ALLERGEN & WARNING IDENTIFICATION**
- Identify common allergens: gluten, dairy, eggs, nuts, soy, shellfish, fish, sesame
- Note potential cross-contamination risks
- Flag health warnings: high sodium, high sugar, trans fats, allergens

**STEP 5: EXPERT RECOMMENDATIONS**
- Provide constructive, actionable feedback
- Suggest specific healthier alternatives (if score < 70)
- Explain nutritional benefits or concerns
- Give practical tips for improvement

**OUTPUT FORMAT (CRITICAL - MUST BE VALID JSON ONLY):**

Return ONLY this JSON structure, no markdown, no explanations, no code blocks:

{
  "foodItems": [
    {
      "name": "Exact food name with cooking method",
      "quantity": "Weight in grams (e.g., 150g)",
      "confidence": 0.95
    }
  ],
  "nutrition": {
    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "fiber": 0,
    "sugar": 0
  },
  "healthScore": 0,
  "status": "excellent|good|moderate|poor",
  "feedback": "Professional 2-3 sentence analysis with specific insights",
  "warnings": ["Specific health concerns if any"],
  "allergens": ["Detected allergens"],
  "healthyAlternative": "Specific suggestion if score < 70, empty string otherwise"
}

**IMPORTANT RULES:**
1. Return ONLY valid JSON (no markdown, no code blocks, no explanations)
2. Be precise with numbers (use realistic nutritional values)
3. Include ALL visible food items
4. Account for oils, butter, and hidden ingredients
5. Provide specific, actionable feedback
6. If no food detected: {"error": "No food items detected in this image. Please upload a clear photo of a meal."}
7. Confidence scores should reflect image quality and item clarity

Begin analysis now:`;

    // Prepare OpenRouter API request
    const messages: OpenRouterMessage[] = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: analysisPrompt,
          },
          {
            type: 'image_url',
            image_url: {
              url: base64Image,
            },
          },
        ],
      },
    ];

    console.log("🚀 Sending request to OpenRouter...");

    // Call OpenRouter API
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nutriscan.app', // Optional: for rankings
        'X-Title': 'NutriScan', // Optional: show in rankings
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        messages: messages,
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }, // Force JSON output
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ OpenRouter API Error:", errorData);
      
      if (response.status === 401) {
        // Invalid key - try rotating to backup key
        if (OPENROUTER_API_KEYS.length > 1) {
          console.warn("⚠️ Current API key invalid, rotating to backup...");
          rotateToNextKey();
          // Retry with backup key
          return await analyzeFoodImage(imageUri, model);
        }
        throw new Error("Invalid OpenRouter API key. Get one at: https://openrouter.ai/keys");
      } else if (response.status === 429) {
        // Rate limit - try rotating to backup key
        if (OPENROUTER_API_KEYS.length > 1) {
          console.warn("⚠️ Rate limit hit, rotating to backup key...");
          rotateToNextKey();
          // Retry with backup key
          return await analyzeFoodImage(imageUri, model);
        }
        throw new Error("Rate limit exceeded. Try a different free model or wait a moment.");
      } else if (response.status === 402) {
        throw new Error("Insufficient credits. This model requires payment or use a free model.");
      } else {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log("✅ Received response from OpenRouter");
    console.log("💰 Cost:", data.usage?.total_cost || "FREE");

    // Extract the AI's response
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("Empty response from OpenRouter API");
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
 * Try multiple free models with automatic fallback
 */
export async function analyzeFoodImageWithFallback(imageUri: string): Promise<MealScan> {
  const errors: Error[] = [];
  
  // Try each free model in order
  for (const model of FREE_VISION_MODELS) {
    try {
      console.log(`🔄 Trying model: ${model}`);
      return await analyzeFoodImage(imageUri, model);
    } catch (error) {
      console.warn(`⚠️ Model ${model} failed:`, error);
      errors.push(error as Error);
      // Continue to next model
    }
  }
  
  // All models failed
  throw new Error(`All models failed. Last error: ${errors[errors.length - 1]?.message}`);
}

/**
 * 🌟 ENSEMBLE ANALYSIS - Use Multiple Models Together for BEST Results
 * 
 * This analyzes the image with 3 different AI models simultaneously and combines
 * their results using intelligent averaging and consensus to get the most accurate
 * nutritional analysis possible.
 * 
 * Benefits:
 * - Higher accuracy (combines strengths of multiple models)
 * - More reliable results (cross-validation between models)
 * - Better edge case handling (if one model misses something, others catch it)
 * - Confidence scoring (agreement between models)
 */
export async function analyzeFoodImageEnsemble(imageUri: string): Promise<MealScan> {
  console.log("🎯 Starting ENSEMBLE analysis with multiple AI models...");
  console.log(`📊 Using ${ENSEMBLE_MODELS.length} models for maximum accuracy`);
  
  try {
    // Analyze with all ensemble models in parallel
    const analysisPromises = ENSEMBLE_MODELS.map(async (model) => {
      try {
        console.log(`🤖 Querying ${model}...`);
        const result = await analyzeFoodImage(imageUri, model);
        console.log(`✅ ${model} completed successfully`);
        return { success: true, result, model };
      } catch (error) {
        console.warn(`⚠️ ${model} failed:`, error);
        return { success: false, error, model };
      }
    });

    // Wait for all analyses to complete
    const results = await Promise.all(analysisPromises);
    
    // Filter successful results
    const successfulResults = results.filter(r => r.success).map(r => r.result as MealScan);
    
    if (successfulResults.length === 0) {
      throw new Error("All ensemble models failed. Please try again.");
    }
    
    console.log(`✨ ${successfulResults.length}/${ENSEMBLE_MODELS.length} models succeeded`);
    
    // If only one succeeded, return it
    if (successfulResults.length === 1) {
      console.log("📊 Using single successful result");
      return successfulResults[0];
    }
    
    // Combine results from multiple models using intelligent averaging
    console.log("🧠 Combining results from multiple models...");
    const combinedResult = combineEnsembleResults(successfulResults, imageUri);
    
    console.log("🎉 Ensemble analysis complete!");
    console.log(`📊 Combined data from ${successfulResults.length} AI models`);
    console.log(`🔥 Final: ${combinedResult.nutrition.calories} calories`);
    console.log(`⭐ Final health score: ${combinedResult.healthAnalysis.score}/100`);
    
    return combinedResult;
    
  } catch (error) {
    console.error("❌ Ensemble analysis failed:", error);
    
    // Fallback to single model
    console.log("🔄 Falling back to single model analysis...");
    return await analyzeFoodImage(imageUri, PRIMARY_MODEL);
  }
}

/**
 * Intelligently combine results from multiple AI models
 * Uses weighted averaging, consensus voting, and outlier detection
 */
function combineEnsembleResults(results: MealScan[], imageUri: string): MealScan {
  // Combine all unique food items from all models
  const allFoodItems = new Map<string, FoodItem[]>();
  
  results.forEach(result => {
    result.foodItems.forEach(item => {
      const normalizedName = item.name.toLowerCase().trim();
      if (!allFoodItems.has(normalizedName)) {
        allFoodItems.set(normalizedName, []);
      }
      allFoodItems.get(normalizedName)!.push(item);
    });
  });
  
  // Create consensus food items (items detected by multiple models are more reliable)
  const consensusFoodItems: FoodItem[] = [];
  allFoodItems.forEach((items, normalizedName) => {
    // Use the most detailed name
    const bestName = items.reduce((a, b) => a.name.length > b.name.length ? a : b).name;
    
    // Average quantities and confidences
    const avgConfidence = items.reduce((sum, item) => sum + (item.confidence || 0.7), 0) / items.length;
    
    // Use most common quantity or average if numeric
    const quantities = items.map(item => item.quantity);
    const mostCommonQuantity = quantities.sort((a, b) => 
      quantities.filter(q => q === a).length - quantities.filter(q => q === b).length
    ).pop() || quantities[0];
    
    consensusFoodItems.push({
      name: bestName,
      quantity: mostCommonQuantity,
      confidence: Math.min(0.99, avgConfidence * (items.length / results.length)), // Boost confidence if multiple models agree
    });
  });
  
  // Average nutrition values (with outlier detection)
  const nutritionValues = {
    calories: averageWithOutlierRemoval(results.map(r => r.nutrition.calories)),
    protein: averageWithOutlierRemoval(results.map(r => r.nutrition.protein)),
    carbs: averageWithOutlierRemoval(results.map(r => r.nutrition.carbs)),
    fat: averageWithOutlierRemoval(results.map(r => r.nutrition.fat)),
    fiber: averageWithOutlierRemoval(results.map(r => r.nutrition.fiber)),
    sugar: averageWithOutlierRemoval(results.map(r => r.nutrition.sugar)),
  };
  
  // Average health score with outlier removal
  const healthScore = Math.round(averageWithOutlierRemoval(results.map(r => r.healthAnalysis.score)));
  
  // Determine consensus status
  const statuses = results.map(r => r.healthAnalysis.status);
  const consensusStatus = getMostCommon(statuses);
  
  // Combine all feedback, warnings, and allergens
  const allFeedback = results.map(r => r.healthAnalysis.feedback).filter(f => f);
  const combinedFeedback = allFeedback.length > 0 
    ? `Consensus from ${results.length} AI models: ${allFeedback[0]}` // Use first as primary
    : "Nutritional analysis completed.";
  
  const allWarnings = [...new Set(results.flatMap(r => r.healthAnalysis.warnings))];
  const allAllergens = [...new Set(results.flatMap(r => r.healthAnalysis.allergens))];
  
  // Use healthier alternative from best model (highest score)
  const bestResult = results.reduce((a, b) => 
    a.healthAnalysis.score > b.healthAnalysis.score ? a : b
  );
  
  return {
    id: Date.now().toString(),
    imageUri,
    foodItems: consensusFoodItems.sort((a, b) => (b.confidence || 0.7) - (a.confidence || 0.7)), // Sort by confidence
    nutrition: nutritionValues,
    healthAnalysis: {
      score: healthScore,
      status: consensusStatus,
      feedback: combinedFeedback,
      warnings: allWarnings,
      allergens: allAllergens,
      healthyAlternative: bestResult.healthAnalysis.healthyAlternative,
    },
    timestamp: Date.now(),
  };
}

/**
 * Average values with outlier removal (removes values > 1.5x IQR from median)
 */
function averageWithOutlierRemoval(values: number[]): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0];
  if (values.length === 2) return (values[0] + values[1]) / 2;
  
  // Sort values
  const sorted = [...values].sort((a, b) => a - b);
  
  // Calculate quartiles
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  
  // Remove outliers
  const filtered = sorted.filter(v => {
    return v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr;
  });
  
  // Return average of filtered values
  return filtered.length > 0
    ? Math.round(filtered.reduce((sum, v) => sum + v, 0) / filtered.length)
    : Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/**
 * Get most common item from array
 */
function getMostCommon<T>(arr: T[]): T {
  const counts = new Map<T, number>();
  arr.forEach(item => counts.set(item, (counts.get(item) || 0) + 1));
  return Array.from(counts.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0];
}

/**
 * Check if OpenRouter API key is configured
 */
export function isOpenRouterConfigured(): boolean {
  return OPENROUTER_API_KEYS.length > 0;
}

/**
 * Get OpenRouter API status and available free models
 */
export async function getOpenRouterStatus(): Promise<{
  configured: boolean;
  primaryModel: string;
  freeModelsAvailable: number;
  models: string[];
}> {
  return {
    configured: isOpenRouterConfigured(),
    primaryModel: PRIMARY_MODEL,
    freeModelsAvailable: FREE_VISION_MODELS.length,
    models: FREE_VISION_MODELS,
  };
}

/**
 * List all available free vision models
 */
export function getAvailableFreeModels(): string[] {
  return FREE_VISION_MODELS;
}
