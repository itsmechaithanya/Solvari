import React, { useState, useEffect } from 'react'
import footerImg from '../assets/footer.png'
import BlurReveal from './BlurReveal'

const INTEREST_OPTIONS = [
  'Applied Research',
  'Participatory & System Design',
  'Software Development',
  'AI Systems & Evaluation',
  'Strategy & Governance',
  'General Inquiry',
]

function ContactPage() {
  const [chicagoTime, setChicagoTime] = useState('[ 05 : 34 : 58 ]')
  const [selectedInterests, setSelectedInterests] = useState(['Applied Research'])
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

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

  const toggleInterest = (item) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div data-page className='font-gilroy-medium text-[var(--c-ffffff)] min-h-screen flex flex-col justify-between'>
      {/* Hero & Main Contact Grid */}
      <div className='w-full px-[5vw] md:px-[4vw] pt-[16vh] md:pt-[20vh] pb-[10vh]'>
        <div className='flex items-center justify-between mb-[3vh]'>
          <span className='text-[var(--c-878787)] text-[1rem] md:text-[1.2rem] uppercase tracking-[0.12em]'>
            [&nbsp;CONTACT&nbsp;]
          </span>
          <span className='text-[0.95rem] md:text-[1.1rem] text-[var(--c-808080)] tabular-nums'>
            Chicago {chicagoTime}
          </span>
        </div>

        <BlurReveal as='h1' className='text-[2.6rem] sm:text-[3.8rem] md:text-[5.5rem] font-gilroy-medium leading-[1.06] text-[var(--c-ffffff)] mb-[8vh] md:mb-[12vh]'>
          Let's talk about what <br className='hidden md:inline' />
          comes next.
        </BlurReveal>

        <div className='border-t border-[var(--c-3d3d3d)] pt-[6vh] md:pt-[8vh] grid grid-cols-1 lg:grid-cols-12 gap-[6vh] lg:gap-[6vw]'>
          {/* Left Column: Direct Details */}
          <div className='lg:col-span-5 flex flex-col justify-between gap-[5vh]'>
            <div className='flex flex-col gap-[4vh]'>
              <div>
                <span className='text-[0.78rem] uppercase tracking-[0.14em] text-[var(--c-878787)] block mb-2'>
                  Direct Email
                </span>
                <a
                  href="mailto:hello@solvari.com"
                  className='text-[1.5rem] sm:text-[1.85rem] md:text-[2.2rem] font-gilroy-bold text-[var(--c-ffffff)] hover:opacity-60 transition-opacity inline-flex items-center gap-2'
                >
                  <span>hello@solvari.com</span>
                  <svg className="w-5 h-5 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div>
                <span className='text-[0.78rem] uppercase tracking-[0.14em] text-[var(--c-878787)] block mb-2'>
                  Studio Location
                </span>
                <p className='text-[1.25rem] md:text-[1.5rem] text-[var(--c-ffffff)] leading-[1.35]'>
                  Chicago, Illinois <br />
                  <span className='text-[var(--c-878787)] text-[1rem] md:text-[1.1rem]'>
                    41.8818° N latitude, -87.6232° W longitude
                  </span>
                </p>
              </div>

              <div>
                <span className='text-[0.78rem] uppercase tracking-[0.14em] text-[var(--c-878787)] block mb-2'>
                  Connect
                </span>
                <div className='flex items-center gap-6 text-[1.1rem] text-[var(--c-ffffff)]'>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='hover:opacity-60 transition-opacity inline-flex items-center gap-1.5'
                  >
                    <span>LinkedIn</span>
                    <span>+</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='hover:opacity-60 transition-opacity inline-flex items-center gap-1.5'
                  >
                    <span>Instagram</span>
                    <span>+</span>
                  </a>
                </div>
              </div>
            </div>

            <p className='text-[var(--c-878787)] text-[1rem] md:text-[1.1rem] leading-[1.45] max-w-[28rem]'>
              Whether you are exploring a new research initiative, building a custom platform or AI system, or looking for strategic advisory, we would love to hear from you.
            </p>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className='lg:col-span-7'>
            {submitted ? (
              <div className='w-full bg-[var(--c-070707)] p-8 md:p-12 rounded-[2px] flex flex-col items-start justify-between gap-6'>
                <span className='text-[0.8rem] uppercase tracking-[0.14em] text-[var(--c-878787)]'>
                  [&nbsp;INQUIRY RECEIVED&nbsp;]
                </span>
                <h2 className='text-[1.8rem] md:text-[2.4rem] font-gilroy-bold leading-[1.15] text-[var(--c-ffffff)]'>
                  Thank you{formData.name ? `, ${formData.name}` : ''}. We'll be in touch shortly.
                </h2>
                <p className='text-[var(--c-878787)] text-[1.05rem] leading-[1.45] max-w-[34rem]'>
                  Our team in Chicago reviews every message personally and typically responds within two business days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', organization: '', email: '', message: '' })
                  }}
                  className='mt-2 flex items-center gap-[0.55rem] bg-[var(--c-ffffff)] text-[var(--c-000000)] hover:bg-[var(--c-1a1a1a)] hover:text-[var(--c-ffffff)] transition-all px-5 py-3 text-[0.82rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-wide uppercase'
                >
                  <span>Send another message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='w-full flex flex-col gap-[4vh]'>
                {/* Area of Interest Pills */}
                <div>
                  <label className='text-[0.8rem] uppercase tracking-[0.12em] text-[var(--c-878787)] block mb-3'>
                    01 / What can we help you with?
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {INTEREST_OPTIONS.map((item) => {
                      const active = selectedInterests.includes(item)
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`px-3.5 py-2 text-[0.8rem] tracking-wide rounded-[2px] cursor-pointer transition-colors ${
                            active
                              ? 'bg-[var(--c-ffffff)] text-[var(--c-000000)]'
                              : 'bg-[var(--c-0b0b0b)] text-[var(--c-ffffff)] hover:bg-[var(--c-171717)]'
                          }`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name & Organization */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-[3vh] sm:gap-[2vw]'>
                  <div className='flex flex-col'>
                    <label className='text-[0.8rem] uppercase tracking-[0.12em] text-[var(--c-878787)] mb-2'>
                      02 / Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className='w-full border-b border-[var(--c-3d3d3d)] focus:border-[var(--c-ffffff)] py-3 text-[1.1rem] text-[var(--c-ffffff)] placeholder:text-[var(--c-424242)] outline-none transition-colors bg-transparent'
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label className='text-[0.8rem] uppercase tracking-[0.12em] text-[var(--c-878787)] mb-2'>
                      03 / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company or Institution"
                      className='w-full border-b border-[var(--c-3d3d3d)] focus:border-[var(--c-ffffff)] py-3 text-[1.1rem] text-[var(--c-ffffff)] placeholder:text-[var(--c-424242)] outline-none transition-colors bg-transparent'
                    />
                  </div>
                </div>

                {/* Email */}
                <div className='flex flex-col'>
                  <label className='text-[0.8rem] uppercase tracking-[0.12em] text-[var(--c-878787)] mb-2'>
                    04 / Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@organization.com"
                    className='w-full border-b border-[var(--c-3d3d3d)] focus:border-[var(--c-ffffff)] py-3 text-[1.1rem] text-[var(--c-ffffff)] placeholder:text-[var(--c-424242)] outline-none transition-colors bg-transparent'
                  />
                </div>

                {/* Project / Context */}
                <div className='flex flex-col'>
                  <label className='text-[0.8rem] uppercase tracking-[0.12em] text-[var(--c-878787)] mb-2'>
                    05 / Project Context & Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the problem, timeline, and the people this work will serve..."
                    className='w-full border-b border-[var(--c-3d3d3d)] focus:border-[var(--c-ffffff)] py-3 text-[1.1rem] text-[var(--c-ffffff)] placeholder:text-[var(--c-424242)] outline-none transition-colors bg-transparent resize-none'
                  />
                </div>

                <div className='pt-2 flex justify-start'>
                  <button
                    type="submit"
                    className='flex items-center gap-[0.65rem] bg-[var(--c-ffffff)] text-[var(--c-000000)] hover:bg-[var(--c-0b0b0b)] hover:text-[var(--c-ffffff)] transition-all px-6 py-3.5 text-[0.88rem] font-gilroy-medium cursor-pointer rounded-[2px] tracking-[0.08em] uppercase'
                  >
                    <span>Send Inquiry</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Chicago Skyline & Bottom Bar */}
      <div className='w-full mt-[4vh]'>
        <div className='w-full px-[5vw] md:px-[4vw] mb-[6vh]'>
          <img
            src={footerImg}
            alt="Chicago skyline along the water"
            className='w-full h-[30vh] sm:h-[42vh] md:h-[55vh] object-cover block select-none'
          />
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

export default ContactPage

