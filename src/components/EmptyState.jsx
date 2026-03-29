import { Link } from 'react-router-dom'
import { usePageLoader } from '../state/PageLoaderContext.jsx'

export function EmptyState({
  image,
  title,
  description,
  buttonLabel,
  buttonTo,
}) {
  const { showPageLoader } = usePageLoader()

  return (
    <section className="empty-state container">
      {image ? <img src={image} alt="" /> : null}
      <h1>{title}</h1>
      <p>{description}</p>
      {buttonLabel && buttonTo ? (
        <Link className="button button-primary" to={buttonTo} onClick={showPageLoader}>
          {buttonLabel}
        </Link>
      ) : null}
    </section>
  )
}
