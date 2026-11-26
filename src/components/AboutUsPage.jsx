import React, { useState, useEffect } from 'react'
import heroImg from '../assets/about-hero.png'
import culture1Img from '../assets/about-culture1.jpg'
import culture2Img from '../assets/about-culture2.png'
import culture3Img from '../assets/about-culture3.png'
import teamImg from '../assets/about-team.png'
import chicagoImg from '../assets/about-chicago.png'

/*
 * About page — replicated from the Figma "About" frame (1280px wide).
 * Desktop (md+) sizes are written in vw so that 1vw = 12.8px at the
 * 1280 design width, i.e. the layout matches Figma exactly at 1280 and
 * scales proportionally on other desktop widths. Small text uses max()
 * so it never becomes unreadable; phones get a stacked layout.
 */

const coreValues = [
  {
    label: '[ Core Value 01 ]',
    title: 'START WITH PEOPLE',
    titleWidth: 'md:w-[21.875vw]',
    body: 'Technology is never the starting point. People are. We take the time to understand who a system serves, what shapes their experience, and where things can go wrong. We question assumptions, look closer, and design from real human needs rather than convenient answers.',
  },
  {
    label: '[ Core Value 02 ]',
    title: 'CONTEXT MATTERS',
    titleWidth: 'md:w-[21.875vw]',
    body: 'Nothing exists in isolation. Every technology sits inside a larger system, shaped by environments, constraints, cultures, and consequences. We look beyond the interface to understand the conditions around it. Because better solutions come from seeing the whole picture.',
  },
  {
    label: '[ Core Value 03 ]',
    title: 'RESEARCH INTO ACTION',
    titleWidth: 'md:w-[25.156vw]',
    body: 'Research should not end in a report. We turn evidence into something people can use, experience, and build upon. We test ideas, challenge what we find, and keep refining until insight becomes meaningful action. The goal is not more research. It is better outcomes.',
  },
  {
    label: '[ Core Value 04 ]',
    title: 'BUILD WITH FORESIGHT',
    titleWidth: 'md:w-[21.875vw]',
    body: 'Good design considers what happens next. We think beyond the immediate solution to the systems, behaviors, and consequences it may create. We build with accountability, intention, and the long term in mind — because technology should move the world forward, not simply move fast.',
  },
]

const team = [
  { name: 'Jay L. Cunningham', role: '( Research Scientist )' },
  { name: 'Devsen', role: '( Software Developer )' },
  { name: 'Chaithanya', role: '( Designer )' },
  { name: 'Tim Koree', role: '( General Manager )' },
  { name: 'Jort Boot', role: '( Project Manager )' },
]

function useChicagoTime() {
  const [time, setTime] = useState('[ 05 : 34 : 58 ]')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
    const update = () => {
      const parts = formatter.formatToParts(new Date())
      const get = (type) => parts.find((p) => p.type === type)?.value || '00'
      setTime(`[ ${get('hour')} : ${get('minute')} : ${get('second')} ]`)
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return time
}

/* Full-width rule (Figma: 1201px wide, starting at x=40) */
function Rule({ light = false }) {
  return <div className={`mx-5 md:mx-[3.125vw] border-t ${light ? 'border-[var(--c-3d3d3d)]' : 'border-[var(--c-ffffff)]'}`} />
}

/* "CHICAGO BASED  [time]  ...  Instagram +  LinkedIn +" strip */
function InfoBar({ time }) {
  const cls = 'font-gilroy-medium text-[var(--c-ffffff)] leading-[1.04] tracking-[-0.04em] text-[length:max(11px,0.9375vw)]'
  return (
    <div>
      <Rule />
      <div className='flex items-start justify-between px-5 md:pl-[5.156vw] md:pr-[4.922vw] pt-4 md:pt-[1.5625vw]'>
        <div className='flex items-start gap-6 md:gap-0'>
          <span className={`${cls} md:w-[12.734vw]`}>CHICAGO BASED</span>
          <span className={`${cls} tabular-nums whitespace-pre`}>{time}</span>
        </div>
        <div className='flex items-start gap-5 md:gap-[3.828vw]'>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className={`${cls} md:w-[5.3125vw] hover:opacity-60 transition-opacity`}>
            Instagram +
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className={`${cls} md:w-[5.3125vw] hover:opacity-60 transition-opacity`}>
            LinkedIn +
          </a>
        </div>
      </div>
    </div>
  )
}

/* Image cropped exactly like the Figma fill (percent offsets of the frame) */
function CroppedImage({ src, alt, crop, className }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className='absolute max-w-none select-none pointer-events-none'
        style={crop}
        draggable={false}
      />
    </div>
  )
}

function AboutUsPage({ onNavigate }) {
  const chicagoTime = useChicagoTime()

  return (
    <div data-page className='font-gilroy-medium text-[var(--c-ffffff)] overflow-x-hidden'>
      {/* ───────── Hero: "LET'S TALK ABOUT US." with photo overlay ───────── */}
      <section className='relative w-full mt-[110px] md:mt-[19.453vw] aspect-[1280/520] overflow-x-clip'>
        <p className='absolute left-[32.734vw] bottom-[39.33vw] text-[var(--c-878787)] leading-[1.04] whitespace-nowrap text-[length:max(10px,1.25vw)]'>
          No Shortcuts.
        </p>
        <p className='absolute left-[63.984vw] top-[6.016vw] -translate-x-1/2 font-gilroy-bold uppercase whitespace-nowrap text-center leading-[1.04] text-[15.625vw]'>
          Let’s Talk About Us.
        </p>
        <img
          src={heroImg}
          alt='The Solvari team at work'
          className='absolute left-[31.016vw] top-[2.109vw] w-[37.969vw] h-[21.328vw] object-cover select-none'
          draggable={false}
        />
        <p className='absolute left-[62.5vw] top-[23.984vw] text-[var(--c-878787)] leading-[1.04] whitespace-nowrap text-[length:max(10px,1.25vw)]'>
          Full Heart.
        </p>
      </section>

      <InfoBar time={chicagoTime} />

      {/* ───────── Manifesto + culture strip ───────── */}
      <section className='px-5 md:px-[5.156vw] pt-16 md:pt-[11.953vw]'>
        <div className='md:min-h-[33.047vw] mb-12 md:mb-0'>
          <p className='font-gilroy-bold leading-[1.2] text-[length:max(22px,2.734vw)] md:w-[62.813vw]'>
            We’re a team that questions deeply, thinks sharply and builds with purpose. No assumptions, no autopilot. Everyone brings curiosity and pulls their weight. We research, challenge and make things real. The mindset is simple: stay curious, push forward, keep people at the center. If we’re in, we’re all in. There’s no other way.
          </p>
        </div>

        <p className='text-[var(--c-808080)] leading-[1.3] tracking-[-0.04em] whitespace-nowrap text-[length:max(14px,1.261vw)]'>
          ( Explore Our Culture )
        </p>
        <div className='mt-3 md:mt-[1.406vw] flex gap-[5px] md:gap-[0.391vw] w-full md:w-[38.906vw] aspect-[498/160]'>
          <CroppedImage
            src={culture1Img}
            alt='Solvari team culture'
            className='flex-[228] h-full'
            crop={{ height: '123.04%', left: '-9.5%', top: '-23.04%', width: '115.04%' }}
          />
          <div className='flex-[142] h-full'>
            <img src={culture2Img} alt='Solvari team culture' className='w-full h-full object-cover select-none' draggable={false} />
          </div>
          <div className='flex-[118] h-full'>
            <img src={culture3Img} alt='Solvari team culture' className='w-full h-full object-cover select-none' draggable={false} />
          </div>
        </div>
      </section>

      {/* ───────── Core values ───────── */}
      <section className='mt-20 md:mt-[13.125vw]'>
        {coreValues.map((value) => (
          <div key={value.label}>
            <Rule light />
            <div className='flex flex-col md:flex-row px-5 md:px-[5.156vw] py-10 md:py-0 md:h-[31.484vw] gap-6 md:gap-0'>
              <div className='md:w-[54.688vw] md:pt-[4.375vw]'>
                <p className='text-[var(--c-808080)] whitespace-nowrap text-[length:max(14px,1.25vw)]'>{value.label}</p>
                <h3 className={`mt-4 md:mt-[2.07vw] font-gilroy-bold leading-[1.2] text-[length:max(32px,3.906vw)] ${value.titleWidth}`}>
                  {value.title}
                </h3>
              </div>
              <p className='md:w-[30.391vw] md:pt-[6.836vw] leading-[1.2] text-[length:max(15px,1.25vw)]'>{value.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ───────── Team photo ───────── */}
      <section className='px-5 md:px-0 mt-4 md:mt-[4.219vw]'>
        <CroppedImage
          src={teamImg}
          alt='The Solvari team'
          className='w-full md:w-[90.156vw] mx-auto aspect-[1154/751]'
          crop={{ height: '214.23%', left: '-4.54%', top: '-64.22%', width: '104.54%' }}
        />
      </section>

      {/* ───────── The people you'll work with ───────── */}
      <section className='px-5 md:px-0 mt-20 md:mt-[11.953vw]'>
        <h2 className='md:ml-[6.172vw] md:w-[46.328vw] leading-[1.05] tracking-[-0.04em] text-[length:max(44px,7.031vw)]'>
          The people you’ll work with
        </h2>
        <p className='mt-8 md:mt-[6.406vw] md:ml-[6.172vw] md:w-[47.578vw] text-[var(--c-f8f8f8)] leading-[1.2] text-[length:max(18px,1.953vw)]'>
          We’re a thoughtful team that brings different disciplines to the same table. Researchers, designers, and technologists working closely, questioning assumptions, and building with intention. Everyone brings a different perspective, but the goal stays shared: make technology work better for people, systems, and the world around them.
        </p>

        <ul className='mt-12 md:mt-[10.625vw] md:ml-[34.922vw] md:w-[60.156vw]'>
          {team.map((member, i) => (
            <li
              key={member.name}
              className={`flex items-start justify-between md:justify-start border-b border-[var(--c-3d3d3d)] pb-5 md:pb-[2.578vw] ${i === 0 ? '' : 'pt-5 md:pt-[2.891vw]'}`}
            >
              <span className='md:w-[38.125vw] leading-[1.2] text-[length:max(18px,1.953vw)]'>{member.name}</span>
              <span className='mt-1 md:mt-[0.391vw] text-[var(--c-808080)] whitespace-nowrap text-[length:max(13px,1.25vw)]'>{member.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Based in Chicago ───────── */}
      <section className='px-5 md:px-0 mt-24 md:mt-[18.438vw]'>
        <h2 className='md:ml-[5.547vw] md:w-[59.922vw] leading-[1.05] tracking-[-0.04em] text-[length:max(44px,7.031vw)]'>
          Based in the heart of Chicago
        </h2>
        <p className='mt-6 md:mt-[5.938vw] md:ml-[66.719vw] whitespace-nowrap text-[length:max(13px,1.25vw)]'>
          41.8818° N latitude and -87.6232° W longitude
        </p>
        <CroppedImage
          src={chicagoImg}
          alt='Chicago skyline along the water'
          className='mt-3 md:mt-[1.133vw] w-full md:w-[89.922vw] mx-auto aspect-[1151/577]'
          crop={{ height: '149.46%', left: '-0.04%', top: '-18.79%', width: '100.07%' }}
        />
      </section>

      {/* ───────── CTA ───────── */}
      <section className='flex flex-col sm:flex-row items-start justify-between gap-6 px-5 md:pl-[6.016vw] md:pr-[5.703vw] pt-12 md:pt-[3.906vw] pb-16 md:pb-0 md:h-[19.688vw]'>
        <h2 className='font-gilroy-bold leading-[1.2] text-[length:max(26px,2.734vw)] md:w-[32.266vw]'>
          Let’s talk about what comes next.
        </h2>
        <button
          type='button'
          onClick={() => onNavigate?.('/contact')}
          className='group md:mt-[1.406vw] flex items-center justify-between shrink-0 bg-[var(--c-080808)] hover:bg-[var(--c-ffffff)] hover:text-[var(--c-000000)] transition-colors cursor-pointer h-[50px] w-[188px] md:h-[3.906vw] md:w-[14.688vw] pl-[21px] pr-[13px] md:pl-[1.641vw] md:pr-[1.016vw] text-[length:max(14px,1.25vw)]'
        >
          <span>Get In Touch</span>
          <svg className='size-6 md:size-[1.875vw]' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
            <path d='M7 8V17H16V15H10.41L16.71 8.71L15.29 7.29L9 13.59V8H7Z' />
          </svg>
        </button>
      </section>

      <div className='pb-10 md:pb-[3.555vw]'>
        <InfoBar time={chicagoTime} />
      </div>
    </div>
  )
}

export default AboutUsPage
