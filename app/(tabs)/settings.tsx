import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  I18nManager,
} from "react-native";
import { User, Target, Bell, Info, Trash2, ChevronRight, Globe } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "@/contexts/UserContext";
import { useMeals } from "@/contexts/MealsContext";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { profile, settings, updateProfile, updateSettings } = useUser();
  const { clearAllMeals } = useMeals();
  const { colors } = useTheme();
  const { t, isRTL } = useTranslation();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(profile.name);

  // Set RTL layout for Arabic
  useEffect(() => {
    I18nManager.forceRTL(isRTL);
  }, [isRTL]);

  const handleSaveName = async () => {
    if (name.trim()) {
      await updateProfile({ name: name.trim() });
      setIsEditingName(false);
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      t('clearHistory'),
      t('clearHistoryConfirm'),
      [
        { text: t('cancel'), style: "cancel" },
        {
          text: t('clearAll'),
          style: "destructive",
          onPress: () => {
            clearAllMeals();
            Alert.alert(t('success'), t('historyCleared'));
          },
        },
      ]
    );
  };

  const activityLevels = [
    { value: "sedentary", label: t('sedentary'), description: t('sedentaryDesc') },
    { value: "light", label: t('lightActive'), description: t('lightActiveDesc') },
    { value: "moderate", label: t('moderateActive'), description: t('moderateActiveDesc') },
    { value: "active", label: t('veryActive'), description: t('veryActiveDesc') },
    { value: "very_active", label: t('extraActive'), description: t('extraActiveDesc') },
  ];

  const languages = [
    { value: "en", label: t('english') },
    { value: "fr", label: t('french') },
    { value: "ar", label: t('arabic') },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundGray }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
    >
      <Text style={[styles.mainTitle, { color: colors.text }]}>{t('settings')}</Text>

      {/* Profile Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <View style={styles.sectionHeader}>
          <User size={20} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('profile')}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{t('name')}</Text>
          {isEditingName ? (
            <View style={styles.nameEditContainer}>
              <TextInput
                style={[styles.nameInput, { backgroundColor: colors.backgroundGray, color: colors.text, borderColor: colors.primary }]}
                value={name}
                onChangeText={setName}
                placeholder={t('name')}
                placeholderTextColor={colors.textLight}
                autoFocus
                onBlur={handleSaveName}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.settingValue, { backgroundColor: colors.backgroundGray }]}
              onPress={() => setIsEditingName(true)}
            >
              <Text style={[styles.settingValueText, { color: colors.text }]}>{profile.name}</Text>
              <ChevronRight size={18} color={colors.textLight} strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{t('activityLevel')}</Text>
          <View style={styles.activityLevelContainer}>
            {activityLevels.map((level) => (
              <TouchableOpacity
                key={level.value}
                style={[
                  styles.activityButton,
                  { backgroundColor: colors.backgroundGray, borderColor: 'transparent' },
                  profile.activityLevel === level.value && { backgroundColor: colors.primaryLight, borderColor: colors.primary },
                ]}
                onPress={() =>
                  updateProfile({ activityLevel: level.value as any })
                }
              >
                <Text
                  style={[
                    styles.activityButtonText,
                    { color: colors.text },
                    profile.activityLevel === level.value && { color: colors.primary },
                  ]}
                >
                  {level.label}
                </Text>
                <Text
                  style={[
                    styles.activityButtonDesc,
                    { color: colors.textSecondary },
                    profile.activityLevel === level.value && { color: colors.primaryDark },
                  ]}
                >
                  {level.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Goals Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <View style={styles.sectionHeader}>
          <Target size={20} color={colors.secondary} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dailyGoals')}</Text>
        </View>

        <View style={styles.goalInputs}>
          <View style={styles.goalInput}>
            <Text style={[styles.goalInputLabel, { color: colors.text }]}>{t('calories')}</Text>
            <TextInput
              style={[styles.goalInputField, { backgroundColor: colors.backgroundGray, color: colors.text }]}
              placeholderTextColor={colors.textLight}
              value={profile.goals.dailyCalories.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateProfile({
                  goals: { ...profile.goals, dailyCalories: value },
                });
              }}
              keyboardType="number-pad"
              placeholder="2000"
            />
            <Text style={[styles.goalInputUnit, { color: colors.textSecondary }]}>kcal</Text>
          </View>

          <View style={styles.goalInput}>
            <Text style={[styles.goalInputLabel, { color: colors.text }]}>{t('protein')}</Text>
            <TextInput
              style={[styles.goalInputField, { backgroundColor: colors.backgroundGray, color: colors.text }]}
              placeholderTextColor={colors.textLight}
              value={profile.goals.dailyProtein.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateProfile({
                  goals: { ...profile.goals, dailyProtein: value },
                });
              }}
              keyboardType="number-pad"
              placeholder="150"
            />
            <Text style={[styles.goalInputUnit, { color: colors.textSecondary }]}>g</Text>
          </View>

          <View style={styles.goalInput}>
            <Text style={[styles.goalInputLabel, { color: colors.text }]}>{t('carbs')}</Text>
            <TextInput
              style={[styles.goalInputField, { backgroundColor: colors.backgroundGray, color: colors.text }]}
              placeholderTextColor={colors.textLight}
              value={profile.goals.dailyCarbs.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateProfile({
                  goals: { ...profile.goals, dailyCarbs: value },
                });
              }}
              keyboardType="number-pad"
              placeholder="200"
            />
            <Text style={[styles.goalInputUnit, { color: colors.textSecondary }]}>g</Text>
          </View>

          <View style={styles.goalInput}>
            <Text style={[styles.goalInputLabel, { color: colors.text }]}>{t('fat')}</Text>
            <TextInput
              style={[styles.goalInputField, { backgroundColor: colors.backgroundGray, color: colors.text }]}
              placeholderTextColor={colors.textLight}
              value={profile.goals.dailyFat.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateProfile({
                  goals: { ...profile.goals, dailyFat: value },
                });
              }}
              keyboardType="number-pad"
              placeholder="65"
            />
            <Text style={[styles.goalInputUnit, { color: colors.textSecondary }]}>g</Text>
          </View>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <View style={styles.sectionHeader}>
          <Bell size={20} color={colors.warning} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('preferences')}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{t('notifications')}</Text>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => updateSettings({ notifications: value })}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{t('darkMode')}</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => updateSettings({ darkMode: value })}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{t('language')}</Text>
          <View style={styles.languageContainer}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.value}
                style={[
                  styles.languageButton,
                  { backgroundColor: colors.backgroundGray, borderColor: 'transparent' },
                  settings.language === lang.value && { backgroundColor: colors.primaryLight, borderColor: colors.primary },
                ]}
                onPress={() => updateSettings({ language: lang.value as any })}
              >
                <Globe size={16} color={settings.language === lang.value ? colors.primary : colors.textSecondary} />
                <Text
                  style={[
                    styles.languageButtonText,
                    { color: colors.text },
                    settings.language === lang.value && { color: colors.primary },
                  ]}
                >
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{t('measurementSystem')}</Text>
          <View style={[styles.segmentedControl, { backgroundColor: colors.backgroundGray }]}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                settings.measurementSystem === "metric" && { backgroundColor: colors.primary },
              ]}
              onPress={() => updateSettings({ measurementSystem: "metric" })}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  { color: colors.text },
                  settings.measurementSystem === "metric" && { color: '#FFF' },
                ]}
              >
                {t('metric')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                settings.measurementSystem === "imperial" && { backgroundColor: colors.primary },
              ]}
              onPress={() => updateSettings({ measurementSystem: "imperial" })}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  { color: colors.text },
                  settings.measurementSystem === "imperial" && { color: '#FFF' },
                ]}
              >
                {t('imperial')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <View style={styles.sectionHeader}>
          <Info size={20} color={colors.accent} strokeWidth={2} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('about')}</Text>
        </View>

        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          NutriScan v1.0.0{"\n"}
          AI-powered nutrition tracking app
        </Text>
      </View>

      {/* Danger Zone */}
      <View style={[styles.section, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.danger }]}>
        <TouchableOpacity style={styles.dangerButton} onPress={handleClearHistory}>
          <Trash2 size={20} color={colors.danger} strokeWidth={2} />
          <Text style={[styles.dangerButtonText, { color: colors.danger }]}>{t('clearHistory')}</Text>
        </TouchableOpacity>
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
    gap: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "700" as const,
    marginBottom: 8,
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
  settingItem: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "500" as const,
    marginBottom: 8,
  },
  settingValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
  },
  settingValueText: {
    fontSize: 15,
  },
  nameEditContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
  },
  activityLevelContainer: {
    gap: 8,
  },
  activityButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  activityButtonText: {
    fontSize: 15,
    fontWeight: "600" as const,
    marginBottom: 2,
  },
  activityButtonDesc: {
    fontSize: 13,
  },
  languageContainer: {
    gap: 8,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    gap: 8,
  },
  languageButtonText: {
    fontSize: 15,
    fontWeight: "500" as const,
  },
  goalInputs: {
    gap: 12,
  },
  goalInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  goalInputLabel: {
    fontSize: 15,
    fontWeight: "500" as const,
    width: 70,
  },
  goalInputField: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
  },
  goalInputUnit: {
    fontSize: 15,
    width: 40,
  },
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 2,
  },
  segmentButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  segmentButtonText: {
    fontSize: 15,
    fontWeight: "500" as const,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
});
