import React from 'react'
import ReactDOM from 'react-dom/client'
// Selbst gehostete Variable Fonts — kein Google-CDN, also kein
// Drittanbieter-Request beim Seitenaufruf (DSGVO).
import '@fontsource-variable/inter'
import '@fontsource-variable/sora'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
