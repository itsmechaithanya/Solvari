import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll-scrubbed blur reveal for images (Luke Baffait style).
// Starts heavily blurred, faded and slightly zoomed in, then comes into focus as you scroll.
//
// Tweak to taste:
//   blur    – starting blur in px
//   opacity – starting opacity
//   scale   – starting zoom
//   start / end – ScrollTrigger positions for the reveal
export default function BlurImage({
  blur = 30,
  opacity = 0.4,
  scale = 1.08,
  start = 'top bottom',
  end = 'bottom 95%',
  as: Media = 'img', // 'img' or 'video'
  wrapperClassName = '',
  ...imgProps
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { filter: `blur(${blur}px)`, opacity, scale },
        {
          filter: 'blur(0px)',
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start, end, scrub: 1.5 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [blur, opacity, scale, start, end])

  // The blur sits on a wrapper so it doesn't clash with the light-mode image filter in index.css
  return (
    <div ref={ref} className={wrapperClassName} style={{ willChange: 'filter, opacity, transform' }}>
      <Media {...imgProps} className={`block ${imgProps.className || ''}`} />
    </div>
  )
}
