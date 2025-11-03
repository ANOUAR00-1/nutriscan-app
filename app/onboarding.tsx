import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, TrendingUp, Target, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { Shadows } from "@/constants/shadows";

const { width } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: any;
  gradient: [string, string];
}

export default function OnboardingScreen() {
  const { t } = useTranslation();
  
  const slides: OnboardingSlide[] = [
    {
      id: "1",
      titleKey: "scanYourFood",
      descriptionKey: "scanYourFoodDesc",
      icon: Camera,
      gradient: ["#3B82F6", "#2563EB"],
    },
    {
      id: "2",
      titleKey: "trackYourProgress",
      descriptionKey: "trackYourProgressDesc",
      icon: TrendingUp,
      gradient: ["#8B5CF6", "#7C3AED"],
    },
    {
      id: "3",
      titleKey: "getSmartInsights",
      descriptionKey: "getSmartInsightsDesc",
      icon: Sparkles,
      gradient: ["#06B6D4", "#0891B2"],
    },
    {
      id: "4",
      titleKey: "reachYourGoals",
      descriptionKey: "reachYourGoalsDesc",
      icon: Target,
      gradient: ["#10B981", "#059669"],
    },
  ];
  const router = useRouter();
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      router.replace("/profile-setup" as any);
    }
  };

  const handleSkip = () => {
    router.replace("/profile-setup" as any);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    const Icon = item.icon;
    
    return (
      <View style={[styles.slide, { width }]}>
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.iconContainer, Shadows.xl]}
        >
          <Icon size={80} color="#FFF" strokeWidth={1.5} />
        </LinearGradient>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{t(item.titleKey)}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {t(item.descriptionKey)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.primary }]}>{t('skip')}</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? colors.primary : colors.border,
                  width: index === currentIndex ? 32 : 8,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.9}
          style={[styles.nextButton, Shadows.lg]}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === slides.length - 1 ? t('getStarted') : t('next')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 12,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    gap: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  nextButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
});
