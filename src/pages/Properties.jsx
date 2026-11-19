import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import {
  DEFAULT_FILTERS,
  parseFilterParams,
  buildFilterParams,
  filterAndSortProperties,
  getAvailableCities,
} from '../utils/filterProperties';
import { SectionHeading } from '../components/SectionHeading';
import { FilterBar } from '../components/FilterBar';
import { ActiveFilters } from '../components/ActiveFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';

export function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, isLoading, error, retry } = useProperties();

  const filters = useMemo(
    () => parseFilterParams(searchParams),
    [searchParams]
  );

  const cities = useMemo(() => getAvailableCities(properties), [properties]);

  const filteredProperties = useMemo(
    () => filterAndSortProperties(properties, filters),
    [properties, filters]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type) count += 1;
    if (filters.city) count += 1;
    if (filters.q && filters.q.trim()) count += 1;
    if (filters.propertyType) count += 1;
    if (filters.minPrice) count += 1;
    if (filters.maxPrice) count += 1;
    if (filters.beds) count += 1;
    if (filters.baths) count += 1;
    return count;
  }, [filters]);

  const handleUpdateFilters = useCallback(
    (patch) => {
      const merged = { ...filters, ...patch };
      const nextParams = buildFilterParams(merged);
      setSearchParams(nextParams, { replace: false });
    },
    [filters, setSearchParams]
  );

  const handleResetFilters = useCallback(() => {
    setSearchParams(buildFilterParams(DEFAULT_FILTERS), { replace: false });
  }, [setSearchParams]);

  return (
    <div className="properties-page">
      <section className="page-header-band">
        <div className="container">
          <SectionHeading
            darkText="Explore verified"
            mutedText="properties."
            as="h1"
          />
          <p className="page-lead">
            Filter homes, apartments, land, and commercial spaces by city,
            budget, and layout.
          </p>
        </div>
      </section>

      <section className="properties-workspace">
        <div className="container">
          <FilterBar
            filters={filters}
            cities={cities}
            onUpdateFilters={handleUpdateFilters}
            onResetFilters={handleResetFilters}
            totalResults={filteredProperties.length}
            activeFilterCount={activeFilterCount}
          />

          <div className="results-meta-bar">
            <p className="results-count" aria-live="polite">
              {isLoading
                ? 'Loading properties...'
                : `${filteredProperties.length} ${
                    filteredProperties.length === 1 ? 'property' : 'properties'
                  } found`}
            </p>
          </div>

          <ActiveFilters
            filters={filters}
            onRemoveFilter={handleUpdateFilters}
            onResetAll={handleResetFilters}
          />

          {error ? (
            <ErrorMessage message={error} onRetry={retry} />
          ) : isLoading ? (
            <div className="property-grid" aria-label="Loading properties">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <EmptyState
              icon="fa-magnifying-glass"
              title="No matching properties"
              description="Try widening your price range, clearing a filter, or searching a different neighborhood."
              actionLabel="Reset filters"
              onAction={handleResetFilters}
            />
          ) : (
            <PropertyGrid properties={filteredProperties} />
          )}
        </div>
      </section>
    </div>
  );
}
