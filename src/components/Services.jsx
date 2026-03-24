import useInView from '../hooks/useInView'

const services = [
  { icon: 'bi-layers-half',        title: 'Full-Stack Development',         desc: 'End-to-end web applications from database design to polished UI. REST API architecture, authentication, and deployment-ready builds.' },
  { icon: 'bi-palette2',           title: 'Front-End Development',          desc: 'Pixel-perfect, accessible, responsive interfaces using React.js, Bootstrap, MUI — optimised for all devices.' },
  { icon: 'bi-hdd-stack-fill',     title: 'Back-End Development',           desc: 'Scalable, maintainable server-side logic with Node.js, Express.js, and FastAPI. RESTful and event-driven API patterns.' },
  { icon: 'bi-database-fill-gear', title: 'Database Management',            desc: 'Efficient schema design, querying, and management with MongoDB, SQL, and Supabase. Data modelling built for performance.' },
  { icon: 'bi-cpu-fill',           title: 'AI & ML Solutions',              desc: 'ML pipelines, deep learning models, NLP systems, and analytics dashboards tailored to automate tasks and extract insights.' },
  { icon: 'bi-git',                title: 'Version Control & Collaboration', desc: 'Clean Git branching workflows, code review practices, and collaborative development through GitHub.' },
]

function SvcCard({ s, index }) {
  const ref = useInView()
  return (
    <div ref={ref} className="col-md-6 col-lg-4 reveal-up" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="svc-card">
        <div className="svc-icon"><i className={`bi ${s.icon}`}></i></div>
        <div className="svc-title">{s.title}</div>
        <div className="svc-desc">{s.desc}</div>
      </div>
    </div>
  )
}

export default function Services() {
  const headRef = useInView()
  return (
    <section className="services-section" id="services">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="text-center mb-5 reveal-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>What I Offer</span>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            A range of technical services to help bring your ideas to life with clean, modern code.
          </p>
        </div>
        <div className="row g-4">
          {services.map((s, i) => <SvcCard key={i} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
