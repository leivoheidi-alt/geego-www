import { useEffect, useState } from "react";

export function useSessionStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.sessionStorage.getItem(key);
      if (!raw) return initialValue;
      return JSON.parse(raw) as T;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      // Storage might be unavailable (private mode / quota). Ignore to avoid crashing UI.
    }
  }, [key, state]);

  return [state, setState] as const;
}
