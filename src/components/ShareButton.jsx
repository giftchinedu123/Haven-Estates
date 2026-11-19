import { useState, useEffect, useRef } from 'react';

export function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showCopiedFeedback = () => {
    setCopied(true);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2600);
  };

  const handleShare = async () => {
    const shareUrl = url || window.location.href;

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: title || 'Haven Estates Property',
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        showCopiedFeedback();
        return;
      }
    } catch {
      // Fallback below
    }

    try {
      const tempInput = document.createElement('input');
      tempInput.value = shareUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showCopiedFeedback();
    } catch {
      // Ignore if clipboard blocked
    }
  };

  return (
    <div className="share-btn-wrap">
      <button
        type="button"
        className="btn btn--secondary"
        onClick={handleShare}
        aria-label="Share this property"
      >
        <i className="fa-solid fa-share-nodes" aria-hidden="true" />
        <span>Share</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
      {copied ? (
        <span className="share-toast" role="status" aria-hidden="true">
          <i className="fa-solid fa-check" aria-hidden="true" /> Link copied
        </span>
      ) : null}
    </div>
  );
}
