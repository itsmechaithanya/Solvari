import React, { useEffect, useState, useCallback } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/locomotive-scroll.css'
import Homee from './components/Homee'
import Menu from './components/Menu'
import WorkPage from './components/WorkPage'
import AboutUsPage from './components/AboutUsPage'
import ContactPage from './components/ContactPage'

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname || '/')

  const navigateTo = useCallback((nextPath) => {
    if (nextPath !== window.location.pathname) {
      window.history.pushState({}, '', nextPath)
    }
    setPathname(nextPath)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || '/')
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      },
    })

    const resizeObserver = new ResizeObserver(() => {
      locomotiveScroll.resize()
    })
    resizeObserver.observe(document.body)

    const handleLoad = () => locomotiveScroll.resize()
    window.addEventListener('load', handleLoad)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('load', handleLoad)
      locomotiveScroll.destroy()
    }
  }, [pathname])

  const renderPage = () => {
    if (pathname === '/work') return <WorkPage onNavigate={navigateTo} />
    if (pathname === '/about') return <AboutUsPage onNavigate={navigateTo} />
    if (pathname === '/contact') return <ContactPage onNavigate={navigateTo} />
    return <Homee />
  }

  return (
    <div data-scroll-container>
      <Menu onNavigate={navigateTo} />
      {renderPage()}
    </div>
  )
}

export default App