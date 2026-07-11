"use client";

import React, { useEffect, useRef, useCallback } from "react";

export interface LightboxProject {
  src: string;
  title: string;
  type: string;
}

interface LightboxProps {
  isOpen: boolean;
  projects: LightboxProject[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo?: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  projects,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: LightboxProps) {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Auto-scroll thumbnail strip to keep active thumb visible
  useEffect(() => {
    if (!thumbsRef.current) return;
    const activeThumb = thumbsRef.current.querySelector(".lb-thumb-btn.active") as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentIndex]);

  // Backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].screenX;
    const diffY = touchStartY.current - e.changedTouches[0].screenY;
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) onNext(); else onPrev();
    }
  };

  const project = projects[currentIndex];
  if (!project) return null;

  return (
    <div
      className={`lightbox${isOpen ? " active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Project image viewer"
      onClick={handleBackdropClick}
    >
      {/* Modal panel */}
      <div
        className="lb-panel"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button className="lb-close" onClick={onClose} aria-label="Close lightbox">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Main image area with overlaid arrows */}
        <div className="lb-main-area">
          <img
            key={project.src}
            src={project.src}
            alt={project.title}
            className="lb-main-img"
            draggable={false}
          />

          {/* Overlaid circular prev button */}
          <button className="lb-arrow lb-arrow-prev" onClick={onPrev} aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Overlaid circular next button */}
          <button className="lb-arrow lb-arrow-next" onClick={onNext} aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators overlaid at the bottom of the main image */}
          {projects.length > 1 && (
            <div className="lb-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`lb-dot ${i === currentIndex ? "active" : ""}`}
                  onClick={() => onGoTo ? onGoTo(i) : undefined}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip below the main image */}
        {projects.length > 1 && (
          <div className="lb-thumbs-strip" ref={thumbsRef}>
            {projects.map((proj, i) => (
              <button
                key={proj.src}
                className={`lb-thumb-btn ${i === currentIndex ? "active" : ""}`}
                onClick={() => onGoTo ? onGoTo(i) : undefined}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={proj.src}
                  alt={`Thumbnail ${i + 1}`}
                  className="lb-thumb-img"
                  draggable={false}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
