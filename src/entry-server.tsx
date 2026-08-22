import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

// Used by scripts/prerender.mjs to produce the static HTML that ships in
// index.html — gives SEO scrapers and no-JS visitors the real content.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}