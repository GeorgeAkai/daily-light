"use client";

import { setDarkMode, useIsDark } from "@/lib/storage";

export default function ThemeToggle() {
  const isDark = useIsDark();

  return (
    <button
      onClick={() => setDarkMode(!isDark)}
      aria-label="Toggle light/dark mode"
      className="rounded-full border border-border-soft bg-card p-2 text-lg shadow-sm transition hover:scale-105"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
