import { useState, useEffect, useCallback } from 'react';
import { PROPERTIES } from '../data/properties';

/**
 * Simulates an asynchronous property fetch (~600ms) with loading, error, and retry support.
 */
export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const timerId = window.setTimeout(() => {
      if (!isMounted) return;
      try {
        if (!Array.isArray(PROPERTIES)) {
          throw new Error('Property listings could not be loaded.');
        }
        setProperties(PROPERTIES);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load properties right now. Please try again.'
        );
        setIsLoading(false);
      }
    }, 600);

    return () => {
      isMounted = false;
      window.clearTimeout(timerId);
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setAttempt((prev) => prev + 1);
  }, []);

  return { properties, isLoading, error, retry };
}
