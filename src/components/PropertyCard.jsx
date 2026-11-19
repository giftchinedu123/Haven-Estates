import { Link } from 'react-router-dom';
import { PropertyImage } from './PropertyImage';
import { FavouriteButton } from './FavouriteButton';
import { formatPrice } from '../utils/formatPrice';

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

export function PropertyCard({ property }) {
  const showBeds =
    property.propertyType !== 'land' &&
    property.propertyType !== 'commercial' &&
    property.bedrooms > 0;
  const showBaths =
    property.propertyType !== 'land' &&
    property.propertyType !== 'commercial' &&
    property.bathrooms > 0;

  return (
    <article className="property-card">
      <Link to={`/properties/${property.id}`} className="property-card__link">
        <div className="property-card__media">
          <PropertyImage
            src={property.images[0]}
            alt={`${property.title} in ${property.area}, ${property.city}`}
            aspectRatio="4 / 3"
            imgClassName="property-card__img"
          />

          {property.status ? (
            <span className={`property-card__status ${getStatusClass(property.status)}`}>
              {property.status}
            </span>
          ) : null}

          <div className="property-card__fav">
            <FavouriteButton
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </div>
        </div>

        <div className="property-card__body">
          <div className="property-card__top">
            <p
              className="property-card__price"
              aria-label={formatPrice(property.price, {
                listingType: property.listingType,
                compact: false,
              })}
            >
              {formatPrice(property.price, {
                listingType: property.listingType,
                compact: true,
              })}
            </p>
            <h3 className="property-card__title">{property.title}</h3>
            <p className="property-card__location">
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
              <span>
                {property.area}, {property.city}
              </span>
            </p>
          </div>

          <div className="property-card__stats">
            {showBeds ? (
              <span className="property-card__stat">
                <i className="fa-solid fa-bed" aria-hidden="true" />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                </span>
              </span>
            ) : null}

            {showBaths ? (
              <span className="property-card__stat">
                <i className="fa-solid fa-bath" aria-hidden="true" />
                <span>
                  {property.bathrooms}{' '}
                  {property.bathrooms === 1 ? 'bath' : 'baths'}
                </span>
              </span>
            ) : null}

            <span className="property-card__stat">
              <i className="fa-solid fa-maximize" aria-hidden="true" />
              <span>{property.sizeSqm.toLocaleString('en-NG')} sqm</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
