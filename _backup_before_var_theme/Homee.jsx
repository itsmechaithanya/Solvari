import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { flushSync, createPortal } from 'react-dom'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import jayImg from '../assets/jayhome.png'
import f1 from '../assets/f1.png'
import f2 from '../assets/f2.png'
import f3 from '../assets/f3.png'
import f4 from '../assets/f4.png'
import a1 from '../assets/a1.png'
import a2 from '../assets/a2.png'
import a3 from '../assets/a3.png'
import a4 from '../assets/a4.png'
import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import rd1Video from '../assets/rd1.mp4'
import rd2 from '../assets/rd2.png'
import rd3 from '../assets/rd3.png'
import ta1Video from '../assets/ta1.mov'
import ta2 from '../assets/ta2.png'
import ta3 from '../assets/ta3.png'
import si1 from '../assets/si1.png'
import si2Video from '../assets/si2.MP4'
import si3 from '../assets/si3.png'
import whatJayVideo from '../assets/whatjay.MP4'
import footerImg from '../assets/footer.png'
import BlurReveal from './BlurReveal'
import BlurImage from './BlurImage'
import DrawLine from './DrawLine'

gsap.registerPlugin(Flip, ScrollTrigger)

function ProjectRow({ project, isExpanded, shouldAnimate, onToggle }) {
  const descRef = useRef(null)
  const btnRef = useRef(null)
  const stripRef = useRef(null)
  const isFirstRender = useRef(true)
  const rowRef = useRef(null)

  // Row text slides in from left to right with a fade when the row comes into view
  useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.row-reveal'),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          // plays once the row reaches 85% down the screen; reverses if you scroll back above it
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
      // Images: curtain reveal from left to right + blur, images stay in place.
      // clip-path wipes each image open; --img-blur is a CSS variable (see index.css)
      // so it works alongside the light-mode image filter.
      if (stripRef.current) {
        gsap.fromTo(
          stripRef.current.querySelectorAll('.project-img'),
          { clipPath: 'inset(0% 100% 0% 0%)', '--img-blur': '12px' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            '--img-blur': '0px',
            duration: 1.2,
            ease: 'power3.inOut',
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        )
      }
    }, el)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!isExpanded && stripRef.current) {
      stripRef.current.scrollLeft = 0
      if (typeof stripRef.current.scrollTo === 'function') {
        stripRef.current.scrollTo({ left: 0, behavior: 'instant' })
      }
    }
  }, [isExpanded])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (isExpanded) {
        gsap.set(descRef.current, { opacity: 1 })
        if (btnRef.current) gsap.set(btnRef.current, { opacity: 1, pointerEvents: 'auto' })
      } else {
        gsap.set(descRef.current, { opacity: 0, pointerEvents: 'none' })
        if (btnRef.current) gsap.set(btnRef.current, { opacity: 0, pointerEvents: 'none' })
      }
      return
    }

    // Only animate if this is the div that was selected by the user
    if (!shouldAnimate) {
      if (isExpanded) {
        gsap.set(descRef.current, { opacity: 1, pointerEvents: 'auto' })
        if (btnRef.current) gsap.set(btnRef.current, { opacity: 1, pointerEvents: 'auto' })
      } else {
        gsap.set(descRef.current, { opacity: 0, pointerEvents: 'none' })
        if (btnRef.current) gsap.set(btnRef.current, { opacity: 0, pointerEvents: 'none' })
      }
      return
    }

    if (isExpanded) {
      // Pure opacity fade from 0 to 100%
      gsap.fromTo(
        descRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.15,
          ease: 'power2.out',
          onStart: () => {
            if (descRef.current) descRef.current.style.pointerEvents = 'auto'
          },
        }
      )

      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.45,
            delay: 0.2,
            ease: 'power2.out',
            onStart: () => {
              if (btnRef.current) btnRef.current.style.pointerEvents = 'auto'
            },
          }
        )
      }
    } else {
      // Fade out to 0 opacity
      gsap.to(descRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (descRef.current) descRef.current.style.pointerEvents = 'none'
        },
      })

      if (btnRef.current) {
        gsap.to(btnRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (btnRef.current) btnRef.current.style.pointerEvents = 'none'
          },
        })
      }
    }
  }, [isExpanded, shouldAnimate])

  return (
    <div className='w-full'>
      <DrawLine className='border-t border-[#3d3d3d] mx-[5vw] md:mx-[4vw]' />
      <div
        ref={rowRef}
        id={`project-row-${project.id}`}
        onClick={onToggle}
        className='project-row relative w-full py-[2.5vh] md:py-[3.5vh] cursor-pointer select-none transition-colors duration-200 hover:bg-[var(--row-hover)] group'
      >
        {/* Top Row: Stacked on mobile, 60vw left / 40vw right on desktop */}
        <div className='w-full flex flex-col md:flex-row items-start'>
          {/* Left 60%: Title, Tags, Indicator - fixed columns on desktop so position never shifts */}
          <div className='w-full px-[5vw] md:px-0 md:w-[60vw] md:min-w-[60vw] md:max-w-[60vw] shrink-0 md:pl-[4vw] flex flex-wrap md:flex-nowrap items-start justify-between md:justify-start gap-y-2 md:gap-y-0'>
            <div className='order-1 w-[75%] md:w-[20vw] shrink-0 flex flex-col items-start pr-2'>
              <h1 className='row-reveal title text-[1.45rem] md:text-[2rem] font-gilroy-bold leading-[1.12]'>
                {project.displayName}
              </h1>
              <div
                ref={btnRef}
                className={`opacity-0 pointer-events-none ${!isExpanded ? 'max-md:hidden' : ''}`}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  className='mt-[2vh] md:mt-[4.5vh] flex items-center gap-[0.5rem] bg-[#0B0B0B] hover:bg-white hover:text-black transition-all px-4 py-2 text-[0.75rem] md:text-[0.8rem] font-gilroy-medium text-white cursor-pointer rounded-[2px] tracking-wide'
                >
                  <span>VIEW CASE</span>
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className='order-3 md:order-2 w-full md:w-[26vw] shrink-0 flex gap-[4vw] md:gap-[2.5vw] font-gilroy-medium text-[0.7rem] md:text-[0.8rem] tracking-[0.14em] uppercase text-white pt-0.5 md:pt-1.5'>
              {project.tags.map((tag) => (
                <span key={tag} className='Word row-reveal inline-block'>{tag}</span>
              ))}
            </div>

            <div className='row-reveal order-2 md:order-3 w-auto md:w-[10vw] shrink-0 font-gilroy-medium text-[0.85rem] md:text-[0.95rem] text-[#808080] pt-0.5 md:pt-1 text-right md:text-left'>
              {isExpanded ? (
                <span>(&nbsp;-&nbsp;)</span>
              ) : (
                <span className='inline-flex items-center'>
                  (&nbsp;+
                  <span className='max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-[4rem] group-hover:opacity-100'>
                    &nbsp;view
                  </span>
                  &nbsp;)
                </span>
              )}
            </div>
          </div>

          {/* Right 40%: Holds Description text, min-h-[16vh] on desktop so row holds space for short images */}
          <div
            className={`w-full px-[5vw] md:px-0 md:w-[40vw] md:min-w-[40vw] md:max-w-[40vw] shrink-0 md:min-h-[16vh] overflow-hidden ${
              isExpanded ? 'max-md:mt-[2vh]' : 'max-md:h-0 max-md:min-h-0'
            }`}
          >
            <div ref={descRef} className='w-full flex justify-start opacity-0 pointer-events-none'>
              <p className='w-full text-[0.98rem] md:text-[1.15rem] leading-[1.42] md:leading-[1.38] font-gilroy-medium text-white md:pr-[4vw]'>
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* THE ONLY SET OF IMAGES: Moves from short version (top right) to expanded version (bottom strip) */}
        <div
          ref={stripRef}
          data-scroll-strip={isExpanded ? 'true' : undefined}
          onClick={(e) => {
            if (isExpanded) e.stopPropagation()
          }}
          className={
            isExpanded
              ? 'project-strip relative mt-[3vh] md:mt-[5vh] left-0 w-full h-[28vh] md:h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x overscroll-y-none pl-[5vw] pr-[5vw] md:pl-[4vw] md:pr-[4vw] flex gap-[2.5vw] md:gap-[1vw] items-center pointer-events-auto cursor-grab active:cursor-grabbing'
              : 'project-strip relative mt-[2vh] md:mt-0 pl-[5vw] pr-[5vw] md:pl-0 md:pr-0 md:absolute md:top-[3.5vh] md:left-[60vw] w-full md:w-[40vw] h-[11vh] md:h-[16vh] overflow-hidden flex gap-[2vw] md:gap-[1vw] items-start py-[0.5vh] md:py-[1vh] pointer-events-none'
          }
        >
          {project.images.map((img, idx) => (
            <img
              key={idx}
              className={`project-img shrink-0 object-cover block select-none ${
                isExpanded ? 'h-[26vh] md:h-[42vh]' : 'h-[10vh] md:h-[16vh]'
              }`}
              src={img}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Homee() {
  const [expandedId, setExpandedId] = useState(null)
  const [activeAnimateId, setActiveAnimateId] = useState(null)
  const [chicagoTime, setChicagoTime] = useState('[ 05 : 34 : 58 ]')
  const stripCursorRef = useRef(null)
  const stripCursorInnerRef = useRef(null)

  useEffect(() => {
    const cursorEl = stripCursorRef.current
    const innerEl = stripCursorInnerRef.current
    if (!cursorEl || !innerEl) return

    gsap.set(cursorEl, { xPercent: -15, yPercent: -15 })
    gsap.set(innerEl, { scale: 0.5, opacity: 0 })

    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.18, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.18, ease: 'power3.out' })

    let visible = false
    let hasPointer = false
    let lastX = 0
    let lastY = 0

    // Click-and-hold drag state for moving the whole slide deck with the mouse
    let activeStrip = null
    let startX = 0
    let startScrollLeft = 0
    let startDragX = 0

    const getBounds = (strip) => {
      const overflow = Math.max(0, strip.scrollWidth - strip.clientWidth)
      const minX = -Math.max(overflow, strip.clientWidth * 0.25)
      const maxX = 0
      return { minX, maxX, overflow }
    }

    const setCursorVisible = (next) => {
      if (visible === next) return
      visible = next
      gsap.to(innerEl, {
        opacity: next ? 1 : 0,
        scale: next ? 1 : 0.5,
        duration: 0.25,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const checkUnderPointer = () => {
      if (!hasPointer) return
      if (activeStrip) {
        setCursorVisible(true)
        return
      }
      const target = document.elementFromPoint(lastX, lastY)
      const inStrip = Boolean(target?.closest("[data-scroll-strip='true']"))
      setCursorVisible(inStrip)
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') {
        setCursorVisible(false)
        return
      }
      if (!hasPointer) {
        gsap.set(cursorEl, { x: e.clientX, y: e.clientY })
      }
      hasPointer = true
      lastX = e.clientX
      lastY = e.clientY
      xTo(e.clientX)
      yTo(e.clientY)

      if (activeStrip) {
        const dx = e.clientX - startX
        const { minX, maxX, overflow } = getBounds(activeStrip)
        if (overflow > 0) {
          activeStrip.scrollLeft = startScrollLeft - dx
        } else {
          const rawX = startDragX + dx
          let nextX = rawX
          if (rawX > maxX) nextX = maxX + (rawX - maxX) * 0.35
          else if (rawX < minX) nextX = minX + (rawX - minX) * 0.35
          activeStrip._dragX = nextX
          gsap.to(Array.from(activeStrip.children), {
            x: nextX,
            duration: 0.12,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }

      checkUnderPointer()
    }

    const onMouseDown = (e) => {
      if (e.button !== 0) return
      const strip = e.target.closest?.("[data-scroll-strip='true']")
      if (!strip) return
      e.preventDefault()
      activeStrip = strip
      startX = e.clientX
      startScrollLeft = strip.scrollLeft
      startDragX = typeof strip._dragX === 'number' ? strip._dragX : 0
      gsap.to(innerEl, { scale: 0.9, duration: 0.15, ease: 'power2.out', overwrite: 'auto' })
    }

    const onMouseUp = () => {
      if (!activeStrip) return
      const strip = activeStrip
      activeStrip = null

      const currentX = typeof strip._dragX === 'number' ? strip._dragX : 0
      const { minX, maxX, overflow } = getBounds(strip)
      if (overflow === 0 && currentX !== 0) {
        const clampedX = Math.max(minX, Math.min(maxX, currentX))
        strip._dragX = clampedX
        gsap.to(Array.from(strip.children), {
          x: clampedX,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      if (visible) {
        gsap.to(innerEl, { scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
      }
      checkUnderPointer()
    }

    const onDragStart = (e) => {
      e.preventDefault()
    }

    const onPointerLeave = () => {
      hasPointer = false
      activeStrip = null
      setCursorVisible(false)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('dragstart', onDragStart, { capture: true })
    window.addEventListener('scroll', checkUnderPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('dragstart', onDragStart, { capture: true })
      window.removeEventListener('scroll', checkUnderPointer)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      const parts = formatter.formatToParts(now)
      const hour = parts.find((p) => p.type === 'hour')?.value || '00'
      const minute = parts.find((p) => p.type === 'minute')?.value || '00'
      const second = parts.find((p) => p.type === 'second')?.value || '00'
      setChicagoTime(`[ ${hour} : ${minute} : ${second} ]`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const projects = [
    {
      id: 'facebook',
      name: 'Facebook',
      displayName: 'Facebook',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      indicator: '( + )',
      description:
        'Explores community engagement, interactive experiences, and storytelling interfaces built to connect global audiences across social platforms.',
      images: [f2, f3, f4, f1],
    },
    {
      id: 'apple-1',
      name: 'Apple',
      displayName: 'Apple',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      indicator: '( + view )',
      description:
        'Design research, user experience methodologies, and contextual testing for intelligent device ecosystems and next-generation interactive software.',
      images: [a3, a2, a1, a4],
    },
    {
      id: 'mozilla',
      name: 'Mozilla Data Collection',
      displayName: (
        <>
          Mozilla Data <br />
          Collection
        </>
      ),
      tags: ['EXPERIENCE', 'STORYTELLING'],
      indicator: '( + )',
      description:
        "Advises and leads community data governance, co-governance research, and platform strategy for Mozilla's MDC, shaping equitable frameworks for 300+ language communities through data trust models, governance design, UX research, and cross-functional collaboration",
      images: [m1, m2, m3],
    },
    {
      id: 'apple-2',
      name: 'Apple',
      displayName: 'Apple',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      indicator: '( + )',
      description:
        'Human-centered systems research, prototyping interfaces, and contextual evaluation shaping future product experiences.',
      images: [a3, a2, a1, a4],
    },
  ]

  const handleToggle = (id) => {
    const isCollapsing = expandedId === id
    setActiveAnimateId(id)

    // Capture state of ONLY the selected project div's images before DOM mutation
    const selectedDiv = document.getElementById(`project-row-${id}`)
    const targets = selectedDiv ? selectedDiv.querySelectorAll('.project-img') : []
    const state = targets && targets.length > 0 ? Flip.getState(targets) : null

    // Synchronously update React state so DOM switches immediately
    flushSync(() => {
      setExpandedId((prev) => (prev === id ? null : id))
    })

    // Animate ONLY the selected project's images (zero animation on other divs)
    if (state && targets.length > 0) {
      Flip.from(state, {
        duration: 0.75,
        ease: 'power3.inOut',
        scale: true,
        stagger: 0.02,
        onComplete: () => {
          if (isCollapsing && selectedDiv) {
            const strip = selectedDiv.querySelector('.project-strip')
            if (strip) {
              strip.scrollLeft = 0
              if (typeof strip.scrollTo === 'function') {
                strip.scrollTo({ left: 0, behavior: 'instant' })
              }
            }
          }
          window.dispatchEvent(new Event('resize'))
        },
      })
    }
  }

  return (
    <div data-page className='font-gilroy-medium'>
      {/* Custom horizontal scroll cursor badge portaled to document.body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={stripCursorRef}
            aria-hidden="true"
            className="theme-invert pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block will-change-transform"
          >
            <div
              ref={stripCursorInnerRef}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-black shadow-[0_4px_20px_rgba(255,255,255,0.16)] opacity-0 will-change-transform"
            >
              <div className="w-12 h-12 rounded-full border border-[#3d3d3d] flex items-center justify-center gap-1.5 text-white">
                <svg className="w-3 h-3 shrink-0" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 7L7 13M1 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="w-3 h-3 shrink-0" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1L17 7L11 13M17 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>,
          document.body
        )}

      <div className='s2 h-screen flex justify-center items-center text-[1.2rem] md:text-[1.5rem]'>
        Scroll Down
      </div>
      <div className='min-h-screen md:h-screen w-screen px-[5vw] md:px-[4vw] py-[5vh] md:py-[6vh] flex flex-col justify-between gap-[6vh] md:gap-0'>
        <div className='h-content '>
          <BlurReveal as='h1' className='text-[#878787] text-[1.15rem] md:text-[1.7rem] mb-[1.5vh] md:mb-[2vh]'>Human first. Always. </BlurReveal>
          <BlurReveal as='h1' className='text-[1.65rem] sm:text-[2rem] md:text-[2.6rem] font-gilroy-bold leading-[1.2] md:leading-[1.15]'>A studio that researches, designs and <br className='hidden md:inline' />
            builds software, AI systems and digital <br className='hidden md:inline' />
            infrastructure for enterprise and <br className='hidden md:inline' />
            public-interest clients.</BlurReveal>
        </div>
        <div className='flex flex-col md:flex-row gap-[4vh] md:gap-0'>
          <div className='flex flex-col items-start md:items-end w-full md:w-[17vw] md:min-w-[17vw]'>
            <BlurImage className='h-[36vh] w-[55vw] sm:w-[40vw] md:h-[42vh] md:w-[17vw] object-cover' src={jayImg} alt="" />
            <BlurReveal as='h1' className='mt-[1vh] text-[0.95rem] md:text-[1rem] '>Jay L. Cunningham</BlurReveal>
          </div>
          <div className='flex flex-col md:flex-row w-full md:w-[83vw] gap-[3vh] md:gap-[5vw] justify-end pt-0 md:pt-[10vh] pr-0 md:pr-[5vw] text-[1.05rem] md:text-[1.3rem] leading-[1.45] md:leading-normal'>
            <div className=''>
              <BlurReveal chunk as='p'>Solvari designs and builds technology <br className='hidden md:inline' /> for the real world: custom software, AI <br className='hidden md:inline' /> systems, platforms and digital <br className='hidden md:inline' /> infrastructure. </BlurReveal>
              <BlurReveal chunk as='p' className='mt-[2.5vh] md:mt-[6vh]'>We bring research, design, engineering <br className='hidden md:inline' /> and responsible AI together under one  <br className='hidden md:inline' />roof, so every system we ship is built <br className='hidden md:inline' /> around the people it serves. </BlurReveal>
            </div>
            <div className=''>
              <BlurReveal chunk as='p'>Every project starts with understanding: <br className='hidden md:inline' />the people, environments and constraints <br className='hidden md:inline' /> around the problem. That evidence shapes <br className='hidden md:inline' /> what we design and how we build it. </BlurReveal>
              <BlurReveal chunk as='p' className='mt-[2.5vh] md:mt-[6vh]'>Then we evaluate it in the real world, so <br className='hidden md:inline' />the work keeps getting better long after <br className='hidden md:inline' /> launch.</BlurReveal>
            </div>
          </div>
        </div>
      </div>
      <div className='s3 relative min-h-[16vh] md:h-[30vh] mt-[8vh] md:mt-[15vh] mb-[4vh] md:mb-[10vh] flex flex-col md:flex-row justify-end md:justify-center items-start md:items-end px-[5vw] md:px-[4vw] gap-[1.5vh] md:gap-0'>
        <BlurReveal as='h1' className='text-[2.2rem] sm:text-[3.2rem] md:text-[5.5rem] font-gilroy-medium leading-[1.12] md:leading-[1.15] text-left md:text-center w-full'>Designed for people, <br />
          context, and impact.</BlurReveal>
        <h1 className='md:absolute md:right-[4vw] md:bottom-0 text-[0.95rem] md:text-[1.1rem] text-[#808080] self-end md:self-auto'>( Work )</h1>
      </div>

      {/* Projects List with 60/40 split and GSAP animated expand/collapse */}
      <div className='w-full'>
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            shouldAnimate={activeAnimateId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
        <DrawLine className='border-t border-[#3d3d3d] mx-[5vw] md:mx-[4vw]' />
      </div>
      <div className='s4 relative min-h-[14vh] md:h-[30vh] mt-[8vh] md:mt-[10vh] mb-[3vh] md:mb-[10vh] flex flex-col md:flex-row justify-end md:justify-center items-start md:items-end px-[5vw] md:px-[4vw] gap-[1vh] md:gap-0'>
        <BlurReveal as='h1' className='text-[2.4rem] sm:text-[3.5rem] md:text-[5.5rem] font-gilroy-medium leading-[1.15] text-left md:text-center w-full'>What we do ?</BlurReveal>
        <h1 className='md:absolute md:right-[4vw] md:bottom-0 text-[0.95rem] md:text-[1.1rem] text-[#808080] self-end md:self-auto'>( Quite A Lot )</h1>
      </div>
      <div className='w-screen px-[5vw] md:px-[4vw] pt-[1vh] md:pt-[3vh] pb-[6vh] md:pb-[15vh] flex flex-col justify-between'>
        <div className='h-content '>
          <BlurReveal chunk as='h1' className='text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] leading-[1.3] md:leading-[1.15]'>We bring research, design, engineering, <br className='hidden md:inline' /> strategy, and responsible innovation together <br className='hidden md:inline' /> to solve complex technology challenges.  Every <br className='hidden md:inline' /> engagement is grounded in evidence, shaped <br className='hidden md:inline' /> by context, and built with the people who will <br className='hidden md:inline' />ultimately live with the system.</BlurReveal>
        </div>
      </div>
      {/* Section 1: Research & Design */}
      <div className='w-full px-[5vw] md:px-[4vw] flex flex-col md:flex-row items-start justify-between'>
        {/* Left Column: Huge "1." */}
        <div className='w-full md:w-[38vw] mt-0 md:mt-[-6vh] mb-[1vh] md:mb-0'>
          <h1 className='text-[6rem] sm:text-[10rem] md:text-[25rem] leading-[1] md:leading-normal font-gilroy-medium'>
            1.
          </h1>
        </div>

        {/* Right Column: Category Tag, Service Rows Table, and Learn More Button */}
        <div className='w-full md:w-[54vw] flex flex-col'>
          {/* Header Tag */}
          <div className='flex items-center gap-3 text-[0.8rem] md:text-[0.85rem] font-gilroy-medium tracking-[0.1em] text-white uppercase mb-[2vh] md:mb-[3.5vh]'>
            <span className='text-[0.95rem] font-gilroy-medium'>+</span>
            <span>[&nbsp;RESEARCH & DESIGN&nbsp;]</span>
          </div>

          {/* Service Items Table */}
          <div className='w-full border-t border-[#3d3d3d]'>
            {/* Row 1 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                Applied Research
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Human-centered evaluations <br className='hidden md:inline' /> and technology audits
              </BlurReveal>
            </div>

            {/* Row 2 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                Participatory Design
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Context-aware solutions built <br className='hidden md:inline' /> with stakeholders
              </BlurReveal>
            </div>

            {/* Row 3 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                System Design
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Architecture and engineering <br className='hidden md:inline' /> for real-world deployment
              </BlurReveal>
            </div>
          </div>

          {/* Learn More CTA Button */}
          <div className='mt-[3vh] md:mt-[4.5vh] mb-[4vh] md:mb-0 flex justify-start'>
            <button
              className='flex items-center gap-[0.55rem] bg-[#0B0B0B] hover:bg-white hover:text-black transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-white cursor-pointer rounded-[2px] tracking-wide'
            >
              <span>LEARN MORE</span>
              <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* About it & Examples Section */}
      <div className='w-full  pb-[3vh]'>
        <div className='px-[5vw] md:px-[4vw]'>
          <div className='flex items-center gap-2.5 text-[0.88rem] md:text-[0.95rem] font-gilroy-medium text-white mb-[1.8vh] md:mb-[2.5vh]'>
            <span>+</span>
            <span>(&nbsp;About it & Examples&nbsp;)</span>
          </div>
          <BlurReveal chunk as='h2' className='text-[1.3rem] sm:text-[1.6rem] md:text-[2.2rem] font-gilroy-medium leading-[1.3] md:leading-[1.22] text-white'>
            We don't design from assumptions. We <br className='hidden md:inline' />
            combine research, participation, and <br className='hidden md:inline' />
            systems thinking to create experiences <br className='hidden md:inline' />
            that are grounded in real people, real <br className='hidden md:inline' />
            needs, and real-world impact.
          </BlurReveal>
        </div>

        {/* Horizontal image gallery matching expanded stage (left padding pl-[4vw], right bleed) */}
        <div
          data-scroll-strip="true"
          className='relative mt-[3.5vh] md:mt-[6vh] w-full h-[28vh] sm:h-[34vh] md:h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[5vw] pr-[5vw] md:pl-[4vw] md:pr-0 flex gap-[3vw] md:gap-[1.2vw] items-center cursor-grab active:cursor-grabbing'
        >
          <video
            src={rd1Video}
            autoPlay
            loop
            muted
            playsInline
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={rd2}
            alt="Participatory design blueprint collaboration"
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={rd3}
            alt="System design evaluation and notes"
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
        </div>
      </div>

      {/* Continuous Marquee Ticker */}
      <div className='accent-banner w-full overflow-hidden bg-[#b6ff00] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-a-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Research & Design&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-b-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Research & Design&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: TECHNOLOGY & AI                                */}
      {/* ========================================================= */}
      <div className='w-full px-[5vw] md:px-[4vw] mt-[8vh] md:mt-[12vh] flex flex-col md:flex-row items-start justify-between'>
        {/* Left Column: Huge "2." */}
        <div className='w-full md:w-[38vw] mt-0 md:mt-[-6vh] mb-[1vh] md:mb-0'>
          <h1 className='text-[6rem] sm:text-[10rem] md:text-[25rem] leading-[1] md:leading-normal font-gilroy-medium'>
            2.
          </h1>
        </div>

        {/* Right Column: Category Tag, Service Rows Table, and Learn More Button */}
        <div className='w-full md:w-[54vw] flex flex-col'>
          {/* Header Tag */}
          <div className='flex items-center gap-3 text-[0.8rem] md:text-[0.85rem] font-gilroy-medium tracking-[0.1em] text-white uppercase mb-[2vh] md:mb-[3.5vh]'>
            <span className='text-[0.95rem] font-gilroy-medium'>+</span>
            <span>[&nbsp;TECHNOLOGY & AI&nbsp;]</span>
          </div>

          {/* Service Items Table */}
          <div className='w-full border-t border-[#3d3d3d]'>
            {/* Row 1 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                Software Development
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Custom platforms, tools, and <br className='hidden md:inline' /> digital infrastructure
              </BlurReveal>
            </div>

            {/* Row 2 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                AI Systems
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Responsible AI design, <br className='hidden md:inline' /> development, and assessment
              </BlurReveal>
            </div>

            {/* Row 3 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                Technology Consulting
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Expert guidance on systems, <br className='hidden md:inline' /> process, and implementation
              </BlurReveal>
            </div>
          </div>

          {/* Learn More CTA Button */}
          <div className='mt-[3vh] md:mt-[4.5vh] mb-[4vh] md:mb-0 flex justify-start'>
            <button
              className='flex items-center gap-[0.55rem] bg-[#0B0B0B] hover:bg-white hover:text-black transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-white cursor-pointer rounded-[2px] tracking-wide'
            >
              <span>LEARN MORE</span>
              <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: About it & Examples */}
      <div className='w-full pb-[3vh]'>
        <div className='px-[5vw] md:px-[4vw]'>
          <div className='flex items-center gap-2.5 text-[0.88rem] md:text-[0.95rem] font-gilroy-medium text-white mb-[1.8vh] md:mb-[2.5vh]'>
            <span>+</span>
            <span>(&nbsp;About it & Examples&nbsp;)</span>
          </div>
          <BlurReveal chunk as='h2' className='text-[1.3rem] sm:text-[1.6rem] md:text-[2.2rem] font-gilroy-medium leading-[1.3] md:leading-[1.22] text-white'>
            We don't build technology for technology's <br className='hidden md:inline' />
            sake. We develop thoughtful software and <br className='hidden md:inline' />
            AI systems that solve complex problems, <br className='hidden md:inline' />
            work for people, and are built to perform in <br className='hidden md:inline' />
            the real world.
          </BlurReveal>
        </div>

        {/* Horizontal image gallery matching expanded stage */}
        <div
          data-scroll-strip="true"
          className='relative mt-[3.5vh] md:mt-[6vh] w-full h-[28vh] sm:h-[34vh] md:h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[5vw] pr-[5vw] md:pl-[4vw] md:pr-0 flex gap-[3vw] md:gap-[1.2vw] items-center cursor-grab active:cursor-grabbing'
        >
          <video
            src={ta1Video}
            autoPlay
            loop
            muted
            playsInline
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={ta2}
            alt="Software and engineering workspace with workstation"
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={ta3}
            alt="Dr. Jay technology and AI systems presentation"
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
        </div>
      </div>

      {/* Section 2 Pink Marquee Ticker */}
      <div className='accent-banner w-full overflow-hidden bg-[#eb519c] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-ta-a-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Technology & AI&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-ta-b-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Technology & AI&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 3: STRATEGY & INNOVATION                          */}
      {/* ========================================================= */}
      <div className='w-full px-[5vw] md:px-[4vw] mt-[8vh] md:mt-[12vh] flex flex-col md:flex-row items-start justify-between'>
        {/* Left Column: Huge "3." */}
        <div className='w-full md:w-[38vw] mt-0 md:mt-[-6vh] mb-[1vh] md:mb-0'>
          <h1 className='text-[6rem] sm:text-[10rem] md:text-[25rem] leading-[1] md:leading-normal font-gilroy-medium'>
            3.
          </h1>
        </div>

        {/* Right Column: Category Tag, Service Rows Table, and Learn More Button */}
        <div className='w-full md:w-[54vw] flex flex-col'>
          {/* Header Tag */}
          <div className='flex items-center gap-3 text-[0.8rem] md:text-[0.85rem] font-gilroy-medium tracking-[0.1em] text-white uppercase mb-[2vh] md:mb-[3.5vh]'>
            <span className='text-[0.95rem] font-gilroy-medium'>+</span>
            <span>[&nbsp;STRATEGY & INNOVATION&nbsp;]</span>
          </div>

          {/* Service Items Table */}
          <div className='w-full border-t border-[#3d3d3d]'>
            {/* Row 1 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                Strategic Advisory
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Technology foresight, evaluation, <br className='hidden md:inline' /> and governance
              </BlurReveal>
            </div>

            {/* Row 2 */}
            <div className='w-full py-[2.2vh] md:py-[3.2vh] border-b border-[#3d3d3d] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 group'>
              <h2 className='w-full sm:w-[52%] text-[1.4rem] md:text-[2.1rem] font-gilroy-light text-[#616161] transition-colors duration-200'>
                Responsible Innovation
              </h2>
              <BlurReveal chunk as='p' className='w-full sm:w-[48%] text-[0.95rem] md:text-[1.05rem] font-gilroy-medium text-white leading-[1.35] md:leading-[1.3]'>
                Stewardship frameworks and risk <br className='hidden md:inline' /> mitigation
              </BlurReveal>
            </div>
          </div>

          {/* Learn More CTA Button */}
          <div className='mt-[3vh] md:mt-[4.5vh] mb-[4vh] md:mb-0 flex justify-start'>
            <button
              className='flex items-center gap-[0.55rem] bg-[#0B0B0B] hover:bg-white hover:text-black transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-white cursor-pointer rounded-[2px] tracking-wide'
            >
              <span>LEARN MORE</span>
              <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: About it & Examples */}
      <div className='w-full pb-[3vh]'>
        <div className='px-[5vw] md:px-[4vw]'>
          <div className='flex items-center gap-2.5 text-[0.88rem] md:text-[0.95rem] font-gilroy-medium text-white mb-[1.8vh] md:mb-[2.5vh]'>
            <span>+</span>
            <span>(&nbsp;About it & Examples&nbsp;)</span>
          </div>
          <BlurReveal chunk as='h2' className='text-[1.3rem] sm:text-[1.6rem] md:text-[2.2rem] font-gilroy-medium leading-[1.3] md:leading-[1.22] text-white'>
            We don't chase trends. We help <br className='hidden md:inline' />
            organizations make smarter technology <br className='hidden md:inline' />
            decisions, anticipate what's next, and turn <br className='hidden md:inline' />
            responsible innovation into meaningful <br className='hidden md:inline' />
            outcomes.
          </BlurReveal>
        </div>

        {/* Horizontal image gallery matching expanded stage */}
        <div
          data-scroll-strip="true"
          className='relative mt-[3.5vh] md:mt-[6vh] w-full h-[28vh] sm:h-[34vh] md:h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[5vw] pr-[5vw] md:pl-[4vw] md:pr-0 flex gap-[3vw] md:gap-[1.2vw] items-center cursor-grab active:cursor-grabbing'
        >
          <img
            src={si1}
            alt="Strategy research and notes"
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <video
            src={si2Video}
            autoPlay
            loop
            muted
            playsInline
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={si3}
            alt="Foresight and human vision close-up"
            className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
        </div>
      </div>

      {/* Section 3 Lime Marquee Ticker */}
      <div className='accent-banner w-full overflow-hidden bg-[#03fdf0] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-si-a-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Strategy & Innovation&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-si-b-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Strategy & Innovation&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION: WHAT DRIVES US ?                                 */}
      {/* ========================================================= */}
      <div className='min-h-0 md:min-h-screen w-screen px-[5vw] md:px-[4vw] py-[5vh] md:py-[6vh] flex flex-col justify-between mt-[8vh] md:mt-[15vh]'>
        {/* Section Heading */}
        <BlurReveal as='h1' className='text-[2.4rem] sm:text-[3.5rem] md:text-[5.5rem] font-gilroy-medium leading-[1.05] text-white'>
          What Drives Us ?
        </BlurReveal>

        {/* Content Row: Left text column & Right image column taking up the full screen height */}
        <div className='w-full md:w-[90vw] flex-1 flex flex-col md:flex-row items-stretch justify-between mt-[4vh] md:mt-[20vh] gap-[4vh] md:gap-0'>
          {/* Left Column: Top intro copy & Bottom culture statement with CTA */}
          <div className='w-full md:w-[40vw] flex flex-col justify-between py-[1vh] gap-[3.5vh] md:gap-0'>
            {/* Top Introductory Body Copy */}
            <BlurReveal chunk as='p' className='text-[#878787] text-[1.25rem] sm:text-[1.6rem] md:text-[2.2rem] font-gilroy-medium leading-[1.4] max-w-full md:max-w-[45vw]'>
              We start with questions, not solutions. <br className='hidden md:inline' />
              We look closer, challenge assumptions, <br className='hidden md:inline' />
              and dig into the context before we <br className='hidden md:inline' />
              build. Research gives us the insight; <br className='hidden md:inline' />
              design gives it direction; technology <br className='hidden md:inline' />
              gives it life.
            </BlurReveal>

            {/* Bottom Statement & CTA Button */}
            <div className='pb-[1vh] md:pb-[4vh]'>
              <BlurReveal chunk as='h2' className='text-[1.35rem] sm:text-[1.7rem] md:text-[2.2rem] font-gilroy-medium leading-[1.25] md:leading-[1.2] text-white max-w-full md:max-w-[32vw] mb-[2.5vh] md:mb-[3.5vh]'>
                The result is better <br className='hidden md:inline' />
                decisions, better systems, <br className='hidden md:inline' />
                and technology built with <br className='hidden md:inline' />
                intention.
              </BlurReveal>
              <button
                className='flex items-center gap-[0.55rem] bg-[#0B0B0B] hover:bg-white hover:text-black transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-white cursor-pointer rounded-[2px] tracking-wide'
              >
                <span>OUR CULTURE</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Tall portrait video of Jay taking up the full height */}
          <div className='w-full md:w-[35vw] h-[52vh] sm:h-[65vh] md:h-[90vh] flex justify-end items-stretch'>
            <video
              src={whatJayVideo}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover block select-none'
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION: BASED IN CHICAGO & FOOTER                        */}
      {/* ========================================================= */}
      <div className='w-full mt-[8vh] md:mt-[15vh]'>
        {/* City Heading & Geocoordinates Row */}
        <div className='px-[5vw] md:px-[4vw]'>
          <BlurReveal as='h1' className='text-[2.4rem] sm:text-[3.5rem] md:text-[5.5rem] font-gilroy-medium leading-[1.08] text-white'>
            Based in the heart <br />
            of Chicago
          </BlurReveal>

          {/* Coordinates positioned directly above the right of the skyline image */}
          <div className='w-full flex justify-start md:justify-end mt-[2.5vh] md:mt-[6vh] mb-[1.5vh] md:mb-[2vh]'>
            <p className='text-[0.88rem] sm:text-[1.1rem] md:text-[1.3rem] font-gilroy-medium text-white tracking-wide'>
              41.8818° N latitude and -87.6232° W longitude
            </p>
          </div>
        </div>

        {/* Chicago Skyline Hero Image */}
        <div className='w-full px-[5vw] md:px-[4vw]'>
          <img
            src={footerImg}
            alt="Chicago skyline along the water"
            className='w-full h-[35vh] sm:h-[50vh] md:h-[75vh] object-cover block select-none'
          />
        </div>

        {/* Call to Action: Let's talk about what comes next. */}
        <div className='w-full px-[5vw] md:px-[4vw] mt-[6vh] md:mt-[14vh] mb-[6vh] md:mb-[10vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vh] sm:gap-0'>
          <h2 className='text-[1.9rem] sm:text-[2.5rem] md:text-[3.4rem] font-gilroy-bold leading-[1.15] text-white'>
            Let's talk about what <br />
            comes next.
          </h2>

          <a
            href="mailto:hello@solvari.com"
            className='flex items-center gap-[0.65rem] bg-white text-black hover:bg-[#0B0B0B] hover:text-white transition-all px-6 py-3.5 text-[0.9rem] md:text-[0.95rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-wide'
          >
            <span>Email us</span>
            <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Bottom Horizontal Divider */}
        <div className='border-t border-[#3d3d3d] mx-[5vw] md:mx-[4vw]'></div>

        {/* Bottom Metadata & Socials Bar */}
        <div className='w-full px-[5vw] md:px-[4vw] py-[2.5vh] md:py-[2.8vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-[0.75rem] md:text-[0.82rem] font-gilroy-medium uppercase tracking-[0.1em] text-white'>
          <div className='flex items-center justify-between sm:justify-start w-full sm:w-auto gap-[4.5vw]'>
            <span>CHICAGO BASED</span>
            <span className='tabular-nums'>{chicagoTime}</span>
          </div>
          <div className='flex items-center gap-[6vw] sm:gap-[3vw]'>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='hover:opacity-60 transition-opacity'>
              Instagram +
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='hover:opacity-60 transition-opacity'>
              LinkedIn +
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homee