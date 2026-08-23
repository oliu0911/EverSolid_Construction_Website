import SectionHead from './SectionHead'
import { useI18n } from '../i18n'

/** Stroke-linework glyphs for the four reasons — drawn in the ruling grammar. */
function WhyIcon({ n }: { n: number }) {
  const common = {
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      {n === 0 && (
        <g {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.2 1.8" />
        </g>
      )}
      {n === 1 && (
        <g {...common}>
          <path d="M4 20h16L12 4 4 20Z" />
          <path d="M8.5 20 12 11.5 15.5 20" />
        </g>
      )}
      {n === 2 && (
        <g {...common}>
          <path d="M4 5h16v11H10l-6 4V5Z" />
        </g>
      )}
      {n === 3 && (
        <g {...common}>
          <path d="m12 3 2.6 4.7 5.4.7-3.9 3.7 1 5.3L12 15 6.9 17.4l1-5.3L4 8.4l5.4-.7L12 3Z" />
        </g>
      )}
    </svg>
  )
}

/** Why Choose Us — four customer-supplied reasons on ruled plates. */
export default function WhyChooseUs() {
  const { t } = useI18n()
  return (
    <section id="why" className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHead heading={t.why.heading} lede={t.why.lede} tag="SECTION 03 · WHY" />

        <div data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {t.why.items.map((item, i) => (
            <div key={i} data-reveal className="flex gap-5 border border-ink/15 bg-paper p-6 sm:p-7">
              <div className="grid h-12 w-12 shrink-0 place-items-center border border-ink/25 text-rebar-dark">
                <WhyIcon n={i} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold leading-tight">{item.title}</h3>
                <p className="mt-2 font-mono text-[13px] leading-relaxed text-concrete-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}