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
    cardSoft: "#f3eefe",
    text: "#3f3a4a",
    muted: "#8b8499",
    primary: "#8b7ec8",
    primarySoft: "#e9e3f8",
    onPrimary: "#ffffff",
    accent: "#c07a5b",
    accentSoft: "#fbeee8",
    sage: "#5d7a54",
    sageSoft: "#eef4ec",
    border: "#e8e2d9",
  },
  dark: {
    background: "#1c1a26",
    card: "#262330",
    cardSoft: "#2d2939",
    text: "#e6e2ef",
    muted: "#9c94ad",
    primary: "#a99ce0",
    primarySoft: "#37304d",
    onPrimary: "#221f2e",
    accent: "#d9a48f",
    accentSoft: "#3d2f2a",
    sage: "#93b58a",
    sageSoft: "#2a352a",
    border: "#383345",
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
