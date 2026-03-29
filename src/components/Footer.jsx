import { Link } from 'react-router-dom'
import { usePageLoader } from '../state/PageLoaderContext.jsx'

export function Footer() {
  const { showPageLoader } = usePageLoader()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand brand-footer">
            <img src="/assignment-assets/logo.png" alt="Hero IO logo" />
            <span>Hero.IO</span>
          </div>
          <p>
            Productive mobile apps curated for modern routines, better focus,
            and smarter daily momentum.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/" onClick={showPageLoader}>Home</Link>
          <Link to="/apps" onClick={showPageLoader}>Apps</Link>
          <Link to="/installation" onClick={showPageLoader}>My Installation</Link>
        </div>

        <div className="footer-links">
          <h3>Social Links</h3>
          <a href="https://github.com/CodeX-Hunter" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright © 2025 - All rights reserved</span>
      </div>
    </footer>
  )
}
