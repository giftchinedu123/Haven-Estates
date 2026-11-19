import { useFavourites } from '../hooks/useFavourites';

export function FavouriteButton({
  propertyId,
  propertyTitle = 'property',
  variant = 'icon',
  className = '',
}) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(propertyId);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavourite(propertyId);
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        className={`btn btn--secondary fav-pill-btn ${saved ? 'is-saved' : ''} ${className}`.trim()}
        aria-pressed={saved}
        aria-label={
          saved
            ? `Remove ${propertyTitle} from favourites`
            : `Save ${propertyTitle} to favourites`
        }
        onClick={handleClick}
      >
        <i
          className={saved ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
          aria-hidden="true"
        />
        <span>{saved ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`fav-icon-btn ${saved ? 'is-saved' : ''} ${className}`.trim()}
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${propertyTitle} from favourites`
          : `Save ${propertyTitle} to favourites`
      }
      onClick={handleClick}
    >
      <i
        className={saved ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
        aria-hidden="true"
      />
    </button>
  );
}
