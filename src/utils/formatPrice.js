const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

const compactNairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  notation: 'compact',
  maximumFractionDigits: 1,
});

/**
 * Formats a Nigerian Naira price consistently across the app.
 * Appends " / year" for annual rental listings.
 */
export function formatPrice(amount, { listingType = 'buy', compact = false } = {}) {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) {
    return nairaFormatter.format(0);
  }

  let formatted;
  if (compact && numericAmount >= 1_000_000) {
    // Normalize compact notation to clean "₦85M" / "₦4.5M" / "₦1.2B"
    formatted = compactNairaFormatter.format(numericAmount).replace(/\s+/g, '');
  } else {
    formatted = nairaFormatter.format(numericAmount);
  }

  return listingType === 'rent' ? `${formatted} / year` : formatted;
}
