import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState.jsx'
import { useInstallations } from '../state/InstallationsContext.jsx'
import { formatCompactNumber, formatRating } from '../utils/formatters.js'

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

export function InstallationPage() {
  const { installedApps, uninstallApp } = useInstallations()
  const [sortOrder, setSortOrder] = useState('default')

  const visibleApps = useMemo(
    () => sortApps(installedApps, sortOrder),
    [installedApps, sortOrder],
  )
  const totalStorage = installedApps.reduce((sum, app) => sum + app.size, 0)
  const combinedDownloads = installedApps.reduce(
    (sum, app) => sum + app.downloads,
    0,
  )

  if (!installedApps.length) {
    return (
      <EmptyState
        image="/assignment-assets/App-Error.png"
        title="No Installed Apps Yet"
        description="Install a few Hero.IO apps and they will show up here with quick uninstall controls."
        buttonLabel="Explore Apps"
        buttonTo="/apps"
      />
    )
  }

  return (
    <section className="container installation-page">
      <div className="section-heading">
        <h1>Your Installed Apps</h1>
        <p>Explore all trending apps on the market developed by us.</p>
      </div>

      <div className="install-summary-grid">
        <article className="install-summary-card">
          <span>Installed Apps</span>
          <strong>{installedApps.length}</strong>
        </article>
        <article className="install-summary-card">
          <span>Total Size</span>
          <strong>{totalStorage} MB</strong>
        </article>
        <article className="install-summary-card">
          <span>Combined Downloads</span>
          <strong>{formatCompactNumber(combinedDownloads)}</strong>
        </article>
      </div>

      <div className="toolbar">
        <div className="toolbar-result">
          <strong>{visibleApps.length} Apps Found</strong>
        </div>

        <div className="toolbar-controls">
          <select
            className="sort-select"
            aria-label="Sort installed apps by downloads"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="default">Sort by Downloads</option>
            <option value="downloads-desc">High-Low</option>
            <option value="downloads-asc">Low-High</option>
          </select>
        </div>
      </div>

      <div className="installation-list">
        {visibleApps.map((app) => (
          <article key={app.id} className="install-card">
            <div className="install-card-start">
              <img src={app.image} alt={app.title} />
              <div>
                <h2>{app.title}</h2>
                <div className="install-meta">
                  <span>{formatCompactNumber(app.downloads)}</span>
                  <span>{formatRating(app.ratingAvg)} ★</span>
                  <span>{app.size} MB</span>
                </div>
              </div>
            </div>

            <button
              className="button button-danger"
              aria-label={`Uninstall ${app.title}`}
              onClick={() => uninstallApp(app.id)}
            >
              Uninstall
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
