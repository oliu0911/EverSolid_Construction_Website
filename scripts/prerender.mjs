import { readdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function main() {
  // Locate the SSR bundle (name may be entry-server.js).
  const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')
  const { render } = await import(pathToFileURL(ssrEntry).href)

  const htmlPath = path.join(root, 'dist', 'index.html')
  let html = readFileSync(htmlPath, 'utf8')

  // Inject a responsive hero preload. Vite hashes the emitted filenames, so
  // resolve the real ones from dist/assets (matches the srcSet in Hero.tsx).
  const assetsDir = path.join(root, 'dist', 'assets')
  const find = (prefix) => readdirSync(assetsDir).find((f) => f.startsWith(prefix))
  const mobile = find('hero-mobile-')
  const full = find('hero-background-')
  if (mobile && full) {
    const link =
      `<link rel="preload" as="image" href="/assets/${full}" ` +
      `imagesrcset="/assets/${mobile} 900w, /assets/${full} 1600w" ` +
      `imagesizes="100vw" fetchpriority="high">`
    if (html.includes('</head>') && !html.includes('rel="preload" as="image"')) {
      html = html.replace('</head>', `${link}\n</head>`)
    }
  }

  const appHTML = render()

  // Inject prerendered content into the #app mount point (client hydrates over it).
  if (!html.includes('id="app"')) throw new Error('index.html has no #app mount')
  // eslint-disable-next-line no-control-regex
  html = html.replace('id="app"></div>', `id="app">${appHTML}</div>`)

  writeFileSync(htmlPath, html, 'utf8')
  console.log('prerender: injected', appHTML.length, 'chars of HTML into dist/index.html')
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})