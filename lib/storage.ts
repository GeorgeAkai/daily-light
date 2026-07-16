"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Tiny client-side store built on useSyncExternalStore so components can
 * read browser-only values (localStorage, the current date, the theme
 * class) without hydration mismatches or setState-in-effect patterns.
 */

const listeners = new Set<() => void>();

export function emitStorageChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/**
 * localStorage-backed state. Server (and first hydration pass) sees the
 * fallback; the real stored value streams in immediately after.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null
  );

  const value = useMemo<T>(() => {
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fallback is a stable module-level constant at call sites
  }, [raw, key]);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(readItem(key, fallback))
          : next;
      localStorage.setItem(key, JSON.stringify(resolved));
      emitStorageChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fallback is a stable module-level constant at call sites
    [key]
  );

  return [value, setValue] as const;
}

/** True once the component is running in the browser (post-hydration). */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

/** The visitor's local date string; null during SSR/first paint. */
export function useTodayKey() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().toDateString(),
    () => null
  );
}

/** Whether dark mode is active, kept in sync with the <html> class. */
export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );
}

export function setDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
  emitStorageChange();
}
