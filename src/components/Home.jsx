import React, { useState, useEffect } from 'react'
import homeImg from '../assets/Home.png'
import jayImg from '../assets/jayhome.png'
import whatjayImg from '../assets/whatjay.png'
import Navbar from './Navbar'

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

import rd1 from '../assets/rd1.png'
import rd2 from '../assets/rd2.png'
import rd3 from '../assets/rd3.png'

import ta1 from '../assets/ta1.png'
import ta2 from '../assets/ta2.png'
import ta3 from '../assets/ta3.png'

import si1 from '../assets/si1.png'
import si2 from '../assets/si2.png'
import si3 from '../assets/si3.png'

function Home() {
  const [time, setTime] = useState('')
  const [expandedId, setExpandedId] = useState(null)

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
      const hours = parts.find((p) => p.type === 'hour')?.value || '00'
      const minutes = parts.find((p) => p.type === 'minute')?.value || '00'
      const seconds = parts.find((p) => p.type === 'second')?.value || '00'
      setTime(`[ ${hours} : ${minutes} : ${seconds} ]`)
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
      description:
        'Explores community engagement, interactive experiences, and storytelling interfaces built to connect global audiences across social platforms.',
      thumbnails: [f2, f3, f4, f1],
      showcaseImages: [f2, f3, f4, f1],
    },
    {
      id: 'apple-1',
      name: 'Apple',
      displayName: 'Apple',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      description:
        'Design research, user experience methodologies, and contextual testing for intelligent device ecosystems and next-generation interactive software.',
      thumbnails: [a3, a2, a1, a4],
      showcaseImages: [a3, a2, a1, a4],
    },
    {
      id: 'mozilla',
      name: 'Mozilla Data Collection',
      displayName: (
        <>
          Mozilla Data<br />Collection
        </>
      ),
      tags: ['EXPERIENCE', 'STORYTELLING'],
      description:
        "Advises and leads community data governance, co-governance research, and platform strategy for Mozilla's MDC, shaping equitable frameworks for 300+ language communities through data trust models, governance design, UX research, and cross-functional collaboration",
      thumbnails: [m1, m2, m3],
      showcaseImages: [m1, m2, m3],
    },
    {
      id: 'apple-2',
      name: 'Apple',
      displayName: 'Apple',
      tags: ['EXPERIENCE', 'STORYTELLING'],
      description:
        'Human-centered systems research, prototyping interfaces, and contextual evaluation shaping future product experiences.',
      thumbnails: [a3, a2, a1, a4],
      showcaseImages: [a3, a2, a1, a4],
    },
  ]

  return (
    <div className="w-full bg-white text-black font-helvetica selection:bg-black selection:text-white">

      {/* 100vh Hero Page */}
      <section className="w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-8 sm:pt-10 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 selection:bg-black selection:text-white">
        <div className="max-w-[100rem] w-full mx-auto flex flex-col justify-between flex-1">

          {/* Top Header Navigation */}
          <Navbar />

          {/* Main Hero Section */}
          <div className="relative w-full flex items-center justify-center my-auto py-6 sm:py-8 select-none">
            <div className="relative flex items-center justify-center max-w-[95rem] w-full">

              {/* Angel Sculpture Image */}
              <div className="relative z-20 shrink-0 -mr-[6vw] sm:-mr-[8vw] md:-mr-[9vw] lg:-mr-[8vw] xl:-mr-[7.5vw] -mt-4 sm:-mt-6 pointer-events-none">
                <img
                  src={homeImg}
                  alt="Solvari Angel"
                  className="w-[38vw] min-w-[18vw] max-w-[42vw] max-h-[70vh] h-auto object-contain"
                  draggable="false"
                />
              </div>

              {/* Typographic Layout */}
              <div className="relative z-10 flex flex-col justify-center text-black">

                {/* Line 1: The PURPOSE of research isn't for */}
                <div className="flex items-baseline gap-1.5 sm:gap-2.5 md:gap-3 pl-6 sm:pl-10 md:pl-14 lg:pl-16 mb-0.5 sm:mb-1">
                  <span className="font-times italic font-bold text-base sm:text-xl md:text-2xl lg:text-[2.2vw] tracking-tight text-black">
                    The
                  </span>
                  <span
                    className="font-helvetica font-black text-2xl sm:text-4xl md:text-5xl lg:text-[4.2vw] uppercase tracking-[-0.04em] leading-none text-black"
                    style={{ fontStretch: 'condensed' }}
                  >
                    PURPOSE
                  </span>
                  <span className="font-times italic font-bold text-base sm:text-xl md:text-2xl lg:text-[2.4vw] tracking-tight ml-0.5 sm:ml-1 text-black">
                    of research
                  </span>
                  <span className="font-ballet italic text-2xl sm:text-3xl md:text-4xl lg:text-[3.6vw] font-normal ml-1.5 sm:ml-3 text-black transform -translate-y-1.5 sm:-translate-y-2">
                    isn't for
                  </span>
                </div>

                {/* Line 2: THE PAPER it is */}
                <div className="flex items-baseline gap-2 sm:gap-3 md:gap-4 leading-[0.80]">
                  <span
                    className="font-helvetica font-black text-5xl sm:text-7xl md:text-9xl lg:text-[8.5vw] uppercase tracking-[-0.05em] text-black"
                  >
                    THE PAPER
                  </span>
                  <span className="font-times italic font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[3.2vw] tracking-tight ml-1 sm:ml-2.5 text-black">
                    it is
                  </span>
                </div>

                {/* Line 3: WHAT COMES */}
                <div className="leading-[0.80] mt-0.5 sm:mt-1">
                  <span
                    className="font-helvetica font-black text-5xl sm:text-7xl md:text-9xl lg:text-[8.5vw] uppercase tracking-[-0.05em] text-black"
                  >
                    WHAT COMES
                  </span>
                </div>

                {/* Line 4: next. */}
                <div className="flex justify-end mt-0.5 sm:mt-1 pr-1 sm:pr-2 md:pr-4">
                  <span
                    className="font-helvetica font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[3vw] tracking-[-0.02em] leading-none text-black"
                  >
                    next.
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Footer */}
          <footer className="w-full">
            <div className="w-full border-t border-black/80 pt-3 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold tracking-wide uppercase">

              {/* Left Metadata */}
              <div className="flex items-center gap-8 sm:gap-14 text-black">
                <span className="font-gilroy-medium">CHICAGO BASED</span>
                <span className="font-mono font-normal tracking-normal lowercase sm:normal-case">
                  {time || '[ 05 : 34 : 58 ]'}
                </span>
              </div>

              {/* Right Social Links */}
              <div className="flex items-center gap-6 sm:gap-10 text-black font-gilroy-medium">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1 capitalize"
                >
                  Instagram +
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1 capitalize"
                >
                  LinkedIn +
                </a>
              </div>

            </div>
          </footer>

        </div>
      </section>

      {/* About Section (100vh) */}
      <section className="w-full min-h-screen lg:h-screen bg-white text-black flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 selection:bg-black selection:text-white">
        <div className="w-full max-w-[95rem] mx-auto h-full flex flex-col justify-between">

          {/* Top Headline Block */}
          <div className="flex flex-col items-start">
            <p className="font-gilroy-medium text-sm sm:text-base md:text-[1.0625rem] lg:text-[1.125rem] text-[#737373] mb-3 sm:mb-4">
              Human first. Always.
            </p>
            <h2 className="font-gilroy-bold text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] xl:text-[2.375rem] leading-[1.18] text-black">
              A Research studio based in Chicago,<br />
              operating worldwide. We design technology<br />
              where empathy, precision, and impact are<br />
              felt, not compromised.
            </h2>
          </div>

          {/* Content Row: Image on left, two columns offset down on the right */}
          <div className="flex flex-col lg:flex-row items-start pt-10 sm:pt-14 lg:pt-0">

            {/* Column 1: Image & Caption */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-[45vw] sm:w-[28vw] md:w-[20vw] lg:w-[15vw] max-w-[15vw] min-w-[10vw]">
                <img
                  src={jayImg}
                  alt="Jay L. Cunningham"
                  className="w-[45vw] sm:w-[28vw] md:w-[20vw] lg:w-[15vw] h-auto max-h-[35vh] aspect-[3/4] object-cover"
                />
              </div>
              <p className="font-gilroy-medium text-[0.6875rem] sm:text-[0.75rem] text-[#737373] text-center mt-2.5 tracking-tight">
                Jay L. Cunningham
              </p>
            </div>

            {/* Right Group: Two text columns with gap, pushed down relative to the photo */}
            <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-10 lg:gap-14 ml-0 lg:ml-[11%] xl:ml-[14%] mt-8 lg:mt-[4.5rem] xl:mt-[5rem]">

              {/* Text Column 1 */}
              <div className="w-full sm:w-[16.25rem] md:w-[17.5rem] lg:w-[18.125rem] shrink-0 flex flex-col gap-6 font-gilroy-medium text-[0.78125rem] sm:text-[0.8125rem] md:text-[0.84375rem] leading-[1.46] text-black">
                <p>
                  Solvari turns human-centered research into technology built for the real world. We bring together research, design, engineering, and responsible AI to understand complex problems and build systems that serve people better.
                </p>
                <p>
                  Because every system exists within a human context, we start by understanding the people,
                </p>
              </div>

              {/* Text Column 2 */}
              <div className="w-full sm:w-[16.875rem] md:w-[18.125rem] lg:w-[18.75rem] shrink-0 flex flex-col gap-6 font-gilroy-medium text-[0.78125rem] sm:text-[0.8125rem] md:text-[0.84375rem] leading-[1.46] text-black">
                <p>
                  environments, and constraints around it. Our approach combines rigorous research with contextual design, creating solutions grounded in evidence rather than assumptions.
                </p>
                <p>
                  Rather than stopping at insights, we take research into action — designing, building, and evaluating technology that can make a meaningful difference in the world.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Work / Projects Section */}
      <section className="w-full min-h-screen bg-white text-black flex flex-col justify-center px-0 py-16 sm:py-20 lg:py-24 overflow-x-hidden selection:bg-black selection:text-white">
        <div className="w-full my-auto">

          {/* Section Header */}
          <div className="relative w-full max-w-[100rem] mx-auto flex flex-col items-center justify-center mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
            <h2 className="font-gilroy-medium text-center text-4xl sm:text-5xl md:text-6xl lg:text-[4.875rem] xl:text-[5.625rem] leading-[1.04] tracking-[-0.03em] text-black">
              Designed for people,<br />
              context, and impact.
            </h2>
            <span className="font-gilroy-medium text-xs sm:text-sm text-[#737373] tracking-tight md:absolute md:right-4 sm:md:right-6 md:right-8 lg:right-12 xl:right-14 md:bottom-2 mt-4 md:mt-0 self-center md:self-auto">
              ( Work )
            </span>
          </div>

          {/* Project List */}
          <div className="w-full flex flex-col">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id

              return (
                <div
                  key={project.id}
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  className="w-full border-t border-[#e5e5e5] cursor-pointer group select-none transition-colors duration-200 hover:bg-[#fafafa]/50"
                >
                  <div className="w-full pl-6 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-28 pr-0 py-7 sm:py-9 lg:py-10 transition-all duration-300">
                    {/* Top Row Container with Perfectly Aligned Columns */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-0">

                      {/* Column 1: Brand / Title */}
                      <div className="lg:w-[18%] xl:w-[18%] shrink-0 flex flex-col items-start pr-4">
                        <div
                          className={
                            isExpanded
                              ? 'font-gilroy-bold text-lg sm:text-lg text-black leading-[1.12]'
                              : 'font-gilroy-bold text-lg sm:text-lg text-black'
                          }
                        >
                          {project.displayName || project.name}
                        </div>
                        {isExpanded && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            className="mt-8 sm:mt-10 md:mt-12 inline-flex items-center gap-2 bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-3.5 py-1.5 text-[0.875rem] sm:text-[0.9375rem] font-gilroy-medium text-black cursor-pointer"
                          >
                            <span>View Case</span>
                            <svg
                              className="w-3.5 h-3.5 stroke-[2.5]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                d="M7 17L17 7M17 7H7M17 7V17"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Column 2: Tags */}
                      <div className="lg:w-[22%] xl:w-[22%] shrink-0 flex items-center gap-5 sm:gap-6 font-gilroy-medium text-[0.625rem] sm:text-[0.6875rem] tracking-[0.14em] text-black uppercase pt-0.5">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      {/* Column 3: Action indicator */}
                      <div className="lg:w-[10%] xl:w-[10%] shrink-0 font-gilroy-medium text-xs sm:text-[0.8125rem] text-black pt-0.5">
                        {isExpanded ? '[ - ]' : '[ + ]'}
                      </div>

                      {/* Column 4: Right Content (Description when expanded, Thumbnails starting from exact same point when collapsed) */}
                      <div className="lg:w-[50%] xl:w-[50%] shrink-0 flex justify-start">
                        {isExpanded ? (
                          <div className="w-full sm:w-[28.75rem] md:w-[31.25rem] lg:w-[32.8125rem] flex justify-start shrink-0 pr-6 sm:pr-12 md:pr-16 lg:pr-24 xl:pr-28">
                            <p className="font-gilroy-medium text-xs sm:text-[0.8125rem] md:text-[0.84375rem] leading-[1.38] text-black max-w-[21.25rem] tracking-normal">
                              {project.description}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-1 overflow-hidden justify-start shrink-0">
                            {(project.thumbnails || []).map((img, idx) => (
                              <div
                                key={idx}
                                className="h-[10vh] sm:h-[11vh] md:h-[12vh] lg:h-[13vh] shrink-0 overflow-hidden bg-[#f5f5f5]"
                              >
                                <img
                                  src={img}
                                  alt={`${project.name} preview ${idx + 1}`}
                                  className="h-[10vh] sm:h-[11vh] md:h-[12vh] lg:h-[13vh] w-auto max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Large Showcase Images for Expanded Projects */}
                    {isExpanded && (
                      <div className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto no-scrollbar pt-14 sm:pt-18 md:pt-20 lg:pt-24">
                        {(project.showcaseImages || []).map((img, idx) => (
                          <div
                            key={idx}
                            className="h-[28vh] sm:h-[32vh] md:h-[36vh] lg:h-[40vh] shrink-0 overflow-hidden bg-transparent"
                          >
                            <img
                              src={img}
                              alt={`${project.name} showcase ${idx + 1}`}
                              className="h-[28vh] sm:h-[32vh] md:h-[36vh] lg:h-[40vh] w-auto max-w-none object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              )
            })}

            {/* Bottom edge-to-edge divider border */}
            <div className="w-full border-t border-[#e5e5e5]" />
          </div>

        </div>
      </section>

      {/* What we do ? Section */}
      <section className="w-full bg-white text-black flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-12 sm:pt-16 lg:pt-20 selection:bg-black selection:text-white">
        <div className="max-w-[100rem] w-full mx-auto flex flex-col">

          {/* Section Header */}
          <div className="relative w-full flex items-center justify-center">
            <h2 className="font-gilroy-medium text-center text-4xl sm:text-5xl md:text-6xl lg:text-[4.875rem] xl:text-[5.625rem] leading-[1.04] tracking-[-0.03em] text-black">
              What we do ?
            </h2>
            <span className="font-gilroy-medium text-xs sm:text-sm text-[#737373] tracking-tight absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-block">
              ( Quite A Lot )
            </span>
          </div>

          {/* Description Paragraph */}
          <div className="w-full mt-12 sm:mt-16 lg:mt-20 mb-16 sm:mb-20 lg:mb-24">
            <p className="font-gilroy-medium text-lg sm:text-xl md:text-[1.4375rem] lg:text-[1.5625rem] leading-[1.32] tracking-[-0.01em] text-black max-w-[40rem]">
              We bring research, design, engineering,<br className="hidden sm:inline" />
              strategy, and responsible innovation together<br className="hidden sm:inline" />
              to solve complex technology challenges. Every<br className="hidden sm:inline" />
              engagement is grounded in evidence, shaped<br className="hidden sm:inline" />
              by context, and built with the people who will<br className="hidden sm:inline" />
              ultimately live with the system.
            </p>
          </div>

          {/* Bottom Divider */}
          <div className="w-full border-t border-[#e5e5e5]" />

        </div>
      </section>

      {/* Research & Design (1.) Section (100vh) */}
      <section className="w-full min-h-screen lg:h-screen bg-white text-black flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 selection:bg-black selection:text-white">
        <div className="max-w-[100rem] w-full mx-auto h-full flex flex-col justify-between">

          {/* Top Row: Giant 1. + Services List Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left Column: Number "1." */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Giant Number 1. */}
              <div className="font-gilroy-medium text-[6.875rem] sm:text-[9.375rem] md:text-[11.875rem] lg:text-[14.375rem] xl:text-[16.25rem] leading-[0.82] text-black tracking-[-0.04em] select-none">
                1.
              </div>
            </div>

            {/* Right Column: + [RESEARCH & DESIGN] + Services Matrix + Learn More */}
            <div className="lg:col-span-7 flex flex-col justify-start lg:pt-2">

              {/* Category Header Label */}
              <div className="font-gilroy-medium text-xs sm:text-[0.8125rem] tracking-wider uppercase text-black mb-6 sm:mb-8 flex items-center gap-2">
                <span>+</span>
                <span>[ RESEARCH & DESIGN ]</span>
              </div>

              {/* Services List Matrix */}
              <div className="w-full flex flex-col">
                {/* Row 1 */}
                <div className="w-full border-t border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    Applied Research
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Human-centered evaluations and technology audits
                  </span>
                </div>

                {/* Row 2 */}
                <div className="w-full border-t border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    Participatory Design
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Context-aware solutions built with stakeholders
                  </span>
                </div>

                {/* Row 3 */}
                <div className="w-full border-t border-b border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    System Design
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Architecture and engineering for real-world deployment
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 sm:mt-10">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-3.5 py-1.5 text-[1rem] font-gilroy-medium text-black cursor-pointer"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Left: About it & Examples */}
          <div className="w-full max-w-[33.75rem] pt-10 lg:pt-0">
            <div className="font-gilroy-medium text-[1rem] text-[#000000] tracking-wide mb-3 flex items-center gap-1.5">
              <span>+</span>
              <span>( About it & Examples )</span>
            </div>
            <p className="font-gilroy-medium text-lg sm:text-xl md:text-[1.4375rem] lg:text-[1.5625rem] xl:text-[1.5625rem] leading-[1.3] text-black">
              We don't design from assumptions. We combine research, participation, and systems thinking to create experiences that are grounded in real people, real needs, and real-world impact.
            </p>
          </div>

        </div>
      </section>

      {/* Image Gallery Showcase + Marquee Ticker Section */}
      <section className="w-full bg-white text-black flex flex-col pt-6 sm:pt-10 selection:bg-black selection:text-white">
        <div className="w-full overflow-x-auto no-scrollbar mb-16 sm:mb-20 lg:mb-24 pl-4 sm:px-0 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-14 min-[100rem]:pl-[calc((100vw-100rem)/2+3.5rem)]">
          <div className="flex items-center gap-4 sm:gap-6 min-w-max pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-14">
            {/* rd1: Wide Landscape Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={rd1}
                alt="Research analytics documentation"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>

            {/* rd2: Center Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={rd2}
                alt="Co-design participatory workshop"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>

            {/* rd3: Right Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={rd3}
                alt="Systems evaluation and testing"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Neon Marquee Ticker */}
        <div className="w-full bg-[#b8ff00] text-black overflow-hidden py-2 sm:py-1.5 select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center text-sm sm:text-base md:text-[1rem] font-gilroy-medium tracking-tight shrink-0">
              <span>LEARN MORE ABOUT Research & Design — LET'S WORK — LEARN MORE ABOUT Research & Design — LET'S WORK — LEARN MORE ABOUT Research & Design — LET'S WORK — LEARN MORE ABOUT Research & Design — LET'S WORK —&nbsp;</span>
            </div>
            <div className="flex items-center text-sm sm:text-base md:text-[1rem] font-gilroy-medium tracking-tight shrink-0" aria-hidden="true">
              <span>LEARN MORE ABOUT Research & Design — LET'S WORK — LEARN MORE ABOUT Research & Design — LET'S WORK — LEARN MORE ABOUT Research & Design — LET'S WORK — LEARN MORE ABOUT Research & Design — LET'S WORK —&nbsp;</span>
            </div>
          </div>
        </div>

      </section>

      {/* Technology & AI (2.) Section (100vh) */}
      <section className="w-full min-h-screen lg:h-screen bg-white text-black flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 selection:bg-black selection:text-white">
        <div className="max-w-[100rem] w-full mx-auto h-full flex flex-col justify-between">

          {/* Top Row: Giant 2. + Services List Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left Column: Number "2." */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Giant Number 2. */}
              <div className="font-gilroy-medium text-[6.875rem] sm:text-[9.375rem] md:text-[11.875rem] lg:text-[14.375rem] xl:text-[16.25rem] leading-[0.82] text-black tracking-[-0.04em] select-none">
                2.
              </div>
            </div>

            {/* Right Column: + [TECHNOLOGY & AI] + Services Matrix + Learn More */}
            <div className="lg:col-span-7 flex flex-col justify-start lg:pt-2">

              {/* Category Header Label */}
              <div className="font-gilroy-medium text-xs sm:text-[0.8125rem] tracking-wider uppercase text-black mb-6 sm:mb-8 flex items-center gap-2">
                <span>+</span>
                <span>[ TECHNOLOGY & AI ]</span>
              </div>

              {/* Services List Matrix */}
              <div className="w-full flex flex-col">
                {/* Row 1 */}
                <div className="w-full border-t border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    Software Development
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Custom platforms, tools, and digital infrastructure
                  </span>
                </div>

                {/* Row 2 */}
                <div className="w-full border-t border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    AI Systems
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Responsible AI design, development, and assessment
                  </span>
                </div>

                {/* Row 3 */}
                <div className="w-full border-t border-b border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    Technology Consulting
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Expert guidance on systems, process, and implementation
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 sm:mt-10">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-3.5 py-1.5 text-[1rem] font-gilroy-medium text-black cursor-pointer"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Left: About it & Examples */}
          <div className="w-full max-w-[33.75rem] pt-10 lg:pt-0">
            <div className="font-gilroy-medium text-[1rem] text-[#000000] tracking-wide mb-3 flex items-center gap-1.5">
              <span>+</span>
              <span>( About it & Examples )</span>
            </div>
            <p className="font-gilroy-medium text-lg sm:text-xl md:text-[1.4375rem] lg:text-[1.5625rem] xl:text-[1.5625rem] leading-[1.3] text-black">
              We don't build technology for technology's sake. We develop thoughtful software and AI systems that solve complex problems, work for people, and are built to perform in the real world.
            </p>
          </div>

        </div>
      </section>

      {/* Technology & AI Showcase + Marquee Ticker Section */}
      <section className="w-full bg-white text-black flex flex-col pt-6 sm:pt-10 selection:bg-black selection:text-white">
        <div className="w-full overflow-x-auto no-scrollbar mb-16 sm:mb-20 lg:mb-24 pl-4 sm:px-0 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-14 min-[100rem]:pl-[calc((100vw-100rem)/2+3.5rem)]">
          <div className="flex items-center gap-4 sm:gap-6 min-w-max pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-14">
            {/* ta1: Wide Landscape Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={ta1}
                alt="Thomas Vance fashion platform"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>

            {/* ta2: Center Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={ta2}
                alt="Software development workspace"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>

            {/* ta3: Right Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={ta3}
                alt="Dr. Jay research and technology website"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Neon Pink Marquee Ticker */}
        <div className="w-full bg-[#ff63b8] text-black overflow-hidden py-2 sm:py-1.5 select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center text-sm sm:text-base md:text-[1rem] font-gilroy-medium tracking-tight shrink-0">
              <span>LEARN MORE ABOUT Technology & AI — LET'S WORK — LEARN MORE ABOUT Technology & AI — LET'S WORK — LEARN MORE ABOUT Technology & AI — LET'S WORK — LEARN MORE ABOUT Technology & AI — LET'S WORK —&nbsp;</span>
            </div>
            <div className="flex items-center text-sm sm:text-base md:text-[1rem] font-gilroy-medium tracking-tight shrink-0" aria-hidden="true">
              <span>LEARN MORE ABOUT Technology & AI — LET'S WORK — LEARN MORE ABOUT Technology & AI — LET'S WORK — LEARN MORE ABOUT Technology & AI — LET'S WORK — LEARN MORE ABOUT Technology & AI — LET'S WORK —&nbsp;</span>
            </div>
          </div>
        </div>

      </section>

      {/* Strategy & Innovation (3.) Section (100vh) */}
      <section className="w-full min-h-screen lg:h-screen bg-white text-black flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 selection:bg-black selection:text-white">
        <div className="max-w-[100rem] w-full mx-auto h-full flex flex-col justify-between">

          {/* Top Row: Giant 3. + Services List Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left Column: Number "3." */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Giant Number 3. */}
              <div className="font-gilroy-medium text-[6.875rem] sm:text-[9.375rem] md:text-[11.875rem] lg:text-[14.375rem] xl:text-[16.25rem] leading-[0.82] text-black tracking-[-0.04em] select-none">
                3.
              </div>
            </div>

            {/* Right Column: + [STRATEGY & INNOVATION] + Services Matrix + Learn More */}
            <div className="lg:col-span-7 flex flex-col justify-start lg:pt-2">

              {/* Category Header Label */}
              <div className="font-gilroy-medium text-xs sm:text-[0.8125rem] tracking-wider uppercase text-black mb-6 sm:mb-8 flex items-center gap-2">
                <span>+</span>
                <span>[ STRATEGY & INNOVATION ]</span>
              </div>

              {/* Services List Matrix */}
              <div className="w-full flex flex-col">
                {/* Row 1 */}
                <div className="w-full border-t border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    Strategic Advisory
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Technology foresight, evaluation, and governance
                  </span>
                </div>

                {/* Row 2 */}
                <div className="w-full border-t border-b border-[#e5e5e5] py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                  <span className="font-gilroy-light text-xl sm:text-2xl md:text-[1.5rem] text-[#7F7F7F]">
                    Responsible Innovation
                  </span>
                  <span className="font-gilroy-medium text-xs sm:text-[0.8125rem] leading-[1.4] text-black max-w-[16.25rem] sm:text-left">
                    Stewardship frameworks and risk mitigation
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 sm:mt-10">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-3.5 py-1.5 text-[1rem] font-gilroy-medium text-black cursor-pointer"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Left: About it & Examples */}
          <div className="w-full max-w-[33.75rem] pt-10 lg:pt-0">
            <div className="font-gilroy-medium text-[1rem] text-[#000000] tracking-wide mb-3 flex items-center gap-1.5">
              <span>+</span>
              <span>( About it & Examples )</span>
            </div>
            <p className="font-gilroy-medium text-lg sm:text-xl md:text-[1.4375rem] lg:text-[1.5625rem] xl:text-[1.5625rem] leading-[1.3] text-black">
              We don't chase trends. We help organizations make smarter technology decisions, anticipate what's next, and turn responsible innovation into meaningful outcomes.
            </p>
          </div>

        </div>
      </section>

      {/* Strategy & Innovation Showcase + Marquee Ticker Section */}
      <section className="w-full bg-white text-black flex flex-col pt-6 sm:pt-10 selection:bg-black selection:text-white">

        {/* Horizontally Scrollable Showcase Gallery: si1, si2, si3 (Natural Aspect Ratios) */}
        <div className="w-full overflow-x-auto no-scrollbar mb-16 sm:mb-20 lg:mb-24 pl-4 sm:px-0 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-14 min-[100rem]:pl-[calc((100vw-100rem)/2+3.5rem)]">
          <div className="flex items-center gap-4 sm:gap-6 min-w-max pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-14">
            {/* si1: Left Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={si1}
                alt="Strategic consulting notes and workspace"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>

            {/* si2: Center Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={si2}
                alt="Strategy presentation and discussion"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>

            {/* si3: Right Image */}
            <div className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] shrink-0 overflow-hidden">
              <img
                src={si3}
                alt="Human perspective and vision portrait"
                className="h-[32vh] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] w-auto max-w-none object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Neon Marquee Ticker */}
        <div className="w-full bg-[#b8ff00] text-black overflow-hidden py-2 sm:py-1.5 select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center text-sm sm:text-base md:text-[1rem] font-gilroy-medium tracking-tight shrink-0">
              <span>LEARN MORE ABOUT Strategy & Innovation — LET'S WORK — LEARN MORE ABOUT Strategy & Innovation — LET'S WORK — LEARN MORE ABOUT Strategy & Innovation — LET'S WORK — LEARN MORE ABOUT Strategy & Innovation — LET'S WORK —&nbsp;</span>
            </div>
            <div className="flex items-center text-sm sm:text-base md:text-[1rem] font-gilroy-medium tracking-tight shrink-0" aria-hidden="true">
              <span>LEARN MORE ABOUT Strategy & Innovation — LET'S WORK — LEARN MORE ABOUT Strategy & Innovation — LET'S WORK — LEARN MORE ABOUT Strategy & Innovation — LET'S WORK — LEARN MORE ABOUT Strategy & Innovation — LET'S WORK —&nbsp;</span>
            </div>
          </div>
        </div>

      </section>

      {/* What Drives Us Section (>100vh) */}
      <section className="w-full bg-white text-black px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-36 selection:bg-black selection:text-white">
        <div className="w-full max-w-[95rem] mx-auto">

          {/* Section Heading */}
          <h2 className="font-gilroy-medium text-4xl sm:text-5xl md:text-6xl lg:text-[4.875rem] xl:text-[5.625rem] leading-[1.04] tracking-[-0.03em] text-black mb-12 sm:mb-16 lg:mb-20">
            What Drives Us ?
          </h2>

          {/* Two Column Layout: Left Column (Spaced Content), Right Column (Tall Image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">

            {/* Left Column: Top paragraph + Bottom statement & Button */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between h-full">

              {/* Top Paragraph */}
              <div className="max-w-[32.5rem]">
                <p className="font-gilroy-medium text-lg sm:text-xl md:text-[1.4375rem] lg:text-[1.5625rem] leading-[1.32] text-[#7F7F7F]">
                  We start with questions, not solutions. We look closer, challenge assumptions, and dig into the context before we build. Research gives us the insight; design gives it direction; technology gives it life.
                </p>
              </div>

              {/* Bottom Block (Revealed on scroll down) */}
              <div className="pt-28 sm:pt-40 md:pt-56 lg:pt-72 xl:pt-[21.25rem] flex flex-col items-start max-w-[26.25rem] pb-4">
                <h3 className="font-gilroy-medium text-2xl sm:text-3xl md:text-[2.1875rem] lg:text-[2.1875rem] leading-[1.2] tracking-[-0.02em] text-black mb-6 sm:mb-8">
                  The result is better decisions, better systems, and technology built with intention.
                </h3>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-3.5 py-1.5 text-xs sm:text-[0.8125rem] font-gilroy-medium text-black uppercase tracking-wider cursor-pointer"
                >
                  <span>OUR CULTURE</span>
                  <svg
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

            </div>

            {/* Right Column: Tall Image (>100vh) */}
            <div className="lg:col-span-6 xl:col-span-7 flex justify-start">
              <div className="w-full max-w-[35vw] sm:max-w-[40vw] md:max-w-[42vw] lg:max-w-[44vw]">
                <img
                  src={whatjayImg}
                  alt="What Drives Us - Solvari"
                  className="w-[85vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] max-w-[44vw] max-h-[85vh] h-auto object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export default Home