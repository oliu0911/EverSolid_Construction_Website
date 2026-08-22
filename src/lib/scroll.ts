import type Lenis from 'lenis'

let lenis: Lenis | null = null
export function setLenis(l: Lenis | null) {
  lenis = l
}

/** Smooth-scroll to a section id (#why, #work…), via Lenis when active. */
export function scrollToId(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0 })
  else el.scrollIntoView({ behavior: 'smooth' })
}