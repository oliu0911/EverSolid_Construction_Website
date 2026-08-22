import { useI18n } from '../i18n'

/** Company intro — a measured editorial statement, ruled at the base. */
export default function Intro() {
  const { t } = useI18n()
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
        <div data-reveal className="max-w-4xl">
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {t.intro.heading}
          </h2>
          <p className="mt-8 max-w-2xl font-mono text-base leading-relaxed text-concrete-700 sm:text-lg">
            {t.intro.lead}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-concrete-600 sm:text-lg">
            {t.intro.body}
          </p>
        </div>

        {/* measured baseline — only factual, data-carrying notes */}
        <div
          data-reveal
          className="mt-16 flex flex-col gap-6 border-t-2 border-ink/90 pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-0"
        >
          <div>
            <p className="font-display text-4xl font-extrabold text-rebar-dark">20+</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-concrete-600 uppercase">
              Yrs · Building in Belize
            </p>
          </div>
          <div className="hidden h-px flex-1 border-t border-concrete-200 sm:block" />
          <div>
            <p className="font-display text-4xl font-extrabold text-ink">RSD</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-concrete-600 uppercase">
              {t.work.residentialTitle}
            </p>
          </div>
          <div>
            <p className="font-display text-4xl font-extrabold text-ink">COM</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-concrete-600 uppercase">
              {t.work.commercialTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}