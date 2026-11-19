import { createContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { PROPERTIES } from '../data/properties';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const RecentlyViewedContext = createContext(null);

const STORAGE_KEY = 'haven_estates_recent_v1';
const MAX_RECENT = 6;
const VALID_PROPERTY_IDS = new Set(PROPERTIES.map((item) => item.id));

function sanitizeRecentIds(rawIds) {
  if (!Array.isArray(rawIds)) return [];
  const seen = new Set();
  const valid = [];
  for (const id of rawIds) {
    if (typeof id === 'string' && VALID_PROPERTY_IDS.has(id) && !seen.has(id)) {
      seen.add(id);
      valid.push(id);
    }
    if (valid.length >= MAX_RECENT) break;
  }
  return valid;
}

function recentlyViewedReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (!VALID_PROPERTY_IDS.has(action.id)) return state;
      if (state[0] === action.id) return state;
      const filtered = state.filter((id) => id !== action.id);
      return [action.id, ...filtered].slice(0, MAX_RECENT);
    }
    default:
      return state;
  }
}

export function RecentlyViewedProvider({ children }) {
  const [persistedIds, setPersistedIds] = useLocalStorage(STORAGE_KEY, []);
  const [recentIds, dispatch] = useReducer(
    recentlyViewedReducer,
    persistedIds,
    sanitizeRecentIds
  );

  useEffect(() => {
    setPersistedIds(recentIds);
  }, [recentIds, setPersistedIds]);

  const addRecentlyViewed = useCallback((id) => {
    dispatch({ type: 'ADD', id });
  }, []);

  const recentlyViewedProperties = useMemo(() => {
    const propertyById = new Map(PROPERTIES.map((p) => [p.id, p]));
    return recentIds.map((id) => propertyById.get(id)).filter(Boolean);
  }, [recentIds]);

  const value = useMemo(
    () => ({
      recentIds,
      recentlyViewedProperties,
      addRecentlyViewed,
    }),
    [recentIds, recentlyViewedProperties, addRecentlyViewed]
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}
