/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { apps } from '../data/apps.js'

const InstallationsContext = createContext(null)
const STORAGE_KEY = 'hero-io-installed-apps'

export function InstallationsProvider({ children }) {
  const [installedIds, setInstalledIds] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return []
    }

    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  })
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(installedIds))
  }, [installedIds])

  function pushToast(message) {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message }])

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2600)
  }

  function installApp(app) {
    setInstalledIds((current) => {
      if (current.includes(app.id)) {
        return current
      }

      pushToast(`${app.title} installed successfully.`)
      return [...current, app.id]
    })
  }

  function uninstallApp(appId) {
    setInstalledIds((current) => {
      const selectedApp = apps.find((app) => app.id === appId)

      if (selectedApp) {
        pushToast(`${selectedApp.title} removed from installation.`)
      }

      return current.filter((id) => id !== appId)
    })
  }

  const value = {
    installedIds,
    installedApps: apps.filter((app) => installedIds.includes(app.id)),
    installApp,
    uninstallApp,
    toasts,
  }

  return (
    <InstallationsContext.Provider value={value}>
      {children}
    </InstallationsContext.Provider>
  )
}

export function useInstallations() {
  const context = useContext(InstallationsContext)

  if (!context) {
    throw new Error('useInstallations must be used within InstallationsProvider')
  }

  return context
}
