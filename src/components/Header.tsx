import { useEffect, useState, type ReactNode } from 'react'
import { LOCALES, LOCALE_LABEL, useI18n, type Locale } from '../i18n'
import { scrollToId } from '../lib/scroll'
import { WHATSAPP_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../lib/contact'
import navLogo from '../assets/nav-logo-transparent.png'

export default function Header() {
  const { t, locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Transparent nav over the dark Hero until the visitor scrolls past ~80vh of
  // the hero, then it drops onto the paper view. Initial state is "not scrolled"
  // (transparent) so SSR and client hydrate identical markup; the listener only
  // corrects the value after mount.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav: { id: string; label: string }[] = [
    { id: '#work', label: t.nav.work },
    { id: '#why', label: t.nav.why },
    { id: '#gallery', label: t.nav.gallery },
    { id: '#contact', label: t.nav.contact },
  ]

  // Borderless text links — only the GET A QUOTE CTA carries a filled box so it
  // reads as the row's single conversion action. Colouring on hover (rather than
  // reusing the bordered pill) keeps the header quiet and the accent unique.
  const navText =
    'inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-semibold tracking-widest uppercase transition-colors hover:text-rebar'

  const pickLocale = (l: Locale) => {
    setLocale(l)
    setOpen(false)
    setMenuOpen(false)
  }

  const socials: { label: string; href: string; glyph: ReactNode }[] = [
    { label: 'Facebook', href: FACEBOOK_URL, glyph: <FacebookGlyph /> },
    { label: 'Instagram', href: INSTAGRAM_URL, glyph: <InstagramGlyph /> },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-ink/10 bg-paper/85 backdrop-blur-sm text-ink'
          : 'border-transparent bg-transparent text-paper'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 sm:px-8">
        {/* wordmark */}
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId('#top'); setMenuOpen(false) }} className="flex shrink-0 items-center" aria-label="EverSolid">
          {/* The source logo is dark; over the dark Hero it must flip to white,
              then back to its natural tone once the nav drops onto the paper view. */}
          <img src={navLogo} alt="EverSolid Construction" className={`h-9 w-auto sm:h-[42px] transition ${scrolled ? '' : 'brightness-0 invert'}`} />
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-3 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.id}
              href={n.id}
              onClick={(e) => { e.preventDefault(); scrollToId(n.id) }}
              className={navText}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-3">
          {/* socials — icon-only on the header so it stays compact; the labelled
              "Follow us!" row lives in the mobile menu where space allows. */}
          <div className="hidden items-center gap-0.5 md:flex" aria-label="Follow us">
            <span className="hidden pr-1 font-mono text-[10px] uppercase tracking-widest text-current opacity-60 xl:inline">Follow us</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-8 w-8 place-items-center text-current opacity-80 transition-opacity hover:opacity-100"
              >
                {s.glyph}
              </a>
            ))}
          </div>

          {/* persistent desktop CTA — the row's single filled box so the
              conversion action stands out (hidden on mobile; the mobile menu carries it). */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-rebar px-4 py-1.5 font-mono text-xs font-semibold tracking-widest uppercase text-ink transition-colors hover:bg-rebar-dark hover:text-paper md:inline-flex"
          >
            <WhatsAppGlyph />
            <span>{t.nav.quote}</span>
          </a>

          {/* language switch */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className={navText}
            >
              {LOCALE_LABEL[locale]}
              <span aria-hidden="true" className={open ? 'rotate-180' : ''}>▾</span>
            </button>
            {open && (
              <ul role="listbox" className="absolute right-0 top-full mt-2 w-28 border border-ink/15 bg-paper text-ink shadow-lg">
                {LOCALES.map((l) => (
                  <li key={l}>
                    <button
                      role="option"
                      aria-selected={l === locale}
                      onClick={() => pickLocale(l)}
                      className={`w-full px-3 py-2 text-left font-mono text-xs tracking-widest hover:bg-rebar hover:text-paper ${l === locale ? 'text-rebar' : ''}`}
                    >
                      {LOCALE_LABEL[l]} · <span className="opacity-60">{l}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* mobile menu */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className={`grid h-9 w-9 place-items-center border transition-colors md:hidden ${
              scrolled ? 'border-ink/25' : 'border-paper/40'
            }`}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 transition-transform ${scrolled ? 'bg-ink' : 'bg-paper'} ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 ${scrolled ? 'bg-ink' : 'bg-paper'} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 transition-transform ${scrolled ? 'bg-ink' : 'bg-paper'} ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {menuOpen && (
        <nav className="border-t border-ink/10 bg-paper px-6 py-4 text-ink md:hidden" aria-label="Mobile">
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.id} onClick={(e) => { e.preventDefault(); scrollToId(n.id); setMenuOpen(false) }} className="flex items-center justify-center border border-current px-4 py-2.5 font-mono text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-rebar hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-rebar px-4 py-2 text-ink hover:bg-rebar-dark">
                <WhatsAppGlyph />
                <span className="font-mono text-xs font-semibold tracking-wide">WhatsApp</span>
              </a>
            </li>
            <li className="border-t border-ink/10 pt-3">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-concrete-500">Follow us!</span>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-ink/20 px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-rebar hover:text-paper"
                  >
                    {s.glyph}
                    {s.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 1.8A8.2 8.2 0 0 1 20.2 12 8.2 8.2 0 0 1 12 20.2a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8.2 8.2 0 0 1 12 3.8Zm3 9.9-.1-.1c-.3-.2-1.5-.8-1.8-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.2-3.9c-.1-.2 0-.4.1-.5l.7-.8c.2-.2.2-.4.3-.7 0-.3-.1-.5-.2-.7 0-.1-.9-2.3-1.2-3-.2-.5-.5-.5-.7-.5h-.5a1 1 0 0 0-.8.4c-.3.3-1 1-1 2.4a6.5 6.5 0 0 0 1.4 3.9 8.9 8.9 0 0 0 3.5 2.6 6.6 6.6 0 0 0 2.2.5 2.6 2.6 0 0 0 1.8-.9c.2-.3.4-.6.4-.9v-.4Z" />
    </svg>
  )
}

export function FacebookGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

export function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c2.7 0 3 0 4.1.1 1 0 1.5.2 1.9.4.5.2.8.4 1.2.8.4.4.6.7.8 1.2.2.4.3.9.4 1.9.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.5-.4 1.9a3.2 3.2 0 0 1-.8 1.2 3.2 3.2 0 0 1-1.2.8c-.4.2-.9.3-1.9.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.5-.2-1.9-.4a3.2 3.2 0 0 1-1.2-.8 3.2 3.2 0 0 1-.8-1.2c-.2-.4-.3-.9-.4-1.9-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.5.4-1.9.1-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.2.9-.3 1.9-.4C9 2.2 9.3 2.2 12 2.2Zm0 1.8c-2.7 0-3 0-4 .1-.9 0-1.3.2-1.6.4-.4.2-.6.3-.9.7-.3.3-.5.6-.7 1-.2.3-.3.7-.4 1.5-.1 1.1-.1 1.4-.1 4.1s0 3 .1 4.1c0 .9.2 1.3.4 1.6.2.4.3.6.7.9.3.3.6.5 1 .7.3.2.7.3 1.5.4 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c.9 0 1.3-.2 1.6-.4.4-.2.6-.3.9-.7.3-.3.5-.6.7-1 .2-.3.3-.7.4-1.5.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-.9-.2-1.3-.4-1.6a2.2 2.2 0 0 0-.7-.9 2.2 2.2 0 0 0-1-.7c-.3-.2-.7-.3-1.5-.4-1-.1-1.3-.1-4.1-.1Zm0 3.1a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  )
}