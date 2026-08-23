/** Shared section head: ruled top edge, display heading, measurement-sheet tag. */
export default function SectionHead({
  heading,
  lede,
  tag,
}: {
  heading: string
  lede?: string
  tag?: string
}) {
  return (
    <header data-reveal>
      {/* the datum — an explicit ruler hairline so motion can draw it across */}
      <div data-rule aria-hidden className="h-0.5 w-full bg-ink/90" />
      <div className="mt-6 flex items-baseline justify-between gap-6 md:mt-8">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
          {heading}
        </h2>
        {tag ? (
          <span className="plan-label hidden items-center gap-2 sm:inline-flex">
            <span aria-hidden="true" className="h-2.5 w-2.5 border border-rebar" />
            {tag}
          </span>
        ) : null}
      </div>
      {lede ? (
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-concrete-600">{lede}</p>
      ) : null}
    </header>
  )
}