import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { User, Activity, Target, CheckCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/hooks/useTheme";
import { Shadows } from "@/constants/shadows";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Goal = "lose" | "maintain" | "gain";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { updateProfile, completeOnboarding } = useUser();
  const { colors } = useTheme();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", desc: "Little to no exercise" },
    { value: "light", label: "Lightly Active", desc: "Exercise 1-3 days/week" },
    { value: "moderate", label: "Moderately Active", desc: "Exercise 3-5 days/week" },
    { value: "active", label: "Very Active", desc: "Exercise 6-7 days/week" },
    { value: "very_active", label: "Extra Active", desc: "Intense exercise daily" },
  ];

  const goals = [
    { value: "lose", label: "Lose Weight", icon: "📉", color: colors.danger },
    { value: "maintain", label: "Maintain", icon: "⚖️", color: colors.primary },
    { value: "gain", label: "Gain Muscle", icon: "💪", color: colors.success },
  ];

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const ageNum = parseInt(age);
    const weightNum = parseInt(weight);
    const heightNum = parseInt(height);
    
    if (ageNum && (ageNum < 13 || ageNum > 120)) {
      newErrors.age = "Age must be between 13 and 120";
    }
    if (weightNum && (weightNum < 30 || weightNum > 300)) {
      newErrors.weight = "Weight must be between 30 and 300 kg";
    }
    if (heightNum && (heightNum < 100 || heightNum > 250)) {
      newErrors.height = "Height must be between 100 and 250 cm";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCalories = (): number => {
    const w = parseInt(weight) || 70;
    const h = parseInt(height) || 170;
    const a = parseInt(age) || 25;

    // Basic BMR calculation (Mifflin-St Jeor)
    let bmr = 10 * w + 6.25 * h - 5 * a + 5; // For males (simplified)

    // Activity multiplier
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    let tdee = bmr * multipliers[activityLevel];

    // Adjust for goal
    if (goal === "lose") tdee -= 500;
    if (goal === "gain") tdee += 500;

    return Math.round(tdee);
  };

  const handleFinish = async () => {
    try {
      const calories = calculateCalories();
      
      await updateProfile({
        name: name.trim() || "User",
        activityLevel,
        goals: {
          dailyCalories: calories,
          dailyProtein: Math.round(calories * 0.3 / 4), // 30% of calories from protein
          dailyCarbs: Math.round(calories * 0.4 / 4), // 40% from carbs
          dailyFat: Math.round(calories * 0.3 / 9), // 30% from fat
        },
      });

      await completeOnboarding();
      
      // Use setTimeout to ensure navigation happens after state updates
      setTimeout(() => {
        router.replace("/(tabs)/dashboard");
      }, 100);
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert(
        'Error Saving Profile',
        'There was a problem saving your profile. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
        <User size={48} color={colors.primary} strokeWidth={2} />
      </View>
      
      <Text style={[styles.stepTitle, { color: colors.text }]}>Let's Get to Know You</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        Tell us a bit about yourself
      </Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Your Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            placeholder="Enter your name"
            placeholderTextColor={colors.textLight}
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: colors.text }]}>Age</Text>
            <TextInput
              style={[
                styles.input, 
                { backgroundColor: colors.surface, color: colors.text, borderColor: errors.age ? colors.danger : colors.border }
              ]}
              placeholder="25"
              placeholderTextColor={colors.textLight}
              value={age}
              onChangeText={(text) => {
                setAge(text);
                if (errors.age) setErrors({ ...errors, age: '' });
              }}
              keyboardType="number-pad"
            />
            {errors.age && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.age}</Text>}
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: colors.text }]}>Weight (kg)</Text>
            <TextInput
              style={[
                styles.input, 
                { backgroundColor: colors.surface, color: colors.text, borderColor: errors.weight ? colors.danger : colors.border }
              ]}
              placeholder="70"
              placeholderTextColor={colors.textLight}
              value={weight}
              onChangeText={(text) => {
                setWeight(text);
                if (errors.weight) setErrors({ ...errors, weight: '' });
              }}
              keyboardType="number-pad"
            />
            {errors.weight && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.weight}</Text>}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Height (cm)</Text>
          <TextInput
            style={[
              styles.input, 
              { backgroundColor: colors.surface, color: colors.text, borderColor: errors.height ? colors.danger : colors.border }
            ]}
            placeholder="170"
            placeholderTextColor={colors.textLight}
            value={height}
            onChangeText={(text) => {
              setHeight(text);
              if (errors.height) setErrors({ ...errors, height: '' });
            }}
            keyboardType="number-pad"
          />
          {errors.height && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.height}</Text>}
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={[styles.iconCircle, { backgroundColor: colors.secondaryLight }]}>
        <Activity size={48} color={colors.secondary} strokeWidth={2} />
      </View>
      
      <Text style={[styles.stepTitle, { color: colors.text }]}>Activity Level</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        How active are you?
      </Text>

      <View style={styles.optionsList}>
        {activityLevels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.optionCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              activityLevel === level.value && { backgroundColor: colors.primaryLight, borderColor: colors.primary },
              Shadows.sm,
            ]}
            onPress={() => setActivityLevel(level.value as ActivityLevel)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionTitle,
                  { color: colors.text },
                  activityLevel === level.value && { color: colors.primary },
                ]}
              >
                {level.label}
              </Text>
              <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>
                {level.desc}
              </Text>
            </View>
            {activityLevel === level.value && (
              <CheckCircle size={24} color={colors.primary} strokeWidth={2} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <View style={[styles.iconCircle, { backgroundColor: colors.accentLight }]}>
        <Target size={48} color={colors.accent} strokeWidth={2} />
      </View>
      
      <Text style={[styles.stepTitle, { color: colors.text }]}>Your Goal</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        What's your main fitness goal?
      </Text>

      <View style={styles.goalsContainer}>
        {goals.map((g) => (
          <TouchableOpacity
            key={g.value}
            style={[
              styles.goalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              goal === g.value && { backgroundColor: g.color + "20", borderColor: g.color },
              Shadows.md,
            ]}
            onPress={() => setGoal(g.value as Goal)}
            activeOpacity={0.8}
          >
            <Text style={styles.goalIcon}>{g.icon}</Text>
            <Text
              style={[
                styles.goalLabel,
                { color: colors.text },
                goal === g.value && { color: g.color, fontWeight: "700" },
              ]}
            >
              {g.label}
            </Text>
            {goal === g.value && (
              <View style={[styles.checkBadge, { backgroundColor: g.color }]}>
                <CheckCircle size={16} color="#FFF" strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.summaryCard, { backgroundColor: colors.primaryLight }]}>
        <Text style={[styles.summaryTitle, { color: colors.text }]}>Your Daily Target</Text>
        <Text style={[styles.summaryCalories, { color: colors.primary }]}>
          {calculateCalories()} calories
        </Text>
        <Text style={[styles.summaryDesc, { color: colors.textSecondary }]}>
          Based on your activity level and goal
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundGray }]}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.primary, width: `${(step / 3) * 100}%` },
            ]}
          />
        </View>
        <Text style={[styles.stepIndicator, { color: colors.textSecondary }]}>
          Step {step} of 3
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        {step > 1 && (
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setStep(step - 1)}
            activeOpacity={0.7}
          >
            <Text style={[styles.backButtonText, { color: colors.text }]}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, Shadows.lg, step === 1 && { flex: 1 }]}
          onPress={() => {
            if (step === 1 && !validateStep1()) {
              return;
            }
            if (step < 3) {
              setStep(step + 1);
            } else {
              handleFinish();
            }
          }}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {step === 3 ? "Finish Setup" : "Continue"}
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
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  stepContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    width: "100%",
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 2,
  },
  optionsList: {
    width: "100%",
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
  },
  goalsContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 3,
    gap: 16,
  },
  goalIcon: {
    fontSize: 40,
  },
  goalLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  checkBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryCard: {
    width: "100%",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  summaryCalories: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 4,
  },
  summaryDesc: {
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
  },
  backButtonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  nextButton: {
    flex: 2,
    borderRadius: 20,
    overflow: "hidden",
  },
  nextButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
