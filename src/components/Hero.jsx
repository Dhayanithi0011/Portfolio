import { useEffect, useRef, useState, useCallback } from 'react'
import profilePhoto from '../assests/photo2.jpeg'

/* ── Code snippets ── */
const CODE_LINES = [
  'const model = tf.sequential()',
  'await fetch("/api/predict")',
  'df.groupby("label").mean()',
  'router.get("/health", cb)',
  'useState<User | null>(null)',
  'SELECT * FROM projects',
  'git commit -m "feat: AI"',
  'npm run dev --port 5173',
  'model.fit(X_train, y_train)',
  'res.json({ status: 200 })',
  'import torch.nn as nn',
  'const [data, setData] =',
  'db.collection("users")',
  'docker build -t app .',
]

/* ── Tech config — brand colours for energy beam only ── */
const TECH_BUBBLES = [
  { key: 'React',   angle: 320, dist: 1.55 },
  { key: 'Python',  angle: 50,  dist: 1.52 },
  { key: 'Node.js', angle: 135, dist: 1.58 },
  { key: 'Java',    angle: 220, dist: 1.54 },
  { key: 'MongoDB', angle: 260, dist: 1.50 },
  { key: 'FastAPI', angle: 80,  dist: 1.56 },
]

/* ════════════════════════════════════════════════
   ORIGINAL BRAND-COLOR SVG LOGOS — 46px
════════════════════════════════════════════════ */
const LOGOS = {
  React: (
    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(120 12 12)"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" width="46" height="46">
      <path d="M12 2C9 2 7 3.4 7 5v2h5v1H5.5C3.6 8 2 9.8 2 12s1.6 4 3.5 4H7v-2.5c0-1.9 1.8-3.5 4-3.5h2c2.2 0 4-1.3 4-3V5c0-1.6-2-3-5-3zm-1.5 2a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB"/>
      <path d="M12 22c3 0 5-1.4 5-3v-2h-5v-1h6.5c1.9 0 3.5-1.8 3.5-4s-1.6-4-3.5-4H17v2.5c0 1.9-1.8 3.5-4 3.5h-2c-2.2 0-4 1.3-4 3v2c0 1.6 2 3 5 3zm1.5-2a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43B"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" width="46" height="46">
      <path d="M11.998 1.5L2 7.2v11.6l10 5.7 10-5.7V7.2L11.998 1.5z" fill="#339933" opacity="0.15"/>
      <path d="M11.998 1.5L2 7.2v11.6l10 5.7 10-5.7V7.2L11.998 1.5z" fill="none" stroke="#339933" strokeWidth="1.2"/>
      <path d="M8 16.5V9l4 2.2 4-2.2v7.5" stroke="#339933" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" width="46" height="46">
      <path d="M8.5 16.5s-.8.5.6.6c1.6.2 2.5.2 4.3-.2 0 0 .5.3 1.1.5-3.9 1.7-8.9-.1-6-1z" fill="#E76F00"/>
      <path d="M8 14.7s-.9.7.9.8c2.5.2 4.4.2 6.1-.3 0 0 .3.3.8.5-5.4 1.6-11.4.1-7.8-1z" fill="#E76F00"/>
      <path d="M13.5 10.5c1.1 1.3-.3 2.4-.3 2.4s2.7-1.4 1.5-3.1c-1.2-1.6-2.1-2.4 2.8-5.2 0 0-7.7 1.9-4 5.9z" fill="#E76F00"/>
      <path d="M18.6 18s.6.5-.6.9c-2.3.7-9.5.9-11.5 0-.7-.3.6-.7.9-.8.4-.1.6-.1.6-.1-.7-.5-4.4.9-1.9 1.3 6.8 1.1 12.4-.5 12.5-1.3z" fill="#E76F00"/>
      <path d="M9 12.7s-3.2.8-.7 1.1c1.1.1 3.2.1 5.2-.1 1.6-.2 3.3-.5 3.3-.5s-.6.2-1 .5c-4.1 1.1-12-.6-9.7-1 1.9-.4 2.9 0 2.9 0z" fill="#5382A1"/>
      <path d="M16.5 15.5c4.2-2.2 2.2-4.3 1-4-.3.1-.4.2-.4.2s.1-.2.3-.2c2.4-.9 4.2 2.5-1 3.8 0 .1.1 0 .1.2z" fill="#5382A1"/>
      <path d="M14.5 2s1.8 1.8-1.7 4.6c-2.8 2.2-.6 3.4 0 4.8-1.6-1.4-2.8-2.7-2-3.8.8-1.6 5.7-3 3.7-5.6z" fill="#E76F00"/>
      <path d="M9.7 20.9c4 .3 10.2-.1 10.3-1.9 0 0-.3.7-3.3 1.3-3.4.6-7.6.5-10.1.1 0 0 .5.4 3.1.5z" fill="#5382A1"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" width="46" height="46">
      <path d="M12 2C9.5 5.5 7 8.5 7 13c0 3.3 2.2 6 5 6.8V22h.1V19.8C14.8 19 17 16.3 17 13c0-4.5-2.5-7.5-5-11z" fill="#47A248"/>
      <path d="M12 19.8V22" stroke="#47A248" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 24 24" width="46" height="46">
      <circle cx="12" cy="12" r="9.5" fill="#009688" opacity="0.12"/>
      <circle cx="12" cy="12" r="9.5" stroke="#009688" strokeWidth="1.3" fill="none"/>
      <path d="M12 3v9h5L11 21v-9H6L12 3z" fill="#009688"/>
    </svg>
  ),
}

const SOCIALS = [
  { icon: 'bi-github',        href: 'https://github.com/Dhayanithi0011',                  label: 'GitHub' },
  { icon: 'bi-linkedin',      href: 'https://www.linkedin.com/in/dhayanithi-m-15b119339', label: 'LinkedIn' },
  { icon: 'bi-envelope-fill', href: 'mailto:dhaya00011@gmail.com',                        label: 'Email' },
]
const BUILT_WITH = [
  { icon: 'bi-code-slash',    label: 'Bootstrap' },
  { icon: 'bi-code-slash',    label: 'React' },
  { icon: 'bi-cup-hot-fill',  label: 'JavaScript' },
]



/* ════════════════════════════════════════════════
   Main Hero
════════════════════════════════════════════════ */
export default function Hero() {
  const heroRef = useRef(null), meshRef = useRef(null)
  const wrapRef = useRef(null), loopRef = useRef(null), idleRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [litIdx,    setLitIdx]    = useState(-1)

  const startLoop = useCallback(() => {
    clearInterval(loopRef.current)
    let i = 0
    const step = () => {
      setActiveIdx(i); setLitIdx(i)
      setTimeout(() => setLitIdx(-1), 800)
      i = (i + 1) % TECH_BUBBLES.length
    }
    step(); loopRef.current = setInterval(step, 1100)
  }, [])

  const stopLoop = useCallback(() => { clearInterval(loopRef.current); setActiveIdx(-1); setLitIdx(-1) }, [])

  const resetIdle = useCallback(() => {
    clearTimeout(idleRef.current); stopLoop()
    idleRef.current = setTimeout(startLoop, 1500)
  }, [startLoop, stopLoop])

  useEffect(() => { startLoop(); return () => { clearInterval(loopRef.current); clearTimeout(idleRef.current) } }, [startLoop])

  useEffect(() => {
    const hero = heroRef.current, mesh = meshRef.current
    if (!hero || !mesh) return
    let raf
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const { left, top, width, height } = hero.getBoundingClientRect()
        const x = ((e.clientX - left) / width * 100).toFixed(1)
        const y = ((e.clientY - top) / height * 100).toFixed(1)
        mesh.style.background = `
          radial-gradient(ellipse 55% 55% at ${x}% ${y}%, rgba(42,157,173,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at ${100-x}% ${100-y}%, rgba(141,207,215,0.13) 0%, transparent 65%)`
      })
      resetIdle()
    }
    hero.addEventListener('mousemove', onMove)
    return () => { hero.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [resetIdle])

  const handleBubbleEnter = (i) => { clearInterval(loopRef.current); clearTimeout(idleRef.current); setActiveIdx(i); setLitIdx(i) }
  const handleBubbleLeave = () => { setLitIdx(-1); resetIdle() }

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-mesh" ref={meshRef}></div>

      <div className="hero-code-bg" aria-hidden="true">
        {CODE_LINES.map((line, i) => (
          <span key={i} className="code-snippet" style={{
            top:  `${8 + (i * 6.3) % 88}%`,
            left: `${3 + (i * 13.7) % 90}%`,
            animationDelay:    `${(i * 1.4).toFixed(1)}s`,
            animationDuration: `${18 + (i % 5) * 4}s`,
          }}>{line}</span>
        ))}
      </div>

      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>
      <div className="hero-bg-ring hero-bg-ring-1"></div>
      <div className="hero-bg-ring hero-bg-ring-2"></div>

      <div className="hero-layout">

        {/* ══ LEFT PANEL ══ */}
        <div className="hero-text-panel">
          <div className="hero-kicker fade-up d1">
            <span className="hero-kicker-dot"></span>
            Available for internships &amp; collaborations
          </div>
          <h1 className="hero-headline fade-up d2">
            Hello, I'm
            <span className="name-line grad-text">Dhayanithi M</span>
            <span className="name-line hero-role-tag">
              <span className="hero-role-bracket">&lt;</span>Full Stack Developer<span className="hero-role-bracket">/&gt;</span>
            </span>
          </h1>
          <div className="hero-role-chips fade-up d3">
            {['AI & ML', 'Data Science', 'Web Dev'].map(r => <span key={r} className="hero-role-chip">{r}</span>)}
          </div>
          <p className="hero-desc fade-up d4">
            Aspiring developer with hands-on experience in front-end &amp; back-end systems,
            machine learning, and data analytics. Passionate about delivering real-world
            solutions in collaborative environments.
          </p>
          <div className="hero-cta fade-up d5">
            <a href="#projects" className="btn-grad"><i className="bi bi-grid-3x3-gap-fill"></i> View Projects</a>
            <a href="#contact"  className="btn-ghost"><i className="bi bi-send"></i> Let's Talk</a>
          </div>
          <div className="hero-socials fade-up d5">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hero-social-btn" aria-label={s.label}>
                <i className={`bi ${s.icon}`}></i>
              </a>
            ))}
            <span className="hero-social-divider"></span>
            <span className="hero-social-label">Let's connect</span>
          </div>
          <div className="hero-built-with fade-up d6">
            <span className="built-with-label">Built with</span>
            {BUILT_WITH.map(t => (
              <span key={t.label} className="built-with-chip" title={t.label}>
                <i className={`bi ${t.icon}`}></i><span>{t.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="hero-avatar-panel fade-up d3">
          <div className="hero-avatar-wrap" ref={wrapRef}>

            <div className="avatar-ring-xl"></div>
            <div className="avatar-ring-lg"></div>
            <div className="avatar-ring-outer"></div>
            <div className="avatar-ring-mid"></div>

            <div className="avatar-ring-inner">
              <div className="avatar-circle">
                {/* ── Profile photo ── */}
                <img src={profilePhoto} alt="Dhayanithi M" />
              </div>
            </div>


            {TECH_BUBBLES.map((b, i) => {
              const rad = (b.angle * Math.PI) / 180
              const cx  = 50 + Math.cos(rad) * b.dist * 47
              const cy  = 50 + Math.sin(rad) * b.dist * 47
              return (
                <span
                  key={b.key}
                  className={`tech-bubble${litIdx === i ? ' tech-bubble-lit' : ''}`}
                  title={b.key}
                  style={{ left: `${cx}%`, top: `${cy}%` }}
                  onMouseEnter={() => handleBubbleEnter(i)}
                  onMouseLeave={handleBubbleLeave}
                >
                  {LOGOS[b.key]}
                </span>
              )
            })}
          </div>
        </div>

      </div>

      <div className="scroll-cue"><span>Scroll</span><div className="scroll-line"></div></div>
    </section>
  )
}
