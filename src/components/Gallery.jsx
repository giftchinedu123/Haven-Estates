import { useState, useRef } from 'react';
import { PropertyImage } from './PropertyImage';
import { Lightbox } from './Lightbox';

export function Gallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const expandBtnRef = useRef(null);

  const safeImages = Array.isArray(images) && images.length > 0 ? images : [''];
  const currentSrc = safeImages[activeIndex] || safeImages[0];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="gallery">
      <div className="gallery__main">
        <button
          type="button"
          className="gallery__main-trigger"
          onClick={openLightbox}
          aria-label={`View full-screen gallery for ${title}`}
        >
          <PropertyImage
            src={currentSrc}
            alt={`${title} — photo ${activeIndex + 1} of ${safeImages.length}`}
            aspectRatio="16 / 10"
            loading="eager"
          />
        </button>

        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              className="gallery__nav gallery__nav--prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gallery__nav gallery__nav--next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </>
        ) : null}

        <button
          ref={expandBtnRef}
          type="button"
          className="gallery__expand-btn"
          onClick={openLightbox}
          aria-label="Expand image gallery"
        >
          <i className="fa-solid fa-expand" aria-hidden="true" />
          <span>Expand</span>
        </button>

        <span className="gallery__counter" aria-hidden="true">
          {activeIndex + 1} / {safeImages.length}
        </span>
      </div>

      {safeImages.length > 1 ? (
        <div className="gallery__thumbs" role="list" aria-label="Property thumbnails">
          {safeImages.map((imgUrl, index) => (
            <button
              key={`${imgUrl}-${index}`}
              type="button"
              className={`gallery__thumb ${
                index === activeIndex ? 'is-active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1} of ${safeImages.length}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            >
              <PropertyImage
                src={imgUrl}
                alt={`${title} thumbnail ${index + 1}`}
                aspectRatio="4 / 3"
              />
            </button>
          ))}
        </div>
      ) : null}

      <Lightbox
        isOpen={lightboxOpen}
        images={safeImages}
        title={title}
        currentIndex={activeIndex}
        onChangeIndex={setActiveIndex}
        onClose={closeLightbox}
        returnFocusRef={expandBtnRef}
      />
    </div>
  );
}
