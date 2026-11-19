import { Link } from 'react-router-dom';

export function EmptyState({
  icon = 'fa-house',
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="state-box">
      <div className="state-box__icon" aria-hidden="true">
        <i className={`fa-solid ${icon}`} />
      </div>
      <h2 className="state-box__title">{title}</h2>
      {description ? <p className="state-box__desc">{description}</p> : null}
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="btn btn--primary">
          <span>{actionLabel}</span>
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      ) : null}
      {actionLabel && onAction ? (
        <button type="button" className="btn btn--primary" onClick={onAction}>
          <span>{actionLabel}</span>
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
