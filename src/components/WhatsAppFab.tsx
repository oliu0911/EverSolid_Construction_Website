import { WHATSAPP_URL } from '../lib/contact'
import { WhatsAppGlyph } from './icons'

/** Floating round WhatsApp quick-contact button, fixed bottom-right on mobile only. */
export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/30 transition-transform hover:scale-105 md:hidden"
    >
      <WhatsAppGlyph size={32} />
    </a>
  )
}