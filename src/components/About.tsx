"use client";

import React, { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 28, suffix: "+", label: "Years Experience" },
  { target: 550, suffix: "+", label: "Projects Completed" },
  { target: 100, suffix: "%", label: "Client Satisfaction" },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useCounter(target: number, duration = 2000, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let frame: number;
    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return value;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounter(stat.target, 2000, active);
  return (
    <div className="about-stat-card">
      <span className="about-stat-number tnum">
        {count}{stat.suffix}
      </span>
      <span className="about-stat-label">{stat.label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section texture-linen" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid justify-center">
          
          {/* Left Column: About Me (Founder Profile) */}
          <div className="about-col-left reveal reveal-left">
            <span className="section-eyebrow">The Visionary</span>
            <h2 className="section-title">About Me</h2>
            <div className="about-heading-line" />
            
            <div className="about-profile-wrapper">
              <div className="about-avatar-container">
                <img
                  src="/assets/branding/branding_p05_600x860.png"
                  alt="A.K. Swaamy"
                  className="about-avatar-img"
                />
                <div className="about-avatar-glow" />
              </div>
              
              <div className="about-profile-info">
                <h3 className="about-profile-name">A.K. Swaamy</h3>
                <span className="about-profile-title">Founder &amp; Chief Architect</span>
                <div className="about-profile-decor">
                  <span className="decor-dot active" />
                  <span className="decor-dot active" />
                  <span className="decor-dot" />
                </div>
              </div>
            </div>

            <p className="about-bio-text">
              <strong>A.K. Swaamy</strong> is the Founder and Chief Architect of LA Architects, with over 28 years of experience in architecture, interior design, and project execution. He leads every project from concept to completion, creating innovative, functional, and timeless spaces. His commitment to quality, creativity, and client satisfaction has established LA Architects as a trusted name in the industry.
            </p>

            {/* Metrics cards grid */}
            <div className="about-stats-grid">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} active={active} />
              ))}
            </div>
          </div>

          {/* Right Column: About Us & Companies */}
          <div className="about-col-right reveal reveal-right">
            <span className="section-eyebrow">Our Legacy</span>
            <h2 className="section-title">About Us</h2>
            <div className="about-heading-line" />

            <div className="about-us-content justify-center md:justify-start">
              <p className="about-us-paragraph">
                At LA Architects, we bring over 28 years of experience in creating innovative, functional, and sustainable architectural solutions. Specializing in residential, commercial, institutional, hospitality, and mixed-use projects, we deliver thoughtful designs tailored to our clients&apos; vision.
              </p>
              <p className="about-us-paragraph">
                Led by Chief Architect A.K. Swaamy, our team provides end-to-end services from concept and planning to execution, ensuring quality, transparency, and timely delivery. We are committed to designing timeless spaces that combine creativity, technical excellence, and lasting value.
              </p>
            </div>

            {/* Premium Black Brand Synergy Card */}
            <div className="synergy-card">
              <div className="synergy-card-inner justify-center">
                <div className="synergy-logos-row">
                  <div className="synergy-logo-wrapper">
                    <img
                      src="/assets/branding/monochrome_logo1.png"
                      alt="Living Aart - Architects &amp; Interior Designers"
                      className="synergy-logo-img"
                      style={{ maxHeight: "40px", objectFit: "contain", width: "auto" }}
                    />
                  </div>
                  <div className="synergy-divider-line" />
                  <div className="synergy-logo-wrapper">
                    <img
                      src="/assets/branding/monochrome_logo2.png"
                      alt="Living Art - The Construction Team"
                      className="synergy-logo-img"
                      style={{ maxHeight: "40px", objectFit: "contain", width: "auto" }}
                    />
                  </div>
                </div>
                <div className="synergy-footer-label">
                  Architecture firm and construction company
                </div>
              </div>
              <div className="synergy-card-glow" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
