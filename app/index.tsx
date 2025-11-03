import { Redirect } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function Index() {
  const { hasCompletedOnboarding, isLoading } = useUser();

  if (isLoading) {
    return <LoadingScreen text="NutriScan" />;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href={"/onboarding" as any} />;
  }

  return <Redirect href="/(tabs)/dashboard" />;
}
