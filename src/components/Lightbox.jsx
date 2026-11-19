import { useEffect, useRef, useCallback } from 'react';
import { PropertyImage } from './PropertyImage';

export function Lightbox({
  isOpen,
  images,
  title,
  currentIndex,
  onChangeIndex,
  onClose,
  returnFocusRef,
}) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const touchStartXRef = useRef(null);

  const handlePrev = useCallback(() => {
    onChangeIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, onChangeIndex]);

  const handleNext = useCallback(() => {
    onChangeIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into lightbox
    const focusTimer = window.setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 10);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
        return;
      }

      // Focus trap inside lightbox
      if (event.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (returnFocusRef && returnFocusRef.current) {
        returnFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, handlePrev, handleNext, returnFocusRef]);

  if (!isOpen) return null;

  const handleTouchStart = (event) => {
    if (event.touches && event.touches.length === 1) {
      touchStartXRef.current = event.touches[0].clientX;
    }
  };

  const handleTouchEnd = (event) => {
    if (touchStartXRef.current === null || !event.changedTouches) return;
    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div
      ref={overlayRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image viewer`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="lightbox__topbar">
        <span className="lightbox__counter">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          ref={closeBtnRef}
          type="button"
          className="lightbox__close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>

      <div className="lightbox__stage">
        {images.length > 1 ? (
          <button
            type="button"
            className="lightbox__arrow lightbox__arrow--prev"
            onClick={handlePrev}
            aria-label="Previous photo"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
        ) : null}

        <div className="lightbox__img-frame">
          <PropertyImage
            src={images[currentIndex]}
            alt={`${title} — full view ${currentIndex + 1} of ${images.length}`}
            aspectRatio="16 / 10"
            loading="eager"
          />
        </div>

        {images.length > 1 ? (
          <button
            type="button"
            className="lightbox__arrow lightbox__arrow--next"
            onClick={handleNext}
            aria-label="Next photo"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="lightbox__thumbs">
          {images.map((imgUrl, index) => (
            <button
              key={`${imgUrl}-lb-${index}`}
              type="button"
              className={`lightbox__thumb ${
                index === currentIndex ? 'is-active' : ''
              }`}
              onClick={() => onChangeIndex(index)}
              aria-label={`View photo ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
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
    </div>
  );
}
