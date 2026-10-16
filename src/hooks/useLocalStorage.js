import { useState, useEffect } from "react";

// Works like useState, but saves the value in the browser so data survives a refresh.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be blocked or full; the app still works from state.
    }
  }, [key, value]);

  return [value, setValue];
}
