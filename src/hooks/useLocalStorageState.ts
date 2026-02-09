import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return initialValue;
      return JSON.parse(raw) as T;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
