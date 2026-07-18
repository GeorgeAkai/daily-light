import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

/**
 * AsyncStorage-backed state. Starts from `fallback`, hydrates from disk,
 * and persists every change. Stored data is treated as untrusted; pass
 * `isValid` to shape-check it (a stable, module-level function), and
 * invalid data falls back safely.
 */
export function useStoredState<T>(
  key: string,
  fallback: T,
  isValid?: (value: unknown) => boolean
) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (cancelled) return;
        if (raw != null) {
          try {
            const parsed = JSON.parse(raw) as unknown;
            if (!isValid || isValid(parsed)) {
              setValue(parsed as T);
            }
          } catch {
            // Corrupt data; keep the fallback.
          }
        }
        setHydrated(true);
      })
      .catch(() => {
        if (!cancelled) setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, [key, isValid]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        AsyncStorage.setItem(key, JSON.stringify(resolved)).catch(() => {});
        return resolved;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}
