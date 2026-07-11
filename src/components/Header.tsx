"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`} id="site-header">
        <div className="header-container">
          <a href="/#hero" className="logo-link" aria-label="Living Art Home" onClick={closeMenu}>
            <img
              src="/assets/branding/LOGO monochrome_.png"
              alt="Living Art Logo"
              className="brand-logo"
              style={{ height: "42px", width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav justify-center md:justify-start" aria-label="Desktop Navigation">
            <a href="/#about" className="nav-link">About</a>
            <a href="/projects" className="nav-link">Projects</a>
            <a href="/#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right Call CTA */}
          <div className="header-actions justify-end">
            <a href="tel:9900045369" className="call-cta-btn" aria-label="Call LA Architects">
              <svg className="icon-phone" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="call-number">99000 45369</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-menu-toggle ${isMenuOpen ? "active" : ""}`}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-overlay"
              onClick={toggleMenu}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Navigation */}
      <div
        className={`mobile-nav-overlay ${isMenuOpen ? "active" : ""}`}
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <nav className="mobile-nav">
          <a href="/#about" className="mobile-nav-link" onClick={closeMenu}>About</a>
          <a href="/projects" className="mobile-nav-link" onClick={closeMenu}>Projects</a>
          <a href="/#contact" className="mobile-nav-link" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
}
