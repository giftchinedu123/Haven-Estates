export function ErrorMessage({
  title = 'Unable to load properties',
  message = 'Something interrupted loading the listings. Please try again.',
  onRetry,
}) {
  return (
    <div className="state-box" role="alert">
      <div className="state-box__icon" aria-hidden="true">
        <i className="fa-solid fa-circle-exclamation" />
      </div>
      <h2 className="state-box__title">{title}</h2>
      <p className="state-box__desc">{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          <span>Try again</span>
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
