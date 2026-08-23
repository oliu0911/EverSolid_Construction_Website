import { useRef } from 'react'
import { I18nProvider, useI18n } from './i18n'
import { useMotion } from './lib/motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Work from './components/Work'
import WhyChooseUs from './components/WhyChooseUs'
import Gallery from './components/Gallery'
import FooterCTA from './components/FooterCTA'
import WhatsAppFab from './components/WhatsAppFab'

function Page() {
  const rootRef = useRef<HTMLDivElement>(null)
  useMotion(rootRef)
  const { t } = useI18n()
  return (
    <div ref={rootRef}>
      {/* Skip link — a keyboard/tab user bypasses the repeated header (nav,
          socials, CTA, locale, hamburger) and lands on the content. Off-canvas
          and invisible until :focus; instant (no transition) so reduced motion
          is unaffected. Uses only measured mono + ruled tokens. */}
      <a
        href="#content"
        className="fixed left-3 top-3 z-[60] -translate-y-12 border border-ink/25 bg-paper px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-ink opacity-0 focus:translate-y-0 focus:opacity-100"
      >
        {t.nav.skip}
      </a>
      <Header />
      <main id="content">
        <Hero />
        <Intro />
        <Work />
        <WhyChooseUs />
        <Gallery />
        <FooterCTA />
      </main>
      <WhatsAppFab />
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  )
}