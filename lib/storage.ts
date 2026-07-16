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

function readItem<T>(
  key: string,
  fallback: T,
  isValid?: (value: unknown) => boolean
): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (isValid && !isValid(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * localStorage-backed state. Server (and first hydration pass) sees the
 * fallback; the real stored value streams in immediately after. Stored
 * data is untrusted (it can be corrupted or edited by hand), so callers
 * can pass an `isValid` shape check; invalid data falls back safely.
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
  isValid?: (value: unknown) => boolean
) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null
  );

  const value = useMemo<T>(() => {
    if (raw == null) return fallback;
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (isValid && !isValid(parsed)) return fallback;
      return parsed as T;
    } catch {
      return fallback;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fallback/isValid are stable module-level constants at call sites
  }, [raw, key]);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(readItem(key, fallback, isValid))
          : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Quota exceeded or storage unavailable; keep the app usable.
      }
      emitStorageChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fallback/isValid are stable module-level constants at call sites
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
