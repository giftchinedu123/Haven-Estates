import { useState, useEffect } from 'react';

export function PropertyImage({
  src,
  alt,
  aspectRatio = '4 / 3',
  className = '',
  imgClassName = '',
  loading = 'lazy',
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`property-image ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {!src || hasError ? (
        <div
          className="property-image__fallback"
          role="img"
          aria-label={alt || 'Property image unavailable'}
        >
          <i className="fa-solid fa-house" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          className={`property-image__img ${imgClassName}`.trim()}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
