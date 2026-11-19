import { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PROPERTIES } from '../data/properties';
import { formatPrice } from '../utils/formatPrice';
import { getSimilarProperties } from '../utils/filterProperties';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Gallery } from '../components/Gallery';
import { FavouriteButton } from '../components/FavouriteButton';
import { ShareButton } from '../components/ShareButton';
import { ContactAgentForm } from '../components/ContactAgentForm';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyGrid } from '../components/PropertyGrid';
import { EmptyState } from '../components/EmptyState';

function formatPropertyType(type) {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getStatusClass(status) {
  if (!status) return '';
  const normalized = status.toLowerCase();
  if (normalized === 'new' || normalized === 'sold') {
    return 'status-pill status-pill--dark';
  }
  if (normalized === 'under offer') {
    return 'status-pill status-pill--grey';
  }
  return 'status-pill status-pill--light';
}

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recentlyViewedProperties, addRecentlyViewed } = useRecentlyViewed();

  const property = useMemo(
    () => PROPERTIES.find((item) => item.id === id) || null,
    [id]
  );

  useEffect(() => {
    if (property) {
      addRecentlyViewed(property.id);
    }
  }, [property, addRecentlyViewed]);

  const similarProperties = useMemo(
    () => getSimilarProperties(PROPERTIES, property, 3),
    [property]
  );

  const otherRecentlyViewed = useMemo(
    () =>
      recentlyViewedProperties
        .filter((item) => item.id !== id)
        .slice(0, 4),
    [recentlyViewedProperties, id]
  );

  if (!property) {
    return (
      <div className="container page-section">
        <EmptyState
          icon="fa-house-circle-xmark"
          title="Property not found"
          description="This listing may have been removed or the link may be incorrect."
          actionLabel="Back to properties"
          actionTo="/properties"
        />
      </div>
    );
  }

  const showBeds =
    property.propertyType !== 'land' &&
    property.propertyType !== 'commercial' &&
    property.bedrooms > 0;
  const showBaths =
    property.propertyType !== 'land' &&
    property.propertyType !== 'commercial' &&
    property.bathrooms > 0;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    property.address
  )}`;

  return (
    <div className="details-page">
      <div className="container">
        {/* Top back & breadcrumb bar */}
        <div className="details-topbar">
          <button
            type="button"
            className="back-link-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            <span>Back</span>
          </button>

          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/properties">Properties</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/properties?city=${encodeURIComponent(property.city)}`}>
              {property.area}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="breadcrumb__current" aria-current="page">
              {property.title}
            </span>
          </nav>
        </div>

        <div className="details-layout">
          <div className="details-main">
            <Gallery images={property.images} title={property.title} />

            {/* Main summary header */}
            <div className="details-header">
              <div className="details-header__badges">
                <span className="status-pill status-pill--light">
                  {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {property.status ? (
                  <span className={getStatusClass(property.status)}>
                    {property.status}
                  </span>
                ) : null}
              </div>

              <div className="details-header__top">
                <div className="details-header__titles">
                  <h1 className="details-title">{property.title}</h1>
                  <p className="details-location">
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    <span>
                      {property.area}, {property.city}
                    </span>
                  </p>
                </div>

                <div className="details-header__actions">
                  <FavouriteButton
                    propertyId={property.id}
                    propertyTitle={property.title}
                    variant="pill"
                  />
                  <ShareButton title={property.title} />
                </div>
              </div>

              <p className="details-price">
                {formatPrice(property.price, {
                  listingType: property.listingType,
                  compact: false,
                })}
              </p>

              {/* Stats row */}
              <div className="details-stats">
                {showBeds ? (
                  <div className="details-stat">
                    <i className="fa-solid fa-bed" aria-hidden="true" />
                    <span>
                      {property.bedrooms}{' '}
                      {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                    </span>
                  </div>
                ) : null}

                {showBaths ? (
                  <div className="details-stat">
                    <i className="fa-solid fa-bath" aria-hidden="true" />
                    <span>
                      {property.bathrooms}{' '}
                      {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                    </span>
                  </div>
                ) : null}

                <div className="details-stat">
                  <i className="fa-solid fa-maximize" aria-hidden="true" />
                  <span>{property.sizeSqm.toLocaleString('en-NG')} sqm</span>
                </div>

                <div className="details-stat">
                  <i className="fa-solid fa-building" aria-hidden="true" />
                  <span>{formatPropertyType(property.propertyType)}</span>
                </div>
              </div>
            </div>

            <hr className="details-divider" />

            {/* Description */}
            <section className="details-block">
              <h2 className="details-block__heading">Overview</h2>
              <p className="details-description">{property.description}</p>
            </section>

            <hr className="details-divider" />

            {/* Features list */}
            <section className="details-block">
              <h2 className="details-block__heading">Property Features</h2>
              <ul className="features-list">
                {property.features.map((feature) => (
                  <li key={feature} className="features-list__item">
                    <i className="fa-solid fa-check" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="details-divider" />

            {/* Location block */}
            <section className="details-block">
              <h2 className="details-block__heading">Location</h2>
              <div className="location-box">
                <div className="location-box__info">
                  <p className="location-box__address">{property.address}</p>
                  <p className="location-box__sub">
                    {property.area}, {property.city}, Nigeria
                  </p>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                >
                  <i className="fa-solid fa-map-pin" aria-hidden="true" />
                  <span>View on Google Maps</span>
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </section>
          </div>

          <div className="details-sidebar">
            <ContactAgentForm
              propertyTitle={property.title}
              agent={property.agent}
            />
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 ? (
          <section className="details-related-section">
            <SectionHeading
              darkText="Similar"
              mutedText="properties."
              as="h2"
            />
            <div className="details-related-grid">
              <PropertyGrid properties={similarProperties} />
            </div>
          </section>
        ) : null}

        {/* Recently Viewed */}
        {otherRecentlyViewed.length > 0 ? (
          <section className="details-related-section">
            <SectionHeading
              darkText="Recently viewed"
              mutedText="listings."
              as="h2"
            />
            <div className="details-related-grid">
              <PropertyGrid properties={otherRecentlyViewed} />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
