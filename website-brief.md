# LA Architects — Single-Page Portfolio Website Brief

## 1. Project Context

A single-page site (SPA-style, one scrollable HTML page) for **LA Architects**
(also trading as Living Aart / Living Incorp). Primary access method: a phone
is tapped against an **NFC tag** carried by the company's rep, which opens
this URL directly in the visitor's mobile browser.

**⚠️ Hosting note:** the NFC tag only stores the URL — it cannot store the
site itself. This page must be deployed to a real host (GitHub Pages,
Netlify, Vercel, or the client's own domain) before the NFC tags are
programmed with the link.

**Design priority order:** mobile-first → fast load → desktop-friendly.
Assume most opens happen on a phone, on the spot, possibly on weak data —
so page weight and load speed are not optional polish, they're core requirements.

---

## 2. Asset Inventory (already extracted & optimized)

Extracted from the client's 90MB PDF and compressed for web use (~22MB total).

```
assets/
├── branding/
│   ├── logo (from page 1/3 — thin banner + square mark)
│   └── founder-photo (from page 5/6 — A.K. Swaamy portrait)
└── projects/
    ├── project-001.jpg … project-067.jpg
    (67 architectural photos: exteriors, interiors, renders)
```

**Before final integration:** open the branding folder yourself and pick the
cleanest single logo mark — a few near-duplicate crops came through and only
one should be used in the header. Also confirm with the client which of the
67 project shots are meant to be public-facing vs. internal (some may be
work-in-progress renders).

**Image handling requirement:** lazy-load every project image
(`loading="lazy"`), and generate a small blurred placeholder or solid-color
box at each image's aspect ratio so the gallery doesn't jump around while
loading on mobile data.

---

## 3. Page Structure (single page, in this order)

### A. Header (sticky, minimal)
- Logo (left)
- Phone number, click-to-call link: `tel:9900045369`
- Hamburger/scroll-to-section nav on mobile (About, Services, Projects, Contact)

### B. Hero
- Tagline: "Construction & Architect Company"
- One strong project photo as background or side image
- Primary CTA button: "View Projects" (scrolls to gallery)

### C. About Us
- 27+ years experience, residential/commercial/institutional/hospitality/mixed-use
- Keep this to 2–3 short paragraphs, not a wall of text — mobile readers skim

### D. Services (4 cards/tiles)
1. Interior Design
2. Turnkey Construction
3. Project Management
4. Architectural Designs

Each with a short 1-line description (already have the text from the PDF) and an icon or small photo.

### E. Founder
- Photo of A.K. Swaamy
- Name, designation ("Owner" / Chief Architect)
- Short profile paragraph

### F. Company Stats (3 stat counters)
- 27+ Years Experience
- 500+ Projects Completed
- 100% Client Satisfaction

Simple animated count-up on scroll is a nice touch, not required.

### G. Project Gallery ⭐ (main content, most of the 67 photos live here)
- Responsive grid (CSS Grid, e.g. `repeat(auto-fill, minmax(240px, 1fr))`)
- Tap/click opens a **lightbox** (fullscreen image viewer with swipe/next-prev)
- Do NOT load all 67 full-size images upfront — lazy-load as the user scrolls
- Consider showing 12–16 initially with a "Load more" button so first paint is fast

### H. Contact Section
- Phone: `9900045369` → `tel:` link
- Email: `la@laarchitects.net` → `mailto:` link
- Address: 2nd Floor, Dinakaran Complex, #42, 22nd Cross, 3rd Block, Jayanagar, Bangalore - 560011
- Embed a Google Maps iframe if the client wants a map
- Website: https://www.laarchitects.net/

### I. Action Buttons (matches the PDF's "Available Actions")
These four need real functionality, not just labels:

| Button | Implementation |
|---|---|
| **Call Office** | `<a href="tel:9900045369">` |
| **Save Contact** | Download a `.vcf` vCard file (see snippet below) — this is what actually lets a phone "save the contact," not a plain link |
| **Exchange Contact** | Can reuse the vCard download, or open a small form that captures the visitor's own name/number if the client wants leads captured |
| **Inquiries** | `mailto:` link, or a simple contact form if the client wants inquiries logged somewhere |

**WhatsApp CTA** (from the PDF):
```
https://api.whatsapp.com/send?phone=916363797685&text=I%20am%20interested%20in%20purchasing%20your%20e-visiting%20card.%20Could%20you%20please%20provide%20more%20details%3F
```
⚠️ Double-check this WhatsApp number/message with the client — it currently references "e-visiting card" inquiries, which may be leftover from whoever made the original PDF template, not actually about architecture project inquiries. Confirm before reusing as-is.

### vCard snippet (for "Save Contact")
```html
<a id="save-contact" download="LA-Architects.vcf">Save Contact</a>
<script>
const vcard = `BEGIN:VCARD
VERSION:3.0
FN:LA Architects
ORG:LA Architects
TEL;TYPE=WORK,VOICE:9900045369
EMAIL:la@laarchitects.net
ADR:;;2nd Floor, Dinakaran Complex, #42, 22nd Cross, 3rd Block, Jayanagar;Bangalore;;560011;India
URL:https://www.laarchitects.net/
END:VCARD`;
document.getElementById('save-contact').href =
  'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
</script>
```

---

## 4. Technical Requirements

- **Plain HTML/CSS/JS**, single file or minimal file set — no framework/build
  step needed for a page this size, and it keeps hosting/updating trivial.
- Fully responsive, mobile-first breakpoints.
- All images: `loading="lazy"`, explicit `width`/`height` attributes to avoid layout shift.
- Lightbox: a lightweight vanilla-JS implementation is enough — no need for a heavy library for 67 images.
- Total initial page weight target: **under 2–3MB** for first paint (hero + above-the-fold content); rest of the gallery loads as the user scrolls.
- Test on an actual phone over mobile data before handing off — that's the real use case, not a desktop browser.

---

## 5. What I'd still ask the client before building

- Which project photos are cleared for public display (some renders may be unapproved/unfinished)
- Whether "Exchange Contact" needs to actually capture visitor details somewhere (Google Sheet, email, CRM) or if it's just a label for now
- The correct WhatsApp number/message for architecture inquiries (the extracted one looks like placeholder template text)
- Final domain/hosting decision, since that URL is what gets written to the NFC tags
