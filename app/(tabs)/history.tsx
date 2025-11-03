import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { Image } from "expo-image";
import { Clock, Trash2, Search, Filter, X, TrendingDown, TrendingUp } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMeals } from "@/contexts/MealsContext";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { Shadows } from "@/constants/shadows";
import type { MealScan } from "@/types/nutrition";
import { useState, useMemo } from "react";

type SortOption = "newest" | "oldest" | "highest-score" | "lowest-score" | "highest-cal" | "lowest-cal";
type FilterOption = "all" | "excellent" | "good" | "moderate" | "poor";

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { meals, deleteMeal, setCurrentScan } = useMeals();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showFilters, setShowFilters] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" }) + 
             ` at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(t('delete'), "Are you sure you want to delete this meal scan?", [
      { text: t('cancel'), style: "cancel" },
      {
        text: t('delete'),
        style: "destructive",
        onPress: () => deleteMeal(id),
      },
    ]);
  };

  const handleMealPress = (meal: MealScan) => {
    setCurrentScan(meal);
    router.push("/result");
  };

  // Filter and sort meals
  const filteredAndSortedMeals = useMemo(() => {
    let filtered = meals;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((meal) =>
        meal.foodItems.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((meal) => meal.healthAnalysis.status === filterBy);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.timestamp - a.timestamp;
        case "oldest":
          return a.timestamp - b.timestamp;
        case "highest-score":
          return b.healthAnalysis.score - a.healthAnalysis.score;
        case "lowest-score":
          return a.healthAnalysis.score - b.healthAnalysis.score;
        case "highest-cal":
          return b.nutrition.calories - a.nutrition.calories;
        case "lowest-cal":
          return a.nutrition.calories - b.nutrition.calories;
        default:
          return 0;
      }
    });

    return sorted;
  }, [meals, searchQuery, filterBy, sortBy]);

  const renderMealItem = ({ item }: { item: MealScan }) => {
    const statusColor =
      item.healthAnalysis.status === "excellent"
        ? colors.success
        : item.healthAnalysis.status === "good"
        ? colors.primary
        : item.healthAnalysis.status === "moderate"
        ? colors.warning
        : colors.danger;

    return (
      <TouchableOpacity
        style={[styles.mealCard, { backgroundColor: colors.surface }, Shadows.md]}
        onPress={() => handleMealPress(item)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.imageUri }} style={[styles.mealImage, { backgroundColor: colors.backgroundGray }]} contentFit="cover" />
        <View style={styles.mealInfo}>
          <View style={styles.mealHeader}>
            <Text style={[styles.foodName, { color: colors.text }]} numberOfLines={1}>
              {item.foodItems.map((f) => f.name).join(", ") || "Unknown Food"}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={8}>
              <Trash2 size={20} color={colors.textLight} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.nutritionSummary}>
            <Text style={[styles.caloriesText, { color: colors.primary }]}>{item.nutrition.calories} cal</Text>
            <View style={[styles.dot, { backgroundColor: colors.textLight }]} />
            <Text style={[styles.macroText, { color: colors.textSecondary }]}>P: {item.nutrition.protein}g</Text>
            <View style={[styles.dot, { backgroundColor: colors.textLight }]} />
            <Text style={[styles.macroText, { color: colors.textSecondary }]}>C: {item.nutrition.carbs}g</Text>
            <View style={[styles.dot, { backgroundColor: colors.textLight }]} />
            <Text style={[styles.macroText, { color: colors.textSecondary }]}>F: {item.nutrition.fat}g</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.timeContainer}>
              <Clock size={14} color={colors.textLight} strokeWidth={2} />
              <Text style={[styles.timeText, { color: colors.textLight }]}>{formatDate(item.timestamp)}</Text>
            </View>
            <View style={[styles.scoreBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.scoreText}>{item.healthAnalysis.score}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (meals.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Clock size={64} color={colors.textLight} strokeWidth={1.5} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>{t('noHistory')}</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Your meal scan history will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundGray }]}>
      {/* Search and Filter Header */}
      <View style={[styles.headerContainer, { paddingTop: insets.top + 12, backgroundColor: colors.surface, borderBottomColor: colors.borderLight }]}>
        <View style={[styles.searchContainer, { backgroundColor: colors.backgroundGray }]}>
          <Search size={20} color={colors.textLight} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('search')}
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={20} color={colors.textLight} strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.backgroundGray }, showFilters && { backgroundColor: colors.primaryLight }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={showFilters ? colors.primary : colors.text} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      {showFilters && (
        <View style={[styles.filterPanel, { backgroundColor: colors.surface, borderBottomColor: colors.borderLight }]}>
          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: colors.textSecondary }]}>{t('sortBy')}</Text>
            <View style={styles.filterOptions}>
              {[
                { value: "newest", label: "Newest", icon: TrendingDown },
                { value: "oldest", label: "Oldest", icon: TrendingUp },
                { value: "highest-score", label: "Best Score", icon: TrendingUp },
                { value: "lowest-score", label: "Worst Score", icon: TrendingDown },
                { value: "highest-cal", label: "Most Calories", icon: TrendingUp },
                { value: "lowest-cal", label: "Least Calories", icon: TrendingDown },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterChip,
                    { backgroundColor: colors.backgroundGray },
                    sortBy === option.value && { backgroundColor: colors.primaryLight, borderColor: colors.primary },
                  ]}
                  onPress={() => setSortBy(option.value as SortOption)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      { color: colors.text },
                      sortBy === option.value && { color: colors.primary, fontWeight: "600" as const },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: colors.textSecondary }]}>{t('filterByStatus')}</Text>
            <View style={styles.filterOptions}>
              {[
                { value: "all", label: t('all') },
                { value: "excellent", label: t('excellent') },
                { value: "good", label: t('good') },
                { value: "moderate", label: t('moderate') },
                { value: "poor", label: t('poor') },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterChip,
                    { backgroundColor: colors.backgroundGray },
                    filterBy === option.value && { backgroundColor: colors.primaryLight, borderColor: colors.primary },
                  ]}
                  onPress={() => setFilterBy(option.value as FilterOption)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      { color: colors.text },
                      filterBy === option.value && { color: colors.primary, fontWeight: "600" as const },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Results Count */}
      <View style={[styles.resultsContainer, { backgroundColor: colors.backgroundGray }]}>
        <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
          {filteredAndSortedMeals.length} {filteredAndSortedMeals.length === 1 ? t('meal') : t('meals')}
        </Text>
      </View>

      {/* Meals List */}
      {filteredAndSortedMeals.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Search size={48} color={colors.textLight} strokeWidth={1.5} />
          <Text style={[styles.noResultsText, { color: colors.text }]}>{t('noMealsFound')}</Text>
          <Text style={[styles.noResultsSubtext, { color: colors.textSecondary }]}>Try adjusting your search or filters</Text>
        </View>
      ) : (
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={filteredAndSortedMeals}
          renderItem={renderMealItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  mealCard: {
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
  },
  mealImage: {
    width: 120,
    height: 120,
  },
  mealInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  foodName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600" as const,
    marginRight: 8,
  },
  nutritionSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
  macroText: {
    fontSize: 13,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
    borderBottomWidth: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  filterPanel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 16,
  },
  filterSection: {
    gap: 8,
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: "600" as const,
    textTransform: "uppercase",
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500" as const,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 13,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginTop: 12,
  },
  noResultsSubtext: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
