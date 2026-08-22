import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// The static build prerenders the full page into index.html; the client
// hydrates it and boots GSAP/Lenis on top (see App.tsx effects).
hydrateRoot(
  document.getElementById('app')!,
  <StrictMode>
    <App />
  </StrictMode>,
)