# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

Working single-page React site for **EverSolid Construction** (Belize) — a genuine corporate one-pager, SSG-prerendered. This is no longer plan-only. **`DESIGN.md` (visual world/tokens) and `PRODUCT.md` (decisions/constraints) are the current source of truth** — they supersede the original `design-brief.md` / `prd.md`, whose open questions have largely been resolved in interview. Read `DESIGN.md` and `PRODUCT.md` before editing anything.

**Key resolution**: although the original PRD listed "no multi-language switch" as Won't-Have, **four locales are now live** — EN / ES / Traditional Chinese / Simplified Chinese (see `src/i18n.tsx`).

## Build & develop

No lint or test setup exists.

- `npm install` — install dependencies
- `npm run dev` — local dev server
- `npm run build` — client build + SSR bundle + prerender injection (see SSG below); output in `dist/`
- `npm run preview` — preview the production build

## Architecture

Single page, one root `App` (in `src/App.tsx`): an `I18nProvider` wrapping a `Page` that composes `Header` → `main` → `Hero` `/` `Intro` `/` `Work` `/` `WhyChooseUs` `/` `FooterCTA`. No router is used (despite `react-router-dom` being a dependency). Contacts live in `src/lib/contact.ts` — refactor through here, never hardcode a URL.

### SSG rendering — why the build has three steps

The build script is `vite build` (client → `dist/`) then `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (isolated server bundle) then `node scripts/prerender.mjs`. The prerender script imports the SSR bundle, calls its `render()` (`renderToString(App)`), and injects the HTML into `dist/index.html` at `<div id="app">`. On the client, `src/main.tsx` calls `hydrateRoot` over that same marker. This is what makes SEO/social-share link cards scrape real content and keeps the page readable without JS.

**Consequence that shapes all client code**: SSR and client must render identical markup. `i18n.tsx` follows this — it always renders the default (`'en'`) locale server-side and only reads `localStorage` back after hydration. Keep that invariant whenever state must persist (localStorage reads go in a `useEffect`, never during render).

### Motion

`src/lib/motion.tsx` (`useMotion`) boots **Lenis** smooth scroll wired to **GSAP ScrollTrigger**, then reveals every `[data-reveal]` element (`autoAlpha 0→1, y 26→0, power3.out, start 'top 82%', once`). `scrollToId` in `src/lib/scroll.ts` smooth-scrolls section links via Lenis when active.

**Content is only ever hidden by GSAP (`autoAlpha`) in `useMotion`/`Hero` — never by CSS.** This preserves the no-JS and `prefers-reduced-motion` fallback: with those conditions `useMotion` returns early and the page renders fully visible. When adding entrance/hide behavior, follow the same pattern.

### Design system

See `DESIGN.md` — "Raw Worksite Honesty": the page treats itself as construction drawings. Tokens are in `tailwind.config.js`: `paper` (light ground), `ink` (dark ground/type), `concrete.500/600` (muted text), and `rebar` `#E6530F` as the **single** accent (with rebar-dark for accessible small text/fills). Light `paper` prose sections sit between dark `ink` sheets for Hero and the closing CTA. Ruling-engine grammar (dimension rules, crosshair datum, "SHEET ##" tags, plan grid) annotates rather than ornaments. Text lives in keywords like `plan-label`, `font-display` (DM Serif Display), `font-mono` (Inter).

### Imagery / facts to swap before launch

- `Image` source of truth is root `background.webp` → bundled via `src/assets/hero-background.webp` in `Hero.tsx` (single slow Ken Burns zoom; the 5-image carousel in the original specs/`DESIGN.md` is not implemented). Nav logo is `src/assets/nav-logo-transparent.png`.
- `src/components/ConstructionScene.tsx` draws in-page SVG "construction-in-progress" **placeholders** — drop real site photography over them when available. Never present these rendered drawings as actual photographs.
- `index.html` + `public/` carry SEO meta; **domain is a placeholder (`https://eversolidbz.com/`)** until deploy, and `og-cover.svg` is an SVG (most link-card scrapers want a 1200×630 PNG).

## Non-negotiables

- **WhatsApp primary** → `https://wa.me/5016244333` (10-digit, confirmed); Email secondary → `mailto:info@eversolidbz.com` with prefilled subject. Both are pure front-end link redirects; no backend.
- **Customer-supplied copy** (Why Choose Us + What We Build items) must **never have its core meaning rewritten** — verbatim text in `prd.md` §二. Adding/changing a locale means translating it faithfully.
- Respect `prefers-reduced-motion` (no autoplay, no animations) and keep content visible with JavaScript disabled.
- Out of scope: no backend, no CMS, no router/blog, no quote calculator, no login, no analytics.

`hero-design-review.md` contains proposed Hero refinements (directional gradient, oil-on-scroll nav, persistent nav CTA) — a review, not adopted, so treat as drafts unless the user asks to apply them.