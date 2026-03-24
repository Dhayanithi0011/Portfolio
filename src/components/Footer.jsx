const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Services',   href: '#services' },
  { label: 'Contact',    href: '#contact' },
]

const GMAIL_COMPOSE = 'https://mail.google.com/mail/?view=cm&to=dhayanithicoder@gmail.com'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-pro">
      <div className="container text-center">
        <div className="footer-logo-large">
          Dhayanithi<span className="dot">.</span>
        </div>
        <p className="footer-tagline">
          Aspiring Full Stack Developer &nbsp;·&nbsp; AI &amp; Data Science Enthusiast
        </p>

        <ul className="footer-nav">
          {navLinks.map(l => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="footer-socials">
          <a href="https://github.com/Dhayanithi0011" target="_blank" rel="noreferrer" className="footer-soc" aria-label="GitHub">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/dhayanithi-m-15b119339" target="_blank" rel="noreferrer" className="footer-soc" aria-label="LinkedIn">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer" className="footer-soc" aria-label="Email">
            <i className="bi bi-envelope-fill"></i>
          </a>
          <a href="tel:+919344891764" className="footer-soc" aria-label="Phone">
            <i className="bi bi-telephone-fill"></i>
          </a>
        </div>

        <div className="footer-divider"></div>
        <p className="footer-copy">
          © {year} Dhayanithi M &nbsp;·&nbsp; Built with React &amp; Vite &nbsp;·&nbsp; Designed with Passion
        </p>
      </div>
    </footer>
  )
}
