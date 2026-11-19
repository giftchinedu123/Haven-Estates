import { useState, useCallback } from 'react';

/**
 * Safely reads and writes JSON data to localStorage.
 * Recovers gracefully if storage is unavailable or contains corrupted JSON.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return JSON.parse(item);
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof valueOrUpdater === 'function'
            ? valueOrUpdater(prev)
            : valueOrUpdater;

        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore storage quota or privacy-mode errors
        }

        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
