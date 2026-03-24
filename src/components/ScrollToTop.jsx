import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`scroll-top-btn${visible ? ' scroll-top-visible' : ''}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  )
}
