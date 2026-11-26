import React, { useState, useEffect } from 'react'
import jayImg from '../assets/jayhome.png'
import whatJayVideo from '../assets/whatjay.MP4'
import footerImg from '../assets/footer.png'

function AboutUsPage({ onNavigate }) {
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

  const pillars = [
    {
      num: '01.',
      title: 'Evidence Over Assumptions',
      summary: 'Rigorous applied research before a single line of code is written',
      body: 'Every system exists within a human context. We investigate the people, environments, and constraints around a problem first so that architecture and design decisions are grounded in lived reality.',
    },
    {
      num: '02.',
      title: 'Participatory By Default',
      summary: 'Co-designing alongside the communities and teams who live with the system',
      body: 'We bring stakeholders directly into the design and governance loop—shaping data trusts, workflows, and interfaces together rather than prescribing solutions from afar.',
    },
    {
      num: '03.',
      title: 'Responsible AI & Stewardship',
      summary: 'Accountable intelligence built with evaluation and risk mitigation',
      body: 'We build AI systems and digital infrastructure that prioritize transparency, fairness, and human agency—auditing models in real-world conditions long after launch.',
    },
    {
      num: '04.',
      title: 'End-to-End Execution',
      summary: 'Research, design, and engineering under one roof',
      body: 'Insights lose their power when handed off across silos. Our researchers, designers, and engineers work as a single integrated studio from field study to production deployment.',
    },
  ]

  return (
    <div className='font-gilroy-medium bg-white text-black min-h-screen'>
      {/* Hero Section */}
      <div className='min-h-screen w-screen px-[5vw] md:px-[4vw] pt-[16vh] md:pt-[18vh] pb-[6vh] flex flex-col justify-between gap-[6vh]'>
        <div className='h-content'>
          <div className='flex items-center justify-between mb-[2vh]'>
            <h2 className='text-[#787878] text-[1.15rem] md:text-[1.7rem]'>Human first. Always.</h2>
            <span className='text-[0.95rem] md:text-[1.1rem] text-[#7F7F7F]'>( About Us )</span>
          </div>
          <h1 className='text-[1.85rem] sm:text-[2.4rem] md:text-[3.4rem] font-gilroy-bold leading-[1.14] max-w-[90vw]'>
            A research, design, and technology <br className='hidden md:inline' />
            studio based in Chicago, operating <br className='hidden md:inline' />
            worldwide. We build systems where <br className='hidden md:inline' />
            empathy, precision, and impact are felt.
          </h1>
        </div>

        <div className='flex flex-col md:flex-row gap-[4vh] md:gap-0 items-start md:items-end'>
          <div className='flex flex-col items-start md:items-end w-full md:w-[19vw] md:min-w-[19vw]'>
            <img className='h-[38vh] w-[58vw] sm:w-[40vw] md:h-[44vh] md:w-[19vw] object-cover' src={jayImg} alt="Jay L. Cunningham" />
            <div className='mt-[1.2vh] flex flex-col items-start md:items-end'>
              <span className='text-[0.98rem] md:text-[1.05rem] text-black'>Jay L. Cunningham, Ph.D.</span>
              <span className='text-[0.8rem] text-[#787878]'>Founder & Principal</span>
            </div>
          </div>

          <div className='flex flex-col md:flex-row w-full md:w-[81vw] gap-[3vh] md:gap-[5vw] justify-end pt-0 md:pt-[6vh] pr-0 md:pr-[4vw] text-[1.05rem] md:text-[1.28rem] leading-[1.45]'>
            <div className='max-w-[30rem]'>
              <p>
                Solvari designs and builds technology for the real world: custom software, AI systems, platforms, and digital infrastructure for enterprise and public-interest organizations.
              </p>
              <p className='mt-[2.5vh] md:mt-[5vh]'>
                We bring research, design, engineering, and responsible AI together under one roof, so every system we ship is built around the people it serves.
              </p>
            </div>
            <div className='max-w-[30rem]'>
              <p>
                Every project starts with understanding: the people, environments, and constraints around the problem. That evidence shapes what we design and how we build it.
              </p>
              <p className='mt-[2.5vh] md:mt-[5vh]'>
                Rather than stopping at recommendations, we take research into action—engineering, shipping, and evaluating technology in the real world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-[#D9D9D9] mx-[5vw] md:mx-[4vw] my-[6vh] md:my-[10vh]'></div>

      {/* Our Philosophy / What Drives Us */}
      <div className='w-full px-[5vw] md:px-[4vw] py-[4vh] md:py-[6vh]'>
        <div className='flex flex-col md:flex-row items-start justify-between mb-[6vh] md:mb-[10vh] gap-[2vh]'>
          <h2 className='text-[2.4rem] sm:text-[3.5rem] md:text-[5rem] font-gilroy-medium leading-[1.06] text-black'>
            What Drives Us ?
          </h2>
          <p className='text-[#787878] text-[1.1rem] md:text-[1.35rem] max-w-[34rem] leading-[1.4]'>
            We start with questions, not solutions. Research gives us the insight; design gives it direction; technology gives it life.
          </p>
        </div>

        {/* 4 Pillars Table */}
        <div className='w-full border-t border-[#D9D9D9]'>
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className='w-full py-[3.5vh] md:py-[4.5vh] border-b border-[#D9D9D9] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start'
            >
              <div className='md:col-span-2 text-[1.5rem] md:text-[2rem] font-gilroy-light text-[#9E9E9E]'>
                {pillar.num}
              </div>
              <div className='md:col-span-4'>
                <h3 className='text-[1.5rem] md:text-[2rem] font-gilroy-medium text-black leading-[1.18]'>
                  {pillar.title}
                </h3>
                <p className='text-[0.88rem] text-[#787878] mt-1'>
                  {pillar.summary}
                </p>
              </div>
              <div className='md:col-span-6'>
                <p className='text-[1rem] md:text-[1.15rem] text-black leading-[1.45]'>
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Portrait Video & Culture Section */}
      <div className='w-full px-[5vw] md:px-[4vw] py-[6vh] md:py-[12vh] flex flex-col md:flex-row items-stretch justify-between gap-[5vh]'>
        <div className='w-full md:w-[44vw] flex flex-col justify-between py-[1vh] gap-[4vh]'>
          <div>
            <div className='flex items-center gap-2.5 text-[0.88rem] md:text-[0.95rem] font-gilroy-medium text-black mb-[2vh] uppercase tracking-[0.08em]'>
              <span>+</span>
              <span>[&nbsp;STUDIO CULTURE&nbsp;]</span>
            </div>
            <p className='text-[#787878] text-[1.35rem] sm:text-[1.7rem] md:text-[2.2rem] font-gilroy-medium leading-[1.38]'>
              We look closer, challenge assumptions, and dig into the context before we build. We partner with organizations that care deeply about both technical excellence and human outcomes.
            </p>
          </div>

          <div className='pb-[1vh] md:pb-[2vh]'>
            <h3 className='text-[1.45rem] sm:text-[1.8rem] md:text-[2.2rem] font-gilroy-medium leading-[1.2] text-black max-w-[32rem] mb-[3vh]'>
              The result is better decisions, better systems, and technology built with intention.
            </h3>
            <div className='flex flex-wrap gap-3'>
              <button
                type="button"
                onClick={() => onNavigate?.('/work')}
                className='flex items-center gap-[0.55rem] bg-[#f4f4f4] hover:bg-black hover:text-white transition-all px-4 py-2.5 text-[0.8rem] font-gilroy-medium text-black cursor-pointer rounded-[2px] tracking-wide'
              >
                <span>EXPLORE OUR WORK</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('/contact')}
                className='flex items-center gap-[0.55rem] bg-black text-white hover:bg-[#f4f4f4] hover:text-black transition-all px-4 py-2.5 text-[0.8rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-wide'
              >
                <span>WORK WITH US</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className='w-full md:w-[40vw] h-[52vh] sm:h-[65vh] md:h-[82vh] flex justify-end items-stretch'>
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

      {/* Marquee Ticker */}
      <div className='w-full overflow-hidden bg-[#03fdf0] py-[0.5vh] select-none'>
        <div className='animate-marquee whitespace-nowrap flex items-center'>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`about-ticker-a-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                HUMAN FIRST. ALWAYS.&nbsp;&nbsp;—&nbsp;&nbsp;SOLVARI STUDIO CHICAGO&nbsp;&nbsp;—
              </span>
            ))}
          </div>
          <div className='flex items-center shrink-0'>
            {[...Array(6)].map((_, i) => (
              <span key={`about-ticker-b-${i}`} className='text-[0.95rem] md:text-[1.15rem] font-gilroy-medium text-black tracking-[0.03em] mx-3'>
                HUMAN FIRST. ALWAYS.&nbsp;&nbsp;—&nbsp;&nbsp;SOLVARI STUDIO CHICAGO&nbsp;&nbsp;—
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Based in Chicago & Footer */}
      <div className='w-full mt-[8vh] md:mt-[14vh]'>
        <div className='px-[5vw] md:px-[4vw]'>
          <h2 className='text-[2.4rem] sm:text-[3.5rem] md:text-[5.5rem] font-gilroy-medium leading-[1.08] text-black'>
            Based in the heart <br />
            of Chicago
          </h2>

          <div className='w-full flex justify-start md:justify-end mt-[2.5vh] md:mt-[6vh] mb-[1.5vh] md:mb-[2vh]'>
            <p className='text-[0.88rem] sm:text-[1.1rem] md:text-[1.3rem] font-gilroy-medium text-black tracking-wide'>
              41.8818° N latitude and -87.6232° W longitude
            </p>
          </div>
        </div>

        <div className='w-full px-[5vw] md:px-[4vw]'>
          <img
            src={footerImg}
            alt="Chicago skyline along the water"
            className='w-full h-[35vh] sm:h-[50vh] md:h-[70vh] object-cover block select-none'
          />
        </div>

        <div className='w-full px-[5vw] md:px-[4vw] mt-[6vh] md:mt-[12vh] mb-[6vh] md:mb-[10vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vh] sm:gap-0'>
          <h2 className='text-[1.9rem] sm:text-[2.5rem] md:text-[3.4rem] font-gilroy-bold leading-[1.15] text-black'>
            Let's talk about what <br />
            comes next.
          </h2>

          <button
            type="button"
            onClick={() => onNavigate?.('/contact')}
            className='flex items-center gap-[0.65rem] bg-black text-white hover:bg-[#f4f4f4] hover:text-black transition-all px-6 py-3.5 text-[0.9rem] md:text-[0.95rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-wide'
          >
            <span>Get in touch</span>
            <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className='border-t border-[#D9D9D9] mx-[5vw] md:mx-[4vw]'></div>

        <div className='w-full px-[5vw] md:px-[4vw] py-[2.5vh] md:py-[2.8vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-[0.75rem] md:text-[0.82rem] font-gilroy-medium uppercase tracking-[0.1em] text-black'>
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

export default AboutUsPage

