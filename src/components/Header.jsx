import { NavLink } from 'react-router-dom'
import { usePageLoader } from '../state/PageLoaderContext.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Apps', to: '/apps' },
  { label: 'Installation', to: '/installation' },
]

export function Header() {
  const { showPageLoader } = usePageLoader()

  return (
    <header className="site-header">
      <div className="container nav-row">
        <NavLink className="brand" to="/">
          <img src="/assignment-assets/logo.png" alt="Hero IO logo" />
          <span>Hero.IO</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={showPageLoader}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          className="button button-primary contribution-link"
          href="https://github.com/CodeX-Hunter"
          target="_blank"
          rel="noreferrer"
        >
          <span className="github-badge" aria-hidden="true">
            G
          </span>
          Contribute
        </a>
      </div>
    </header>
  )
}
