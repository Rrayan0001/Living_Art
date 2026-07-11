"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Lightbox, { LightboxProject } from "./Lightbox";

// Define the asset URLs
const heroImages = [
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.23.49 AM.jpeg",
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.24.40 AM.jpeg",
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.25.04 AM.jpeg",
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.25.20 AM.jpeg",
];

const baseElevationImages = Array.from({ length: 31 }, (_, i) => {
  const idx = String(i + 1).padStart(3, "0");
  return `/assets/living-aart-elevation-architecture/elevation-${idx}.jpg`;
}).filter(src => !src.includes("elevation-004.jpg"));

const elevationImages = [...heroImages, ...baseElevationImages];

const interiorImages = Array.from({ length: 36 }, (_, i) => {
  const idx = String(i + 1).padStart(3, "0");
  return `/assets/living-incorp-interiors/interior-${idx}.jpg`;
});

// Home Page: 7 selected premium images for each category (hero images are now at the start of elevationImages)
const featuredElevation = elevationImages.slice(0, 7);
const featuredInteriors = interiorImages.slice(0, 7);

// Projects Page: Remaining images for each category
const remainingElevation = elevationImages.slice(7);
const remainingInteriors = interiorImages.slice(7);

let idCounter = 0;
const genId = () => `card_${Date.now().toString(36)}_${idCounter++}`;

export function CardStack({
  images,
  onCardClick,
}: {
  images: string[];
  onCardClick: (src: string) => void;
}) {
  const [cards, setCards] = React.useState(
    images.map((img) => ({ id: genId(), src: img, alt: "" }))
  );

  const moveToEnd = (index: number) => {
    setCards((prev) => [...prev.slice(index + 1), prev[index]]);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        margin: "0 auto",
        // Extra bottom padding accommodates the stacked cards peeking below
        paddingBottom: 40,
      }}
    >
      {/* Aspect-ratio box for the top card */}
      <div style={{ width: "100%", aspectRatio: "16 / 9", position: "relative" }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: 6,
              border: "1px solid rgba(163, 128, 82, 0.18)",
              boxShadow: `0 ${12 + i * 4}px ${36 + i * 8}px rgba(0,0,0,${0.12 + i * 0.04})`,
              cursor: i === 0 ? "grab" : "default",
              zIndex: cards.length - i,
            }}
            animate={{
              y: `${i * 7}%`,
              scale: 1 - i * 0.04,
              filter: `brightness(${1 - i * 0.12})`,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 28,
            }}
            drag={i === 0 ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragMomentum={false}
            onDragEnd={() => moveToEnd(i)}
            whileDrag={{
              scale: 1.03,
              rotate: 0.8,
              cursor: "grabbing",
            }}
            onClick={() => {
              if (i === 0) onCardClick(card.src);
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface GalleryProps {
  showAll?: boolean;
}

export default function Gallery({ showAll = false }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"elevation" | "interiors">("elevation");
  
  // Homepage Inline Slider States
  const [elevationIdx, setElevationIdx] = useState(0);
  const [interiorIdx, setInteriorIdx] = useState(0);

  // Projects page visible count pagination state
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset pagination count on tab change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeTab]);

  // Autoplay timers for homepage sliders
  useEffect(() => {
    if (showAll) return;
    const elevationTimer = setInterval(() => {
      setElevationIdx((prev) => (prev + 1) % featuredElevation.length);
    }, 5000);
    return () => clearInterval(elevationTimer);
  }, [showAll]);

  useEffect(() => {
    if (showAll) return;
    const interiorTimer = setInterval(() => {
      setInteriorIdx((prev) => (prev + 1) % featuredInteriors.length);
    }, 5000);
    return () => clearInterval(interiorTimer);
  }, [showAll]);

  // Lightbox State
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [lbSlides, setLbSlides] = useState<LightboxProject[]>([]);

  // Parse active tab from URL on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "interiors") {
        setActiveTab("interiors");
      } else if (tab === "elevation") {
        setActiveTab("elevation");
      }
    }
  }, []);

  // Set entrance animation classes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [showAll, activeTab]);

  const openLightbox = (slides: LightboxProject[], index: number) => {
    setLbSlides(slides);
    setLbIndex(index);
    setLbOpen(true);
  };

  const closeLightbox = () => {
    setLbOpen(false);
  };

  const prevSlide = () => {
    setLbIndex((idx) => (idx - 1 + lbSlides.length) % lbSlides.length);
  };

  const nextSlide = () => {
    setLbIndex((idx) => (idx + 1) % lbSlides.length);
  };

  const goToSlide = (index: number) => {
    setLbIndex(index);
  };

  // Convert list of strings to Lightbox format
  const formatSlides = (images: string[], titlePrefix: string, typeLabel: string): LightboxProject[] => {
    return images.map((src, i) => ({
      src,
      title: `${titlePrefix} Project #${i + 1}`,
      type: typeLabel,
    }));
  };

  // 1. Homepage View (showAll = false): Renders two distinct sections with inline sliders
  if (!showAll) {
    const elevationSlides = formatSlides(featuredElevation, "Living Aart Architecture", "Living Aart — Architecture");
    const interiorSlides = formatSlides(featuredInteriors, "Living Art Interior", "Living Art — Premium Interiors");

    return (
      <section className="gallery-section texture-linen" id="gallery" ref={sectionRef}>
        
        {/* Section 1: Living Aart — Architecture */}
        <div className="container" style={{ marginBottom: "112px" }}>
          <div className="gallery-section-header reveal text-center" style={{ marginBottom: "48px" }}>
            <span className="section-eyebrow">Living Aart</span>
            <h2 className="section-title">Architecture</h2>
            <div className="about-heading-line" style={{ margin: "16px auto 0 auto" }} />
          </div>

          {/* Interactive Draggable CardStack Element */}
          <div className="reveal" style={{ position: "relative" }}>
            <CardStack
              images={featuredElevation}
              onCardClick={(src) => {
                const idx = elevationImages.indexOf(src);
                if (idx !== -1) {
                  openLightbox(elevationSlides, idx);
                }
              }}
            />
          </div>

          {/* Drag hint */}
          <p className="reveal text-center" style={{ marginTop: "16px", fontSize: "0.8rem", color: "var(--color-bronze-light, #b89a6a)", letterSpacing: "0.08em", opacity: 0.75 }}>
            ↕ Drag to browse · Click to enlarge
          </p>

          <div className="reveal justify-center" style={{ marginTop: "48px" }}>
            <a href="/projects?tab=elevation" className="btn-outline-dark">
              View All Architecture Works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginLeft: "6px" }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Section 2: Living Art — Premium Interiors */}
        <div className="container">
          <div className="gallery-section-header reveal text-center" style={{ marginBottom: "48px" }}>
            <span className="section-eyebrow">Living Art</span>
            <h2 className="section-title">Premium Interiors</h2>
            <div className="about-heading-line" style={{ margin: "16px auto 0 auto" }} />
          </div>

          {/* Interactive Draggable CardStack Element */}
          <div className="reveal" style={{ position: "relative" }}>
            <CardStack
              images={featuredInteriors}
              onCardClick={(src) => {
                const idx = interiorImages.indexOf(src);
                if (idx !== -1) {
                  openLightbox(interiorSlides, idx);
                }
              }}
            />
          </div>

          {/* Drag hint */}
          <p className="reveal text-center" style={{ marginTop: "16px", fontSize: "0.8rem", color: "var(--color-bronze-light, #b89a6a)", letterSpacing: "0.08em", opacity: 0.75 }}>
            ↕ Drag to browse · Click to enlarge
          </p>

          <div className="reveal justify-center" style={{ marginTop: "48px" }}>
            <a href="/projects?tab=interiors" className="btn-outline-dark">
              View All Interior Works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginLeft: "6px" }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Full-screen Lightbox viewer */}
        {lbOpen && (
          <Lightbox
            isOpen={lbOpen}
            projects={lbSlides}
            currentIndex={lbIndex}
            onClose={closeLightbox}
            onPrev={prevSlide}
            onNext={nextSlide}
            onGoTo={goToSlide}
          />
        )}
      </section>
    );
  }

  // 2. Projects Page View (showAll = true): Renders tabbed switcher for all works
  const activeImages = activeTab === "elevation" ? elevationImages : interiorImages;
  const tabTitlePrefix = activeTab === "elevation" ? "Living Aart Architecture" : "Living Art Interior";
  const tabTypeLabel = activeTab === "elevation" ? "Living Aart — Architecture" : "Living Art — Premium Interiors";
  
  const displayedImages = activeImages.slice(0, visibleCount);
  const allSlides = formatSlides(activeImages, tabTitlePrefix, tabTypeLabel);

  return (
    <section className="gallery-section texture-linen" id="gallery" ref={sectionRef} style={{ paddingTop: "40px" }}>
      <div className="container">
        
        {/* Header */}
        <div className="gallery-section-header reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">Explore Our Work</h2>
          <div className="about-heading-line" style={{ margin: "16px auto 0 auto" }} />
        </div>

        {/* Tab Controls Selector */}
        <div className="gallery-tabs-container reveal">
          <button
            className={`gallery-tab-btn ${activeTab === "elevation" ? "active" : ""}`}
            onClick={() => setActiveTab("elevation")}
          >
            Architecture
            <span className="tab-brand-indicator">Living Aart</span>
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === "interiors" ? "active" : ""}`}
            onClick={() => setActiveTab("interiors")}
          >
            Premium Interiors
            <span className="tab-brand-indicator">Living Art</span>
          </button>
        </div>

        {/* Tab Content: All Images Grid (Clean, unlabeled cards) */}
        <div className="projects-grid reveal-stagger">
          {displayedImages.map((src, idx) => (
            <div
              key={src}
              className="project-card clean-gallery-card reveal"
              style={{ cursor: "pointer" }}
              onClick={() => openLightbox(allSlides, idx)}
              role="button"
              tabIndex={0}
              aria-label={`View full image ${idx + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(allSlides, idx);
                }
              }}
            >
              <div className="project-main-image-wrap" style={{ aspectRatio: "3/2", borderRadius: "6px", overflow: "hidden" }}>
                <img
                  src={src}
                  alt={`${tabTypeLabel} Project ${idx + 1}`}
                  className="project-main-image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < activeImages.length && (
          <div className="reveal" style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <button
              className="btn-outline-dark"
              onClick={() => setVisibleCount((prev) => prev + 12)}
              style={{ cursor: "pointer", minWidth: "160px" }}
            >
              Load More
            </button>
          </div>
        )}

      </div>

      {/* Full-screen Lightbox viewer */}
      {lbOpen && (
        <Lightbox
          isOpen={lbOpen}
          projects={lbSlides}
          currentIndex={lbIndex}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
          onGoTo={goToSlide}
        />
      )}
    </section>
  );
}
