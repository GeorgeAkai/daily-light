import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Fonts } from "@/constants/theme";
import { AppThemeProvider, useAppTheme } from "@/lib/theme-context";

function RootStack() {
  const { colors, mode } = useAppTheme();
  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily: Fonts?.serif, fontWeight: "600" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="trivia" options={{ title: "Trivia 🃏" }} />
        <Stack.Screen name="quiz" options={{ title: "Bible Quiz 🏆" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootStack />
    </AppThemeProvider>
  );
}
