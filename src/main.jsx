import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { InstallationsProvider } from './state/InstallationsContext.jsx'
import { PageLoaderProvider } from './state/PageLoaderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PageLoaderProvider>
        <InstallationsProvider>
          <App />
        </InstallationsProvider>
      </PageLoaderProvider>
    </BrowserRouter>
  </StrictMode>,
)
