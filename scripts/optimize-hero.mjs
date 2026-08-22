import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Generates a device-scaled WebP variant of the hero photograph so phones
// download a small image (the LCP lever) while desktops keep the full frame.
// Source of truth is src/assets/hero-background.webp (see CLAUDE.md).

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const SRC = path.join(root, 'src', 'assets', 'hero-background.webp')
const MOBILE_WIDTH = 900 // ~2x a phone viewport; matched by `sizes="100vw"` + 900w in Hero.

async function main() {
  const out = path.join(root, 'src', 'assets', 'hero-mobile.webp')
  try {
    await sharp(SRC)
      .resize({ width: MOBILE_WIDTH, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(out)
    const size = readFileSync(out).length
    const srcSize = readFileSync(SRC).length
    console.log(
      `optimize-hero: wrote ${path.basename(out)} (${(size / 1024).toFixed(0)} kB, was ${(srcSize / 1024).toFixed(0)} kB)`
    )
  } catch (err) {
    console.error('optimize-hero failed:', err.message)
    process.exit(1)
  }
}

main()