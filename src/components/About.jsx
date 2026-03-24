import useInView from '../hooks/useInView'

const stats = [
  { num: '6+',  lbl: 'Projects' },
  { num: '3',   lbl: 'Internships' },
  { num: '5+',  lbl: 'Certifications' },
  { num: '2027',lbl: 'Graduation' },
]
const interests = ['AI & Machine Learning', 'Data Science', 'Full Stack Dev', 'Open Source', 'Problem Solving']

export default function About() {
  const secRef   = useInView()
  const leftRef  = useInView()
  const rightRef = useInView()

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div ref={secRef} className="text-center mb-5 reveal-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Who I Am</span>
          <h2 className="section-title">
            Passionate About <span className="grad-text fst-italic">Technology</span>
          </h2>
        </div>

        <div className="row g-5 align-items-start">

          {/* Left */}
          <div className="col-lg-5">
            <div ref={leftRef} className="reveal-left">
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.95rem' }}>
                I'm <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Dhayanithi M</strong> — an aspiring Full Stack Developer and AI enthusiast pursuing B.Tech in Artificial Intelligence and Data Science at Akshaya College of Engineering and Technology.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>
                I build scalable applications that fuse modern web stacks with AI intelligence. I thrive in collaborative, fast-paced environments where engineering meets innovation.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {interests.map(t => (
                  <span key={t} className="pill">
                    <i className="bi bi-check2" style={{ fontSize: '0.8rem' }}></i>{t}
                  </span>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <a href="https://drive.google.com/file/d/14Hdxb7mQkwpr2vcl-zAsMnMTQIPt7cY1/view?usp=sharing" target="_blank" className="btn-grad" style={{ fontSize: '0.86rem', padding: '12px 28px' }}>
                  <i className="bi bi-file-earmark-person"></i> View Resume
                </a>
                <a href="https://github.com/Dhayanithi0011" target="_blank" rel="noreferrer"
                   className="btn-ghost" style={{ fontSize: '0.86rem', padding: '10px 26px' }}>
                  <i className="bi bi-github"></i> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="col-lg-7">
            <div ref={rightRef} className="reveal-right">
              <div className="about-card mb-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: 'var(--grad-soft)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary)', fontSize: '1.3rem', flexShrink: 0
                  }}>
                    <i className="bi bi-mortarboard-fill"></i>
                  </div>
                  <h5 style={{ fontWeight: 800, fontSize: '1rem', margin: 0 }}>Education</h5>
                </div>
                <div className="edu-block">
                  <div className="degree">B.Tech — Artificial Intelligence &amp; Data Science</div>
                  <div className="college">Akshaya College of Engineering and Technology</div>
                  <div className="year">Expected Graduation: 2027</div>
                </div>
              </div>

              <div className="row g-3">
                {stats.map((s, i) => (
                  <div key={s.lbl} className="col-6">
                    <div className="stat-card card-pop" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="stat-num">{s.num}</div>
                      <div className="stat-lbl">{s.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
