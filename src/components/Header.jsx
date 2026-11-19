import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useFavourites } from '../hooks/useFavourites';
import { SITE_INFO } from '../utils/constants';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favouritesCount } = useFavourites();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  // Close drawer on Escape and lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleContactClick = () => {
    setMenuOpen(false);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand-mark">
          <span className="brand-mark__icon" aria-hidden="true">
            <i className="fa-solid fa-house" />
          </span>
          <span className="brand-mark__text">{SITE_INFO.brandName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'is-active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'is-active' : ''}`
            }
          >
            Properties
          </NavLink>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `nav-link nav-link--fav ${isActive ? 'is-active' : ''}`
            }
          >
            <span>Favourites</span>
            {favouritesCount > 0 ? (
              <span
                className="nav-count-badge"
                aria-label={`${favouritesCount} saved`}
              >
                {favouritesCount}
              </span>
            ) : null}
          </NavLink>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="btn btn--primary header-contact-btn"
            onClick={handleContactClick}
          >
            <span>Contact Us</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <i
              className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        id="mobile-nav-drawer"
        className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          <NavLink
            to="/"
            end
            tabIndex={menuOpen ? 0 : -1}
            className={({ isActive }) =>
              `mobile-drawer__link ${isActive ? 'is-active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            tabIndex={menuOpen ? 0 : -1}
            className={({ isActive }) =>
              `mobile-drawer__link ${isActive ? 'is-active' : ''}`
            }
          >
            Properties
          </NavLink>
          <NavLink
            to="/favourites"
            tabIndex={menuOpen ? 0 : -1}
            className={({ isActive }) =>
              `mobile-drawer__link ${isActive ? 'is-active' : ''}`
            }
          >
            <span>Favourites</span>
            {favouritesCount > 0 ? (
              <span className="nav-count-badge">{favouritesCount}</span>
            ) : null}
          </NavLink>

          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            className="btn btn--primary mobile-drawer__cta"
            onClick={handleContactClick}
          >
            <span>Contact Us</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  );
}
