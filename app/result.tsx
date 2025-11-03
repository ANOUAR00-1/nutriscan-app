import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, CheckCircle, AlertCircle, Flame, Apple } from "lucide-react-native";
import { useMeals } from "@/contexts/MealsContext";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useRef } from "react";

export default function ResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { analysisState } = useMeals();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const currentScan = analysisState.currentScan;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!currentScan) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <AlertCircle size={64} color={colors.danger} strokeWidth={1.5} />
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>{t('noScanData')}</Text>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{t('goBack')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { foodItems, nutrition, healthAnalysis, imageUri } = currentScan;

  const getStatusColor = () => {
    switch (healthAnalysis.status) {
      case "excellent":
        return colors.success;
      case "good":
        return colors.primary;
      case "moderate":
        return colors.warning;
      case "poor":
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = () => {
    switch (healthAnalysis.status) {
      case "excellent":
        return t('excellent');
      case "good":
        return t('good');
      case "moderate":
        return t('moderate');
      case "poor":
        return t('poor');
      default:
        return t('nutritionAnalysis');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundGray }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12, backgroundColor: colors.surface, borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t('nutritionFacts')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: imageUri }} style={[styles.image, { backgroundColor: colors.backgroundGray }]} contentFit="cover" />

        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={[styles.scoreCard, { backgroundColor: colors.surface, borderColor: getStatusColor() }]}>
            <View style={styles.scoreHeader}>
              <View>
                <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>{t('healthScore')}</Text>
                <Text style={[styles.statusLabel, { color: getStatusColor() }]}>
                  {getStatusLabel()}
                </Text>
              </View>
              <View style={[styles.scoreCircle, { backgroundColor: getStatusColor() }]}>
                <Text style={styles.scoreValue}>{healthAnalysis.score}</Text>
              </View>
            </View>
            <Text style={[styles.feedbackText, { color: colors.text }]}>{healthAnalysis.feedback}</Text>
          </View>

          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <View style={styles.sectionHeader}>
              <Apple size={20} color={colors.primary} strokeWidth={2} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('foodItems')}</Text>
            </View>
            <View style={styles.foodList}>
              {foodItems.map((item, index) => (
                <View key={index} style={styles.foodItem}>
                  <CheckCircle size={16} color={colors.success} strokeWidth={2} />
                  <Text style={[styles.foodName, { color: colors.text }]}>{item.name}</Text>
                  <Text style={[styles.foodQuantity, { color: colors.textSecondary }]}>{item.quantity}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <View style={styles.sectionHeader}>
              <Flame size={20} color={colors.secondary} strokeWidth={2} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('nutritionFacts')}</Text>
            </View>
            <View style={styles.nutritionGrid}>
              <View style={[styles.nutritionCard, { backgroundColor: colors.backgroundGray }]}>
                <Text style={[styles.nutritionValue, { color: colors.text }]}>{nutrition.calories}</Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>{t('calories')}</Text>
              </View>
              <View style={[styles.nutritionCard, { backgroundColor: colors.backgroundGray }]}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>
                  {nutrition.protein}g
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>{t('protein')}</Text>
              </View>
              <View style={[styles.nutritionCard, { backgroundColor: colors.backgroundGray }]}>
                <Text style={[styles.nutritionValue, { color: colors.warning }]}>
                  {nutrition.carbs}g
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>{t('carbs')}</Text>
              </View>
              <View style={[styles.nutritionCard, { backgroundColor: colors.backgroundGray }]}>
                <Text style={[styles.nutritionValue, { color: colors.secondary }]}>
                  {nutrition.fat}g
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>{t('fat')}</Text>
              </View>
              <View style={[styles.nutritionCard, { backgroundColor: colors.backgroundGray }]}>
                <Text style={[styles.nutritionValue, { color: colors.text }]}>{nutrition.fiber}g</Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>{t('fiber')}</Text>
              </View>
              <View style={[styles.nutritionCard, { backgroundColor: colors.backgroundGray }]}>
                <Text style={[styles.nutritionValue, { color: colors.text }]}>{nutrition.sugar}g</Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>{t('sugar')}</Text>
              </View>
            </View>
          </View>

          {healthAnalysis.allergens.length > 0 && (
            <View style={[styles.section, { backgroundColor: colors.secondaryLight, borderWidth: 1, borderColor: colors.secondary }]}>
              <Text style={[styles.warningSectionTitle, { color: colors.text }]}>⚠️ {t('allergens')}</Text>
              <Text style={[styles.warningText, { color: colors.text }]}>
                {healthAnalysis.allergens.join(", ")}
              </Text>
            </View>
          )}

          {healthAnalysis.healthyAlternative && (
            <View style={[styles.section, { backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: colors.primary }]}>
              <Text style={[styles.alternativeTitle, { color: colors.text }]}>💡 {t('recommendations')}</Text>
              <Text style={[styles.alternativeText, { color: colors.text }]}>{healthAnalysis.healthyAlternative}</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  scoreCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
  },
  scoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  feedbackText: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    borderRadius: 16,
    padding: 16,
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
  foodList: {
    gap: 12,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  foodName: {
    flex: 1,
    fontSize: 15,
  },
  foodQuantity: {
    fontSize: 14,
    fontWeight: "500" as const,
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  nutritionCard: {
    flex: 1,
    minWidth: "30%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 13,
  },
  warningSectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
  },
  alternativeTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 8,
  },
  alternativeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
  },
});
