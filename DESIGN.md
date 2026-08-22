# DESIGN.md — EverSolid Construction

> Committed world: **Raw Worksite Honesty**. Seed key `005a6c39`.
> Single-page corporate site (React + Vite + Tailwind), SSG-prerendered, 4 locales.

## Why this world

A real Belize customer reads this page. The design treats the site as a set of
**construction drawings** — honest, in-progress, measured — so the craft of the
company (the thing being sold) is felt in the page itself. It is deliberately the
opposite of a glossy "finished-home showcase": we show the worksite, the field
notes, the dimension rules, not a render pretending to be a photograph.

## Tokens

| Token | Value | Use |
|-------|-------|-----|
| `paper` | `#F3F1EB` | page ground (light surfaces) |
| `ink` | `#1A1916` | type/lines on light, page ground on dark sheets |
| `concrete.50…600` | `#F6F4EF → #5F5B54` | secondary grays, muted text |
| `rebar` | `#E6530F` | the single accent (structural, never decorative) |
| `rebar.dark` | `#C0440A` | accessible orange for small text / filled CTA |
| fonts | DM Serif Display (display) + Inter (body) | type pairing |

**Surface hierarchy.** Light `paper` ground for prose sections; dark `ink` sheets
for the Hero and the closing CTA → the page literally begins and ends "on-site",
with the readable middle on drawings.

## Grammar (the ruling engine)

Linear dimension rules with end ticks, crosshair datum markers, "SHEET ##" field
tags, a plan grid, and a subtle paper grain. These appear only where a drawing
would carry them — they annotate, they never ornament.

## Selects by height

| Height | Trigger |
|--------|---------|
| `[data-reveal]` | GSAP reveal: `autoAlpha 0→1`, `y: 26→0`, `power3.out`, start `top 82%`, once |
| Hero carousel | 5 scenes crossfade + scale to 1.06, repeating 15s timeline, pauses when tab hidden |
| Lenis | smooth wheel, `lerp 0.09` |

Only GSAP hides content (`autoAlpha`), never CSS, so the HTML is fully visible
without JS and under `prefers-reduced-motion` (both disabled).

## Structure

Hero (carousel) → Intro (measured stat baseline) → What We Build (two field-note
plates + three type cards) → Why Choose Us (four ruled reason plates) → CTA +
footer. Fixed header with locale switcher (EN / ES / 繁 / 简) and WhatsApp CTA.

## Facts you must swap before launch

- Canonical/OG/Twitter `https://eversolidbz.com/` — placeholder domain until deploy.
- `og-cover.svg` is an SVG; most link-card scrapers want PNG. Export a 1200×630 PNG at launch.
- Hero/Build "photos" are in-world **placeholders** (`ConstructionScene`); drop real
  site photography over them when available.

## Non-negotiables

- WhatsApp primary `https://wa.me/5016244333` (10-digit, confirmed); Email secondary.
- Why Choose Us + What We Build copy is customer-supplied — never rewrite meaning.
- No eyebrow/kicker above headings; no decorative section numbers; mono only for measured fact.