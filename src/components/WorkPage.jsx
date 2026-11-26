import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { flushSync, createPortal } from 'react-dom'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
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
import BlurReveal from './BlurReveal'

gsap.registerPlugin(Flip)

function WorkProjectRow({ project, isExpanded, shouldAnimate, onToggle }) {
  const descRef = useRef(null)
  const btnRef = useRef(null)
  const stripRef = useRef(null)
  const isFirstRender = useRef(true)

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
      <div className='border-t border-[var(--c-3d3d3d)] mx-[5vw] md:mx-[4vw]'></div>
      <div
        id={`work-row-${project.id}`}
        onClick={onToggle}
        className='project-row relative w-full py-[2.5vh] md:py-[3.5vh] cursor-pointer select-none transition-colors duration-1000 hover:bg-[var(--row-hover)] group'
      >
        <div className='w-full flex flex-col md:flex-row items-start'>
          <div className='w-full px-[5vw] md:px-0 md:w-[60vw] md:min-w-[60vw] md:max-w-[60vw] shrink-0 md:pl-[4vw] flex flex-wrap md:flex-nowrap items-start justify-between md:justify-start gap-y-2 md:gap-y-0'>
            <div className='order-1 w-[75%] md:w-[20vw] shrink-0 flex flex-col items-start pr-2'>
              <span className='text-[0.72rem] text-[var(--c-808080)] tracking-[0.12em] uppercase mb-1'>
                {project.year}
              </span>
              <h2 className='title text-[1.45rem] md:text-[2rem] font-gilroy-bold leading-[1.12]'>
                {project.displayName}
              </h2>
              <div
                ref={btnRef}
                className={`opacity-0 pointer-events-none ${!isExpanded ? 'max-md:hidden' : ''}`}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  className='mt-[2vh] md:mt-[4.5vh] flex items-center gap-[0.5rem] bg-[var(--c-0b0b0b)] hover:bg-[var(--c-ffffff)] hover:text-[var(--c-000000)] transition-all px-4 py-2 text-[0.75rem] md:text-[0.8rem] font-gilroy-medium text-[var(--c-ffffff)] cursor-pointer rounded-[2px] tracking-wide'
                >
                  <span>VIEW CASE</span>
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className='order-3 md:order-2 w-full md:w-[26vw] shrink-0 flex flex-wrap gap-x-[4vw] md:gap-x-[2.5vw] gap-y-1 font-gilroy-medium text-[0.7rem] md:text-[0.8rem] tracking-[0.14em] uppercase text-[var(--c-ffffff)] pt-0.5 md:pt-1.5'>
              {project.tags.map((tag) => (
                <span key={tag} className='Word'>{tag}</span>
              ))}
            </div>

            <div className='order-2 md:order-3 w-auto md:w-[10vw] shrink-0 font-gilroy-medium text-[0.85rem] md:text-[0.95rem] text-[var(--c-808080)] pt-0.5 md:pt-1 text-right md:text-left'>
              {isExpanded ? (
                <span>(&nbsp;-&nbsp;)</span>
              ) : (
                <span className='inline-flex items-center'>
                  (&nbsp;+
                  <span className='max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[4rem] group-hover:opacity-100'>
                    &nbsp;view
                  </span>
                  &nbsp;)
                </span>
              )}
            </div>
          </div>

          <div
            className={`w-full px-[5vw] md:px-0 md:w-[40vw] md:min-w-[40vw] md:max-w-[40vw] shrink-0 md:min-h-[16vh] overflow-hidden ${
              isExpanded ? 'max-md:mt-[2vh]' : 'max-md:h-0 max-md:min-h-0'
            }`}
          >
            <div ref={descRef} className='w-full flex flex-col gap-3 justify-start opacity-0 pointer-events-none'>
              <p className='w-full text-[0.98rem] md:text-[1.15rem] leading-[1.42] md:leading-[1.38] font-gilroy-medium text-[var(--c-ffffff)] md:pr-[4vw]'>
                {project.description}
              </p>
              {project.deliverables && (
                <div className='flex flex-wrap gap-2 pt-1 md:pr-[4vw]'>
                  {project.deliverables.map((item) => (
                    <span
                      key={item}
                      className='text-[0.72rem] tracking-[0.08em] uppercase bg-[var(--c-0b0b0b)] text-[var(--c-bbbbbb)] px-2.5 py-1 rounded-[2px]'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

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
              draggable={false}
              className={`project-img shrink-0 object-cover block select-none pointer-events-none ${
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

function WorkPage({ onNavigate }) {
  const [expandedId, setExpandedId] = useState('facebook')
  const [activeAnimateId, setActiveAnimateId] = useState(null)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [chicagoTime, setChicagoTime] = useState('[ 05 : 34 : 58 ]')
  const stripCursorRef = useRef(null)
  const stripCursorInnerRef = useRef(null)

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
        duration: 1,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    // Pill label: 'click' over a closed project row, 'drag' over an open image strip
    const ringEl = innerEl.querySelector('.cursor-ring')
    const labelEl = innerEl.querySelector('.cursor-label')
    let mode = null
    const setMode = (next) => {
      if (!next || next === mode || !ringEl || !labelEl) return
      const from = ringEl.offsetWidth
      mode = next
      innerEl.dataset.mode = next
      labelEl.textContent = next === 'drag' ? 'Drag' : 'Click'
      ringEl.style.width = 'auto'
      const to = ringEl.offsetWidth
      gsap.fromTo(ringEl, { width: from }, {
        width: to, duration: 1, ease: 'power3.out', overwrite: 'auto',
        onComplete: () => { ringEl.style.width = 'auto' },
      })
    }

    const checkUnderPointer = () => {
      if (!hasPointer) return
      if (activeStrip) {
        setMode('drag')
        setCursorVisible(true)
        return
      }
      const target = document.elementFromPoint(lastX, lastY)
      // only over an image of an open (expanded) strip.
      // Strip images have pointer-events: none (index.css), so hit-test their boxes directly.
      const strip = target?.closest("[data-scroll-strip='true']")
      const overImg = strip && Array.from(strip.querySelectorAll('.project-img')).some((im) => {
        const r = im.getBoundingClientRect()
        return lastX >= r.left && lastX <= r.right && lastY >= r.top && lastY <= r.bottom
      })
      if (overImg) {
        setMode('drag')
        setCursorVisible(true)
        return
      }
      setCursorVisible(false)
    }

    // re-check after a row opens/closes (layout animates)
    const onClick = () => {
      setTimeout(checkUnderPointer, 50)
      setTimeout(checkUnderPointer, 700)
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

    const onDragStart = (e) => e.preventDefault()
    const onPointerLeave = () => {
      hasPointer = false
      activeStrip = null
      setCursorVisible(false)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('click', onClick)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('dragstart', onDragStart, { capture: true })
    window.addEventListener('scroll', checkUnderPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('click', onClick)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('dragstart', onDragStart, { capture: true })
      window.removeEventListener('scroll', checkUnderPointer)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  const projects = [
    {
      id: 'facebook',
      year: '2025 — SOCIAL & COMMUNITY',
      category: 'RESEARCH & DESIGN',
      name: 'Facebook',
      displayName: 'Facebook',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      deliverables: ['Applied Research', 'Interactive Prototyping', 'Global UX Strategy'],
      description:
        'Explores community engagement, interactive experiences, and storytelling interfaces built to connect global audiences across social platforms.',
      images: [f2, f3, f4, f1],
    },
    {
      id: 'apple-1',
      year: '2025 — INTELLIGENT ECOSYSTEMS',
      category: 'TECHNOLOGY & AI',
      name: 'Apple',
      displayName: 'Apple',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      deliverables: ['Contextual Testing', 'AI System Evaluation', 'Ecosystem UX'],
      description:
        'Design research, user experience methodologies, and contextual testing for intelligent device ecosystems and next-generation interactive software.',
      images: [a3, a2, a1, a4],
    },
    {
      id: 'mozilla',
      year: '2024 — DATA GOVERNANCE',
      category: 'STRATEGY & INNOVATION',
      name: 'Mozilla Data Collection',
      displayName: (
        <>
          Mozilla Data <br />
          Collection
        </>
      ),
      tags: ['EXPERIENCE', 'STORYTELLING'],
      deliverables: ['Data Trust Models', 'Co-Governance Design', '300+ Language Communities'],
      description:
        "Advises and leads community data governance, co-governance research, and platform strategy for Mozilla's MDC, shaping equitable frameworks for 300+ language communities through data trust models, governance design, UX research, and cross-functional collaboration.",
      images: [m1, m2, m3],
    },
    {
      id: 'apple-2',
      year: '2024 — HUMAN-CENTERED SYSTEMS',
      category: 'RESEARCH & DESIGN',
      name: 'Apple',
      displayName: 'Apple',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      deliverables: ['Systems Research', 'Interface Prototyping', 'Field Evaluation'],
      description:
        'Human-centered systems research, prototyping interfaces, and contextual evaluation shaping future product experiences.',
      images: [a3, a2, a1, a4],
    },
  ]

  const filters = ['ALL', 'RESEARCH & DESIGN', 'TECHNOLOGY & AI', 'STRATEGY & INNOVATION']
  const visibleProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const handleToggle = (id) => {
    const isCollapsing = expandedId === id
    setActiveAnimateId(id)

    const selectedDiv = document.getElementById(`work-row-${id}`)
    if (selectedDiv) {
      const strip = selectedDiv.querySelector('.project-strip')
      if (strip) {
        strip._dragX = 0
        gsap.set(Array.from(strip.children), { x: 0 })
      }
    }
    const targets = selectedDiv ? selectedDiv.querySelectorAll('.project-img') : []
    const state = targets && targets.length > 0 ? Flip.getState(targets) : null

    flushSync(() => {
      setExpandedId((prev) => (prev === id ? null : id))
    })

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
    <div data-page className='font-gilroy-medium text-[var(--c-ffffff)] min-h-screen'>
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={stripCursorRef}
            aria-hidden="true"
            className="theme-invert pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block will-change-transform"
          >
            <div
              ref={stripCursorInnerRef}
              data-mode="drag"
              className="flex items-center justify-center h-14 min-w-14 px-1 rounded-full bg-[rgb(255,255,255)] shadow-[0_4px_20px_rgb(0_0_0/0.16)] opacity-0 will-change-transform"
            >
              <div className="cursor-ring h-12 min-w-12 px-3.5 rounded-full border border-[rgb(217,217,217)] flex items-center justify-center gap-1.5 text-[rgb(0,0,0)] overflow-hidden whitespace-nowrap">
                <svg className="cursor-arrow w-3 h-3 shrink-0" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 7L7 13M1 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="cursor-label font-gilroy-medium text-[0.75rem] uppercase tracking-[0.12em]">Drag</span>
                <svg className="cursor-arrow w-3 h-3 shrink-0" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1L17 7L11 13M17 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Hero Header */}
      <div className='w-full px-[5vw] md:px-[4vw] pt-[16vh] md:pt-[20vh] pb-[6vh] md:pb-[10vh] flex flex-col justify-between'>
        <div className='flex items-center justify-between mb-[3vh]'>
          <span className='text-[var(--c-878787)] text-[1rem] md:text-[1.2rem] uppercase tracking-[0.12em]'>
            [&nbsp;SELECTED WORK&nbsp;]
          </span>
          <span className='text-[0.95rem] md:text-[1.1rem] text-[var(--c-808080)]'>( 2022 — 2026 )</span>
        </div>

        <BlurReveal as='h1' className='text-[2.6rem] sm:text-[3.8rem] md:text-[5.5rem] font-gilroy-medium leading-[1.08] text-[var(--c-ffffff)] max-w-[85vw]'>
          Designed for people, <br className='hidden md:inline' />
          context, and impact.
        </BlurReveal>

        <div className='mt-[5vh] md:mt-[8vh] flex flex-col md:flex-row md:items-end justify-between gap-[4vh]'>
          <p className='text-[var(--c-878787)] text-[1.15rem] md:text-[1.5rem] leading-[1.38] max-w-[46rem]'>
            Every engagement starts with rigorous evidence. We partner with enterprise and public-interest teams to research, design, and ship systems that work in the real world.
          </p>

          {/* Filter Pills */}
          <div className='flex flex-wrap gap-2'>
            {filters.map((filter) => {
              const active = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-2 text-[0.75rem] md:text-[0.8rem] tracking-[0.1em] uppercase rounded-[2px] cursor-pointer transition-colors ${
                    active
                      ? 'bg-[var(--c-ffffff)] text-[var(--c-000000)]'
                      : 'bg-[var(--c-0b0b0b)] text-[var(--c-ffffff)] hover:bg-[var(--c-ffffff)] hover:text-[var(--c-000000)]'
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Interactive Case Studies List */}
      <div className='w-full mb-[10vh] md:mb-[16vh]'>
        {visibleProjects.map((project) => (
          <WorkProjectRow
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            shouldAnimate={activeAnimateId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
        <div className='border-t border-[var(--c-3d3d3d)] mx-[5vw] md:mx-[4vw]'></div>
      </div>

      {/* Practice Showcase Strip */}
      <div className='w-full pb-[10vh] md:pb-[14vh]'>
        <div className='px-[5vw] md:px-[4vw] mb-[4vh]'>
          <div className='flex items-center gap-2.5 text-[0.88rem] md:text-[0.95rem] font-gilroy-medium text-[var(--c-ffffff)] mb-[1.8vh]'>
            <span>+</span>
            <span>(&nbsp;In the Field & Studio&nbsp;)</span>
          </div>
          <h2 className='text-[1.6rem] sm:text-[2rem] md:text-[2.8rem] font-gilroy-medium leading-[1.2] text-[var(--c-ffffff)] max-w-[52rem]'>
            From participatory workshops and governance frameworks to production AI systems.
          </h2>
        </div>

        <div
          data-scroll-strip="true"
          className='relative mt-[3.5vh] md:mt-[5vh] w-full h-[28vh] sm:h-[34vh] md:h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[5vw] pr-[5vw] md:pl-[4vw] md:pr-[4vw] flex gap-[3vw] md:gap-[1.2vw] items-center select-none cursor-grab active:cursor-grabbing'
        >
          <video src={rd1Video} autoPlay loop muted playsInline className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <img src={rd2} alt="Participatory design blueprint" className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <video src={ta1Video} autoPlay loop muted playsInline className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <img src={si1} alt="Strategic advisory notes" className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <video src={si2Video} autoPlay loop muted playsInline className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <img src={ta2} alt="Engineering workstation" className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <img src={rd3} alt="System evaluation" className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <img src={ta3} alt="AI systems presentation" className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
          <img src={si3} alt="Foresight and vision" className='h-[26vh] sm:h-[32vh] md:h-[42vh] w-auto shrink-0 object-cover block select-none' />
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className='accent-banner w-full overflow-hidden bg-[#b6ff00] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`work-ticker-a-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-[rgb(0,0,0)] tracking-[0.03em] mx-3'>
                RESEARCH, DESIGN & RESPONSIBLE AI&nbsp;&nbsp;—&nbsp;&nbsp;START A PROJECT&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`work-ticker-b-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-[rgb(0,0,0)] tracking-[0.03em] mx-3'>
                RESEARCH, DESIGN & RESPONSIBLE AI&nbsp;&nbsp;—&nbsp;&nbsp;START A PROJECT&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className='w-full mt-[8vh] md:mt-[12vh]'>
        <div className='w-full px-[5vw] md:px-[4vw] mb-[6vh] md:mb-[10vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vh] sm:gap-0'>
          <h2 className='text-[1.9rem] sm:text-[2.5rem] md:text-[3.4rem] font-gilroy-bold leading-[1.15] text-[var(--c-ffffff)]'>
            Let's talk about what <br />
            comes next.
          </h2>

          <button
            type="button"
            onClick={() => onNavigate?.('/contact')}
            className='flex items-center gap-[0.65rem] bg-[var(--c-ffffff)] text-[var(--c-000000)] hover:bg-[var(--c-0b0b0b)] hover:text-[var(--c-ffffff)] transition-all px-6 py-3.5 text-[0.9rem] md:text-[0.95rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-wide'
          >
            <span>Start a conversation</span>
            <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className='border-t border-[var(--c-3d3d3d)] mx-[5vw] md:mx-[4vw]'></div>

        <div className='w-full px-[5vw] md:px-[4vw] py-[2.5vh] md:py-[2.8vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-[0.75rem] md:text-[0.82rem] font-gilroy-medium uppercase tracking-[0.1em] text-[var(--c-ffffff)]'>
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

export default WorkPage

