import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = (e) => {
    const btn = e?.currentTarget
    const x = btn ? btn.getBoundingClientRect().right : window.innerWidth
    const y = btn ? btn.getBoundingClientRect().top + btn.offsetHeight / 2 : 0

    // Diagonal from click point to farthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const nextTheme = theme === 'light' ? 'dark' : 'light'

    // Use View Transitions API if supported
    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    document.documentElement.style.setProperty('--ripple-x', `${x}px`)
    document.documentElement.style.setProperty('--ripple-y', `${y}px`)
    document.documentElement.style.setProperty('--ripple-r', `${endRadius}px`)

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
      document.documentElement.setAttribute('data-theme', nextTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
