import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Camera, ImageIcon, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMeals } from "@/contexts/MealsContext";
import { analyzeFoodImage } from "@/utils/foodAnalyzer";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";

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
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleTakePhoto}
              activeOpacity={0.7}
            >
              <Camera size={24} color="#FFF" strokeWidth={2} />
              <Text style={styles.primaryButtonText}>{t('takePhoto')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.background, borderWidth: 2, borderColor: colors.border }]}
              onPress={handlePickImage}
              activeOpacity={0.7}
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
              style={[styles.button, { backgroundColor: colors.background, borderWidth: 2, borderColor: colors.border }]}
              onPress={() => setSelectedImage(null)}
              activeOpacity={0.7}
              disabled={isAnalyzing}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Change Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleAnalyze}
              activeOpacity={0.7}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Sparkles size={24} color="#FFF" strokeWidth={2} />
                  <Text style={styles.primaryButtonText}>{t('analyzeFood')}</Text>
                </>
              )}
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
    fontSize: 28,
    fontWeight: "700" as const,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "600" as const,
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
    padding: 20,
    gap: 12,
    justifyContent: "center",
  },
});
