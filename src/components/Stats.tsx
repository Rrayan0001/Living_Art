"use client";

import React, { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
  isStatic?: boolean;
  staticValue?: string;
}

const stats: Stat[] = [
  { target: 28, suffix: "+", label: "Years of Experience" },
  { target: 550, suffix: "+", label: "Projects Completed" },
  { target: 100, suffix: "%", label: "Client Satisfaction" },
  { target: 0, suffix: "", label: "Established", isStatic: true, staticValue: "1998" },
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

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounter(stat.target, 2000, active && !stat.isStatic);
  return (
    <div className="reveal">
      <span className="stat-number tnum">
        {stat.isStatic ? stat.staticValue : count + stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            // Reveal scroll animations
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid reveal-stagger justify-center">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
