import { formatPrice } from '../utils/formatPrice';

function buildActiveChips(filters) {
  const chips = [];

  if (filters.type) {
    chips.push({
      key: 'type',
      label: filters.type === 'buy' ? 'For Sale' : 'For Rent',
      clearPatch: { type: '', minPrice: '', maxPrice: '' },
    });
  }

  if (filters.city) {
    chips.push({
      key: 'city',
      label: `City: ${filters.city}`,
      clearPatch: { city: '' },
    });
  }

  if (filters.q && filters.q.trim()) {
    chips.push({
      key: 'q',
      label: `Search: "${filters.q.trim()}"`,
      clearPatch: { q: '' },
    });
  }

  if (filters.propertyType) {
    const capitalized =
      filters.propertyType.charAt(0).toUpperCase() +
      filters.propertyType.slice(1);
    chips.push({
      key: 'propertyType',
      label: `Type: ${capitalized}`,
      clearPatch: { propertyType: '' },
    });
  }

  if (filters.minPrice) {
    chips.push({
      key: 'minPrice',
      label: `Min: ${formatPrice(Number(filters.minPrice), {
        listingType: filters.type || 'buy',
        compact: true,
      })}`,
      clearPatch: { minPrice: '' },
    });
  }

  if (filters.maxPrice) {
    chips.push({
      key: 'maxPrice',
      label: `Max: ${formatPrice(Number(filters.maxPrice), {
        listingType: filters.type || 'buy',
        compact: true,
      })}`,
      clearPatch: { maxPrice: '' },
    });
  }

  if (filters.beds) {
    chips.push({
      key: 'beds',
      label: `${filters.beds}+ Bedrooms`,
      clearPatch: { beds: '' },
    });
  }

  if (filters.baths) {
    chips.push({
      key: 'baths',
      label: `${filters.baths}+ Bathrooms`,
      clearPatch: { baths: '' },
    });
  }

  return chips;
}

export function ActiveFilters({ filters, onRemoveFilter, onResetAll }) {
  const chips = buildActiveChips(filters);

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="active-filters" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          className="filter-chip"
          onClick={() => onRemoveFilter(chip.clearPatch)}
          aria-label={`Remove filter ${chip.label}`}
        >
          <span>{chip.label}</span>
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      ))}
      {chips.length > 1 ? (
        <button
          type="button"
          className="btn btn--text active-filters__clear"
          onClick={onResetAll}
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
