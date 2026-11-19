import { useState } from 'react';
import { useFavourites } from '../hooks/useFavourites';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyGrid } from '../components/PropertyGrid';
import { EmptyState } from '../components/EmptyState';

export function Favourites() {
  const { favouriteProperties, favouritesCount, clearFavourites } =
    useFavourites();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleConfirmClear = () => {
    clearFavourites();
    setConfirmClear(false);
  };

  return (
    <div className="favourites-page">
      <section className="page-header-band">
        <div className="container">
          <div className="favourites-header">
            <div>
              <SectionHeading
                darkText="Your saved"
                mutedText="properties."
                as="h1"
              />
              <p className="page-lead">
                {favouritesCount === 0
                  ? 'Keep track of homes, land, and offices you want to revisit.'
                  : `${favouritesCount} ${
                      favouritesCount === 1 ? 'property' : 'properties'
                    } saved`}
              </p>
            </div>

            {favouritesCount > 0 ? (
              <div className="favourites-clear-wrap">
                {confirmClear ? (
                  <div className="favourites-confirm" role="group" aria-label="Confirm clearing saved properties">
                    <span className="favourites-confirm__text">
                      Clear all saved?
                    </span>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={handleConfirmClear}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      onClick={() => setConfirmClear(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn--text"
                    onClick={() => setConfirmClear(true)}
                  >
                    <i className="fa-regular fa-trash-can" aria-hidden="true" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="page-section favourites-content">
        <div className="container">
          {favouritesCount === 0 ? (
            <EmptyState
              icon="fa-heart"
              title="No saved properties yet"
              description="Tap the heart icon on any listing to save it here for quick comparison."
              actionLabel="Browse Properties"
              actionTo="/properties"
            />
          ) : (
            <PropertyGrid properties={favouriteProperties} />
          )}
        </div>
      </section>
    </div>
  );
}
