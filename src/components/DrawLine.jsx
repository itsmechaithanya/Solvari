import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Divider line that draws in from left to right and fades from 0 to 100% opacity as you scroll.
// Same smoothing (scrub 1.5) as the blur reveals.
//
// Tweak to taste:
//   start / end – ScrollTrigger positions for the draw
export default function DrawLine({ className = '', start = 'top 95%', end = 'top 65%' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start, end, scrub: 1.5 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [start, end])

  return <div ref={ref} className={`origin-left will-change-[transform,opacity] ${className}`} />
}
