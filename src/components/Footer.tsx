"use client";

import React, { useEffect, useState } from "react";

export default function Footer() {
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    // Show mobile CTA after 3 seconds on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const timer = setTimeout(() => setShowMobileCta(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            {/* Brand */}
            <div className="footer-brand-row">
              <div className="footer-logo-box">
                <span className="footer-logo-text">LA</span>
              </div>
              <div>
                <span className="footer-brand-name">LA Architects</span>
                <p className="footer-tagline">28 Years. Every Wall Considered.</p>
              </div>
            </div>

            {/* Copyright */}
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} LA Architects. All rights reserved.<br />
              Bangalore, India.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      {showMobileCta && (
        <div className="mobile-cta-bar visible" role="complementary" aria-label="Quick call action">
          <div className="mobile-cta-inner">
            <a href="tel:+919900045369" className="mobile-cta-btn" aria-label="Call LA Architects">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.63 12 19.79 19.79 0 0 1 1.56 3.44 2 2 0 0 1 3.53 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.5 9.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.75 16z" />
              </svg>
              Call Now — 99000 45369
            </a>
          </div>
        </div>
      )}
    </>
  );
}
