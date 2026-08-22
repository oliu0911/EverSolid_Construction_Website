import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useI18n } from '../i18n'
import heroBackground from '../assets/hero-background.webp'
import heroMobile from '../assets/hero-mobile.webp'

// EverSolid brand photograph as the hero backdrop → a slow, near-static Ken
// Burns zoom (1 → 1.06 over 20s). Mobile loads the pre-generated 900w WebP
// (scripts/optimize-hero.mjs) to cut LCP bytes; desktop keeps the full frame.
const HERO = {
  src: heroBackground,
  mobile: heroMobile,
  alt: 'EverSolid Construction site and work',
}

export default function Hero() {
  const { t } = useI18n()
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const teardownRef = useRef<() => void>(() => {})

  // Slow zoom so the single photograph never feels frozen. Content is NOT hidden in
  // CSS — reduced motion / no JS leaves the scene static at its natural scale. Start
  // is gated on the photo decoding so the opening frame is the photograph, never the
  // ink ground.
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(scene, { scale: 1 })

    const start = () => {
      const tl = gsap.timeline()
      tl.to(scene, { scale: 1.06, duration: 20, ease: 'none' })

      const onVis = () => (document.hidden ? tl.pause() : tl.resume())
      document.addEventListener('visibilitychange', onVis)
      teardownRef.current = () => {
        document.removeEventListener('visibilitychange', onVis)
        tl.kill()
      }
    }

    const img = scene.querySelector('img')

    if (img && !img.complete) {
      const onLoad = () => {
        start()
        img.removeEventListener('load', onLoad)
      }
      img.addEventListener('load', onLoad)
      return () => {
        img.removeEventListener('load', onLoad)
        teardownRef.current()
      }
    }

    start()
    return () => teardownRef.current()
  }, [])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper md:items-center">
      {/* hero photograph — full-bleed, single frame */}
      <div
        aria-hidden="true"
        ref={sceneRef}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={HERO.src}
          srcSet={`${HERO.mobile} 900w, ${HERO.src} 1600w`}
          sizes="100vw"
          fetchpriority="high"
          alt={HERO.alt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* directional dim overlay for text contrast (WCAG AA): deepest at the
          bottom-left where the copy sits, lightest toward the top-right sky so
          the photograph keeps its depth. Strong delta between corners so it reads
          as a clear gradient, not a uniform dim — keeps the sky bright while the
          tagline and its trailing edge (over a light concrete column) stay legible. */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ink/90 via-ink/55 to-ink/15" />

      {/* content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-16 sm:px-8 md:pb-28">
        <h1 className="max-w-5xl font-display text-[11vw] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {t.hero.tagline1}
          <br />
          <span className="text-rebar">{t.hero.tagline2}</span>
        </h1>

        <p className="mt-10 max-w-md font-mono text-[13px] font-medium leading-relaxed tracking-[0.08em] text-concrete-300 uppercase md:mt-12 sm:text-sm">
          {t.hero.sub}
        </p>

        {/* datum baseline + scroll cue */}
        <div className="mt-16 flex items-center gap-4 md:mt-20">
          <div className="h-px flex-1 border-t border-paper/20" />
          <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-concrete-400 uppercase">
            {t.hero.scroll}
            <span className="inline-block h-3 w-px animate-pulse bg-rebar" />
          </span>
        </div>
      </div>
    </section>
  )
}

export function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 1.8A8.2 8.2 0 0 1 20.2 12 8.2 8.2 0 0 1 12 20.2a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8.2 8.2 0 0 1 12 3.8Zm3 9.9-.1-.1c-.3-.2-1.5-.8-1.8-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.2-3.9c-.1-.2 0-.4.1-.5l.7-.8c.2-.2.2-.4.3-.7 0-.3-.1-.5-.2-.7 0-.1-.9-2.3-1.2-3-.2-.5-.5-.5-.7-.5h-.5a1 1 0 0 0-.8.4c-.3.3-1 1-1 2.4a6.5 6.5 0 0 0 1.4 3.9 8.9 8.9 0 0 0 3.5 2.6 6.6 6.6 0 0 0 2.2.5 2.6 2.6 0 0 0 1.8-.9c.2-.3.4-.6.4-.9v-.4Z" />
    </svg>
  )
}