import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Custom Console Branding
console.log(
  '%c BYTE TX %c v1.0.4-beta \n%c SYSTEM ONLINE: ACCESS GRANTED',
  'background: #000; color: #00ff88; font-size: 20px; font-weight: bold; padding: 10px 20px; border: 1px solid #00ff88; border-radius: 4px;',
  'color: #888; font-size: 12px; font-family: monospace;',
  'color: #ccc; font-size: 14px; margin-top: 5px; font-family: monospace;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
