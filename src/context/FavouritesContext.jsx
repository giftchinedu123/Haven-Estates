import { createContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { PROPERTIES } from '../data/properties';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavouritesContext = createContext(null);

const STORAGE_KEY = 'haven_estates_favourites_v1';
const VALID_PROPERTY_IDS = new Set(PROPERTIES.map((item) => item.id));

function sanitizeIds(rawIds) {
  if (!Array.isArray(rawIds)) return [];
  const seen = new Set();
  const valid = [];
  for (const id of rawIds) {
    if (typeof id === 'string' && VALID_PROPERTY_IDS.has(id) && !seen.has(id)) {
      seen.add(id);
      valid.push(id);
    }
  }
  return valid;
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.includes(action.id);
      if (exists) {
        return state.filter((item) => item !== action.id);
      }
      if (!VALID_PROPERTY_IDS.has(action.id)) {
        return state;
      }
      return [action.id, ...state];
    }
    case 'CLEAR': {
      return [];
    }
    default:
      return state;
  }
}

export function FavouritesProvider({ children }) {
  const [persistedIds, setPersistedIds] = useLocalStorage(STORAGE_KEY, []);
  const [favouriteIds, dispatch] = useReducer(
    favouritesReducer,
    persistedIds,
    sanitizeIds
  );

  useEffect(() => {
    setPersistedIds(favouriteIds);
  }, [favouriteIds, setPersistedIds]);

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  const clearFavourites = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const isFavourite = useCallback(
    (id) => favouriteIds.includes(id),
    [favouriteIds]
  );

  const favouriteProperties = useMemo(() => {
    const propertyById = new Map(PROPERTIES.map((p) => [p.id, p]));
    return favouriteIds.map((id) => propertyById.get(id)).filter(Boolean);
  }, [favouriteIds]);

  const value = useMemo(
    () => ({
      favouriteIds,
      favouriteProperties,
      favouritesCount: favouriteIds.length,
      toggleFavourite,
      isFavourite,
      clearFavourites,
    }),
    [favouriteIds, favouriteProperties, toggleFavourite, isFavourite, clearFavourites]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
