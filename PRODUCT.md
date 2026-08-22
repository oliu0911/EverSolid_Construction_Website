# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite + Tailwind CSS, rendered as **SSG static output** (vite-ssg or prerender plugin — not pure CSR) so SEO and social-share previews scrape correctly. Animation via GSAP (with ScrollTrigger) + Lenis smooth scroll. Deploy target: **Vercel**. Stack was locked in the specs, not decided in interview.

## Users

Primary: **B2C local Belizeans** — custom-home owners building or renovating, and small restaurant / hardware / hotel owners. They are deciding whether to entrust a construction project to EverSolid and, crucially, whether to reach out via WhatsApp.

## Product Purpose

A single-page (one-page) conceptual redesign of EverSolid Construction's official website, presented as a genuine corporate site. Success = a real customer contacts the company via WhatsApp (primary) or Email (secondary). No backend — CTAs are pure front-end link redirects.

## Positioning

Proven-work-led narrative ("Building the Spaces Where Life Happens.") rather than service breadth. The credibility claim is what EverSolid has actually built, not a menu of services or craft rhetoric.

## Operating Context

Visitors come on desktop (1440px), tablet (768px), and mobile (375px); responsive design with no horizontal scroll at these breakpoints. WhatsApp is the mainstream business-contact channel in Belize/Latin America, so it leads. The page must remain readable with JavaScript disabled, and must respect `prefers-reduced-motion`.

## Capabilities and Constraints

- Single-page structure, five sections: Hero / company intro / What We Build / Why Choose Us / CTA.
- Hero full-screen background photo carousel: 5 images, ~3s each, driven by a shared GSAP Timeline with ScrollTrigger (fade + scale to 1.06 ease-out, dimmed for text contrast). No CSS keyframes, no third-party carousel library.
- WhatsApp CTA → `<a href="https://wa.me/5016244333">`; Email CTA → `mailto:info@eversolidbz.com` with prefilled subject. WhatsApp number confirmed: `5016244333` (display `+501 624-4333`).
- **Language range (resolved in interview, overrides PRD §四)**: English + Spanish + Traditional Chinese + Simplified Chinese. This replaces the PRD's earlier "no multi-language switch" Won't-Have.
- Out of scope: no backend, no CMS, no multi-page routing, no blog, no quote calculator/booking, no login, no analytics. CTA links are front-end redirects only.
- **Imagery (resolved in interview)**: use placeholders for now; the Hero / What We Build photos should depict the construction process (unfinished in-progress work), not finished showcase shots.

## Brand Commitments

- Company name: **EverSolid Construction** (Belize).
- Hero tagline: "Building the Spaces Where Life Happens." (wrapping allowed at breakpoints, not required single-line).
- Why Choose Us and What We Build copy is **customer-supplied — do not rewrite core meaning** (verbatim text in prd.md §二).

## Evidence on Hand

- `design-brief.md` — locked-in design direction (Traditional Chinese).
- `prd.md` — full PRD: MoSCoW features, acceptance criteria, open questions.
- `Logo/` — EverSolid brand assets (SVG, JPG, PDF, transparent PNGs).

**Absences that must not be fabricated**: no real case-study photographs yet (placeholder construction-process imagery used instead); no real testimonials, case studies, or past-project-specific claims beyond the customer-supplied marketing copy.

## Product Principles

- **Conversion-led.** Every design decision is judged against "would this make a real customer contact us via WhatsApp/Email?"
- **Portfolio first.** Show what's been built; let proven work carry credibility rather than service breadth.
- **Customer copy is truth.** Never rewrite customer-supplied copy's core meaning.
- **Content survives without JS.** Text and the first Hero image must remain visible when JavaScript fails; honor `prefers-reduced-motion` (no autoplay, no animations).
- **Qualified by completion, not finished beauty.** Staged/in-progress building imagery is genuine and honest to who EverSolid is.

## Accessibility & Inclusion

Requires a no-JS fallback and full respect for `prefers-reduced-motion` (carousel autoplay and scale animations disabled). Hero overlay must reach WCAG AA contrast (regular text ≥ 4.5:1, headings ≥ 3:1). Full SEO meta (title, description, Open Graph, Twitter Card), semantic heading hierarchy, descriptive alt text, and `sitemap.xml` are required on the static output.