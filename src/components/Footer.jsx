import { Link } from 'react-router-dom';
import { SectionHeading } from './SectionHeading';
import { SITE_INFO } from '../utils/constants';

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="site-footer__cta">
          <SectionHeading
            darkText="Tell us what you're"
            mutedText="looking for."
            as="h2"
            className="site-footer__heading"
          />
          <p className="site-footer__sub">
            Whether you are buying a residence, leasing commercial space, or
            exploring land investments across Nigeria, our advisors are ready to
            assist.
          </p>
          <div className="site-footer__buttons">
            <a href={`mailto:${SITE_INFO.email}`} className="btn btn--primary">
              <span>Email Us</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
            <a href={SITE_INFO.phoneHref} className="btn btn--secondary">
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        <hr className="site-footer__divider" />

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            &copy; {SITE_INFO.copyrightYear} {SITE_INFO.brandName}. All rights
            reserved.
          </p>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/properties">Properties</Link>
            <span aria-hidden="true">/</span>
            <Link to="/favourites">Favourites</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
