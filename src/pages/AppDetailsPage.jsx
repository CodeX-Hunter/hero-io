import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState.jsx'
import { apps } from '../data/apps.js'
import { useInstallations } from '../state/InstallationsContext.jsx'
import { formatCompactNumber, formatRating } from '../utils/formatters.js'

export function AppDetailsPage() {
  const { appId } = useParams()
  const { installedIds, installApp } = useInstallations()

  const app = useMemo(
    () => apps.find((item) => item.id === Number(appId)),
    [appId],
  )

  if (!app) {
    return (
      <EmptyState
        image="/assignment-assets/App-Error.png"
        title="OPPS!! APP NOT FOUND"
        description="The app you are requesting is not found on our system. Please try another app."
        buttonLabel="Go Back"
        buttonTo="/apps"
      />
    )
  }

  const isInstalled = installedIds.includes(app.id)
  const descriptionParagraphs = app.description.split('\n\n')

  return (
    <section className="container details-page">
      <div className="details-hero">
        <div className="details-thumb">
          <img src={app.image} alt={app.title} />
        </div>

        <div className="details-copy">
          <h1>{app.title}</h1>
          <p>
            Developed by <span>{app.companyName}</span>
          </p>

          <div className="details-stats">
            <article>
              <img src="/assignment-assets/icon-downloads.png" alt="" />
              <span>Downloads</span>
              <strong>{formatCompactNumber(app.downloads)}</strong>
            </article>
            <article>
              <img src="/assignment-assets/icon-ratings.png" alt="" />
              <span>Average Ratings</span>
              <strong>{formatRating(app.ratingAvg)}</strong>
            </article>
            <article>
              <img src="/assignment-assets/icon-review.png" alt="" />
              <span>Total Reviews</span>
              <strong>{formatCompactNumber(app.reviews)}</strong>
            </article>
          </div>

          <button
            className="button button-install"
            disabled={isInstalled}
            aria-label={
              isInstalled
                ? `${app.title} already installed`
                : `Install ${app.title}`
            }
            onClick={() => installApp(app)}
          >
            {isInstalled ? 'Installed' : `Install Now [${app.size} MB]`}
          </button>
        </div>
      </div>

      <section className="chart-panel">
        <h2>Ratings</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={app.ratings} layout="vertical" margin={{ left: 24, right: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7eaf3" />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={56} />
              <Tooltip cursor={{ fill: 'rgba(116, 71, 240, 0.08)' }} />
              <Bar dataKey="count" fill="#ff8a1d" radius={[0, 12, 12, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="description-panel">
        <h2>Description</h2>
        {descriptionParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </section>
  )
}
