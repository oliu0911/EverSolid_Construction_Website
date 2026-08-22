import { useRef } from 'react'
import { I18nProvider } from './i18n'
import { useMotion } from './lib/motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Work from './components/Work'
import WhyChooseUs from './components/WhyChooseUs'
import Gallery from './components/Gallery'
import FooterCTA from './components/FooterCTA'

function Page() {
  const rootRef = useRef<HTMLDivElement>(null)
  useMotion(rootRef)
  return (
    <div ref={rootRef}>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Work />
        <WhyChooseUs />
        <Gallery />
        <FooterCTA />
      </main>
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