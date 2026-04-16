import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 🛡️ Local Visibility Fallback
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  document.body.classList.add('is-local');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
