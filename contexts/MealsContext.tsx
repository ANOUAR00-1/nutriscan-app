import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { MealScan, AnalysisState } from "@/types/nutrition";

const STORAGE_KEY = "nutriscan_meals";

export const [MealsProvider, useMeals] = createContextHook(() => {
  const [meals, setMeals] = useState<MealScan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isAnalyzing: false,
    error: null,
    currentScan: null,
  });

  const loadMeals = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMeals(parsed);
      }
    } catch (error) {
      console.error("Failed to load meals:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveMeals = useCallback(async (updatedMeals: MealScan[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
    } catch (error) {
      console.error("Failed to save meals:", error);
    }
  }, []);

  const addMeal = useCallback(
    async (meal: MealScan) => {
      const updatedMeals = [meal, ...meals];
      await saveMeals(updatedMeals);
    },
    [meals, saveMeals]
  );

  const deleteMeal = useCallback(
    async (id: string) => {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      await saveMeals(updatedMeals);
    },
    [meals, saveMeals]
  );

  const clearAllMeals = useCallback(async () => {
    await saveMeals([]);
  }, [saveMeals]);

  const setAnalyzing = useCallback((isAnalyzing: boolean) => {
    setAnalysisState((prev) => ({ ...prev, isAnalyzing, error: null }));
  }, []);

  const setAnalysisError = useCallback((error: string) => {
    setAnalysisState((prev) => ({ ...prev, isAnalyzing: false, error }));
  }, []);

  const setCurrentScan = useCallback((scan: MealScan | null) => {
    setAnalysisState((prev) => ({ ...prev, currentScan: scan }));
  }, []);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  return useMemo(() => ({
    meals,
    isLoading,
    analysisState,
    addMeal,
    deleteMeal,
    clearAllMeals,
    setAnalyzing,
    setAnalysisError,
    setCurrentScan,
  }), [meals, isLoading, analysisState, addMeal, deleteMeal, clearAllMeals, setAnalyzing, setAnalysisError, setCurrentScan]);
});
