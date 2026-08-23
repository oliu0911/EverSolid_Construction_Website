---
name: EverSolid Construction
description: >-
  A single-page, SSG-prerendered construction company site in four locales
  (EN / ES / zh-TW / zh-CN) that presents itself as a set of construction
  drawings — honest, in-progress, measured.
colors:
  paper-bg: "#F3F1EB"
  paper-grain: "#EEECE5"
  concrete-100: "#EEECE5"
  concrete-200: "#E1DED4"
  concrete-300: "#CFCAC0"
  concrete-400: "#A9A49A"
  concrete-500: "#8A857B"
  concrete-600: "#5F5B54"
  concrete-700: "#4A4640"
  ink: "#1A1916"
  rebar: "#E6530F"
  rebar-dark: "#C0440A"
  rebar-ink: "#8A3107"
  whatsapp-green: "#25D366"
typography:
  display:
    fontFamily: '"DM Serif Display", Georgia, serif'
    fontWeight: 800
    lineHeight: 1.05
  body:
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    fontWeight: 400
  label:
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    fontWeight: 500
    letterSpacing: "0.28em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  hair: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  sheet: "80px"
  sheet-lg: "112px"
components:
  button-primary-filled:
    backgroundColor: "{colors.rebar-dark}"
    textColor: "{colors.paper-bg}"
    typography: "{typography.label}"
    padding: "24px 16px"
  button-secondary-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper-bg}"
    typography: "{typography.label}"
    padding: "24px 16px"
    height: "none"
  plan-label:
    backgroundColor: "transparent"
    textColor: "{colors.concrete-600}"
    typography: "{typography.label}"
  plate-bordered:
    backgroundColor: "{colors.paper-bg}"
    borderColor: "{colors.ink}"
    borderWidth: "1px"
    rounded: "{rounded.none}"
---

<!-- Committed world: Raw Worksite Honesty · Seed 005a6c39 · Mode: Persuade -->

# Design System: EverSolid Construction

## Overview

**Creative North Star: "The Construction Drawing"**

EverSolid is a real Belize construction company, and this single page treats the
site as a set of **construction drawings**: honest, in-progress, measured. The
craft of the company — the thing being sold — is felt in the page itself. It is
deliberately the opposite of a glossy finished-home showcase: the design shows
the worksite, the field notes, the dimension rules, not a render pretending to
be a photograph.

The governing metaphor is a drafting table. Light warm-grey **paper** sheets hold
all prose sections; a single dark **ink** sheet opens the page (the Hero) and a
second closes it (the footer CTA) — so the page literally begins and ends
"on-site", with the readable middle laid out as drawings on paper. One accent,
**rebar orange**, appears only where a construction drawing would carry an
annotation: a dimension rule, a crosshair datum, a survey tick. Every line is a
measurement or a ruling, never decoration.

Motion is restrained and always honors `prefers-reduced-motion` and no-JS.
Content is hidden **only by GSAP** (`autoAlpha`), never by CSS, so the HTML stays
fully visible without JavaScript and under reduced motion.

**Key Characteristics:**

- **One accent, used as a measurement.** Rebar orange is a dimension or a datum tick, never a decorative wash. Its rarity is the point.
- **Everything measurable.** Dimension rules, crosshair datums, "SHEET ##" / "SECTION 0# · WORK" field tags, survey ticks, a plan grid — these annotate like a drawing; they never ornament.
- **Paper + ink rhythm.** Prose on light warm paper; dark ink sheets bookend the page.
- **Typographic polarity.** A serif display face for the "built" voice, mono for measured fact.
- **Conversion-first, everything else second.** One primary action per viewport, always WhatsApp.

## Colors

A warm-concrete drafting palette: a light warm-grey ground, graphite ink for
type and lines, one rebar-orange accent for measurement, and a single WhatsApp
green reserved for the floating mobile contact button only.

### Primary

- **Rebar Orange** `#E6530F` (`rebar`): the single accent. The scribed baseline in the datum rule, the crosshair datum ticks, the survey tick on photo plates, the small rebar square on type plates, the keyboard-focus ring (`outline: 2px solid rebar` in `index.css`), the text highlight. It reads as a marking on the drawing, never a wash.
- **Rebar Dark** `#C0440A` (`rebar-dark`): the accessible orange. The tagline's second line on the ink Hero, datum ticks at small size, measured figures like the "20+" years stat, and the **filled primary button background**. Used wherever an orange fill needs WCAG AA contrast; any orange text under `~14px` uses this.
- **Rebar Ink** `#8A3107` (`rebar-ink`): deepest annotation orange for accents needing maximum contrast on paper.

### Neutral

- **Warm Paper** `#F3F1EB` (`paper`): the page ground. All prose section bases (`bg-paper`), the text fill on ink sheets and filled buttons.
- **Warm Paper Grain** `#EEECE5` (`concrete-100`): the alternating sheet ground for `Work` and `Gallery` — a step of concrete behind, so sibling sheets breathe apart.
- **Graphite Ink** `#1A1916` (`ink`): body type and ruling lines on light sheets; the page ground on the two dark sheets. Border hairlines are `ink/15`, `ink/20`, `ink/25`, dimension heads `ink/90`.
- **Concrete ramp** `#EEECE5 → #4A4640` (`concrete.100…700`): the annotation greys. `concrete.400` scroll-cue and hero datum, `concrete.500` footer social label, `concrete.600` all body/field-note text and `plan-label`, `concrete.700` the Intro lead close to ink, `concrete.200` the Intro ruled separator.
- **WhatsApp Green** `#25D366`: used exactly once — the floating round mobile quick-contact button (`WhatsAppFab`). Not part of the drafting grammar; it carries the platform's own identity.

### Named Rules

**The One Accent Rule.** Rebar orange appears on ≤10% of any screen and only as a measurement language element. If rebar is doing decorative shading, gradient, or filling a border for style, it is wrong.

**The No Decorative Shadow / Gradient Rule.** No drop-shadow for depth on art; no gradient as decoration. The only gradient is the Hero's directional contrast overlay (ink → transparent) whose job is WCAG AA text legibility, not aesthetics.

**The Real-Fact-Only Color Rule.** Color never promises something the page can't hold. If an element is orange, it marks a measurement or an action.

## Typography

**Display Font:** DM Serif Display (fallback Georgia, serif) — the "built" voice.
**Body / Mono Font:** Inter (fallback system-ui) — the measured voice, used for both body and all field-note mono. Mono is the same family; it is a tracking/uppercase role, not a separate font.

**Character:** A serif that belongs on a title block paired with a tightly-tracked, uppercase mono that belongs on a dimension line. The serif carries the brand taglines and headings; the mono carries measurement, facts, and labels. No eyebrows above headings; mono never makes decorative claims.

### Hierarchy

- **Display / Hero** (`DM Serif Display 800`, `clamp(~11vw → 5.5rem)`, `leading 0.98`): the hero tagline "Building the Spaces / Where Life Happens." — second line in rebar. The loudest type on the page, `text-[11vw]` scaling to `5.5rem` on desktop.
- **Headline** (`DM Serif Display 800`, `text-4xl → 6xl`, `leading 1.05`, `tracking-tight`): Intro heading and closing-CTA heading — the mid-page "built" statements.
- **Title** (`DM Serif Display 700–800`, `text-2xl → 5xl`, `tracking-tight`): section heads (`SECTION 02 · WORK`), plate titles (Residential, Commercial, building type, reason list).
- **Body / Measured** (`Inter 400`, `text-sm → lg`, `leading-relaxed`, `max-w-2xl`): the Intro lead and body, plate descriptions at `text-[13px]` `concrete-600`.
- **Label / Mono** (`Inter 500–700`, `text-[11px]`–`text-[13px]`, `tracking 0.08–0.28em`, `uppercase`): `plan-label`, scroll cue, hero `sub`, section `tag`s, footer line, statistical baselines. This is where the drawing annotation lives.
- **Measured Figure** (`DM Serif Display 800`, `text-4xl`, `rebar-dark`/`ink`): the "20+ Yrs" and "RSD"/"COM" Intro baseline — mono explains, serif states the figure.

### Named Rules

**The No-Eyebrow Rule.** No kicker, eyebrow, or decorative section number above any heading. Section tags like "SECTION 02 · WORK" are measurement sheet tags — they must carry measurement meaning or be omitted.

**The Mono-Measures Rule.** Mono (the tracked-uppercase label role) is reserved for measured, factual annotation — dates, dimensions, disciplines, site names. It never states marketing fluff in mono.

## Layout

A `max-w-7xl` container, `px-5` base padding stepping to `px-8` at `sm+`. Vertical rhythm is generous: sections run `py-20` → `py-28` (Intro `py-32`), with `mt-14`→`mt-16` separating the head from its content grid. The page is five sections in order: **Hero** (ink, full-viewport) → **Intro** (paper, editorial statement + measured baseline) → **What We Build** (concrete-100, two ruled spec lines + four type plates) → **Why Choose Us** (paper, four ruled reason plates) → **Gallery** (concrete-100, site photos) → **Closing CTA + footer** (ink). A fixed header overlays the Hero, transparent until ~80vh of scroll then dropping onto the paper view.

Responsive grids use 12-column intuition expressed as explicit columns: plates go 2-col at `md` and 4-col at `lg` for building types; reason plates 2-col at `sm`; gallery photos `3/4` portraits and `4/3` landscapes in 3-col at `lg`. Section heads are ruled at the top by a full-width hairline datum, with an `items-baseline justify-between` head row (display heading left, sheet tag right). Structural breathing: 20–28 spacing between plates, lecture-line length held at `max-w-2xl` for all prose.

## Elevation & Depth

**No shadows.** This is a flat drafting surface; depth comes from tonal layering between sheets (warm paper vs. concrete-100 vs. dark ink) and from lines being either hairline (`ink/15`–`ink/25`) or measured-bold (`h-0.5 bg-ink/90` datum). The only shadow on the page belongs to the floating WhatsApp FAB (`shadow-lg shadow-ink/30`) so it reads as the persistent mobile action; everything else lies flat on the drawing.

## Shapes

**Hard square corners throughout** — `rounded-none` is the default for every plate, button, and field. The ruling grammar supplies geometry directly: 1px hairlines, crosshair datums (13×13px `+` marks), survey ticks (3×3px rebar squares), ruled separators (`h-px`/`h-0.5`), and the dark-ink header box. The one organic shape is the floating WhatsApp FAB (`rounded-full`, 56×56px), which deliberately breaks the square rule as a contact affordance. Borders are 1px `border-ink/*` on plates, and the keyboard-focus ring is a squared 2px rebar outline (`outline-offset: 2px`).

## Components

### Buttons
- **Shape:** hard square (`0px` radius), mono label, tracked uppercase.
- **Primary (WhatsApp CTA):** filled `rebar-dark` (`#C0440A`) → hover `rebar` (`#E6530F`), `text-paper`, `px-6 py-3.5`, `font-mono text-xs`, `tracking-widest`. Carries the WhatsApp glyph at 16px. Used in the footer CTA and as the persistent header "GET A QUOTE" box — the single filled box per surface, so the conversion action always stands out.
- **Secondary (Email/outline):** `transparent` fill, `border border-ink/25` (rebar on hover), `text-ink` → `hover:text-rebar`. The quiet path.
- **Hover / Focus:** 1px-defined color and border shifts, `transition-colors`. Focus always `outline: 2px solid rebar; outline-offset: 2px`.
- **Header CTA note:** on the transparent-over-hero header the CTA box is `bg-rebar text-ink` (orange fill, ink text) so it reads on the dark photo; it flips to the footer variant once the nav lands on paper.

### Plates / Cards
- **Corner Style:** `0px` — hard square.
- **Background:** warm `paper` on a `concrete-100` sheet (Work, Gallery) or `paper` on `paper` (Why), so bordered plates sit one step off their sheet.
- **Border:** `1px border-ink/15`–`/25`.
- **Shadow Strategy:** none (flat; see Elevation).
- **Internal Padding:** `p-6` → `p-7`.
- **Building-type plate:** `paper`, `p-6`/`p-7`, small rebar square marker top-left, serif title, `13px` mono `concrete-600` description. Grids use `gap-px bg-ink/20` so hairline rules fall *between* plates.
- **Reason plate (Why):** bordered `paper`, icon in a 48×48px bordered ink box (`rebar-dark` stroke-linework glyph), serif title, mono description.

### Navigation (fixed Header)
- **Style:** left wordmark image (flips to white over the dark Hero via `brightness-0 invert`, natural tone on paper), center borderless mono text links for desktop, right social icon links + CTA + locale switch + hamburger.
- **Links:** `font-mono text-xs tracking-widest uppercase`, `hover:text-rebar` — borderless, so only the CTA box carries a fill.
- **Locale switch:** a compliant `menu`/`menuitemradio` widget (roving focus, Escape-close-restores-focus to trigger, aria-checked, `aria-controls="locale-menu"`) cycling EN / ES / 繁 / 简 on `right-0 top-full` paper panel.
- **Mobile:** hamburger (animately morphs to ✕) reveals a bordered-stack `<nav id="mobile-nav">` — full-width bordered links, WhatsApp box, and a "Follow us!" social split. Both overlays fade in via `animate-menu-in` (CSS `menu-in` 180ms) which `motion-reduce` disables.
- **Transparency logic:** `scrolled` state flips the header from `border-transparent bg-transparent text-paper` to `border-ink/10 bg-paper/85 backdrop-blur-sm text-ink` once `scrollY > 80vh`.

### Photo Plates (Gallery’s "Plate")
- **Figure:** a bordered (`border-ink/25`) `overflow-hidden` frame at fixed ratios — `aspect-[3/4]` (three San Pedro / Cayo portraits) and `aspect-[4/3]` (Caye Caulker / Cayo / San Pedro landscapes) — with a rebar survey tick pinned top-left, `object-cover` real Belize site photography, lazy-loaded.
- **Caption:** a `border-t border-ink/15` row holding a 13px rebar crosshair datum plus the location proper noun (`plan-label`, e.g. "SAN PEDRO"). Location labels derive verbatim from the source file names — never fabricated.

### Floating WhatsApp FAB
- The one circular element: 56×56px, `rounded-full`, WhatsApp green `#25D366`, white 32px WhatsApp glyph, `fixed bottom-5 right-5 z-50`, `md:hidden` (mobile only), `shadow-lg shadow-ink/30`, `hover:scale-105`. It is the persistent conversion affordance on touch devices.

### WhatsApp / Brand Glyphs
- A single source of truth: `src/components/icons.tsx` exports `WhatsAppGlyph`, `FacebookGlyph`, `InstagramGlyph` (24×24 viewBox, `fill:"currentColor"`, parametrized `size`/`className`). Consumed by Header, FooterCTA, and WhatsAppFab. Glyphs are drawn as stroke/currentColor in the ruling grammar; never re-exported from sibling components.

## Do's and Don'ts

### Do:
- **Do** treat every line as a measurement or ruling — dimension rules, crosshair datums, survey ticks, sheet tags. Annotation, not ornament.
- **Do** use one filled rebar box per surface so the conversion action (WhatsApp) always reads as the single conversion point on that view.
- **Do** lay prose on warm `paper` and measurements on `plan-label` mono (`text-[11px] tracking-widest uppercase concrete-600`).
- **Do** hide content via GSAP `autoAlpha` only, never CSS, so the page is fully readable with JS disabled and under `prefers-reduced-motion`.
- **Do** draw-in the ruled datum across each sheet on scroll (`data-rule`), stagger `data-reveal-group` collections, and let solo `data-reveal` elements settle quietly — the datum holds attention, entrances never shout.
- **Do** keep the WhatsApp number `https://wa.me/5016244333` and email `info@eversolidbz.com` routed through `src/lib/contact.ts`.
- **Do** present real site photography as photography, labeled with verbatim location proper nouns.

### Don't:
- **Don't** use an eyebrow/kicker above any heading, or decorative section numbers.
- **Don't** use mono for anything that isn't measured fact.
- **Don't** add drop-shadows for depth on art or gradients as decoration (the only gradient is the Hero's legibility overlay).
- **Don't** drive rebar orange to decorative washes, fills, or border styling for style's sake — it marks a measurement or an action.
- **Don't** present rendered-in-progress drawings, renders, or placeholder SVGs as real photographs — feel free to drop genuine site photography over them, but never present a drawing as a photo.
- **Don't** rewrite the customer-supplied Why Choose Us / What We Build copy; translate it faithfully across the four locales.
- **Don't** reset content state during render — localStorage reads (like the saved locale) belong in `useEffect`, so SSR and client render identical markup.