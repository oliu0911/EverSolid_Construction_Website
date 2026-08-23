import { useI18n } from '../i18n'
import { WHATSAPP_URL, MAILTO_URL, PHONE_DISPLAY, PHONE_TEL, FACEBOOK_URL, INSTAGRAM_URL } from '../lib/contact'
import { WhatsAppGlyph, FacebookGlyph, InstagramGlyph } from './icons'

/** Closing CTA + site footer — dark sheet with the conversion actions. */
export default function FooterCTA() {
  const { t } = useI18n()
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div data-reveal className="border-t-2 border-paper/25 pt-8">
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {t.cta.heading}
          </h2>
          <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-concrete-400">{t.cta.body}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-rebar-dark px-6 py-3.5 font-mono text-xs font-semibold tracking-widest text-paper transition-colors hover:bg-rebar hover:text-ink"
            >
              <WhatsAppGlyph />
              {t.cta.primary}
            </a>
            <a
              href={MAILTO_URL}
              className="inline-flex items-center justify-center gap-2 border border-paper/40 px-6 py-3.5 font-mono text-xs tracking-widest text-paper transition-colors hover:border-rebar hover:text-rebar"
            >
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-paper/15">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* top row — brand line on the left, contact + socials on the right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] tracking-[0.2em] text-concrete-400 uppercase">{t.footer.line}</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={PHONE_TEL}
                className="font-mono text-[11px] tracking-[0.2em] text-concrete-400 uppercase transition-colors hover:text-rebar"
              >
                {PHONE_DISPLAY}
              </a>
              <span className="hidden h-4 w-px bg-paper/15 sm:block" aria-hidden="true" />
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete-500">Follow us</span>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-concrete-400 transition-colors hover:text-rebar"
                >
                  <FacebookGlyph />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-concrete-400 transition-colors hover:text-rebar"
                >
                  <InstagramGlyph />
                </a>
              </span>
            </div>
          </div>
          {/* copyright line */}
          <p className="mt-5 border-t border-paper/10 pt-4 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-concrete-600">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </section>
  )
}