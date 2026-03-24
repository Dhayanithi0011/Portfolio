import { useState } from 'react'
import useInView from '../hooks/useInView'

// ─── Project images ───────────────────────────────────────────────────────────
// To show screenshots: copy the 3 PNG files into src/assests/ then
// uncomment the 3 lines below and remove the emoji fallbacks in projects[].
//
import pictruthImg from '../assests/pictruth.png'
import algoImg     from '../assests/algo-visualizer.png'
import campusImg   from '../assests/campus-finder.png'

const projects = [
  
  {
    image: algoImg,
    title: 'Algorithm Visualizer',
    desc: 'DSA learning platform with step-through code execution, live variable & call stack tracking, and a quiz system that maps knowledge gaps. Built for college Tech Day.',
    tech: ['React', 'FastAPI', 'Python', 'Firebase'],
    category: 'fullstack',
    featured: true,
    github: 'https://github.com/Dhayanithi0011/Visual_Algo',
    live: 'https://visual-algorithm-three.vercel.app/',
  },
  {
    image: campusImg,
    title: 'CampusFinder',
    desc: 'Campus lost & found platform with Claude AI auto-matching lost and found reports. Features role-based access for students and admins, image uploads, and smart search.',
    tech: ['React', 'Supabase', 'Claude AI', 'Bootstrap'],
    category: 'fullstack',
    featured: true,
    github: 'https://github.com/Dhayanithi0011/CampusFinder',
    live: 'https://campusfinder-five.vercel.app/',
  },
  {
    image: pictruthImg,
    title: 'PicTruth',
    desc: 'AI-powered image authenticity detector. Identifies AI-generated images (DALL·E, Midjourney) and Photoshop edits using EfficientNetB0 + XGBoost. Includes scan history and PDF report export.',
    tech: ['Python', 'TensorFlow', 'XGBoost', 'FastAPI', 'React', 'Supabase'],
    category: 'ai',
    featured: true,
    github: 'https://github.com/Dhayanithi0011/PicTruth',
    live: '',
  },
]

const filters = [
  { key: 'all',       label: 'All Projects' },
  { key: 'ai',        label: 'AI / ML' },
  { key: 'fullstack', label: 'Full Stack' },
]

function ProjCard({ p, index, isAnyHovered, onMouseEnter, onMouseLeave }) {
  const ref = useInView()

  return (
    <div
      ref={ref}
      className="col-md-6 col-lg-4 reveal-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div
        className={`proj-card${isAnyHovered ? ' proj-card-dimmed' : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Hover overlay */}
        <div className="proj-overlay">
          <div className="proj-overlay-inner">
            <h4 className="proj-overlay-title">{p.title}</h4>
            <div className="proj-overlay-btns">
              <a href={p.github} target="_blank" rel="noreferrer" className="proj-overlay-btn">
                <i className="bi bi-github"></i> GitHub
              </a>
              {p.live ? (
                <a href={p.live} target="_blank" rel="noreferrer" className="proj-overlay-btn proj-overlay-btn-live">
                  <i className="bi bi-box-arrow-up-right"></i> Live Demo
                </a>
              ) : (
                <span className="proj-overlay-btn proj-overlay-btn-disabled">
                  <i className="bi bi-hourglass-split"></i> Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card header — shows image if available, otherwise emoji */}
        <div className="proj-card-header">
          {p.featured && <span className="proj-featured-badge">★ Featured</span>}
          {p.image
            ? <img src={p.image} alt={p.title} className="proj-card-img" />
            : <span className="proj-emoji">{p.emoji}</span>
          }
        </div>

        <div className="proj-card-body">
          <h3 className="proj-card-title">{p.title}</h3>
          <p className="proj-card-desc">{p.desc}</p>
          <div className="proj-techs">
            {p.tech.map(t => <span key={t} className="proj-tech">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive]             = useState('all')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const headRef = useInView()

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div ref={headRef} className="text-center mb-5 reveal-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Real-world applications built with curiosity, code, and a drive to solve meaningful problems.
          </p>
        </div>

        <div className="filter-bar">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${active === f.key ? ' active' : ''}`}
              onClick={() => { setActive(f.key); setHoveredIndex(null) }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filtered.map((p, i) => (
            <ProjCard
              key={`${p.title}-${i}`}
              p={p}
              index={i}
              isAnyHovered={hoveredIndex !== null && hoveredIndex !== i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
