"use client";

import React, { useEffect, useRef } from "react";

const contactMethods = [
  {
    id: "phone-link",
    href: "tel:+919900045369",
    label: "Phone",
    value: "+91 99000 45369",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.63 12 19.79 19.79 0 0 1 1.56 3.44 2 2 0 0 1 3.53 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.5 9.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.75 16z" />
      </svg>
    ),
  },
  {
    id: "email-link",
    href: "mailto:la@laarchitects.net",
    label: "Email",
    value: "la@laarchitects.net",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "whatsapp-link",
    href: "https://wa.me/919900045369?text=Hello%20LA%20Architects%2C%20I%20came%20across%20your%20card%20and%20would%20like%20to%20discuss%20a%20project.",
    label: "WhatsApp",
    value: "Send a Message",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: "web-link",
    href: "https://www.laarchitects.net",
    label: "Website",
    value: "www.laarchitects.net",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
            });

            // Pulse phone + WhatsApp icons
            setTimeout(() => {
              const phone = document.querySelector("#phone-link .contact-icon-wrap");
              const wa = document.querySelector("#whatsapp-link .contact-icon-wrap");
              if (phone) { phone.classList.add("icon-pulse"); setTimeout(() => phone.classList.remove("icon-pulse"), 700); }
              setTimeout(() => {
                if (wa) { wa.classList.add("icon-pulse"); setTimeout(() => wa.classList.remove("icon-pulse"), 700); }
              }, 300);
            }, 600);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section texture-linen" id="contact" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="contact-section-header reveal">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Let&apos;s Build Something</h2>
        </div>

        <div className="contact-layout justify-center md:justify-between">
          {/* Left: Contact Methods */}
          <div className="contact-methods reveal text-center md:text-left">
            {contactMethods.map((method) => (
              <a
                key={method.id}
                id={method.id}
                href={method.href}
                target={method.target}
                rel={method.rel}
                className="contact-method-link"
                aria-label={`${method.label}: ${method.value}`}
              >
                <div className="contact-icon-wrap" style={{ color: "var(--bronze)" }}>
                  {method.icon}
                </div>
                <div>
                  <span className="contact-method-label">{method.label}</span>
                  <span className="contact-method-value">{method.value}</span>
                </div>
              </a>
            ))}

            {/* Office hours */}
            <div className="contact-hours">
              <span className="hours-label">Office Hours</span>
              <p className="hours-text">
                Mon – Sat: 10:00 AM – 7:00 PM<br />
                Sunday: By appointment
              </p>
            </div>
          </div>

          {/* Right: Address + Map */}
          <div className="contact-map-col reveal text-center md:text-left" style={{ transitionDelay: "150ms" }}>
            <div className="contact-address">
              <span className="contact-address-label">Studio Address</span>
              <p className="contact-address-text">
                2nd Floor, Dinakaran Complex,<br />
                #42, 22nd Cross, 3rd Block,<br />
                Jayanagar, Bangalore – 560011
              </p>
            </div>
            <div className="map-wrap">
              <iframe
                src="https://maps.google.com/maps?q=Dinakaran+Complex+42+22nd+Cross+3rd+Block+Jayanagar+Bangalore+560011&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LA Architects studio location on Google Maps"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
