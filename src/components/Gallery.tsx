"use client";

import React, { useState, useEffect, useRef } from "react";
import Lightbox, { LightboxProject } from "./Lightbox";

const projects: LightboxProject[] = [
  { src: "/assets/projects/project-001.jpg", title: "Residence Elevation — Whitefield", type: "Residential Facade" },
  { src: "/assets/projects/project-002.jpg", title: "Villa Exterior — Sarjapur Road", type: "Residential Facade" },
  { src: "/assets/projects/project-003.jpg", title: "Contemporary Home — Kanakapura", type: "Residential Facade" },
  { src: "/assets/projects/project-004.jpg", title: "Premium Residence — JP Nagar", type: "Residential Facade" },
  { src: "/assets/projects/project-005.jpg", title: "Luxury Elevation — Bannerghatta", type: "Residential Facade" },
  { src: "/assets/projects/project-006.jpg", title: "Modern Villa — Yelahanka", type: "Residential Facade" },
];

// Alternate aspect ratios for masonry variety
const aspectRatios = [
  "3 / 4",   // portrait
  "4 / 3",   // landscape
  "2 / 3",   // tall portrait
  "1 / 1",   // square
  "16 / 9",  // wide
  "3 / 4",   // portrait
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

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
  }, []);

  const openLightbox = (i: number) => { setLbIndex(i); setLbOpen(true); };
  const closeLightbox = () => setLbOpen(false);
  const prevSlide = () => setLbIndex((i) => (i - 1 + projects.length) % projects.length);
  const nextSlide = () => setLbIndex((i) => (i + 1) % projects.length);

  return (
    <section className="gallery-section texture-linen" id="gallery" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="gallery-section-header reveal">
          <span className="section-eyebrow">Selected Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid reveal-stagger">
          {projects.map((proj, i) => (
            <div className="masonry-item reveal" key={proj.src}>
              <div
                className="gallery-card"
                role="button"
                tabIndex={0}
                aria-label={`View ${proj.title}`}
                onClick={() => openLightbox(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(i);
                  }
                }}
              >
                <div className="gallery-img-wrap" style={{ aspectRatio: aspectRatios[i] }}>
                  <img
                    src={proj.src}
                    alt={proj.title}
                    className="gallery-img"
                    loading="lazy"
                  />
                </div>
                <div className="gallery-overlay">
                  <span className="gallery-card-type">{proj.type}</span>
                  <h3 className="gallery-card-title">{proj.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lbOpen}
        projects={projects}
        currentIndex={lbIndex}
        onClose={closeLightbox}
        onPrev={prevSlide}
        onNext={nextSlide}
      />
    </section>
  );
}
