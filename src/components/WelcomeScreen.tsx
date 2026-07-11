"use client";

import React, { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Check if session storage is available and preloader was already shown
    if (typeof window !== "undefined") {
      const wasShown = sessionStorage.getItem("welcome_preloader_shown");
      if (wasShown === "true") {
        setRemoved(true);
        return;
      }
    }

    // Stage 1: Trigger the sliding up unmask animation after 2.8s
    const exitTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    // Stage 2: Remove the preloader overlay completely after the slide transition
    const removeTimer = setTimeout(() => {
      setRemoved(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("welcome_preloader_shown", "true");
      }
    }, 4000); // 2.8s display + 1.2s transition

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`welcome-screen ${fadeOut ? "exit-up" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Loading LA Architects"
    >
      <div className="welcome-content">
        {/* Monochrome Logo */}
        <div className="welcome-logos">
          <img
            src="/assets/branding/LOGO monochrome_.png"
            alt="Living Art Logo"
            className="welcome-logo-img"
            style={{ height: "64px", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Brand Group and Tagline */}
        <div className="welcome-text-group">
          <span className="welcome-tagline-eyebrow">LA Architects</span>
          <h1 className="welcome-tagline-title">Designing Spaces. Delivering Legacies.</h1>
          <p className="welcome-tagline-sub">Architecture · Interiors · Turnkey Construction</p>
        </div>

        {/* Bronze Loading Spinner */}
        <div className="welcome-spinner-wrap">
          <div className="welcome-spinner" />
        </div>
      </div>
    </div>
  );
}
