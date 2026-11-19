export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__media shimmer" />
      <div className="skeleton-card__body">
        <div className="skeleton-line skeleton-line--price shimmer" />
        <div className="skeleton-line skeleton-line--title shimmer" />
        <div className="skeleton-line skeleton-line--location shimmer" />
        <div className="skeleton-card__stats">
          <div className="skeleton-line skeleton-line--stat shimmer" />
          <div className="skeleton-line skeleton-line--stat shimmer" />
          <div className="skeleton-line skeleton-line--stat shimmer" />
        </div>
      </div>
    </div>
  );
}
