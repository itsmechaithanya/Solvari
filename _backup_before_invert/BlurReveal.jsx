import React, { Children, isValidElement, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll-scrubbed blur reveal (Luke Baffait style).
// Each word starts blurred + faded and comes into focus as you scroll.
// Strings are split into words; elements like <br /> are kept as-is.
//
// Tweak these to taste:
//   blur    – starting blur in px
//   opacity – starting opacity
//   start / end – ScrollTrigger positions for the reveal
export default function BlurReveal({
  as: Tag = 'div',
  className = '',
  children,
  blur = 12,
  opacity = 0.15,
  start = 'top bottom',
  end = 'bottom 95%',
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('.br-word')
      gsap.fromTo(
        words,
        { filter: `blur(${blur}px)`, opacity, yPercent: 8 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          yPercent: 0,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start, end, scrub: 1.5 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [blur, opacity, start, end])

  let key = 0
  const split = (node) => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
        .split(/(\s+)/)
        .map((part) =>
          part.trim() === '' ? (
            part
          ) : (
            <span key={key++} className="br-word inline-block will-change-[filter,opacity,transform]">
              {part}
            </span>
          )
        )
    }
    if (isValidElement(node)) return React.cloneElement(node, { key: key++ })
    return node
  }

  return (
    <Tag ref={ref} className={className}>
      {Children.toArray(children).flatMap((c) => split(c))}
    </Tag>
  )
}
