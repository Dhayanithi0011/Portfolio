import useInView from '../hooks/useInView'

const experience = [
  {
    date: 'June 2025 · 1 Month',
    role: 'Full Stack Intern',
    company: 'Prodigy InfoTech',
    desc: 'Built and deployed responsive full-stack web applications. Collaborated with mentors on real-world feature implementation using React, Node.js, and MongoDB.',
  },
  {
    date: 'June 2025 · 1 Month',
    role: 'Intern — Helmet Detector Project',
    company: 'RV TechLearn',
    desc: 'Developed a computer vision-based helmet detection system for two-wheelers, utilising YOLO and OpenCV.',
  },
  {
    date: '1 Month',
    role: 'Data Science Intern',
    company: 'CodeAlpha',
    desc: 'Implemented data science pipelines covering data cleaning, EDA, feature engineering, and predictive model building.',
  },
]

const certifications = [
  { title: 'Python Programming',                    issuer: 'NPTEL' },
  { title: 'Java Training',                              issuer: 'EduPyramids,IIT Bombay' },
  { title: 'JavaScrpit',                     issuer: 'Udemy' },
  { title: 'React',                     issuer: 'Udemy' },
  { title: 'Data Science - Python',                     issuer: 'NPTEL' },
  { title: 'UI & UX',                     issuer: 'Rathinam' },
  { title: 'Power BI',                     issuer: 'Juno'}
 
]

function TlCard({ e, index }) {
  const ref = useInView()
  return (
    <div ref={ref} className="tl-item reveal-left" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="tl-dot"></div>
      <div className="tl-card">
        <div className="tl-date">{e.date}</div>
        <div className="tl-role">{e.role}</div>
        <div className="tl-company">{e.company}</div>
        <div className="tl-desc">{e.desc}</div>
      </div>
    </div>
  )
}

function CertCard({ c, index }) {
  const ref = useInView()
  return (
    <div ref={ref} className="cert-item reveal-right" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="cert-item-icon"><i className="bi bi-award-fill"></i></div>
      <div>
        <div className="cert-item-title">{c.title}</div>
        <div className="cert-item-issuer">{c.issuer}</div>
      </div>
    </div>
  )
}

export default function Experience() {
  const headRef = useInView()
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div ref={headRef} className="text-center mb-5 reveal-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>My Journey</span>
          <h2 className="section-title">Experience &amp; Certifications</h2>
          <p className="section-subtitle">
            Hands-on internships and industry-recognised credentials that sharpen my craft.
          </p>
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <h5 style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>
              <i className="bi bi-briefcase-fill me-2" style={{ color: 'var(--primary)' }}></i>
              Work Experience
            </h5>
            <div className="timeline">
              {experience.map((e, i) => <TlCard key={i} e={e} index={i} />)}
            </div>
          </div>

          <div className="col-lg-6">
            <h5 style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>
              <i className="bi bi-patch-check-fill me-2" style={{ color: 'var(--primary)' }}></i>
              Certifications
            </h5>
            <div className="d-flex flex-column gap-3">
              {certifications.map((c, i) => <CertCard key={i} c={c} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
