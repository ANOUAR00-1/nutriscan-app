import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/hooks/useTheme";

export default function Index() {
  const { hasCompletedOnboarding, isLoading } = useUser();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href={"/onboarding" as any} />;
  }

  return <Redirect href="/(tabs)/dashboard" />;
}
