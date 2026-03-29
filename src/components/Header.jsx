import { NavLink } from 'react-router-dom'
import { useInstallations } from '../state/InstallationsContext.jsx'
import { usePageLoader } from '../state/PageLoaderContext.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Apps', to: '/apps' },
  { label: 'Installation', to: '/installation' },
]

export function Header() {
  const { showPageLoader } = usePageLoader()
  const { installedIds } = useInstallations()

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
              <span>{item.label}</span>
              {item.to === '/installation' && installedIds.length ? (
                <span className="nav-pill">{installedIds.length}</span>
              ) : null}
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
