import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { flushSync } from 'react-dom'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
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

gsap.registerPlugin(Flip)

function ProjectRow({ project, isExpanded, shouldAnimate, onToggle }) {
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
      <div className='border-t border-[#D9D9D9] mx-[4vw]'></div>
      <div
        id={`project-row-${project.id}`}
        onClick={onToggle}
        className='project-row relative w-full py-[3.5vh] cursor-pointer select-none transition-colors duration-200 hover:bg-[#fbfbfb]/80 group'
      >
        {/* Top Row: Exactly 60vw left, 40vw right */}
        <div className='w-full flex items-start'>
          {/* Left 60%: Title, Tags, Indicator - fixed columns so position never shifts */}
          <div className='w-[60vw] min-w-[60vw] max-w-[60vw] shrink-0 pl-[4vw] flex items-start'>
            <div className='w-[20vw] shrink-0 flex flex-col items-start pr-2'>
              <h1 className='title text-[2rem] font-gilroy-bold leading-[1.12]'>
                {project.displayName}
              </h1>
              <div ref={btnRef} className='opacity-0 pointer-events-none'>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className='mt-[4.5vh] flex items-center gap-[0.5rem] bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-black cursor-pointer rounded-[2px] tracking-wide'
                >
                  <span>VIEW CASE</span>
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className='w-[26vw] shrink-0 flex gap-[2.5vw] font-gilroy-medium text-[0.8rem] tracking-[0.14em] uppercase text-black pt-1.5'>
              {project.tags.map((tag) => (
                <span key={tag} className='Word'>{tag}</span>
              ))}
            </div>

            <div className='w-[10vw] shrink-0 font-gilroy-medium text-[0.95rem] text-[#7F7F7F] pt-1'>
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

          {/* Right 40%: Holds Description text, min-h-[16vh] so row holds space for short images */}
          <div className='w-[40vw] min-w-[40vw] max-w-[40vw] shrink-0 min-h-[16vh] overflow-hidden'>
            <div ref={descRef} className='w-full flex justify-start opacity-0 pointer-events-none'>
              <p className='w-full text-[1.15rem] leading-[1.38] font-gilroy-medium text-black pr-[4vw]'>
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* THE ONLY SET OF IMAGES: Moves from short version (top right) to expanded version (bottom strip) */}
        <div
          ref={stripRef}
          onClick={(e) => {
            if (isExpanded) e.stopPropagation()
          }}
          className={
            isExpanded
              ? 'project-strip relative mt-[5vh] left-0 w-full h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x overscroll-y-none pl-[4vw] pr-[4vw] flex gap-[1vw] items-center pointer-events-auto'
              : 'project-strip absolute top-[3.5vh] left-[60vw] w-[40vw] h-[16vh] overflow-hidden flex gap-[1vw] items-start py-[1vh] pointer-events-none'
          }
        >
          {project.images.map((img, idx) => (
            <img
              key={idx}
              className={`project-img shrink-0 object-cover block select-none ${isExpanded ? 'h-[42vh]' : 'h-[16vh]'
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
    <div className='font-gilroy-medium'>
      <div className='s2 h-screen flex justify-center items-center text-[1.5rem]'>
        Scroll Down
      </div>
      <div className='h-screen w-screen px-[4vw] py-[6vh] flex flex-col justify-between'>
        <div className='h-content '>
          <h1 className='text-[#787878] text-[1.7rem] mb-[2vh]'>Human first. Always. </h1>
          <h1 className='text-[2.6rem] font-gilroy-bold leading-[1.15]'>A studio that researches, designs and <br />
            builds software, AI systems and digital <br />
            infrastructure for enterprise and <br />
            public-interest clients.</h1>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-end w-[17vw] min-w-[17vw]'>
            <img className='h-[42vh] w-[17vw] object-cover' src={jayImg} alt="" />
            <h1 className='mt-[1vh] text-[1rem] '>Jay L. Cunningham</h1>
          </div>
          <div className='flex w-[83vw] gap-[5vw] justify-end pt-[10vh] pr-[5vw] text-[1.3rem]'>
            <div className=''>
              <p>Solvari designs and builds technology <br /> for the real world: custom software, AI <br /> systems, platforms and digital <br /> infrastructure. </p>
              <p className='mt-[6vh]'>We bring research, design, engineering <br /> and responsible AI together under one  <br />roof, so every system we ship is built <br /> around the people it serves. </p>
            </div>
            <div className=''>
              <p>Every project starts with understanding: <br />the people, environments and constraints <br /> around the problem. That evidence shapes <br /> what we design and how we build it. </p>
              <p className='mt-[6vh]'>Then we evaluate it in the real world, so <br />the work keeps getting better long after <br /> launch.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='s3 relative h-[30vh] mt-[15vh] mb-[10vh] flex justify-center items-end px-[4vw]'>
        <h1 className='text-[5.5rem] font-gilroy-medium leading-[1.15] text-center'>Designed for people, <br />
          context, and impact.</h1>
        <h1 className='absolute right-[4vw] bottom-0 text-[1.1rem] text-[#7F7F7F]'>( Work )</h1>
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
        <div className='border-t border-[#D9D9D9] mx-[4vw]'></div>
      </div>
      <div className='s4 relative h-[30vh] mt-[10vh] mb-[10vh] flex justify-center items-end px-[4vw]'>
        <h1 className='text-[5.5rem] font-gilroy-medium leading-[1.15] text-center'>What we do ?</h1>
        <h1 className='absolute right-[4vw] bottom-0 text-[1.1rem] text-[#7F7F7F]'>( Quite A Lot )</h1>
      </div>
      <div className='w-screen px-[4vw] pt-[3vh] pb-[15vh] flex flex-col justify-between'>
        <div className='h-content '>
          <h1 className='text-[2rem] leading-[1.15]'>We bring research, design, engineering, <br /> strategy, and responsible innovation together <br /> to solve complex technology challenges.  Every <br /> engagement is grounded in evidence, shaped <br /> by context, and built with the people who will <br />ultimately live with the system.</h1>
        </div>
      </div>
      {/* Section 1: Research & Design */}
      <div className='w-full px-[4vw] flex items-start justify-between'>
        {/* Left Column: Huge "1." */}
        <div className='w-[38vw] mt-[-6vh]'>
          <h1 className='text-[25rem] font-gilroy-medium'>
            1.
          </h1>
        </div>

        {/* Right Column: Category Tag, Service Rows Table, and Learn More Button */}
        <div className='w-[54vw] flex flex-col'>
          {/* Header Tag */}
          <div className='flex items-center gap-3 text-[0.85rem] font-gilroy-medium tracking-[0.1em] text-black uppercase mb-[3.5vh]'>
            <span className='text-[0.95rem] font-gilroy-medium'>+</span>
            <span>[&nbsp;RESEARCH & DESIGN&nbsp;]</span>
          </div>

          {/* Service Items Table */}
          <div className='w-full border-t border-[#D9D9D9]'>
            {/* Row 1 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                Applied Research
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Human-centered evaluations <br /> and technology audits
              </p>
            </div>

            {/* Row 2 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                Participatory Design
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Context-aware solutions built <br /> with stakeholders
              </p>
            </div>

            {/* Row 3 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                System Design
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Architecture and engineering <br /> for real-world deployment
              </p>
            </div>
          </div>

          {/* Learn More CTA Button */}
          <div className='mt-[4.5vh] flex justify-start'>
            <button
              className='flex items-center gap-[0.55rem] bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-black cursor-pointer rounded-[2px] tracking-wide'
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
        <div className='px-[4vw]'>
          <div className='flex items-center gap-2.5 text-[0.95rem] font-gilroy-medium text-black mb-[2.5vh]'>
            <span>+</span>
            <span>(&nbsp;About it & Examples&nbsp;)</span>
          </div>
          <h2 className='text-[2.2rem] font-gilroy-medium leading-[1.22] text-black'>
            We don't design from assumptions. We <br />
            combine research, participation, and <br />
            systems thinking to create experiences <br />
            that are grounded in real people, real <br />
            needs, and real-world impact.
          </h2>
        </div>

        {/* Horizontal image gallery matching expanded stage (left padding pl-[4vw], right bleed) */}
        <div className='relative mt-[6vh] w-full h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[4vw] flex gap-[1.2vw] items-center'>
          <video
            src={rd1Video}
            autoPlay
            loop
            muted
            playsInline
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={rd2}
            alt="Participatory design blueprint collaboration"
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={rd3}
            alt="System design evaluation and notes"
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
        </div>
      </div>

      {/* Continuous Marquee Ticker */}
      <div className='w-full overflow-hidden bg-[#b6ff00] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-a-${i}`} className='text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Research & Design&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-b-${i}`} className='text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Research & Design&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: TECHNOLOGY & AI                                */}
      {/* ========================================================= */}
      <div className='w-full px-[4vw] mt-[12vh] flex items-start justify-between'>
        {/* Left Column: Huge "2." */}
        <div className='w-[38vw] mt-[-6vh]'>
          <h1 className='text-[25rem] font-gilroy-medium'>
            2.
          </h1>
        </div>

        {/* Right Column: Category Tag, Service Rows Table, and Learn More Button */}
        <div className='w-[54vw] flex flex-col'>
          {/* Header Tag */}
          <div className='flex items-center gap-3 text-[0.85rem] font-gilroy-medium tracking-[0.1em] text-black uppercase mb-[3.5vh]'>
            <span className='text-[0.95rem] font-gilroy-medium'>+</span>
            <span>[&nbsp;TECHNOLOGY & AI&nbsp;]</span>
          </div>

          {/* Service Items Table */}
          <div className='w-full border-t border-[#D9D9D9]'>
            {/* Row 1 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                Software Development
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Custom platforms, tools, and <br /> digital infrastructure
              </p>
            </div>

            {/* Row 2 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                AI Systems
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Responsible AI design, <br /> development, and assessment
              </p>
            </div>

            {/* Row 3 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                Technology Consulting
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Expert guidance on systems, <br /> process, and implementation
              </p>
            </div>
          </div>

          {/* Learn More CTA Button */}
          <div className='mt-[4.5vh] flex justify-start'>
            <button
              className='flex items-center gap-[0.55rem] bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-black cursor-pointer rounded-[2px] tracking-wide'
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
        <div className='px-[4vw]'>
          <div className='flex items-center gap-2.5 text-[0.95rem] font-gilroy-medium text-black mb-[2.5vh]'>
            <span>+</span>
            <span>(&nbsp;About it & Examples&nbsp;)</span>
          </div>
          <h2 className='text-[2.2rem] font-gilroy-medium leading-[1.22] text-black'>
            We don't build technology for technology's <br />
            sake. We develop thoughtful software and <br />
            AI systems that solve complex problems, <br />
            work for people, and are built to perform in <br />
            the real world.
          </h2>
        </div>

        {/* Horizontal image gallery matching expanded stage */}
        <div className='relative mt-[6vh] w-full h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[4vw] flex gap-[1.2vw] items-center'>
          <video
            src={ta1Video}
            autoPlay
            loop
            muted
            playsInline
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={ta2}
            alt="Software and engineering workspace with workstation"
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={ta3}
            alt="Dr. Jay technology and AI systems presentation"
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
        </div>
      </div>

      {/* Section 2 Pink Marquee Ticker */}
      <div className='w-full overflow-hidden bg-[#eb519c] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-ta-a-${i}`} className='text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Technology & AI&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-ta-b-${i}`} className='text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Technology & AI&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 3: STRATEGY & INNOVATION                          */}
      {/* ========================================================= */}
      <div className='w-full px-[4vw] mt-[12vh] flex items-start justify-between'>
        {/* Left Column: Huge "3." */}
        <div className='w-[38vw] mt-[-6vh]'>
          <h1 className='text-[25rem] font-gilroy-medium'>
            3.
          </h1>
        </div>

        {/* Right Column: Category Tag, Service Rows Table, and Learn More Button */}
        <div className='w-[54vw] flex flex-col'>
          {/* Header Tag */}
          <div className='flex items-center gap-3 text-[0.85rem] font-gilroy-medium tracking-[0.1em] text-black uppercase mb-[3.5vh]'>
            <span className='text-[0.95rem] font-gilroy-medium'>+</span>
            <span>[&nbsp;STRATEGY & INNOVATION&nbsp;]</span>
          </div>

          {/* Service Items Table */}
          <div className='w-full border-t border-[#D9D9D9]'>
            {/* Row 1 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                Strategic Advisory
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Technology foresight, evaluation, <br /> and governance
              </p>
            </div>

            {/* Row 2 */}
            <div className='w-full py-[3.2vh] border-b border-[#D9D9D9] flex items-center justify-between group'>
              <h2 className='w-[52%] text-[2.1rem] font-gilroy-light text-[#9E9E9E] transition-colors duration-200'>
                Responsible Innovation
              </h2>
              <p className='w-[48%] text-[1.05rem] font-gilroy-medium text-black leading-[1.3]'>
                Stewardship frameworks and risk <br /> mitigation
              </p>
            </div>
          </div>

          {/* Learn More CTA Button */}
          <div className='mt-[4.5vh] flex justify-start'>
            <button
              className='flex items-center gap-[0.55rem] bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-black cursor-pointer rounded-[2px] tracking-wide'
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
        <div className='px-[4vw]'>
          <div className='flex items-center gap-2.5 text-[0.95rem] font-gilroy-medium text-black mb-[2.5vh]'>
            <span>+</span>
            <span>(&nbsp;About it & Examples&nbsp;)</span>
          </div>
          <h2 className='text-[2.2rem] font-gilroy-medium leading-[1.22] text-black'>
            We don't chase trends. We help <br />
            organizations make smarter technology <br />
            decisions, anticipate what's next, and turn <br />
            responsible innovation into meaningful <br />
            outcomes.
          </h2>
        </div>

        {/* Horizontal image gallery matching expanded stage */}
        <div className='relative mt-[6vh] w-full h-[44vh] overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x pl-[4vw] flex gap-[1.2vw] items-center'>
          <img
            src={si1}
            alt="Strategy research and notes"
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <video
            src={si2Video}
            autoPlay
            loop
            muted
            playsInline
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
          <img
            src={si3}
            alt="Foresight and human vision close-up"
            className='h-[42vh] w-auto shrink-0 object-cover block select-none'
          />
        </div>
      </div>

      {/* Section 3 Lime Marquee Ticker */}
      <div className='w-full overflow-hidden bg-[#03fdf0] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-si-a-${i}`} className='text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Strategy & Innovation&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-si-b-${i}`} className='text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                LEARN MORE ABOUT Strategy & Innovation&nbsp;&nbsp;—&nbsp;&nbsp;LET'S WORK&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION: WHAT DRIVES US ?                                 */}
      {/* ========================================================= */}
      <div className='min-h-screen w-screen px-[4vw] py-[6vh] flex flex-col justify-between mt-[15vh]'>
        {/* Section Heading */}
        <h1 className='text-[5.5rem] font-gilroy-medium leading-[1.05] text-black'>
          What Drives Us ?
        </h1>

        {/* Content Row: Left text column & Right image column taking up the full screen height */}
        <div className='w-[90vw] flex-1 flex items-stretch justify-between mt-[20vh]'>
          {/* Left Column: Top intro copy & Bottom culture statement with CTA */}
          <div className='w-[40vw] flex flex-col justify-between py-[1vh]'>
            {/* Top Introductory Body Copy */}
            <p className='text-[#787878] text-[2.2rem] font-gilroy-medium leading-[1.4] max-w-[45vw]'>
              We start with questions, not solutions. <br />
              We look closer, challenge assumptions, <br />
              and dig into the context before we <br />
              build. Research gives us the insight; <br />
              design gives it direction; technology <br />
              gives it life.
            </p>

            {/* Bottom Statement & CTA Button */}
            <div className='pb-[4vh]'>
              <h2 className='text-[2.2rem] font-gilroy-medium leading-[1.2] text-black max-w-[32vw] mb-[3.5vh]'>
                The result is better <br />
                decisions, better systems, <br />
                and technology built with <br />
                intention.
              </h2>
              <button
                className='flex items-center gap-[0.55rem] bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-4 py-2 text-[0.8rem] font-gilroy-medium text-black cursor-pointer rounded-[2px] tracking-wide'
              >
                <span>OUR CULTURE</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Tall portrait video of Jay taking up the full height */}
          <div className='w-[35vw] h-[90vh] flex justify-end items-stretch'>
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
      <div className='w-full mt-[15vh]'>
        {/* City Heading & Geocoordinates Row */}
        <div className='px-[4vw]'>
          <h1 className='text-[5.5rem] font-gilroy-medium leading-[1.08] text-black'>
            Based in the heart <br />
            of Chicago
          </h1>

          {/* Coordinates positioned directly above the right of the skyline image */}
          <div className='w-full flex justify-end mt-[6vh] mb-[2vh]'>
            <p className='text-[1.3rem] font-gilroy-medium text-black tracking-wide'>
              41.8818° N latitude and -87.6232° W longitude
            </p>
          </div>
        </div>

        {/* Chicago Skyline Hero Image */}
        <div className='w-full px-[4vw]'>
          <img
            src={footerImg}
            alt="Chicago skyline along the water"
            className='w-full h-[75vh] object-cover block select-none'
          />
        </div>

        {/* Call to Action: Let's talk about what comes next. */}
        <div className='w-full px-[4vw] mt-[14vh] mb-[10vh] flex items-center justify-between'>
          <h2 className='text-[3.4rem] font-gilroy-bold leading-[1.15] text-black'>
            Let's talk about what <br />
            comes next.
          </h2>

          <a
            href="mailto:hello@solvari.com"
            className='flex items-center gap-[0.65rem] bg-black text-white hover:bg-[#f4f4f4] hover:text-black transition-all px-6 py-3.5 text-[0.95rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-wide'
          >
            <span>Email us</span>
            <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Bottom Horizontal Divider */}
        <div className='border-t border-[#D9D9D9] mx-[4vw]'></div>

        {/* Bottom Metadata & Socials Bar */}
        <div className='w-full px-[4vw] py-[2.8vh]  flex items-center justify-between text-[0.82rem] font-gilroy-medium uppercase tracking-[0.1em] text-black'>
          <div className='flex items-center gap-[4.5vw]'>
            <span>CHICAGO BASED</span>
            <span className='tabular-nums'>{chicagoTime}</span>
          </div>
          <div className='flex items-center gap-[3vw]'>
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