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
}

export default function Lightbox({
  isOpen,
  projects,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button className="lb-close" onClick={onClose} aria-label="Close lightbox">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev */}
      <button className="lb-prev" onClick={onPrev} aria-label="Previous image">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button className="lb-next" onClick={onNext} aria-label="Next image">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image & caption */}
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <div className="lb-img-wrap" ref={imgWrapRef}>
          <img
            src={project.src}
            alt={project.title}
            className="lb-img"
            draggable={false}
          />
        </div>
        <div className="lb-caption">
          <p className="lb-title">{project.title}</p>
          <p className="lb-type">{project.type}</p>
        </div>
      </div>

      {/* Counter */}
      <p className="lb-counter">
        {currentIndex + 1} / {projects.length}
      </p>
    </div>
  );
}
