import { readFileSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Generates a device-scaled WebP copy of every Gallery site photo so mobile
// and desktop download a small image instead of the full-resolution original.
// Sources stay as the JPEGs in src/assets/gallery/ (the paintable originals);
// the generated <name>.webp is served to modern browsers via <picture>, with
// the JPEG as the no-WebP fallback in Gallery.tsx.
//
// Each photo renders into a column ~389px wide on the widest layout, so 800px
// is ~2x that (crisp on retina) — beyond it is wasted bytes.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const GALLERY_DIR = path.join(root, 'src', 'assets', 'gallery')
const RESIZE_WIDTH = 800 // ~2x the 389px max tile; matched by sizes off the column.
const QUALITY = 80 // ~imperceptible loss for site photography after resize.

async function main() {
  const files = readdirSync(GALLERY_DIR).filter((f) => f.toLowerCase().endsWith('.jpeg'))
  if (files.length === 0) {
    console.log('optimize-gallery: no JPEGs found, nothing to do.')
    return
  }

  let saved = 0
  for (const file of files) {
    const inPath = path.join(GALLERY_DIR, file)
    const out = path.join(GALLERY_DIR, `${path.parse(file).name}.webp`)
    try {
      await sharp(inPath)
        .rotate() // honor EXIF orientation so resizing doesn't bake a sideways frame
        .resize({ width: RESIZE_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out)
      const before = readFileSync(inPath).length
      const after = readFileSync(out).length
      const delta = before - after
      saved += delta
      console.log(
        `optimize-gallery: ${path.basename(out)} ${(before / 1024).toFixed(0)}kB -> ${(after / 1024).toFixed(0)}kB (-${(delta / 1024).toFixed(0)}kB)`
      )
    } catch (err) {
      // A corrupt/undecodable photo shouldn't abort the build — surface and skip.
      console.error(`optimize-gallery: SKIPPED ${file}: ${err.message}`)
    }
  }
  console.log(`optimize-gallery: total saved ${(saved / 1024).toFixed(0)}kB across ${files.length} photos.`)
}

main()