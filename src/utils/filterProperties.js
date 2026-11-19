export const DEFAULT_FILTERS = {
  type: '',
  city: '',
  q: '',
  propertyType: '',
  minPrice: '',
  maxPrice: '',
  beds: '',
  baths: '',
  sort: 'newest',
};

/**
 * Reads filter state from URLSearchParams as the single source of truth.
 */
export function parseFilterParams(searchParams) {
  const type = searchParams.get('type');
  const sort = searchParams.get('sort');

  return {
    type: type === 'buy' || type === 'rent' ? type : '',
    city: searchParams.get('city') || '',
    q: searchParams.get('q') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    beds: searchParams.get('beds') || '',
    baths: searchParams.get('baths') || '',
    sort: sort === 'price-asc' || sort === 'price-desc' ? sort : 'newest',
  };
}

/**
 * Builds clean URLSearchParams omitting empty or default values.
 */
export function buildFilterParams(filters) {
  const params = new URLSearchParams();

  if (filters.type) params.set('type', filters.type);
  if (filters.city) params.set('city', filters.city);
  if (filters.q && filters.q.trim()) params.set('q', filters.q.trim());
  if (filters.propertyType) params.set('propertyType', filters.propertyType);
  if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
  if (filters.beds) params.set('beds', String(filters.beds));
  if (filters.baths) params.set('baths', String(filters.baths));
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);

  return params;
}

/**
 * Pure filtering and sorting pipeline using filter, every, some, and sort.
 */
export function filterAndSortProperties(properties, filters) {
  const query = (filters.q || '').trim().toLowerCase();
  const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
  const minBeds = filters.beds ? Number(filters.beds) : null;
  const minBaths = filters.baths ? Number(filters.baths) : null;

  const filtered = properties.filter((property) => {
    const checks = [
      () => !filters.type || property.listingType === filters.type,
      () => !filters.city || property.city.toLowerCase() === filters.city.toLowerCase(),
      () => !filters.propertyType || property.propertyType === filters.propertyType,
      () => minPrice === null || property.price >= minPrice,
      () => maxPrice === null || property.price <= maxPrice,
      () => minBeds === null || property.bedrooms >= minBeds,
      () => minBaths === null || property.bathrooms >= minBaths,
      () => {
        if (!query) return true;
        const searchableFields = [
          property.title,
          property.area,
          property.city,
          property.address,
          property.propertyType,
          ...(property.features || []),
        ];
        return searchableFields.some((field) =>
          String(field).toLowerCase().includes(query)
        );
      },
    ];

    return checks.every((check) => check());
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === 'price-asc') {
      return a.price - b.price;
    }
    if (filters.sort === 'price-desc') {
      return b.price - a.price;
    }
    // Default: newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sorted;
}

/**
 * Extracts unique sorted city names from a property list.
 */
export function getAvailableCities(properties) {
  const citySet = new Set(properties.map((item) => item.city));
  return Array.from(citySet).sort((a, b) => a.localeCompare(b));
}

/**
 * Finds up to 3 similar properties sharing listingType + propertyType,
 * falling back to same city when fewer than 3 exact matches exist.
 */
export function getSimilarProperties(allProperties, currentProperty, limit = 3) {
  if (!currentProperty) return [];

  const others = allProperties.filter((item) => item.id !== currentProperty.id);

  const exactMatches = others.filter(
    (item) =>
      item.listingType === currentProperty.listingType &&
      item.propertyType === currentProperty.propertyType
  );

  if (exactMatches.length >= limit) {
    return exactMatches.slice(0, limit);
  }

  const exactIds = new Set(exactMatches.map((item) => item.id));
  const cityFallbacks = others.filter(
    (item) => !exactIds.has(item.id) && item.city === currentProperty.city
  );

  return [...exactMatches, ...cityFallbacks].slice(0, limit);
}
