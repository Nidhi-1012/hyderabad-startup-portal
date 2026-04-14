import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Ensure the website exclusively loads from the Hero page on refresh
const navEntries = window.performance.getEntriesByType('navigation');
if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === 'reload') {
  if (window.location.pathname !== '/') {
    window.location.replace('/');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
