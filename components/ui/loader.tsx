import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import LoadingAnimation from "@/components/LoadingAnimation";

interface LoaderFiveProps {
  text?: string;
}

export function LoaderFive({ text = "Loading..." }: LoaderFiveProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.loaderContainer, { backgroundColor: colors.surface }]}>
        <LoadingAnimation />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loaderContainer: {
    padding: 50,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 250,
  },
  loadingText: {
    marginTop: 32,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
