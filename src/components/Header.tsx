import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LOCALES, LOCALE_LABEL, useI18n, type Locale } from '../i18n'
import { scrollToId } from '../lib/scroll'
import { WHATSAPP_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../lib/contact'
import { WhatsAppGlyph, FacebookGlyph, InstagramGlyph } from './icons'
import navLogo from '../assets/nav-logo-transparent.png'

export default function Header() {
  const { t, locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Locale menu — trigger, panel, and per-option refs for roving focus.
  const localeTriggerRef = useRef<HTMLButtonElement | null>(null)
  const localeMenuRef = useRef<HTMLUListElement | null>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  // Mobile menu — the hamburger and the panel it reveals.
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null)
  const mobileNavRef = useRef<HTMLElement | null>(null)

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

  // Locale menu — close on outside pointerdown, Escape closes and returns
  // focus to the trigger. On open, roving focus lands on the selected option.
  useEffect(() => {
    if (!open) return
    optionRefs.current[LOCALES.indexOf(locale)]?.focus()
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (
        localeMenuRef.current?.contains(t) ||
        localeTriggerRef.current?.contains(t)
      )
        return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        localeTriggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, locale])

  // Mobile menu — close on Escape (returning focus to the toggle), on outside
  // click, and whenever the viewport grows to desktop where it is redundant.
  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (
        mobileNavRef.current?.contains(t) ||
        menuTriggerRef.current?.contains(t)
      )
        return
      setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenuOpen(false)
        menuTriggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Collapse the mobile menu when the layout returns to desktop navigation.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Roving-focus movement for the locale listbox/menu.
  const moveFocus = (delta: number) => {
    const i = optionRefs.current.indexOf(document.activeElement as HTMLButtonElement)
    const next = (i + delta + LOCALES.length) % LOCALES.length
    optionRefs.current[next]?.focus()
  }

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
            className="hidden items-center gap-2 bg-rebar px-4 py-1.5 font-mono text-xs font-semibold tracking-widest uppercase text-ink transition-colors hover:bg-rebar-300 md:inline-flex"
          >
            <WhatsAppGlyph />
            <span>{t.nav.quote}</span>
          </a>

          {/* language switch — a compliant menu widget: focusable options with
              roving focus, Escape to close (restoring focus), and full keyboard
              traversal (arrows + Home/End). */}
          <div className="relative">
            <button
              ref={localeTriggerRef}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls="locale-menu"
              aria-label="Change language"
              className={navText}
            >
              {LOCALE_LABEL[locale]}
              <span aria-hidden="true" className={open ? 'rotate-180' : ''}>▾</span>
            </button>
            {open && (
              <ul
                id="locale-menu"
                ref={localeMenuRef}
                role="menu"
                aria-label="Language"
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    moveFocus(1)
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    moveFocus(-1)
                  } else if (e.key === 'Home') {
                    e.preventDefault()
                    optionRefs.current[0]?.focus()
                  } else if (e.key === 'End') {
                    e.preventDefault()
                    optionRefs.current[LOCALES.length - 1]?.focus()
                  } else if (e.key === 'Tab') {
                    setOpen(false)
                  }
                }}
                className="animate-menu-in motion-reduce:animate-none absolute right-0 top-full mt-2 w-28 border border-ink/15 bg-paper text-ink"
              >
                {LOCALES.map((l, i) => (
                  <li key={l} role="none">
                    <button
                      ref={(el) => {
                        optionRefs.current[i] = el
                      }}
                      role="menuitemradio"
                      aria-checked={l === locale}
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
            ref={menuTriggerRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
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
        <nav id="mobile-nav" ref={mobileNavRef} className="animate-menu-in motion-reduce:animate-none border-t border-ink/10 bg-paper px-6 py-4 text-ink md:hidden" aria-label="Mobile">
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.id} onClick={(e) => { e.preventDefault(); scrollToId(n.id); setMenuOpen(false) }} className="flex items-center justify-center border border-current px-4 py-2.5 font-mono text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-rebar hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-rebar px-4 py-2 text-ink hover:bg-rebar-300">
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