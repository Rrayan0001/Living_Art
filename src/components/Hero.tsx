"use client";

import React, { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

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
      {/* Background image — uses the first actual project photo */}
      <img
        src="/assets/projects/project-007.jpg"
        alt="LA Architects — signature project in golden-hour light"
        className="hero-image"
        fetchPriority="high"
      />

      {/* Overlays */}
      <div className="hero-gradient-bottom" />
      <div className="hero-gradient-left" />



      {/* Main content — bottom left */}
      <div className="hero-content">
        <h1 className="hero-title reveal">
          28 Years.<br />Every Wall Considered.
        </h1>
        <p className="hero-sub reveal">
          Architecture, Interiors &amp; Turnkey Construction in Bangalore.
        </p>
        <div className="hero-ctas reveal">
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
