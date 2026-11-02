import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import MobileShell from './components/MobileShell.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { MarketProvider } from './context/MarketContext.jsx'
import './index.css'

// Restore original route if redirected via 404 fallback
const redirectParam = new URLSearchParams(window.location.search).get('p')
if (redirectParam) {
  window.history.replaceState(null, '', decodeURIComponent(redirectParam))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <MarketProvider>
            <MobileShell>
              <App />
            </MobileShell>
          </MarketProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
