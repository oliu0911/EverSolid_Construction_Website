import SectionHead from './SectionHead'
import { useI18n } from '../i18n'

/** A ruled spec-line plate: crosshair datum + discipline label + description. */
function SpecLine({
  tag,
  title,
  desc,
}: {
  tag: string
  title: string
  desc: string
}) {
  return (
    <div data-reveal className="border border-ink/25 bg-paper">
      <div className="flex items-stretch">
        <span
          aria-hidden="true"
          className="relative my-auto ml-4 h-[13px] w-[13px] shrink-0 text-rebar-dark sm:ml-5"
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-current" />
        </span>
        <div className="flex-1 p-5 sm:p-7">
          <span className="plan-label !text-[11px]">{tag}</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {title}
          </h3>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-concrete-600">{desc}</p>
        </div>
      </div>
    </div>
  )
}

/** What We Build — two disciplines as ruled spec lines, one plate per building type. */
export default function Work() {
  const { t } = useI18n()
  return (
    <section id="work" className="bg-concrete-100 text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHead heading={t.work.heading} lede={t.work.lede} tag="SECTION 02 · WORK" />

        {/* two disciplines — ruled spec lines, no imagery */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          <SpecLine tag="SHEET 02A · RESIDENTIAL" title={t.work.residentialTitle} desc={t.work.residentialDesc} />
          <SpecLine tag="SHEET 02B · COMMERCIAL" title={t.work.commercialTitle} desc={t.work.commercialDesc} />
        </div>

        {/* building-type plates — four across on desktop, two-up below */}
        <div className="mt-14 grid gap-px border border-ink/20 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.work.types.map((ty, i) => (
            <div key={i} data-reveal className="bg-paper p-6 md:p-7">
              <span aria-hidden="true" className="inline-block h-3 w-3 border border-rebar" />
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{ty.title}</h3>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-concrete-600">{ty.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}