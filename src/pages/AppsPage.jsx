import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { AppCard } from '../components/AppCard.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { LoadingOverlay } from '../components/LoadingOverlay.jsx'
import { apps } from '../data/apps.js'

function sortApps(list, sortOrder) {
  const sorted = [...list]

  if (sortOrder === 'downloads-desc') {
    sorted.sort((first, second) => second.downloads - first.downloads)
  }

  if (sortOrder === 'downloads-asc') {
    sorted.sort((first, second) => first.downloads - second.downloads)
  }

  return sorted
}

export function AppsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const [isSearching, setIsSearching] = useState(false)
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const searchTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      window.clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  const filteredApps = useMemo(() => {
    const normalized = deferredSearchTerm.trim().toLowerCase()
    const matchingApps = normalized
      ? apps.filter((app) => app.title.toLowerCase().includes(normalized))
      : apps

    return sortApps(matchingApps, sortOrder)
  }, [deferredSearchTerm, sortOrder])

  function handleSearchChange(event) {
    const nextValue = event.target.value
    setSearchTerm(nextValue)
    setIsSearching(true)

    window.clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = window.setTimeout(() => {
      setIsSearching(false)
    }, 300)
  }

  return (
    <section className="container apps-page">
      <div className="section-heading">
        <h1>Our All Applications</h1>
        <p>Explore all apps on the market developed by us. We code for millions.</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-result">
          <strong>({filteredApps.length}) Apps Found</strong>
        </div>

        <div className="toolbar-controls">
          <input
            className="search-input"
            type="search"
            placeholder="search apps"
            aria-label="Search apps by title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className="sort-select"
            aria-label="Sort apps by downloads"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="default">Sort by Downloads</option>
            <option value="downloads-desc">High-Low</option>
            <option value="downloads-asc">Low-High</option>
          </select>
        </div>
      </div>

      <div className="apps-grid">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      {!filteredApps.length ? (
        <EmptyState
          image="/assignment-assets/App-Error.png"
          title="No App Found"
          description="No app matches your search right now. Try a different title or clear the search."
          buttonLabel="Browse Everything"
          buttonTo="/apps"
        />
      ) : null}

      <LoadingOverlay show={isSearching} label="Searching apps" />
    </section>
  )
}
