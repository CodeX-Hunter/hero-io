import { Link } from 'react-router-dom'
import { usePageLoader } from '../state/PageLoaderContext.jsx'
import { formatCompactNumber, formatRating } from '../utils/formatters.js'

export function AppCard({ app }) {
  const { showPageLoader } = usePageLoader()

  return (
    <Link className="app-card" to={`/apps/${app.id}`} onClick={showPageLoader}>
      <div className="app-thumb">
        <img src={app.image} alt={app.title} />
      </div>
      <div className="app-card-body">
        <h3>{app.title}</h3>
        <p>{app.companyName}</p>
        <div className="app-meta">
          <span>{formatCompactNumber(app.downloads)} downloads</span>
          <span>{formatRating(app.ratingAvg)} ★</span>
        </div>
      </div>
    </Link>
  )
}
