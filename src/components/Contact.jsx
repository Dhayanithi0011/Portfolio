import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import useInView from '../hooks/useInView'

/* ── EmailJS credentials (from .env) ── */
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const GMAIL_COMPOSE = 'https://mail.google.com/mail/?view=cm&to=dhayanithicoder@gmail.com'

const contacts = [
  { icon: 'bi-envelope-fill',  label: 'Email',    value: 'dhayanithicoder@gmail.com', href: GMAIL_COMPOSE },
  { icon: 'bi-telephone-fill', label: 'Phone',    value: '+91 93448 91764',            href: 'tel:+919344891764' },
  { icon: 'bi-github',         label: 'GitHub',   value: 'Dhayanithi0011',             href: 'https://github.com/Dhayanithi0011' },
  { icon: 'bi-linkedin',       label: 'LinkedIn', value: 'Dhayanithi M',               href: 'https://www.linkedin.com/in/dhayanithi-m-15b119339' },
]

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [form,   setForm]   = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')

  const headRef  = useInView()
  const leftRef  = useInView()
  const rightRef = useInView()

  /* Initialise EmailJS once on mount */
  useEffect(() => {
    emailjs.init(PUBLIC_KEY)
  }, [])

  const change = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')

    /*
      Template:
        Hello {{to_name}},
        You got a new message from {{from_name}}: {{from_email}}
        {{message}}
        Message from Portfolio site
    */
    const templateParams = {
      to_name:   'Dhayanithi',     // {{to_name}}
      from_name: form.name,        // {{from_name}}
      from_email: form.email,      // {{from_email}}
      message:   form.message,     // {{message}}
      reply_to:  form.email,
    }

    try {
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      console.log('EmailJS success:', res.status, res.text)
      setStatus('success')
      setForm(EMPTY)
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setErrMsg(err?.text || err?.message || 'Unknown error')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 7000)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">

        {/* ── Heading ── */}
        <div ref={headRef} className="text-center mb-5 reveal-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Open to internships, freelance projects, and exciting collaborations. Let's build something great.
          </p>
        </div>

        <div className="row g-4 align-items-start">

          {/* ── Left: contact info ── */}
          <div className="col-lg-5">
            <div ref={leftRef} className="reveal-left">
              <div className="contact-info-wrap">
                <div className="contact-info-header">
                  <h3>Contact Information</h3>
                  <p>Reach me through any of the channels below — I respond within 24 hours.</p>
                </div>

                <div className="contact-info-body">
                  {contacts.map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noreferrer" className="cinfo-row">
                      <div className="cinfo-icon"><i className={`bi ${c.icon}`}></i></div>
                      <div>
                        <div className="cinfo-label">{c.label}</div>
                        <div className="cinfo-value">{c.value}</div>
                      </div>
                      <i className="bi bi-arrow-up-right ms-auto"
                        style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}></i>
                    </a>
                  ))}
                </div>

                <div className="social-row">
                  <a href="https://github.com/Dhayanithi0011" target="_blank" rel="noreferrer" className="soc-btn">
                    <i className="bi bi-github"></i>
                    <span className="d-none d-sm-inline">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/dhayanithi-m-15b119339" target="_blank" rel="noreferrer" className="soc-btn">
                    <i className="bi bi-linkedin"></i>
                    <span className="d-none d-sm-inline">LinkedIn</span>
                  </a>
                  <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer" className="soc-btn">
                    <i className="bi bi-envelope-fill"></i>
                    <span className="d-none d-sm-inline">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <div className="col-lg-7">
            <div ref={rightRef} className="reveal-right">
              <div className="contact-form-wrap">
                <h4 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 6, color: 'var(--text)' }}>
                  Send a Message
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 28 }}>
                  Have a project, question, or just want to say hi? Fill in the form below.
                </p>

                {/* ── Success banner ── */}
                {status === 'success' && (
                  <div className="form-success">
                    <i className="bi bi-check-circle-fill"></i>
                    &nbsp;Message sent successfully! I'll get back to you shortly.
                  </div>
                )}

                {/* ── Error banner ── */}
                {status === 'error' && (
                  <div className="form-success" style={{
                    background:   'rgba(220,53,69,0.12)',
                    borderColor:  'rgba(220,53,69,0.35)',
                    color:        '#ff6b7a',
                    flexDirection:'column',
                    alignItems:   'flex-start',
                    gap:          '6px',
                  }}>
                    <div>
                      <i className="bi bi-x-circle-fill"></i>
                      &nbsp;Something went wrong. Please&nbsp;
                      <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer"
                        style={{ color: '#ff6b7a', textDecoration: 'underline' }}>
                        email me directly
                      </a>
                      &nbsp;or try again.
                    </div>
                    {errMsg && (
                      <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>
                        Detail: {errMsg}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Form ── */}
                <form onSubmit={submit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label className="fld-label">Your Name</label>
                      <input
                        className="fld-input"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={change}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="fld-label">Email Address</label>
                      <input
                        className="fld-input"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={change}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="fld-label">Message</label>
                      <textarea
                        className="fld-input"
                        name="message"
                        rows="5"
                        placeholder="Tell me about your project or idea..."
                        value={form.message}
                        onChange={change}
                        required
                        style={{ resize: 'vertical' }}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn-grad w-100"
                        style={{ justifyContent: 'center', padding: '15px' }}
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Sending…
                          </>
                        ) : (
                          <><i className="bi bi-send-fill"></i>&nbsp;Send Message</>
                        )}
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
