export const SITE_INFO = {
  brandName: 'Haven Estates',
  email: 'hello@example.com',
  phone: '+234 800 555 0199',
  phoneHref: 'tel:+2348005550199',
  copyrightYear: 2026,
};

export const PROPERTY_TYPES = [
  { value: '', label: 'All types' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

export const HERO_PROPERTY_TYPES = [
  { value: '', label: 'Any type' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

export const BUY_PRICE_PRESETS = [
  { value: '', label: 'Any price', min: '', max: '' },
  { value: '0-75000000', label: 'Up to ₦75M', min: '', max: '75000000' },
  { value: '75000000-200000000', label: '₦75M – ₦200M', min: '75000000', max: '200000000' },
  { value: '200000000-450000000', label: '₦200M – ₦450M', min: '200000000', max: '450000000' },
  { value: '450000000-', label: '₦450M+', min: '450000000', max: '' },
];

export const RENT_PRICE_PRESETS = [
  { value: '', label: 'Any price', min: '', max: '' },
  { value: '0-5000000', label: 'Up to ₦5M / yr', min: '', max: '5000000' },
  { value: '5000000-15000000', label: '₦5M – ₦15M / yr', min: '5000000', max: '15000000' },
  { value: '15000000-30000000', label: '₦15M – ₦30M / yr', min: '15000000', max: '30000000' },
  { value: '30000000-', label: '₦30M+ / yr', min: '30000000', max: '' },
];

export const BUY_MIN_PRICES = [
  { value: '', label: 'No min' },
  { value: '30000000', label: '₦30M' },
  { value: '50000000', label: '₦50M' },
  { value: '100000000', label: '₦100M' },
  { value: '200000000', label: '₦200M' },
  { value: '350000000', label: '₦350M' },
  { value: '500000000', label: '₦500M' },
];

export const BUY_MAX_PRICES = [
  { value: '', label: 'No max' },
  { value: '75000000', label: '₦75M' },
  { value: '150000000', label: '₦150M' },
  { value: '250000000', label: '₦250M' },
  { value: '400000000', label: '₦400M' },
  { value: '600000000', label: '₦600M' },
  { value: '800000000', label: '₦800M' },
];

export const RENT_MIN_PRICES = [
  { value: '', label: 'No min' },
  { value: '2000000', label: '₦2M / yr' },
  { value: '4000000', label: '₦4M / yr' },
  { value: '8000000', label: '₦8M / yr' },
  { value: '15000000', label: '₦15M / yr' },
  { value: '25000000', label: '₦25M / yr' },
];

export const RENT_MAX_PRICES = [
  { value: '', label: 'No max' },
  { value: '5000000', label: '₦5M / yr' },
  { value: '10000000', label: '₦10M / yr' },
  { value: '20000000', label: '₦20M / yr' },
  { value: '35000000', label: '₦35M / yr' },
  { value: '50000000', label: '₦50M / yr' },
];

export const BEDROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

export const BATHROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export const HOME_STATS = [
  { value: '1,250+', label: 'Verified Properties' },
  { value: '350+', label: 'Trusted Agents' },
  { value: '₦850M+', label: 'Sales Closed' },
  { value: '98%', label: 'Client Satisfaction' },
];
