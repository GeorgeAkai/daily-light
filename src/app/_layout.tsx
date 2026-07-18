import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";

import { Fonts } from "@/constants/theme";
import { AppThemeProvider, useAppTheme } from "@/lib/theme-context";

function HeaderLogo() {
  return (
    <Image
      source={require("@/assets/images/logo.png")}
      style={{ width: 30, height: 30, borderRadius: 999 }}
      accessibilityLabel="Daily Promise logo"
    />
  );
}

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
          headerRight: HeaderLogo,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="trivia" options={{ title: "Trivia 🃏" }} />
        <Stack.Screen name="quiz" options={{ title: "Bible Quiz 🏆" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
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
