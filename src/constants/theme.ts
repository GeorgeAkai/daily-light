import "@/global.css";

import { Platform } from "react-native";

export interface ThemeColors {
  background: string;
  card: string;
  cardSoft: string;
  text: string;
  muted: string;
  primary: string;
  primarySoft: string;
  onPrimary: string;
  accent: string;
  accentSoft: string;
  sage: string;
  sageSoft: string;
  border: string;
}

/** Soft pastel palette shared by light and dark mode. */
export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    background: "#faf7f2",
    card: "#ffffff",
    cardSoft: "#edf3ea",
    text: "#38423a",
    muted: "#84907f",
    primary: "#4f8a5b",
    primarySoft: "#e4f0e2",
    onPrimary: "#ffffff",
    accent: "#c29a1f",
    accentSoft: "#f9f1cf",
    sage: "#5d7a54",
    sageSoft: "#eef4ec",
    border: "#e3e0d2",
  },
  dark: {
    background: "#121e17",
    card: "#1a2a20",
    cardSoft: "#223528",
    text: "#e9ede4",
    muted: "#a3b5a6",
    primary: "#e9d04a",
    primarySoft: "#34321a",
    onPrimary: "#1d2415",
    accent: "#e9d04a",
    accentSoft: "#3a3520",
    sage: "#93b58a",
    sageSoft: "#2a382a",
    border: "#8f7534",
  },
};

export type ThemeMode = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
  },
  default: {
    sans: "normal",
    serif: "serif",
  },
});

export const Spacing = {
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const MaxContentWidth = 720;
