/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const PageLoaderContext = createContext(null)

export function PageLoaderProvider({ children }) {
  const [isNavigating, setIsNavigating] = useState(false)

  function showPageLoader() {
    setIsNavigating(true)

    window.setTimeout(() => {
      setIsNavigating(false)
    }, 350)
  }

  const value = useMemo(
    () => ({
      isNavigating,
      showPageLoader,
    }),
    [isNavigating],
  )

  return (
    <PageLoaderContext.Provider value={value}>
      {children}
    </PageLoaderContext.Provider>
  )
}

export function usePageLoader() {
  const context = useContext(PageLoaderContext)

  if (!context) {
    throw new Error('usePageLoader must be used within PageLoaderProvider')
  }

  return context
}
