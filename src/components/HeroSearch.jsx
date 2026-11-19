import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HERO_PROPERTY_TYPES,
  BUY_PRICE_PRESETS,
  RENT_PRICE_PRESETS,
} from '../utils/constants';
import { buildFilterParams } from '../utils/filterProperties';

export function HeroSearch({ cities }) {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState('buy');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const pricePresets =
    listingType === 'rent' ? RENT_PRICE_PRESETS : BUY_PRICE_PRESETS;

  const handleToggleType = (nextType) => {
    setListingType(nextType);
    setPriceRange('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedPreset = pricePresets.find(
      (preset) => preset.value === priceRange
    );

    const params = buildFilterParams({
      type: listingType,
      city,
      propertyType,
      minPrice: selectedPreset ? selectedPreset.min : '',
      maxPrice: selectedPreset ? selectedPreset.max : '',
      sort: 'newest',
    });

    const queryString = params.toString();
    navigate(queryString ? `/properties?${queryString}` : '/properties');
  };

  return (
    <form
      className="hero-search"
      onSubmit={handleSubmit}
      aria-label="Search properties"
    >
      <div className="hero-search__toggle-col">
        <div
          className="segmented-toggle"
          role="group"
          aria-label="Listing type"
        >
          <button
            type="button"
            className={`segmented-toggle__btn ${
              listingType === 'buy' ? 'is-active' : ''
            }`}
            aria-pressed={listingType === 'buy'}
            onClick={() => handleToggleType('buy')}
          >
            Buy
          </button>
          <button
            type="button"
            className={`segmented-toggle__btn ${
              listingType === 'rent' ? 'is-active' : ''
            }`}
            aria-pressed={listingType === 'rent'}
            onClick={() => handleToggleType('rent')}
          >
            Rent
          </button>
        </div>
      </div>

      <div className="hero-search__fields">
        <div className="hero-search__field">
          <label htmlFor="hero-location" className="field-label">
            Location
          </label>
          <div className="select-wrap">
            <select
              id="hero-location"
              className="field-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Any location</option>
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

        <div className="hero-search__field">
          <label htmlFor="hero-property-type" className="field-label">
            Property type
          </label>
          <div className="select-wrap">
            <select
              id="hero-property-type"
              className="field-select"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {HERO_PROPERTY_TYPES.map((option) => (
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

        <div className="hero-search__field">
          <label htmlFor="hero-price-range" className="field-label">
            Price range
          </label>
          <div className="select-wrap">
            <select
              id="hero-price-range"
              className="field-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {pricePresets.map((preset) => (
                <option key={preset.label} value={preset.value}>
                  {preset.label}
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

      <div className="hero-search__submit-col">
        <button type="submit" className="btn btn--primary hero-search__btn">
          <span>Search</span>
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
