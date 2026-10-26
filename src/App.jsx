import React, { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/locomotive-scroll.css'
import Home from './components/Home'

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      },
    })

    return () => {
      locomotiveScroll.destroy()
    }
  }, [])

  return (
    <div data-scroll-container>
      <Home />
    </div>
  )
}

export default App