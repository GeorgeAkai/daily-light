import { Tabs } from "expo-router/js-tabs";
import { Text } from "react-native";

import { useAppTheme } from "@/lib/theme-context";

function tabIcon(emoji: string) {
  const Icon = ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.55 }}>{emoji}</Text>
  );
  Icon.displayName = `TabIcon(${emoji})`;
  return Icon;
}

export default function TabsLayout() {
  const { colors } = useAppTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: tabIcon("🏠") }}
      />
      <Tabs.Screen
        name="notes"
        options={{ title: "Notes", tabBarIcon: tabIcon("📝") }}
      />
      <Tabs.Screen
        name="goals"
        options={{ title: "Goals", tabBarIcon: tabIcon("🎯") }}
      />
      <Tabs.Screen
        name="play"
        options={{ title: "Play", tabBarIcon: tabIcon("🎮") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: tabIcon("🌸") }}
      />
    </Tabs>
  );
}
