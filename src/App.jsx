import React, { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/locomotive-scroll.css'
import Homee from './components/Homee'

function App() {
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
  }, [])

  return (
    <div data-scroll-container>
      <Homee />
    </div>
  )
}

export default App