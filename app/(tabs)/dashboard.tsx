import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TrendingUp, Target, Calendar, Award, Flame, Apple } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMeals } from "@/contexts/MealsContext";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { Shadows } from "@/constants/shadows";
import { useMemo } from "react";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { meals } = useMeals();
  const { profile } = useUser();
  const { colors } = useTheme();
  const { t } = useTranslation();

  // Calculate today's nutrition totals
  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayMeals = meals.filter(
      (meal) => new Date(meal.timestamp).toDateString() === today
    );

    return todayMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.nutrition.calories,
        protein: acc.protein + meal.nutrition.protein,
        carbs: acc.carbs + meal.nutrition.carbs,
        fat: acc.fat + meal.nutrition.fat,
        mealsCount: acc.mealsCount + 1,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, mealsCount: 0 }
    );
  }, [meals]);

  // Calculate weekly stats
  const weeklyStats = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weekMeals = meals.filter((meal) => meal.timestamp >= sevenDaysAgo.getTime());

    const avgScore =
      weekMeals.length > 0
        ? Math.round(
            weekMeals.reduce((sum, meal) => sum + meal.healthAnalysis.score, 0) /
              weekMeals.length
          )
        : 0;

    return {
      totalMeals: weekMeals.length,
      avgScore,
      totalCalories: weekMeals.reduce((sum, meal) => sum + meal.nutrition.calories, 0),
    };
  }, [meals]);

  const calorieProgress = Math.min(
    (todayStats.calories / profile.goals.dailyCalories) * 100,
    100
  );
  const proteinProgress = Math.min(
    (todayStats.protein / profile.goals.dailyProtein) * 100,
    100
  );
  const carbsProgress = Math.min((todayStats.carbs / profile.goals.dailyCarbs) * 100, 100);
  const fatProgress = Math.min((todayStats.fat / profile.goals.dailyFat) * 100, 100);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return colors.success;
    if (progress >= 70) return colors.primary;
    if (progress >= 40) return colors.warning;
    return colors.danger;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundGray }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.heroCard, Shadows.lg]}
      >
        <View style={styles.heroContent}>
          <Text style={styles.greeting}>Hello, {profile.name}! 👋</Text>
          <Text style={styles.heroSubtitle}>Here's your nutrition overview</Text>
        </View>
        <View style={styles.heroStats}>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{todayStats.mealsCount}</Text>
            <Text style={styles.heroStatLabel}>Meals Today</Text>
          </View>
          <View style={[styles.heroDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{todayStats.calories}</Text>
            <Text style={styles.heroStatLabel}>Calories</Text>
          </View>
          <View style={[styles.heroDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{Math.round(calorieProgress)}%</Text>
            <Text style={styles.heroStatLabel}>Progress</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Today's Progress */}
      <View style={[styles.section, { backgroundColor: colors.surface }, Shadows.md]}>
        <View style={styles.sectionHeader}>
          <Target size={20} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dailyGoals')}</Text>
        </View>

        <View style={styles.goalsList}>
          {/* Calories */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Flame size={18} color={colors.danger} strokeWidth={2} />
              <Text style={[styles.goalLabel, { color: colors.text }]}>{t('calories')}</Text>
            </View>
            <Text style={[styles.goalValue, { color: colors.text }]}>
              {todayStats.calories} / {profile.goals.dailyCalories}
            </Text>
            <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${calorieProgress}%`,
                    backgroundColor: getProgressColor(calorieProgress),
                  },
                ]}
              />
            </View>
          </View>

          {/* Protein */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Apple size={18} color={colors.primary} strokeWidth={2} />
              <Text style={[styles.goalLabel, { color: colors.text }]}>{t('protein')}</Text>
            </View>
            <Text style={[styles.goalValue, { color: colors.text }]}>
              {todayStats.protein}g / {profile.goals.dailyProtein}g
            </Text>
            <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${proteinProgress}%`,
                    backgroundColor: getProgressColor(proteinProgress),
                  },
                ]}
              />
            </View>
          </View>

          {/* Carbs */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <TrendingUp size={18} color={colors.warning} strokeWidth={2} />
              <Text style={[styles.goalLabel, { color: colors.text }]}>{t('carbs')}</Text>
            </View>
            <Text style={[styles.goalValue, { color: colors.text }]}>
              {todayStats.carbs}g / {profile.goals.dailyCarbs}g
            </Text>
            <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${carbsProgress}%`,
                    backgroundColor: getProgressColor(carbsProgress),
                  },
                ]}
              />
            </View>
          </View>

          {/* Fat */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <TrendingUp size={18} color={colors.secondary} strokeWidth={2} />
              <Text style={[styles.goalLabel, { color: colors.text }]}>{t('fat')}</Text>
            </View>
            <Text style={[styles.goalValue, { color: colors.text }]}>
              {todayStats.fat}g / {profile.goals.dailyFat}g
            </Text>
            <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${fatProgress}%`,
                    backgroundColor: getProgressColor(fatProgress),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Weekly Overview */}
      <View style={[styles.section, { backgroundColor: colors.surface }, Shadows.md]}>
        <View style={styles.sectionHeader}>
          <Calendar size={20} color={colors.secondary} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('weeklyStats')}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.backgroundGray }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{weeklyStats.totalMeals}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('totalMeals')}</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.backgroundGray }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {weeklyStats.avgScore}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg. Score</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.backgroundGray }]}>
            <Text style={[styles.statValue, { color: colors.warning }]}>
              {Math.round(weeklyStats.totalCalories / 7)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('avgCalories')}</Text>
          </View>
        </View>
      </View>

      {/* Insights */}
      <View style={[styles.section, { backgroundColor: colors.surface }, Shadows.md]}>
        <View style={styles.sectionHeader}>
          <Award size={20} color={colors.success} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('insights')}</Text>
        </View>

        <View style={[styles.insightCard, { backgroundColor: colors.secondaryLight }]}>
          <Text style={[styles.insightText, { color: colors.text }]}>
            {todayStats.mealsCount === 0
              ? "🍽️ Start your day by scanning your first meal!"
              : todayStats.mealsCount === 1
              ? "💪 Great start! Keep tracking your meals."
              : todayStats.mealsCount === 2
              ? "🔥 You're on a roll! Keep it up."
              : "⭐ Excellent tracking today!"}
          </Text>
        </View>

        {calorieProgress < 50 && todayStats.mealsCount > 0 && (
          <View style={[styles.insightCard, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.insightText, { color: colors.text }]}>
              💡 You're at {Math.round(calorieProgress)}% of your calorie goal. Consider adding
              another meal or snack.
            </Text>
          </View>
        )}

        {proteinProgress < 60 && todayStats.mealsCount > 1 && (
          <View style={[styles.insightCard, { backgroundColor: colors.accentLight }]}>
            <Text style={[styles.insightText, { color: colors.text }]}>
              🥩 Your protein intake is low. Add some lean protein to your next meal.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 20,
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 8,
  },
  heroContent: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#FFF",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500" as const,
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  heroStatItem: {
    alignItems: "center",
  },
  heroStatValue: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500" as const,
  },
  heroDivider: {
    width: 1,
    height: 40,
  },
  section: {
    borderRadius: 20,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600" as const,
  },
  goalsList: {
    gap: 16,
  },
  goalCard: {
    gap: 8,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  goalLabel: {
    fontSize: 15,
    fontWeight: "500" as const,
  },
  goalValue: {
    fontSize: 18,
    fontWeight: "700" as const,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  insightCard: {
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
