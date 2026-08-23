import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Locale = 'en' | 'es' | 'zh-TW' | 'zh-CN'

export const LOCALES: Locale[] = ['en', 'es', 'zh-TW', 'zh-CN']
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  'zh-TW': '繁',
  'zh-CN': '简',
}

export interface WhyItem {
  title: string
  desc: string
}
export interface WorkType {
  title: string
  desc: string
}

export interface Dict {
  meta: { title: string; description: string }
  nav: { skip: string; work: string; why: string; gallery: string; contact: string; quote: string }
  hero: {
    tagline1: string
    tagline2: string
    sub: string
    scroll: string
  }
  intro: { heading: string; lead: string; body: string }
  work: {
    heading: string
    lede: string
    residentialTitle: string
    residentialDesc: string
    commercialTitle: string
    commercialDesc: string
    types: WorkType[]
  }
  why: { heading: string; lede: string; items: WhyItem[] }
  gallery: { heading: string; lede: string }
  cta: {
    heading: string
    body: string
    primary: string
    secondary: string
  }
  footer: { line: string; rights: string }
}

const en: Dict = {
  meta: {
    title: 'EverSolid Construction — Building the Spaces Where Life Happens.',
    description:
      'EverSolid Construction, a Belize construction company building custom homes, restaurants, hardware and hotels. Over 20 years of building in Belize.',
  },
  nav: { skip: 'Skip to content', work: 'What We Build', why: 'Why Choose Us', gallery: 'Projects', contact: 'Contact', quote: 'Get a Quote' },
  hero: {
    tagline1: 'Building the Spaces',
    tagline2: 'Where Life Happens.',
    sub: 'Belize construction, built on twenty years of proven work.',
    scroll: 'Scroll to explore',
  },
  intro: {
    heading: 'Built in Belize, for the way you live.',
    lead: 'EverSolid, a professional construction company, helps you build your custom home or commercial space.',
    body: 'We build homes and businesses across Belize — done right, built to last.',
  },
  work: {
    heading: 'What We Build',
    lede: 'Homes and commercial spaces across Belize, built to serve how you live, work, and host.',
    residentialTitle: 'Residential',
    residentialDesc: 'We build and renovate homes that last generations.',
    commercialTitle: 'Commercial',
    commercialDesc: 'Supermarket · Restaurant · Hardware · Hotel',
    types: [
      { title: 'Supermarket', desc: 'We build supermarkets ready for busy days.' },
      { title: 'Restaurant', desc: 'We build restaurant kitchens and dining rooms, ready to open and serve.' },
      { title: 'Hardware', desc: 'We build hardware stores that hold heavy stock and handle daily foot traffic.' },
      { title: 'Hotel', desc: 'We build hotel rooms and common areas made for Belize\'s climate.' },
    ],
  },
  why: {
    heading: 'Why Choose Us',
    lede: 'Why Belize homeowners and businesses keep coming back to EverSolid.',
    items: [
      {
        title: 'Fast & Professional Construction',
        desc: 'We finish on time. We don\'t cut corners.',
      },
      {
        title: 'Planning & Material Guidance',
        desc: 'We help you pick the right materials and methods before we break ground.',
      },
      {
        title: 'Great Communication',
        desc: 'You\'ll always know what\'s going on — clear updates, honest timelines, direct access to us.',
      },
      {
        title: 'Over 20 Years of Experience',
        desc: '20 years building in Belize. We know the climate, the rules, and the people.',
      },
    ],
  },
  gallery: {
    heading: 'Our Projects',
    lede: 'Our work across Belize.',
  },
  cta: {
    heading: 'The space is yours to build.',
    body: 'Tell us about your project — we are one message away.',
    primary: 'Message us on WhatsApp',
    secondary: 'Email EverSolid',
  },
  footer: { line: 'EverSolid Construction · Belize', rights: '© 2026 EverSolid Construction (EverSolid Ltd). All rights reserved.' },
}

const es: Dict = {
  meta: {
    title: 'EverSolid Construction — Construimos los espacios donde sucede la vida.',
    description:
      'EverSolid Construction, una empresa de construcción en Belice que construye casas personalizadas, restaurantes, ferreterías y hoteles. Más de 20 años construyendo en Belice.',
  },
  nav: { skip: 'Saltar al contenido', work: 'Qué Construimos', why: 'Por Qué Elegirnos', gallery: 'Proyectos', contact: 'Contacto', quote: 'Cotizar' },
  hero: {
    tagline1: 'Construimos los espacios',
    tagline2: 'donde sucede la vida.',
    sub: 'Construcción en Belice, respaldada por veinte años de obra comprobada.',
    scroll: 'Desplázate para explorar',
  },
  intro: {
    heading: 'Construido en Belice, para cómo vives.',
    lead: 'EverSolid, una empresa profesional de construcción, te ayuda a construir tu casa personalizada o tu espacio comercial.',
    body: 'Construimos casas y negocios en todo Belice — bien hechos, para durar.',
  },
  work: {
    heading: 'Qué Construimos',
    lede: 'Casas y espacios comerciales en Belice, hechos para cómo vives, trabajas y recibes.',
    residentialTitle: 'Residencial',
    residentialDesc: 'Construimos y renovamos casas que duran generaciones.',
    commercialTitle: 'Comercial',
    commercialDesc: 'Supermercado · Restaurante · Ferretería · Hotel',
    types: [
      { title: 'Supermercado', desc: 'Construimos supermercados listos para los días de mayor afluencia.' },
      { title: 'Restaurante', desc: 'Construimos cocinas y comedores de restaurantes, listos para abrir y servir.' },
      { title: 'Ferretería', desc: 'Construimos ferreterías que aguantan inventario pesado y tráfico diario.' },
      { title: 'Hotel', desc: 'Construimos habitaciones y áreas comunes de hoteles, hechas para el clima de Belice.' },
    ],
  },
  why: {
    heading: 'Por Qué Elegirnos',
    lede: 'Por qué los propietarios y negocios de Belice vuelven a EverSolid.',
    items: [
      {
        title: 'Construcción Rápida y Profesional',
        desc: 'Terminamos a tiempo. Sin recortes.',
      },
      {
        title: 'Orientación en Planificación y Materiales',
        desc: 'Te ayudamos a elegir los materiales y métodos correctos antes de romper tierra.',
      },
      {
        title: 'Gran Comunicación',
        desc: 'Siempre sabrás lo que pasa — actualizaciones claras, plazos honestos, acceso directo a nosotros.',
      },
      {
        title: 'Más de 20 Años de Experiencia',
        desc: '20 años construyendo en Belice. Conocemos el clima, las normas y la gente.',
      },
    ],
  },
  gallery: {
    heading: 'Nuestros Proyectos',
    lede: 'Nuestra obra en todo Belice.',
  },
  cta: {
    heading: 'El espacio es tuyo por construir.',
    body: 'Cuéntanos sobre tu proyecto — estamos a un mensaje de distancia.',
    primary: 'Escríbenos por WhatsApp',
    secondary: 'Envía un correo a EverSolid',
  },
  footer: { line: 'EverSolid Construction · Belice', rights: '© 2026 EverSolid Construction (EverSolid Ltd). All rights reserved.' },
}

const zhTW: Dict = {
  meta: {
    title: 'EverSolid 建築 — 打造生活發生的空間。',
    description:
      'EverSolid 建築，貝里斯建築公司，專營自宅、餐廳、五金與飯店工程，深耕貝里斯逾 20 年。',
  },
  nav: { skip: '跳至內容', work: '我們的作品', why: '為何選擇我們', gallery: '專案', contact: '聯絡我們', quote: '索取報價' },
  hero: {
    tagline1: '打造生活',
    tagline2: '發生的空間。',
    sub: '貝里斯建築，20 年實績為證。',
    scroll: '向下捲動探索',
  },
  intro: {
    heading: '在貝里斯，為你的生活方式而築。',
    lead: 'EverSolid 是專業建築公司，協助您打造自訂住宅或商業空間。',
    body: '我們在貝里斯打造住宅與商家——做得紮實，蓋得長久。',
  },
  work: {
    heading: '我們的作品',
    lede: '為貝里斯的住宅與商業空間，配合你的生活、工作與迎接賓客的方式而建。',
    residentialTitle: '住宅',
    residentialDesc: '我們打造與翻新可傳世的住宅。',
    commercialTitle: '商業',
    commercialDesc: '超市 · 餐廳 · 五金 · 飯店',
    types: [
      { title: '超市', desc: '我們打造再忙也能從容應對的超市。' },
      { title: '餐廳', desc: '我們打造餐廳廚房與用餐區，開張即有服務水準。' },
      { title: '五金', desc: '我們打造能承載重庫存、應付每日人流的五金店。' },
      { title: '飯店', desc: '我們打造適合貝里斯氣候的飯店客房與公共區域。' },
    ],
  },
  why: {
    heading: '為何選擇我們',
    lede: '為什麼貝里斯的屋主與商家一再選擇 EverSolid。',
    items: [
      { title: '快速且專業的施工', desc: '如期完工，不偷工減料。' },
      { title: '規劃與材料建議', desc: '動工前，我們幫您選對材料與工法。' },
      { title: '良好的溝通', desc: '您永遠清楚進度——清楚的更新、誠實的工期、直接聯繫我們。' },
      { title: '超過 20 年經驗', desc: '在貝里斯蓋了 20 年，我們懂氣候、懂法規、也懂人。' },
    ],
  },
  gallery: {
    heading: '我們的專案',
    lede: '我們在貝里斯的作品。',
  },
  cta: {
    heading: '空間，等待你來建造。',
    body: '告訴我們您的專案——我們只在一則訊息之外。',
    primary: '用 WhatsApp 聯絡我們',
    secondary: 'Email EverSolid',
  },
  footer: { line: 'EverSolid 建築 · 貝里斯', rights: '© 2026 EverSolid Construction (EverSolid Ltd). All rights reserved.' },
}

const zhCN: Dict = {
  meta: {
    title: 'EverSolid 建筑 — 打造生活发生的空间。',
    description: 'EverSolid 建筑，伯利兹建筑公司，专营自宅、餐厅、五金与酒店工程，深耕伯利兹逾 20 年。',
  },
  nav: { skip: '跳至内容', work: '我们的作品', why: '为何选择我们', gallery: '项目', contact: '联系我们', quote: '索取报价' },
  hero: {
    tagline1: '打造生活',
    tagline2: '发生的空间。',
    sub: '伯利兹建筑，20 年实绩为证。',
    scroll: '向下滚动探索',
  },
  intro: {
    heading: '在伯利兹，为你的生活方式而建。',
    lead: 'EverSolid 是专业建筑公司，协助您打造定制住宅或商业空间。',
    body: '我们在伯利兹打造住宅与商铺——做得扎实，盖得长久。',
  },
  work: {
    heading: '我们的作品',
    lede: '为伯利兹的住宅与商业空间，配合你的生活、工作与接待宾客的方式而建。',
    residentialTitle: '住宅',
    residentialDesc: '我们打造与翻新可传世的住宅。',
    commercialTitle: '商业',
    commercialDesc: '超市 · 餐厅 · 五金 · 酒店',
    types: [
      { title: '超市', desc: '我们打造再忙也能从容应对的超市。' },
      { title: '餐厅', desc: '我们打造餐厅厨房与用餐区，开业即有服务水准。' },
      { title: '五金', desc: '我们打造能承载重库存、应付每日人流的五金店。' },
      { title: '酒店', desc: '我们打造适合伯利兹气候的酒店客房与公共区域。' },
    ],
  },
  why: {
    heading: '为何选择我们',
    lede: '为什么伯利兹的屋主与商家一再选择 EverSolid。',
    items: [
      { title: '快速且专业的施工', desc: '如期完工，不偷工减料。' },
      { title: '规划与材料建议', desc: '动工前，我们帮您选对材料与工法。' },
      { title: '良好的沟通', desc: '您永远清楚进展——清楚的更新、诚实的工期、直接联系我们。' },
      { title: '超过 20 年经验', desc: '在伯利兹盖了 20 年，我们懂气候、懂法规、也懂人。' },
    ],
  },
  gallery: {
    heading: '我们的项目',
    lede: '我们在伯利兹的作品。',
  },
  cta: {
    heading: '空间，等待你来建造。',
    body: '告诉我们您的项目——我们只在一则消息之外。',
    primary: '用 WhatsApp 联系我们',
    secondary: 'Email EverSolid',
  },
  footer: { line: 'EverSolid 建筑 · 伯利兹', rights: '© 2026 EverSolid Construction (EverSolid Ltd). All rights reserved.' },
}

const DICTS: Record<Locale, Dict> = { en, es, 'zh-TW': zhTW, 'zh-CN': zhCN }

const STORAGE_KEY = 'eversolid.locale'

interface I18nCtx {
  locale: Locale
  t: Dict
  setLocale: (l: Locale) => void
}

const I18nContext = createContext<I18nCtx>({ locale: 'en', t: en, setLocale: () => {} })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  // Read stored language only after hydration to keep SSR/CSR markup identical.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
      if (stored && DICTS[stored]) setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  // Keep the document's language + SEO meta in sync with the active locale.
  // Runs post-hydration only — SSR always renders `en`, so setting these here
  // (never during render) leaves the static default intact and upgrades it
  // once JS is live. Screen readers and search engines then read the right
  // language and title instead of the English default.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const dict = DICTS[locale]
    const setMeta = (selector: string, content: string) => {
      document.querySelector(selector)?.setAttribute('content', content)
    }
    document.documentElement.lang = locale
    document.title = dict.meta.title
    setMeta('meta[name="description"]', dict.meta.description)
    setMeta('meta[property="og:title"]', dict.meta.title)
    setMeta('meta[property="og:description"]', dict.meta.description)
    setMeta('meta[name="twitter:title"]', dict.meta.title)
    setMeta('meta[name="twitter:description"]', dict.meta.description)
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, t: DICTS[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}