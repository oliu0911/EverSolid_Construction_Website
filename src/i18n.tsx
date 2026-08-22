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
  nav: { work: string; why: string; gallery: string; contact: string; quote: string }
  hero: {
    tagline1: string
    tagline2: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
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
  nav: { work: 'What We Build', why: 'Why Choose Us', gallery: 'Projects', contact: 'Contact', quote: 'Get a Quote' },
  hero: {
    tagline1: 'Building the Spaces',
    tagline2: 'Where Life Happens.',
    sub: 'Belize construction, built on twenty years of proven work.',
    ctaPrimary: 'Start a project on WhatsApp',
    ctaSecondary: 'Email us',
    scroll: 'Scroll to explore',
  },
  intro: {
    heading: 'Built in Belize, for the way you live.',
    lead: 'EverSolid, a professional construction company, helps you build your custom home or commercial space.',
    body: 'Residential and commercial construction across Belize — planned well, communicated clearly, and delivered to last.',
  },
  work: {
    heading: 'What We Build',
    lede: 'Homes and commercial spaces across Belize, built to serve how you live, work, and host.',
    residentialTitle: 'Residential',
    residentialDesc: 'Custom homes and renovations built to last generations',
    commercialTitle: 'Commercial',
    commercialDesc: 'Supermarket · Restaurant · Hardware · Hotel',
    types: [
      { title: 'Supermarket', desc: 'Aisles, cold storage, and checkouts built for high turnover.' },
      { title: 'Restaurant', desc: 'Kitchens, dining rooms, and front-of-house built for service.' },
      { title: 'Hardware', desc: 'Retail and storage spaces built for heavy stock and steady traffic.' },
      { title: 'Hotel', desc: 'Rooms, common areas, and resilience built for guests and climate.' },
    ],
  },
  why: {
    heading: 'Why Choose Us',
    lede: 'Four reasons Belize homeowners and builders stay with EverSolid.',
    items: [
      {
        title: 'Fast & Professional Construction',
        desc: 'We deliver projects on schedule without cutting corners — speed and quality are not trade-offs.',
      },
      {
        title: 'Planning & Material Guidance',
        desc: 'We help you make the right choices for your project — from materials to methods, before ground breaks.',
      },
      {
        title: 'Great Communication',
        desc: 'Clear updates, honest timelines, and direct access. You are never left wondering what is happening.',
      },
      {
        title: 'Over 20 Years of Experience',
        desc: 'Two decades of building in Belize. We know the climate, the regulations, and the people.',
      },
    ],
  },
  gallery: {
    heading: 'Our Projects',
    lede: 'Work across Belize, photographed where it stands.',
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
  nav: { work: 'Qué Construimos', why: 'Por Qué Elegirnos', gallery: 'Proyectos', contact: 'Contacto', quote: 'Cotizar' },
  hero: {
    tagline1: 'Construimos los espacios',
    tagline2: 'donde sucede la vida.',
    sub: 'Construcción en Belice, respaldada por veinte años de obra comprobada.',
    ctaPrimary: 'Iniciar un proyecto por WhatsApp',
    ctaSecondary: 'Escríbenos',
    scroll: 'Desplázate para explorar',
  },
  intro: {
    heading: 'Construido en Belice, para cómo vives.',
    lead: 'EverSolid, una empresa profesional de construcción, te ayuda a construir tu casa personalizada o tu espacio comercial.',
    body: 'Construcción residencial y comercial en todo Belice — bien planeada, comunicada con claridad y hecha para durar.',
  },
  work: {
    heading: 'Qué Construimos',
    lede: 'Casas y espacios comerciales en Belice, hechos para cómo vives, trabajas y recibes.',
    residentialTitle: 'Residencial',
    residentialDesc: 'Casas personalizadas y renovaciones hechas para durar generaciones',
    commercialTitle: 'Comercial',
    commercialDesc: 'Supermercado · Restaurante · Ferretería · Hotel',
    types: [
      { title: 'Supermercado', desc: 'Góndolas, refrigeración y cajas preparadas para alto flujo y rotación.' },
      { title: 'Restaurante', desc: 'Cocinas, comedores y zonas frontales construidas para el servicio.' },
      { title: 'Ferretería', desc: 'Espacios comerciales y de almacén para inventario pesado y buen flujo.' },
      { title: 'Hotel', desc: 'Habitaciones, áreas comunes y resistencia para huéspedes y clima.' },
    ],
  },
  why: {
    heading: 'Por Qué Elegirnos',
    lede: 'Cuatro razones por las que propietarios y constructores de Belice confían en EverSolid.',
    items: [
      {
        title: 'Construcción Rápida y Profesional',
        desc: 'Entregamos los proyectos a tiempo sin recortar — la velocidad y la calidad no son excluyentes.',
      },
      {
        title: 'Orientación en Planificación y Materiales',
        desc: 'Te ayudamos a elegir lo correcto para tu proyecto — de materiales a métodos, antes de romper tierra.',
      },
      {
        title: 'Gran Comunicación',
        desc: 'Actualizaciones claras, plazos honestos y acceso directo. Nunca te quedas preguntándote qué pasa.',
      },
      {
        title: 'Más de 20 Años de Experiencia',
        desc: 'Dos décadas construyendo en Belice. Conocemos el clima, las normas y la gente.',
      },
    ],
  },
  gallery: {
    heading: 'Nuestros Proyectos',
    lede: 'Trabajo en todo Belice, fotografiado donde se levanta.',
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
  nav: { work: '我們的作品', why: '為何選擇我們', gallery: '專案', contact: '聯絡我們', quote: '索取報價' },
  hero: {
    tagline1: '打造生活',
    tagline2: '發生的空間。',
    sub: '貝里斯建築，20 年實績為證。',
    ctaPrimary: '用 WhatsApp 展開專案',
    ctaSecondary: 'Email 聯絡我們',
    scroll: '向下捲動探索',
  },
  intro: {
    heading: '在貝里斯，為你的生活方式而築。',
    lead: 'EverSolid 是專業建築公司，協助您打造自訂住宅或商業空間。',
    body: '貝里斯全境住宅與商業工程——規劃周延、溝通清楚、經久耐用。',
  },
  work: {
    heading: '我們的作品',
    lede: '為貝里斯的住宅與商業空間，配合你的生活、工作與迎接賓客的方式而建。',
    residentialTitle: '住宅',
    residentialDesc: '自訂住宅與翻新工程，可傳世數代',
    commercialTitle: '商業',
    commercialDesc: '超市 · 餐廳 · 五金 · 飯店',
    types: [
      { title: '超市', desc: '貨架、冷藏冷凍與收銀動線，為高週轉而生。' },
      { title: '餐廳', desc: '廚房、用餐區與店面前台，為服務而生。' },
      { title: '五金', desc: '為重型庫存與穩定客流打造的零售與倉儲空間。' },
      { title: '飯店', desc: '客房、公共區域與抗氣候韌性，招待旅客而建。' },
    ],
  },
  why: {
    heading: '為何選擇我們',
    lede: '貝里斯屋主與承包商持續選擇 EverSolid 的四個理由。',
    items: [
      { title: '快速且專業的施工', desc: '如期交付、不偷工減料——速度與品質二者兼顧。' },
      { title: '規劃與材料建議', desc: '動工前，協助您為專案做出材料與工法的正確抉擇。' },
      { title: '良好的溝通', desc: '清楚的進度、誠實的工期與直接聯繫的窗口，您永遠清楚進展。' },
      { title: '超過 20 年經驗', desc: '深耕貝里斯二十年，了解在地氣候、法規與人情。' },
    ],
  },
  gallery: {
    heading: '我們的專案',
    lede: '遍及貝里斯的工程，皆以現地照片記錄。',
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
  nav: { work: '我们的作品', why: '为何选择我们', gallery: '项目', contact: '联系我们', quote: '索取报价' },
  hero: {
    tagline1: '打造生活',
    tagline2: '发生的空间。',
    sub: '伯利兹建筑，20 年实绩为证。',
    ctaPrimary: '用 WhatsApp 展开项目',
    ctaSecondary: 'Email 联系我们',
    scroll: '向下滚动探索',
  },
  intro: {
    heading: '在伯利兹，为你的生活方式而建。',
    lead: 'EverSolid 是专业建筑公司，协助您打造定制住宅或商业空间。',
    body: '伯利兹全境住宅与商业工程——规划周全、沟通清楚、经久耐用。',
  },
  work: {
    heading: '我们的作品',
    lede: '为伯利兹的住宅与商业空间，配合你的生活、工作与接待宾客的方式而建。',
    residentialTitle: '住宅',
    residentialDesc: '定制住宅与翻新工程，可传世数代',
    commercialTitle: '商业',
    commercialDesc: '超市 · 餐厅 · 五金 · 酒店',
    types: [
      { title: '超市', desc: '货架、冷藏冷冻与收银动线，为高周转而生。' },
      { title: '餐厅', desc: '厨房、用餐区与店面前台，为服务而生。' },
      { title: '五金', desc: '为重型库存与稳定客流打造的零售与仓储空间。' },
      { title: '酒店', desc: '客房、公共区域与抗气候韧性，招待旅客而建。' },
    ],
  },
  why: {
    heading: '为何选择我们',
    lede: '伯利兹屋主与承包商持续选择 EverSolid 的四个理由。',
    items: [
      { title: '快速且专业的施工', desc: '如期交付、不偷工减料——速度与品质二者兼得。' },
      { title: '规划与材料建议', desc: '动工前，协助您为项目做出材料与工法的正确选择。' },
      { title: '良好的沟通', desc: '清楚的进度、诚实的工期与直接联系的窗口，您永远清楚进展。' },
      { title: '超过 20 年经验', desc: '深耕伯利兹二十年，了解当地气候、法规与人情。' },
    ],
  },
  gallery: {
    heading: '我们的项目',
    lede: '遍及伯利兹的工程，皆以实地照片记录。',
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

  return (
    <I18nContext.Provider value={{ locale, t: DICTS[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}