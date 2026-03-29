export function LoadingOverlay({ show, label = 'Loading' }) {
  if (!show) {
    return null
  }

  return (
    <div className="loading-overlay" aria-live="polite" aria-label={label}>
      <div className="loader-card">
        <div className="loader-orbit" />
        <p>{label}...</p>
      </div>
    </div>
  )
}
