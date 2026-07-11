"use client";

import React, { useEffect, useRef, useState } from "react";

const heroImages = [
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.23.49 AM.jpeg",
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.24.40 AM.jpeg",
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.25.04 AM.jpeg",
  "/assets/Hero_section/WhatsApp Image 2026-07-11 at 11.25.20 AM.jpeg",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5500); // 5.5s slide duration
    return () => clearInterval(timer);
  }, []);

  // Reveal hero content on mount
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const timer = setTimeout(() => {
      els.forEach((el, i) => {
        setTimeout(() => el.classList.add("revealed"), i * 120);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      {/* Slideshow background images */}
      {heroImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`LA Architects signature project presentation slide ${index + 1}`}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          fetchPriority={index === 0 ? "high" : "low"}
        />
      ))}

      {/* Overlays */}
      <div className="hero-gradient-bottom" />
      <div className="hero-gradient-left" />

      {/* Main content — bottom left */}
      <div className="hero-content justify-end items-start">
        <h1 className="hero-title reveal">
          28 Years.<br />Every Wall Considered.
        </h1>
        <p className="hero-sub reveal">
          Architecture, Interiors &amp; Turnkey Construction in Bangalore.
        </p>
        <div className="hero-ctas reveal justify-center">
          <a href="#gallery" className="btn-primary">
            View Our Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
