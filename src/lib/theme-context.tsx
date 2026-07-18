import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

import { Colors, type ThemeColors, type ThemeMode } from "@/constants/theme";

const THEME_KEY = "daily-light-theme";

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  colors: Colors.light,
  toggle: () => {},
});

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [override, setOverride] = useState<ThemeMode | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") setOverride(stored);
    });
  }, []);

  const mode: ThemeMode = override ?? (system === "dark" ? "dark" : "light");

  const toggle = useCallback(() => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setOverride(next);
    AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, colors: Colors[mode], toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
