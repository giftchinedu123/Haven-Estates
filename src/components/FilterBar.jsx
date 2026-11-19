import { useState, useEffect } from 'react';
import {
  PROPERTY_TYPES,
  BUY_MIN_PRICES,
  BUY_MAX_PRICES,
  RENT_MIN_PRICES,
  RENT_MAX_PRICES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  SORT_OPTIONS,
} from '../utils/constants';
import { useDebounce } from '../hooks/useDebounce';

export function FilterBar({
  filters,
  cities,
  onUpdateFilters,
  onResetFilters,
  totalResults,
  activeFilterCount,
}) {
  const [searchText, setSearchText] = useState(filters.q || '');
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const debouncedSearch = useDebounce(searchText, 300);

  // Sync local search input when URL changes externally (e.g. reset, back/forward)
  useEffect(() => {
    setSearchText(filters.q || '');
  }, [filters.q]);

  // Propagate debounced search text to URL params
  useEffect(() => {
    const normalizedInput = debouncedSearch.trim();
    const normalizedFilter = (filters.q || '').trim();
    if (normalizedInput !== normalizedFilter) {
      onUpdateFilters({ q: debouncedSearch });
    }
  }, [debouncedSearch, filters.q, onUpdateFilters]);

  // Escape & body scroll lock for mobile filter bottom-sheet
  useEffect(() => {
    if (!mobileSheetOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileSheetOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileSheetOpen]);

  const minPriceOptions =
    filters.type === 'rent' ? RENT_MIN_PRICES : BUY_MIN_PRICES;
  const maxPriceOptions =
    filters.type === 'rent' ? RENT_MAX_PRICES : BUY_MAX_PRICES;

  const handleListingTypeChange = (nextType) => {
    onUpdateFilters({
      type: nextType,
      minPrice: '',
      maxPrice: '',
    });
  };

  const renderFilterFields = (idPrefix) => (
    <div className="filter-fields-grid">
      <div className="filter-control filter-control--toggle">
        <span className="field-label">Listing</span>
        <div
          className="segmented-toggle"
          role="group"
          aria-label="Filter by listing type"
        >
          <button
            type="button"
            className={`segmented-toggle__btn ${
              filters.type === '' ? 'is-active' : ''
            }`}
            aria-pressed={filters.type === ''}
            onClick={() => handleListingTypeChange('')}
          >
            All
          </button>
          <button
            type="button"
            className={`segmented-toggle__btn ${
              filters.type === 'buy' ? 'is-active' : ''
            }`}
            aria-pressed={filters.type === 'buy'}
            onClick={() => handleListingTypeChange('buy')}
          >
            Buy
          </button>
          <button
            type="button"
            className={`segmented-toggle__btn ${
              filters.type === 'rent' ? 'is-active' : ''
            }`}
            aria-pressed={filters.type === 'rent'}
            onClick={() => handleListingTypeChange('rent')}
          >
            Rent
          </button>
        </div>
      </div>

      <div className="filter-control filter-control--search">
        <label htmlFor={`${idPrefix}-search`} className="field-label">
          Area or keyword
        </label>
        <div className="input-icon-wrap">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <input
            id={`${idPrefix}-search`}
            type="search"
            className="field-input field-input--with-icon"
            placeholder="e.g. Lekki, Maitama, villa..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-control">
        <label htmlFor={`${idPrefix}-city`} className="field-label">
          City
        </label>
        <div className="select-wrap">
          <select
            id={`${idPrefix}-city`}
            className="field-select"
            value={filters.city}
            onChange={(e) => onUpdateFilters({ city: e.target.value })}
          >
            <option value="">All cities</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
          <i
            className="fa-solid fa-chevron-down select-wrap__icon"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="filter-control">
        <label htmlFor={`${idPrefix}-propertyType`} className="field-label">
          Property type
        </label>
        <div className="select-wrap">
          <select
            id={`${idPrefix}-propertyType`}
            className="field-select"
            value={filters.propertyType}
            onChange={(e) => onUpdateFilters({ propertyType: e.target.value })}
          >
            {PROPERTY_TYPES.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <i
            className="fa-solid fa-chevron-down select-wrap__icon"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="filter-control">
        <label htmlFor={`${idPrefix}-minPrice`} className="field-label">
          Min price
        </label>
        <div className="select-wrap">
          <select
            id={`${idPrefix}-minPrice`}
            className="field-select"
            value={filters.minPrice}
            onChange={(e) => onUpdateFilters({ minPrice: e.target.value })}
          >
            {minPriceOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <i
            className="fa-solid fa-chevron-down select-wrap__icon"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="filter-control">
        <label htmlFor={`${idPrefix}-maxPrice`} className="field-label">
          Max price
        </label>
        <div className="select-wrap">
          <select
            id={`${idPrefix}-maxPrice`}
            className="field-select"
            value={filters.maxPrice}
            onChange={(e) => onUpdateFilters({ maxPrice: e.target.value })}
          >
            {maxPriceOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <i
            className="fa-solid fa-chevron-down select-wrap__icon"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="filter-control">
        <label htmlFor={`${idPrefix}-beds`} className="field-label">
          Bedrooms
        </label>
        <div className="select-wrap">
          <select
            id={`${idPrefix}-beds`}
            className="field-select"
            value={filters.beds}
            onChange={(e) => onUpdateFilters({ beds: e.target.value })}
          >
            {BEDROOM_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <i
            className="fa-solid fa-chevron-down select-wrap__icon"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="filter-control">
        <label htmlFor={`${idPrefix}-baths`} className="field-label">
          Bathrooms
        </label>
        <div className="select-wrap">
          <select
            id={`${idPrefix}-baths`}
            className="field-select"
            value={filters.baths}
            onChange={(e) => onUpdateFilters({ baths: e.target.value })}
          >
            {BATHROOM_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <i
            className="fa-solid fa-chevron-down select-wrap__icon"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="filter-bar-section">
      {/* Desktop inline filter panel */}
      <div className="filter-panel filter-panel--desktop">
        {renderFilterFields('desktop')}
        <div className="filter-panel__footer">
          <button
            type="button"
            className="btn btn--text"
            onClick={onResetFilters}
            disabled={activeFilterCount === 0}
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true" />
            <span>Reset filters</span>
          </button>

          <div className="sort-control">
            <label htmlFor="desktop-sort" className="sort-control__label">
              Sort by
            </label>
            <div className="select-wrap">
              <select
                id="desktop-sort"
                className="field-select field-select--compact"
                value={filters.sort}
                onChange={(e) => onUpdateFilters({ sort: e.target.value })}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <i
                className="fa-solid fa-chevron-down select-wrap__icon"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile compact toolbar */}
      <div className="filter-mobile-bar">
        <button
          type="button"
          className="btn btn--secondary filter-mobile-bar__trigger"
          onClick={() => setMobileSheetOpen(true)}
          aria-expanded={mobileSheetOpen}
          aria-controls="mobile-filter-sheet"
        >
          <i className="fa-solid fa-sliders" aria-hidden="true" />
          <span>
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </span>
        </button>

        <div className="sort-control sort-control--mobile">
          <label htmlFor="mobile-sort" className="sr-only">
            Sort properties
          </label>
          <div className="select-wrap">
            <select
              id="mobile-sort"
              className="field-select field-select--compact"
              value={filters.sort}
              onChange={(e) => onUpdateFilters({ sort: e.target.value })}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <i
              className="fa-solid fa-chevron-down select-wrap__icon"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Mobile bottom-sheet / full-screen filter drawer */}
      {mobileSheetOpen ? (
        <div
          className="filter-sheet-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Filter properties"
          id="mobile-filter-sheet"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMobileSheetOpen(false);
            }
          }}
        >
          <div className="filter-sheet">
            <div className="filter-sheet__header">
              <h2 className="filter-sheet__title">Filter Properties</h2>
              <button
                type="button"
                className="icon-circle-btn"
                aria-label="Close filters"
                onClick={() => setMobileSheetOpen(false)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>

            <div className="filter-sheet__body">
              {renderFilterFields('mobile')}
            </div>

            <div className="filter-sheet__footer">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={onResetFilters}
              >
                <span>Reset filters</span>
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setMobileSheetOpen(false)}
              >
                <span>
                  Show {totalResults}{' '}
                  {totalResults === 1 ? 'property' : 'properties'}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
