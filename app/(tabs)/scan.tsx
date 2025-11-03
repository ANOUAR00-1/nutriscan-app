import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Camera, ImageIcon, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMeals } from "@/contexts/MealsContext";
import { analyzeFoodImage } from "@/utils/foodAnalyzer";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { Shadows } from "@/constants/shadows";
import LoadingScreen from "@/components/LoadingScreen";

export default function ScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addMeal, setAnalyzing, setAnalysisError, setCurrentScan } = useMeals();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzingLocal] = useState<boolean>(false);

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Camera permission is needed to take photos of your food."
        );
        return false;
      }
    }
    return true;
  };

  const handleTakePhoto = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images" as any,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images" as any,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsAnalyzingLocal(true);
    setAnalyzing(true);

    try {
      const mealScan = await analyzeFoodImage(selectedImage);
      await addMeal(mealScan);
      setCurrentScan(mealScan);
      
      setIsAnalyzingLocal(false);
      setAnalyzing(false);
      
      router.push("/result");
    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Analysis failed";
      setAnalysisError(errorMessage);
      setIsAnalyzingLocal(false);
      setAnalyzing(false);
      
      Alert.alert("Analysis Failed", errorMessage);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      {/* Loading Modal */}
      <Modal
        visible={isAnalyzing}
        transparent={false}
        animationType="fade"
      >
        <LoadingScreen text="Analyzing your food..." />
      </Modal>

      {!selectedImage ? (
        <View style={styles.emptyState}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
            <Camera size={64} color={colors.primary} strokeWidth={1.5} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{t('scanFood')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Take a photo or upload an image to get instant nutrition analysis
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleTakePhoto}
              activeOpacity={0.9}
              style={[styles.modernButton, Shadows.lg]}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <View style={styles.iconCircle}>
                  <Camera size={28} color="#FFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.primaryButtonText}>{t('takePhoto')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border }, Shadows.md]}
              onPress={handlePickImage}
              activeOpacity={0.8}
            >
              <ImageIcon size={24} color={colors.primary} strokeWidth={2} />
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>{t('chooseGallery')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage }} style={[styles.image, { backgroundColor: colors.backgroundGray }]} contentFit="cover" />

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.changeButton, { backgroundColor: colors.surface, borderColor: colors.border }, Shadows.md]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedImage(null);
              }}
              activeOpacity={0.8}
              disabled={isAnalyzing}
            >
              <Text style={[styles.changeButtonText, { color: colors.text }]}>Change Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAnalyze}
              activeOpacity={0.9}
              disabled={isAnalyzing}
              style={[styles.analyzeButton, Shadows.primary]}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Sparkles size={24} color="#FFF" strokeWidth={2} />
                <Text style={styles.primaryButtonText}>{t('analyzeFood')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800" as const,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 26,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  modernButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 2,
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: "600" as const,
  },
  previewContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  actionsContainer: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: "center",
  },
  changeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
  },
  changeButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  analyzeButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
});
