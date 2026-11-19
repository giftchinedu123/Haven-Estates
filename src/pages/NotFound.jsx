import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="state-box">
          <div className="state-box__icon" aria-hidden="true">
            <i className="fa-solid fa-compass" />
          </div>
          <SectionHeading
            darkText="Page not"
            mutedText="found."
            as="h1"
            className="not-found-heading"
          />
          <p className="state-box__desc">
            The page you requested does not exist or may have moved.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn--primary">
              <span>Return Home</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link to="/properties" className="btn btn--secondary">
              <span>Browse Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
