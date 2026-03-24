import useInView from '../hooks/useInView'

const categories = [
  { icon: 'bi-window-split',      title: 'Front-End',       skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap', 'MUI', 'UI/UX', 'Figma'] },
  { icon: 'bi-server',            title: 'Back-End',        skills: ['Node.js', 'Express.js', 'FastAPI'] },
  { icon: 'bi-database-fill',     title: 'Databases',       skills: ['MongoDB', 'SQL', 'Supabase'] },
  { icon: 'bi-cpu-fill',          title: 'AI & Data',       skills: ['Machine Learning', 'Deep Learning', 'Data Analytics', 'Power BI', 'Excel'] },
  { icon: 'bi-code-slash',        title: 'Programming',     skills: ['Python', 'Java'] },
  { icon: 'bi-tools',             title: 'Tools & DevOps',  skills: ['Git', 'GitHub', 'VS Code'] },
]

function SkillCard({ cat, index }) {
  const ref = useInView()
  return (
    <div ref={ref} className="col-md-6 col-lg-4 reveal-up" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="skill-card">
        <div className="skill-card-icon"><i className={`bi ${cat.icon}`}></i></div>
        <div className="skill-card-title">{cat.title}</div>
        <div className="skill-chips">
          {cat.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useInView()
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div ref={headRef} className="text-center mb-5 reveal-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Technical Expertise</span>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-subtitle">
            A curated toolkit built through projects, internships, and continuous self-learning.
          </p>
        </div>
        <div className="row g-4">
          {categories.map((cat, i) => <SkillCard key={cat.title} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  )
}
