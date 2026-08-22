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
 * Boots Lenis smooth scroll + GSAP ScrollTrigger, then wires entrance
 * reveals for every `[data-reveal]` under the root. Reduced motion disables
 * both. Content is hidden only via GSAP (JS), never CSS, so the no-JS HTML
 * stays fully visible.
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
      root.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 26 })
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el as HTMLElement, start: 'top 82%', once: true },
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