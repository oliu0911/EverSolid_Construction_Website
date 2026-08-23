import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { setLenis } from './scroll'

gsap.registerPlugin(ScrollTrigger)

function reduceMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Boots Lenis smooth scroll + GSAP ScrollTrigger, then wires the motion
 * language under the root:
 *   - `[data-rule]` — the authored datum thread: the ruled baseline draws
 *     itself across when the sheet scrolls into view.
 *   - `[data-reveal-group]` children — their collection staggers in as a set.
 *   - any other `[data-reveal]` — settles quietly.
 * Reduced motion disables all of it. Content is hidden only via GSAP (JS),
 * never CSS, so the no-JS HTML stays fully visible.
 */
export function useMotion(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || reduceMotion()) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // The datum thread — the full-width ruled baseline that anchors each
      // sheet draws itself across (left → right). One authored material idea,
      // the ruling line, re-ruling each section as it scrolls into view.
      const RULE_EASE = 'power3.out'
      root.querySelectorAll<HTMLElement>('[data-rule]').forEach((el) => {
        gsap.set(el, { transformOrigin: 'left center', scaleX: 0 })
        gsap.to(el, {
          scaleX: 1,
          duration: 0.7,
          ease: RULE_EASE,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })

      // Grids appear as sets: tag each group parent and its direct children
      // stagger in together so the collection reads as one plate of work.
      root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-reveal]'))
        if (!items.length) return
        gsap.set(items, { autoAlpha: 0, y: 14 })
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 82%', once: true },
        })
      })

      // Anything else settles quietly — short and subtle so the datum and the
      // hero hold the attention, never another loud entrance per section.
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (el.closest('[data-reveal-group]')) return
        gsap.set(el, { autoAlpha: 0, y: 14 })
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })
    }, root)

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [rootRef])
}