// Full-bleed construction-scene placeholders, drawn in the site's own
// ruling-engine grammar: plan grid, graphite ink, rebar-orange annotation.
// These are the "construction-in-progress" images the client asked to ship as
// placeholders until real site photography exists.

export type SceneVariant =
  | 'rebar'
  | 'frame'
  | 'scaffold'
  | 'truss'
  | 'crane'
  | 'blocks'

const INK = '#1A1916'
const C300 = '#CFCAC0'
const C400 = '#ABA69C'
const C500 = '#8A857B'
const C800 = '#3A3833'
const REBAR = '#E6530F'
const GRID = '#DDD9CF'

/** Mono annotation label (measurement/blueprint — not costume). */
function Note({
  x,
  y,
  children,
  anchor = 'start',
  accent = false,
}: {
  x: number
  y: number
  children: React.ReactNode
  anchor?: 'start' | 'middle' | 'end'
  accent?: boolean
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="'Inter', 'DM Serif Display', monospace" fontSize="13" letterSpacing="2" fill={accent ? REBAR : C500}>
      {children}
    </text>
  )
}

/** Dimension rule with end ticks — the ruling engine's measured detail. */
function Dim({ x1, y, x2, accent = false }: { x1: number; y: number; x2: number; accent?: boolean }) {
  const col = accent ? REBAR : C400
  const h = 7
  return (
    <g stroke={col} strokeWidth="1.5">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - h} x2={x1} y2={y + h} />
      <line x1={x2} y1={y - h} x2={x2} y2={y + h} />
    </g>
  )
}

/** Crosshair + circle datum marker. */
function Datum({ x, y, accent = false }: { x: number; y: number; accent?: boolean }) {
  const col = accent ? REBAR : INK
  return (
    <g stroke={col} strokeWidth="1.5">
      <circle cx={x} cy={y} r="10" fill="none" />
      <line x1={x - 16} y1={y} x2={x - 2} y2={y} />
      <line x1={x + 2} y1={y} x2={x + 16} y2={y} />
      <line x1={x} y1={y - 16} x2={x} y2={y - 2} />
      <line x1={x} y1={y + 2} x2={x} y2={y + 16} />
    </g>
  )
}

const MOTIFS: Record<SceneVariant, React.ReactNode> = {
  // Vertical rebar columns rising out of an unfinished grade.
  rebar: (
    <g>
      {[0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88].map((fx, i) => (
        <g key={i}>
          <line x1={fx * 1600} y1={880} x2={fx * 1600} y2={170 + (i % 3) * 90} stroke={INK} strokeWidth="7" />
          {[250, 320, 390, 460].map((ty) => (
            <line key={ty} x1={fx * 1600 - 42} y1={ty} x2={fx * 1600 + 42} y2={ty} stroke={i % 2 ? C400 : C300} strokeWidth="4" />
          ))}
        </g>
      ))}
      <rect x={-20} y={820} width={1640} height={90} fill={C800} />
      <rect x={0} y={600} width={1600} height={4} fill={REBAR} />
    </g>
  ),
  // Timber/steel frame of a house under construction.
  frame: (
    <g>
      <path d="M 700 860 V 300 L 900 190 H 1320 V 860" fill="none" stroke={INK} strokeWidth="9" />
      <path d="M 840 860 V 380 L 980 268 H 1320" fill="none" stroke={C400} strokeWidth="5" />
      {[430, 520, 610, 700, 790].map((y) => (
        <g key={y}>
          <line x1={760} y1={y} x2={1280} y2={y} stroke={C400} strokeWidth="4" />
          <line x1={y === 700 ? 0 : 900} y1={y - 40} x2={y === 700 ? 300 : 1180} y2={y + 40} stroke={C300} strokeWidth="3" />
        </g>
      ))}
      <line x1={900} y1={190} x2={1320} y2={190} stroke={REBAR} strokeWidth="5" />
      <rect x={40} y={860} width={1520} height={30} fill={C800} />
    </g>
  ),
  // Scaffold lattice standing against a blank block wall.
  scaffold: (
    <g>
      <rect x={260} y={120} width={1080} height={720} fill="none" stroke={INK} strokeWidth="8" />
      <rect x={300} y={155} width={1000} height={650} fill="none" stroke={C500} strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => {
        const top = 155 + i * 163
        const bottom = top + 130
        return (
          <g key={i} stroke={C400} strokeWidth="5">
            <line x1={300} y1={bottom} x2={1300} y2={bottom} />
            <line x1={300} y1={top} x2={1300} y2={top} />
            <line x1={300} y1={top} x2={1300} y2={bottom} stroke={i % 2 ? REBAR : C400} strokeWidth="4" />
            <line x1={1300} y1={top} x2={300} y2={bottom} stroke={C400} strokeWidth="4" />
          </g>
        )
      })}
      <rect x={250} y={850} width={1100} height={18} fill={C800} />
    </g>
  ),
  // Roof trusses cut against the upper band.
  truss: (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const cx = 200 + i * 250
        return (
          <g key={i} fill="none" stroke={INK} strokeWidth="6">
            <path d={`M ${cx - 120} 560 L ${cx} 300 L ${cx + 120} 560`} />
            <line x1={cx - 60} y1={430} x2={cx + 60} y2={430} />
            <line x1={cx} y1={300} x2={cx} y2={560} stroke={C400} strokeWidth="4" />
            {i % 2 ? <line x1={cx - 120} y1={560} x2={cx} y2={300} stroke={C300} strokeWidth="4" /> : null}
          </g>
        )
      })}
      <rect x={40} y={560} width={1520} height={16} fill={INK} />
      <rect x={120} y={300} width={1360} height={3} fill={REBAR} />
      <rect x={0} y={780} width={1600} height={120} fill={C800} />
    </g>
  ),
  // Tower crane silhouette with a rising slab.
  crane: (
    <g>
      <line x1={420} y1={880} x2={420} y2={140} stroke={INK} strokeWidth="12" />
      <line x1={420} y1={140} x2={1220} y2={140} stroke={INK} strokeWidth="9" />
      <line x1={420} y1={230} x2={330} y2={140} stroke={INK} strokeWidth="7" />
      {[180, 280, 380, 480, 580, 680, 780, 820].map((y) => (
        <line key={y} x1={400} y1={y} x2={440} y2={y} stroke={C400} strokeWidth="5" />
      ))}
      <rect x={900} y={620} width={520} height={70} fill={INK} />
      <rect x={920} y={500} width={300} height={120} fill={C500} />
      <line x1={1080} y1={620} x2={1080} y2={500} stroke={REBAR} strokeWidth="4" />
      <rect x={0} y={640} width={820} height={230} fill={C800} />
    </g>
  ),
  // Concrete block unit wall rising.
  blocks: (
    <g>
      {[0, 1, 2, 3, 4, 5, 6].map((r) => {
        const y = 860 - r * 92
        const rows = r % 2 === 0
        return (
          <g key={r} stroke={C400} strokeWidth="3">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
              <rect
                key={c}
                x={240 + c * 165 + (rows ? 82 : 0) - (rows ? 82 : 0) + (rows ? 0 : 0)}
                y={y}
                width={148}
                height={78}
                fill={r % 3 === 1 ? '#C8C3B8' : r % 3 === 2 ? '#BDB7AB' : '#D3CEC3'}
                strokeWidth={r % 3 ? 3 : 2}
                stroke={r % 3 === 1 ? REBAR : C400}
              />
            ))}
          </g>
        )
      })}
      <rect x={210} y={760} width={1180} height={6} fill={INK} />
      <rect x={0} y={880} width={1600} height={20} fill={C800} />
    </g>
  ),
}

export default function ConstructionScene({
  variant,
  note = 'EVER-SOLID · FIELD NOTE',
  grain = true,
}: {
  variant: SceneVariant
  note?: string
  grain?: boolean
}) {
  return (
    <svg
      viewBox={`0 0 1600 900`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ECEAE3" />
          <stop offset="1" stopColor="#DAD6CB" />
        </linearGradient>
        {grain && (
          <filter id={`grain-${variant}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.15  0 0 0 0 0.14  0 0 0 0 0.12  0 0 0 0.05 0" />
          </filter>
        )}
      </defs>

      <rect width="1600" height="900" fill={`url(#bg-${variant})`} />
      <g stroke={GRID} strokeWidth="1">
        {Array.from({ length: 23 }).map((_, i) => (
          <line key={'v' + i} x1={i * 71} y1={-20} x2={i * 71} y2={920} />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={'h' + i} x1={-20} y1={i * 71} x2={1620} y2={i * 71} />
        ))}
      </g>
      {grain && <rect width="1600" height="900" filter={`url(#grain-${variant})`} />}

      {/* scene */}
      {MOTIFS[variant]}

      {/* annotation layer */}
      <g opacity="0.9">
        <Dim x1={120} y={110} x2={1480} accent />
        <Note x={120} y={92} accent>
          {note}
        </Note>
        <Datum x={1400} y={760} accent />
        <Datum x={220} y={700} />
        <Note x={1420} y={805} anchor="end">
          SHEET · BELIZE
        </Note>
      </g>
    </svg>
  )
}