import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { LoadingOverlay } from './components/LoadingOverlay.jsx'
import { ToastViewport } from './components/ToastViewport.jsx'
import { AppDetailsPage } from './pages/AppDetailsPage.jsx'
import { AppsPage } from './pages/AppsPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { InstallationPage } from './pages/InstallationPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { usePageLoader } from './state/PageLoaderContext.jsx'

function App() {
  const { isNavigating } = usePageLoader()

  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/apps/:appId" element={<AppDetailsPage />} />
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="*" element={<NotFoundPage variant="route" />} />
        </Routes>
      </main>
      <Footer />
      <ToastViewport />
      <LoadingOverlay show={isNavigating} label="Loading page" />
    </div>
  )
}

export default App
