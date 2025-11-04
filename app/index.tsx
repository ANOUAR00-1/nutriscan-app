import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function Index() {
  const { hasCompletedOnboarding, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!hasCompletedOnboarding) {
        router.replace("/onboarding");
      } else {
        router.replace("/(tabs)/dashboard");
      }
    }
  }, [isLoading, hasCompletedOnboarding, router]);

  return <LoadingScreen text="NutriScan" />;
}
