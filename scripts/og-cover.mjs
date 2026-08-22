// Regenerates public/og-cover.png from public/og-cover.svg at the 1200×630
// social-share size. Uses @resvg/resvg-js (native audio-free SVG rasterizer —
// sharp cannot read SVG on Windows). Fonts fall back to system families
// (Georgia / system-ui) since the Google webfonts are not installed locally;
// if a brand-accurate card is needed, replace public/og-cover.svg with one
// whose text is outlined or whose fonts are installed, then re-run this.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const root = fileURLToPath(new URL('..', import.meta.url))
const svgPath = new URL('../public/og-cover.svg', import.meta.url)

const svg = readFileSync(svgPath, 'utf8')
const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
const png = resvg.render().asPng()
writeFileSync(new URL('../public/og-cover.png', import.meta.url), png)

const { width, height } = resvg.render()
console.log(`wrote public/og-cover.png (${width}×${height}, ${png.length} bytes)`)