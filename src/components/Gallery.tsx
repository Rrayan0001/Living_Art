"use client";

import React, { useState, useEffect, useRef } from "react";
import Lightbox, { LightboxProject } from "./Lightbox";

interface Project {
  folder: string;
  title: string;
  type: string;
  location: string;
  category: string;
  images: string[];
}

const projectsData: Project[] = [
  {
    folder: "v-s-senthil-kumar-residence-hosur-interiors",
    title: "Senthil Kumar Residence",
    type: "Luxury Bespoke Interiors",
    location: "Hosur, Tamil Nadu",
    category: "Interior Design",
    images: Array.from({ length: 16 }, (_, i) => {
      const idx = String(i + 1).padStart(2, "0");
      return `/assets/projects/v-s-senthil-kumar-residence-hosur-interiors/photo-${idx}.jpg`;
    }),
  },
  {
    folder: "tharun-residence-hosur",
    title: "Tharun Residence",
    type: "Contemporary Facade & Architecture",
    location: "Hosur, Tamil Nadu",
    category: "Architecture",
    images: Array.from({ length: 12 }, (_, i) => {
      const idx = String(i + 1).padStart(2, "0");
      return `/assets/projects/tharun-residence-hosur/photo-${idx}.jpg`;
    }),
  },
  {
    folder: "rashmi-pujar-residence-wilson-garden-bangalore",
    title: "Rashmi Pujar Residence",
    type: "Modern Residential Design",
    location: "Bangalore, Karnataka",
    category: "Residential Architecture",
    images: Array.from({ length: 10 }, (_, i) => {
      const idx = String(i + 1).padStart(2, "0");
      return `/assets/projects/rashmi-pujar-residence-wilson-garden-bangalore/photo-${idx}.jpg`;
    }),
  },
  {
    folder: "ananthramaiah-residence-bangalore",
    title: "Ananthramaiah Residence",
    type: "Elegant Facade Architecture",
    location: "Bangalore, Karnataka",
    category: "Residential Architecture",
    images: Array.from({ length: 3 }, (_, i) => {
      const idx = String(i + 1).padStart(2, "0");
      return `/assets/projects/ananthramaiah-residence-bangalore/photo-${idx}.jpg`;
    }),
  },
  {
    folder: "choodamani-residence-dindigul",
    title: "Choodamani Residence",
    type: "Traditional-Modern Fusion Home",
    location: "Dindigul, Tamil Nadu",
    category: "Residential Architecture",
    images: Array.from({ length: 3 }, (_, i) => {
      const idx = String(i + 1).padStart(2, "0");
      return `/assets/projects/choodamani-residence-dindigul/photo-${idx}.jpg`;
    }),
  },
  {
    folder: "abhilash-soora-honda-showroom-tumkur",
    title: "Honda Commercial Showroom",
    type: "Commercial Showroom Design",
    location: "Tumkur, Karnataka",
    category: "Commercial Architecture",
    images: Array.from({ length: 2 }, (_, i) => {
      const idx = String(i + 1).padStart(2, "0");
      return `/assets/projects/abhilash-soora-honda-showroom-tumkur/photo-${idx}.jpg`;
    }),
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number | null>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -45px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (projIdx: number, imgIdx: number) => {
    setActiveProjectIdx(projIdx);
    setLbIndex(imgIdx);
    setLbOpen(true);
  };

  const closeLightbox = () => {
    setLbOpen(false);
  };

  const prevSlide = () => {
    if (activeProjectIdx === null) return;
    const project = projectsData[activeProjectIdx];
    setLbIndex((idx) => (idx - 1 + project.images.length) % project.images.length);
  };

  const nextSlide = () => {
    if (activeProjectIdx === null) return;
    const project = projectsData[activeProjectIdx];
    setLbIndex((idx) => (idx + 1) % project.images.length);
  };

  // Prepare images for Lightbox component format
  const getLightboxSlides = (): LightboxProject[] => {
    if (activeProjectIdx === null) return [];
    const project = projectsData[activeProjectIdx];
    return project.images.map((src) => ({
      src,
      title: project.title,
      type: project.type,
    }));
  };

  return (
    <section className="gallery-section texture-linen" id="gallery" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="gallery-section-header reveal">
          <span className="section-eyebrow">Selected Works</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid reveal-stagger">
          {projectsData.map((project, projIdx) => {
            const primaryImage = project.images[0];
            const secondaryImages = project.images.slice(1);
            
            // Limit visible thumbnails to 4 items max
            const maxThumbnails = 4;
            const visibleThumbnails = secondaryImages.slice(0, maxThumbnails);
            const remainingCount = secondaryImages.length - maxThumbnails;

            return (
              <div className="project-card reveal" key={project.folder}>
                {/* Main Visual */}
                <div 
                  className="project-main-image-wrap"
                  onClick={() => openLightbox(projIdx, 0)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View full details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(projIdx, 0);
                    }
                  }}
                >
                  <img
                    src={primaryImage}
                    alt={`${project.title} - Main Display`}
                    className="project-main-image"
                    loading="lazy"
                  />
                </div>

                {/* Metadata Details */}
                <div className="project-info-wrap">
                  <span className="project-type-tag">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta-row">
                    <span className="project-location">{project.location}</span>
                  </div>
                </div>

                {/* Secondary Image Thumbnails Row */}
                {secondaryImages.length > 0 && (
                  <div className="project-thumbnails-container">
                    <span className="thumbnails-heading">Project Photos</span>
                    <div className="project-thumbnails-row">
                      {visibleThumbnails.map((thumbSrc, thumbIdx) => {
                        const originalIdx = thumbIdx + 1; // because 0 is main image
                        const isLast = thumbIdx === maxThumbnails - 1 && remainingCount > 0;

                        return (
                          <button
                            key={thumbSrc}
                            className="project-thumbnail-btn"
                            onClick={() => openLightbox(projIdx, originalIdx)}
                            aria-label={`View project photo ${originalIdx + 1}`}
                          >
                            <img
                              src={thumbSrc}
                              alt={`${project.title} - Thumbnail ${originalIdx}`}
                              className="project-thumbnail-img"
                              loading="lazy"
                            />
                            {isLast && (
                              <div className="thumbnail-more-overlay">
                                +{remainingCount}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {activeProjectIdx !== null && (
        <Lightbox
          isOpen={lbOpen}
          projects={getLightboxSlides()}
          currentIndex={lbIndex}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      )}
    </section>
  );
}
