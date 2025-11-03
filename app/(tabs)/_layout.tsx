import { Tabs } from "expo-router";
import { Camera, History, LayoutDashboard, Settings } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

import Colors from "@/constants/colors";
import { Shadows } from "@/constants/shadows";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
          paddingTop: 8,
          paddingHorizontal: 16,
          marginHorizontal: 16,
          marginBottom: Platform.OS === 'ios' ? 20 : 16,
          borderRadius: 24,
          ...Shadows.xl,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => <Camera size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <History size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={24} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
