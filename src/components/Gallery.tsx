import SectionHead from './SectionHead'
import { useI18n } from '../i18n'

import cayeCaulker from '../assets/gallery/Caye Caulker.jpeg'
import sanPedro from '../assets/gallery/San Pedro.jpeg'
import sanPedro2 from '../assets/gallery/San Pedro2.jpeg'
import sanPedro3 from '../assets/gallery/San Pedro3.jpeg'
import cayo1 from '../assets/gallery/cayo1.jpeg'
import cayo2 from '../assets/gallery/cayo2.jpeg'

/** Site photos pinned in two measured bands — portraits, then landscapes. */
interface Shot {
  src: string
  /** Location proper noun, derived verbatim from the source file name. */
  label: string
}

const PORTRAITS: Shot[] = [
  { src: sanPedro, label: 'San Pedro' },
  { src: sanPedro2, label: 'San Pedro' },
  { src: cayo2, label: 'Cayo' },
]
const LANDSCAPES: Shot[] = [
  { src: cayeCaulker, label: 'Caye Caulker' },
  { src: cayo1, label: 'Cayo' },
  { src: sanPedro3, label: 'San Pedro' },
]

/** One framed photo with a survey tick and a mono field-note caption. */
function Plate({ shot, ratio }: { shot: Shot; ratio: string }) {
  return (
    <figure data-reveal>
      <div
        className={`relative overflow-hidden border border-ink/25 bg-concrete-100 ${ratio}`}
      >
        <span aria-hidden="true" className="absolute left-2.5 top-2.5 z-10 h-3 w-3 border border-rebar bg-paper/60" />
        <img
          src={shot.src}
          alt={shot.label}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 flex items-center gap-3 border-t border-ink/15 pt-2.5">
        <span
          aria-hidden="true"
          className="relative h-[13px] w-[13px] shrink-0 text-rebar-dark"
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-current" />
        </span>
        <span className="plan-label !text-[11px]">{shot.label}</span>
      </figcaption>
    </figure>
  )
}

/** Gallery — site photography pinned to a light sheet before the closing CTA. */
export default function Gallery() {
  const { t } = useI18n()
  return (
    <section id="gallery" className="bg-concrete-100 text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHead heading={t.gallery.heading} lede={t.gallery.lede} tag="SECTION 04 · SITE" />

        {/* portraits */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PORTRAITS.map((shot, i) => (
            <Plate key={i} shot={shot} ratio="aspect-[3/4]" />
          ))}
        </div>

        {/* landscapes */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {LANDSCAPES.map((shot, i) => (
            <Plate key={i} shot={shot} ratio="aspect-[4/3]" />
          ))}
        </div>
      </div>
    </section>
  )
}