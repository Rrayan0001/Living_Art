"use client";

import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner justify-between items-center">
            {/* Brand */}
            <div className="footer-brand-row">
              <img 
                src="/assets/branding/favicon.png" 
                alt="LA Architects Logo Mark" 
                className="footer-logo-img" 
              />
              <div>
                <span className="footer-brand-name">LA Architects</span>
                <p className="footer-tagline text-left">28 Years. Every Wall Considered.</p>
              </div>
            </div>

            {/* Copyright */}
            <p className="footer-copy text-right">
              &copy; {new Date().getFullYear()} LA Architects. All rights reserved.<br />
              Bangalore, India.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
