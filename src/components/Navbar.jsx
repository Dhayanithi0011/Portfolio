import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',       href: '#home',       icon: 'bi-house-fill' },
  { label: 'About',      href: '#about',      icon: 'bi-person-fill' },
  { label: 'Skills',     href: '#skills',     icon: 'bi-code-slash' },
  { label: 'Experience', href: '#experience', icon: 'bi-briefcase-fill' },
  { label: 'Projects',   href: '#projects',   icon: 'bi-grid-3x3-gap-fill' },
  { label: 'Services',   href: '#services',   icon: 'bi-stars' },
  { label: 'Contact',    href: '#contact',    icon: 'bi-envelope-fill' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [active, setActive] = useState('home')
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (href, e) => {
    if (e) e.preventDefault()
    setActive(href.replace('#', ''))
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* ── Top bar ── */}
      <nav className={`navbar-pro${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <a className="nav-logo" href="#home" onClick={(e) => go('#home', e)}>
              DM<span className="dot">.</span>
            </a>

            {/* Desktop links */}
            <ul className="nav-links d-none d-lg-flex">
              {links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={`nav-link${active === l.href.replace('#', '') ? ' active' : ''}`}
                    onClick={(e) => go(l.href, e)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <button className="icon-btn" onClick={(e) => toggleTheme(e)} aria-label="Toggle theme">
                <i className={`bi bi-${theme === 'light' ? 'moon-stars-fill' : 'sun-fill'}`}></i>
              </button>
              {/* Hamburger — mobile only */}
              <button
                className={`drawer-toggle d-lg-none${open ? ' is-open' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        className={`drawer-backdrop${open ? ' drawer-backdrop-visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Left Drawer ── */}
      <aside className={`drawer${open ? ' drawer-open' : ''}`} aria-label="Navigation drawer">
        {/* Drawer header */}
        <div className="drawer-head">
          <a className="nav-logo" href="#home" onClick={(e) => go('#home', e)}>
            DM<span className="dot">.</span>
          </a>
          <button className="drawer-close-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Divider */}
        <div className="drawer-divider" />

        {/* Nav links */}
        <nav className="drawer-nav">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={`drawer-link${active === l.href.replace('#', '') ? ' active' : ''}`}
              onClick={(e) => go(l.href, e)}
            >
              <span className="drawer-link-icon">
                <i className={`bi ${l.icon}`}></i>
              </span>
              <span className="drawer-link-label">{l.label}</span>
              {active === l.href.replace('#', '') && (
                <span className="drawer-link-dot" />
              )}
            </a>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="drawer-footer">
          <div className="drawer-divider" style={{ marginBottom: 16 }} />
          <div className="drawer-footer-row">
            <button className="drawer-theme-btn" onClick={(e) => toggleTheme(e)} aria-label="Toggle theme">
              <i className={`bi bi-${theme === 'light' ? 'moon-stars-fill' : 'sun-fill'}`}></i>
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
          <p className="drawer-footer-copy">© {new Date().getFullYear()} Dhayanithi M</p>
        </div>
      </aside>
    </>
  )
}
