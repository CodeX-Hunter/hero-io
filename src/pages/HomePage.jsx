import { Link } from 'react-router-dom'
import { AppCard } from '../components/AppCard.jsx'
import { apps } from '../data/apps.js'
import { usePageLoader } from '../state/PageLoaderContext.jsx'
import { formatCompactNumber } from '../utils/formatters.js'

const featuredApps = apps.slice(0, 8)

const statCards = [
  { label: 'Total Downloads', value: '29.6M', note: '21% more than last month' },
  { label: 'Total Reviews', value: '906K', note: '48% more than last month' },
  { label: 'Active Apps', value: '132+', note: '31 more since launch' },
]

export function HomePage() {
  const { showPageLoader } = usePageLoader()

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Digital tools that keep momentum high</span>
            <h1>
              We Build <span>Productive</span> Apps
            </h1>
            <p>
              At Hero.IO, we craft intuitive apps designed to make everyday life
              simpler, smarter, and more exciting.
            </p>
            <div className="hero-actions">
              <a
                className="button button-secondary"
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
              >
                Google Play
              </a>
              <a
                className="button button-outline"
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
              >
                App Store
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <img src="/assignment-assets/hero.png" alt="Hero IO mobile app preview" />
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-heading">
            <h2>Trusted By Millions, Built For You</h2>
            <p>Reliable tools for focus, planning, and steady daily progress.</p>
          </div>
          <div className="stats-grid">
            {statCards.map((item) => (
              <article key={item.label} className="stat-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="apps-section container">
        <div className="section-heading">
          <h2>Trending Apps</h2>
          <p>Explore all trending apps on the market developed by us.</p>
        </div>
        <div className="apps-grid">
          {featuredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
        <div className="section-action">
          <Link className="button button-primary" to="/apps" onClick={showPageLoader}>
            Show All ({formatCompactNumber(apps.length)})
          </Link>
        </div>
      </section>
    </>
  )
}
