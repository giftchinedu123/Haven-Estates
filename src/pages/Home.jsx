import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES, HERO_IMAGE_URL, ABOUT_IMAGES } from '../data/properties';
import { getAvailableCities } from '../utils/filterProperties';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyImage } from '../components/PropertyImage';
import { HeroSearch } from '../components/HeroSearch';
import { PropertyGrid } from '../components/PropertyGrid';
import { StatsRow } from '../components/StatsRow';

export function Home() {
  const { recentlyViewedProperties } = useRecentlyViewed();

  const cities = useMemo(() => getAvailableCities(PROPERTIES), []);

  const featuredProperties = useMemo(
    () => PROPERTIES.filter((property) => property.featured).slice(0, 6),
    []
  );

  const recentFour = useMemo(
    () => recentlyViewedProperties.slice(0, 4),
    [recentlyViewedProperties]
  );

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-header">
            <h1 className="hero-title">
              <span className="section-heading__dark">
                Live where you&apos;ve always
              </span>{' '}
              <span className="section-heading__muted">dreamed of living.</span>
            </h1>
            <p className="hero-subtitle">
              Find your perfect home in a place that inspires you every single
              day.
            </p>
          </div>

          <div className="hero-stage">
            <div className="hero-image-frame">
              <PropertyImage
                src={HERO_IMAGE_URL}
                alt="Modern architectural residence surrounded by landscaped greenery"
                aspectRatio="16 / 9"
                loading="eager"
              />
            </div>

            <div className="hero-search-dock">
              <HeroSearch cities={cities} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="page-section">
        <div className="container">
          <div className="section-top-row">
            <SectionHeading
              darkText="Featured properties"
              mutedText="across Nigeria."
              as="h2"
            />
            <Link to="/properties" className="btn btn--secondary">
              <span>View all properties</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          <PropertyGrid properties={featuredProperties} />
        </div>
      </section>

      {/* About Section */}
      <section className="page-section about-section">
        <div className="container">
          <div className="about-section__intro">
            <span className="section-pill">About Us</span>
            <p className="about-statement">
              <span className="section-heading__dark">
                Haven Estates is a modern real estate platform built to connect
                discerning buyers and tenants with verified spaces
              </span>{' '}
              <span className="section-heading__muted">
                where architecture, neighborhood character, and lasting comfort
                come together so you always feel truly at home.
              </span>
            </p>
          </div>

          <div className="about-grid">
            <div className="about-grid__large">
              <PropertyImage
                src={ABOUT_IMAGES.primary}
                alt="Clean minimalist residence facade with natural daylight"
                aspectRatio="4 / 3"
              />
            </div>

            <div className="about-grid__copy">
              <p className="about-grid__text">
                From waterfront villas in Lekki and Ikoyi penthouses to serene
                residences in Maitama, Port Harcourt, Ibadan, and Enugu, every
                listing is vetted with transparent Naira pricing and direct
                agent access.
              </p>
              <Link to="/properties" className="btn btn--primary">
                <span>Browse Properties</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>

            <div className="about-grid__small">
              <PropertyImage
                src={ABOUT_IMAGES.secondary}
                alt="Sunlit open-plan interior living room"
                aspectRatio="4 / 5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="page-section stats-section" aria-label="Platform highlights">
        <div className="container">
          <StatsRow />
        </div>
      </section>

      {/* Recently Viewed */}
      {recentFour.length > 0 ? (
        <section className="page-section">
          <div className="container">
            <div className="section-top-row">
              <SectionHeading
                darkText="Recently viewed"
                mutedText="by you."
                as="h2"
              />
            </div>
            <div className="recent-grid">
              <PropertyGrid properties={recentFour} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
