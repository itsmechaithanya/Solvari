import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logo from '../assets/logo.svg'

const CLIP =
  'polygon(8px 0, calc(100% - 8px) 0, calc(100% - 8px) 0px, calc(100% - 7.391px) 3.061px, calc(100% - 5.657px) 5.657px, calc(100% - 3.061px) 7.391px, 100% 8px, 100% calc(100% - 8px), 100% calc(100% - 8px), calc(100% - 3.061px) calc(100% - 7.391px), calc(100% - 5.657px) calc(100% - 5.657px), calc(100% - 7.391px) calc(100% - 3.061px), calc(100% - 8px) 100%, 8px 100%, 8px 100%, 7.391px calc(100% - 3.061px), 5.657px calc(100% - 5.657px), 3.061px calc(100% - 7.391px), 0px calc(100% - 8px), 0 8px, 0px 8px, 3.061px 7.391px, 5.657px 5.657px, 7.391px 3.061px, 8px 0px)'

const NAV_LINKS = [
  { text: 'Work', href: '/work' },
  { text: 'About Us', href: '/about' },
  { text: 'Contact', href: '/contact' },
]

const SOCIAL_LINKS = [
  { text: 'LinkedIn', href: 'https://linkedin.com' },
  { text: 'Instagram', href: 'https://instagram.com' },
]

const ArrowIcon = () => (
  <svg width="100%" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.06978 1.94975L12.9693 1.94973L12.9693 11.8492M0.948451 13.9705L12.6157 2.3033"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Two-bar hamburger that turns into an X (same timing as hamburger-react in the original)
function Burger({ open }) {
  const bar = {
    background: 'currentColor',
    height: 2,
    left: 14,
    position: 'absolute',
    width: 20,
    transition: 'transform 0.4s cubic-bezier(0, 0, 0, 1), background-color 0.3s ease',
  }
  return (
    <div style={{ position: 'relative', width: 48, height: 48 }}>
      <div style={{ ...bar, top: 19, transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} />
      <div style={{ ...bar, top: 27, transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
    </div>
  )
}

function Menu({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1280px)')

  const rootRef = useRef(null)
  const cursorRef = useRef(null)
  const logoRef = useRef(null)
  const navBarRef = useRef(null)

  // Light / dark theme switch. Site is designed dark; light mode flips it back with a CSS filter (see index.css)
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('solvari-theme') !== 'light' } catch { return true }
  })
  // Animated theme change: same pace (1.5s) and blur style as the scroll reveals.
  // The page inverts gradually while blurring up to 12px at the midpoint, then sharpens again.
  const themeFx = useRef({ inv: null, blur: 0 })
  useEffect(() => {
    const html = document.documentElement
    const fx = themeFx.current
    const target = isDark ? 0 : 1
    const apply = () => {
      html.style.setProperty('--inv', fx.inv)
      html.style.setProperty('--theme-blur', `${fx.blur}px`)
    }
    try { localStorage.setItem('solvari-theme', isDark ? 'dark' : 'light') } catch { /* storage unavailable */ }
    html.classList.toggle('theme-is-light', !isDark)

    // first load: jump straight to the saved theme
    if (fx.inv === null || fx.inv === target) {
      fx.inv = target
      apply()
      html.classList.toggle('theme-fx', target === 1)
      return
    }

    html.classList.add('theme-fx')
    const tl = gsap.timeline({
      onUpdate: apply,
      onComplete: () => {
        apply()
        if (target === 0) html.classList.remove('theme-fx')
      },
    })
    tl.to(fx, { inv: target, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to(fx, { blur: 12, duration: 0.75, ease: 'power2.in' }, 0)
      .to(fx, { blur: 0, duration: 0.75, ease: 'power2.out' }, 0.75)
    return () => tl.kill()
  }, [isDark])

  // Hide navbar to -(navbar height) on scroll down, bring it back to 0 on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    let isHidden = false

    const showNav = () => {
      if (!isHidden) return
      isHidden = false
      gsap.to([logoRef.current, navBarRef.current], {
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const hideNav = () => {
      if (isHidden) return
      isHidden = true
      const logoEl = logoRef.current
      const navHeight = logoEl ? logoEl.offsetTop + logoEl.offsetHeight + 8 : 88
      gsap.to([logoRef.current, navBarRef.current], {
        y: -navHeight,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    if (isOpen) {
      showNav()
      return
    }

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY

      if (currentY <= 10 || delta < -2) {
        showNav()
      } else if (delta > 2 && currentY > 20) {
        hideNav()
      }

      lastScrollY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isOpen])

  // Panel grow/shrink + overlay fade
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      if (isOpen) {
        tl.set('.nav-overlay', { opacity: 0 }, 0)
          .to('.nav-overlay', { opacity: 1, duration: 0.5 }, 0)
          .to(
            '.menu-panel',
            { height: '92dvh', width: isMobile ? '100%' : isTablet ? '40vw' : '28vw', duration: 0.5 },
            0
          )
      } else {
        tl.to('.menu-panel', { height: '2.75rem', width: '2.75rem', duration: 0.5 }, 0).to(
          '.nav-overlay',
          { opacity: 0, duration: 0.5 },
          0
        )
      }
    }, rootRef)
    return () => ctx.kill()
  }, [isOpen, isMobile, isTablet])

  // Links / socials / divider lines
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      if (isOpen) {
        tl.set('.nav-item', { y: '-2rem', opacity: 0 }, 0)
          .set('.social-item', { y: '-2rem', opacity: 0 }, 0)
          .set('.nav-item-line', { scaleX: 0 }, 0)
          .to('.nav-item', { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, 0)
          .to('.social-item', { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, 0.2)
          .to('.nav-item-line', { scaleX: 1, stagger: 0.05, ease: 'power2.out', duration: 0.5 }, 0.15)
      } else {
        tl.to('.nav-item', { y: '-2rem', opacity: 0, stagger: 0.05, duration: 0.5 }, 0)
          .to('.social-item', { y: '-2rem', opacity: 0, stagger: 0.05, duration: 0.5 }, 0)
          .set('.nav-item-line', { scaleX: 0 }, 0)
      }
    }, rootRef)
    return () => ctx.kill()
  }, [isOpen])

  // Escape closes
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Round "×" cursor that follows the pointer over the overlay (desktop only)
  useEffect(() => {
    const el = cursorRef.current
    if (!el || !isOpen || isMobile) {
      setShowCursor(false)
      return
    }
    gsap.set(el, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.22, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.22, ease: 'power3.out' })
    let raf = null
    let last = null

    const update = () => {
      raf = null
      if (!last) return
      if (last.pointerType === 'touch') return setShowCursor(false)
      xTo(last.clientX)
      yTo(last.clientY)
      const target = document.elementFromPoint(last.clientX, last.clientY)
      setShowCursor(!target?.closest("[data-menu-close-exclusion='true']"))
    }
    const onMove = (e) => {
      last = e
      if (raf === null) raf = requestAnimationFrame(update)
    }
    const onLeave = () => {
      if (raf !== null) cancelAnimationFrame(raf)
      raf = null
      last = null
      setShowCursor(false)
    }
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (raf !== null) cancelAnimationFrame(raf)
      setShowCursor(false)
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      opacity: showCursor ? 1 : 0,
      scale: showCursor ? 1 : 0.6,
      duration: 0.2,
      ease: 'power2.out',
    })
  }, [showCursor])

  const close = () => setIsOpen(false)

  const handleLinkClick = (e, href) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault()
      onNavigate(href)
    }
    close()
  }

  return (
    <div ref={rootRef} data-menu-root>
      <a
        ref={logoRef}
        href="/"
        onClick={(e) => handleLinkClick(e, '/')}
        aria-label="Solvari home"
        data-header-brand-logo="true"
        className="fixed left-[5vw] md:left-[4vw] top-5 md:top-6 h-11 z-[997] flex items-center -ml-4 pointer-events-auto select-none will-change-transform"
      >
        <img src={logo} alt="Solvari" className="h-12 md:h-14 w-auto object-contain block invert" />
      </a>

      <header
        style={{ pointerEvents: 'none' }}
        className="fixed z-[999] right-0 top-0 pt-5 md:pt-6 w-screen px-[5vw] md:px-[4vw] font-gilroy-medium selection:bg-white selection:text-black"
      >
        <div
          ref={navBarRef}
          className="relative flex justify-end h-[100dvh] z-20 pointer-events-none w-full will-change-transform"
        >
          <div data-menu-close-exclusion="true" className="relative w-full flex justify-end">
            {/* Theme switch (left of hamburger) */}
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setIsDark((v) => !v)}
              className="absolute right-[3.5rem] top-0 h-11 z-[18] flex items-center pointer-events-auto cursor-pointer"
            >
              <span className="relative block w-11 h-6 rounded-full bg-[#3a3a3a] transition-colors duration-300">
                <span
                  className={`absolute top-[2px] left-[2px] block size-5 rounded-full bg-black transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${isDark ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </span>
            </button>

            {/* Hamburger trigger */}
            <div className={`absolute overflow-hidden right-0 top-0 size-11 z-20 flex items-center justify-center pointer-events-auto transition-colors duration-300 ${isOpen ? 'text-black' : 'text-white'}`}>
              <span aria-hidden="true" className="relative z-[1] scale-75 pointer-events-none">
                <Burger open={isOpen} />
              </span>
              <button
                type="button"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="primary-navigation"
                onClick={() => setIsOpen((v) => !v)}
                className="absolute inset-0 z-10 cursor-pointer"
              />
            </div>

            {/* Expanding panel */}
            <div
              id="primary-navigation"
              aria-hidden={!isOpen}
              inert={!isOpen}
              style={{
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
              className={`menu-panel relative overflow-clip size-11 z-[19] rounded-lg origin-top-right will-change-[width,height] transition-colors duration-300 ${isOpen ? 'bg-[#E1E1E1]/80 backdrop-blur' : 'bg-transparent'}`}
            >
              <nav
                aria-label="Primary"
                className="w-full h-full relative flex flex-col justify-between pl-6 md:pl-10 pr-6 md:pr-16 z-[1] font-gilroy-medium"
              >
                <div className="flex flex-col w-full mt-16 md:mt-18 gap-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="nav-item opacity-0 will-change-transform group w-full flex flex-col gap-3 md:gap-4 text-[#A4A4A4] select-none font-gilroy-medium text-4xl md:text-6xl tracking-tight hover:text-black transition-colors duration-200 ease-out"
                    >
                      <div className="flex items-center justify-between">
                        <span className="group-hover:scale-105 transition-transform duration-200 ease-out origin-left">
                          {link.text}
                        </span>
                        <span style={{ transform: 'rotate(45deg)' }} className="block w-[0.85rem]">
                          <span className="block group-hover:translate-x-1 transition-transform duration-200 ease-out">
                            <ArrowIcon />
                          </span>
                        </span>
                      </div>
                      <div className="nav-item-line w-full h-px origin-left scale-x-0 bg-[#C7C7C7] will-change-transform" />
                    </a>
                  ))}
                </div>

                <div className="flex flex-col w-fit gap-1 tracking-tighter pb-8 md:pb-12 font-gilroy-medium">
                  <span className="social-item text-[#464646] mb-4 md:mb-8 select-none font-gilroy-medium">Media</span>
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-item group text-black font-gilroy-medium overflow-hidden relative flex flex-row items-center gap-2 md:gap-0 pr-4 will-change-transform"
                    >
                      <span className="block w-2 md:w-2.5 md:scale-0 group-hover:scale-100 transition-transform duration-200 ease-out text-black origin-left">
                        <ArrowIcon />
                      </span>
                      <span className="md:-translate-x-2.5 md:group-hover:translate-x-1 transition-transform duration-200 ease-out">
                        {link.text}
                      </span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Page overlay */}
        <div
          onClick={close}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          className="nav-overlay fixed opacity-0 left-0 top-0 z-10 w-screen h-screen md:cursor-none bg-white/70"
        />

        {/* Custom close cursor */}
        <div
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden size-12 items-center justify-center rounded-full bg-[#E1E1E1]/60 text-black opacity-0 backdrop-blur-xl will-change-transform md:flex"
        >
          <span className="absolute block h-px w-4 rotate-45 bg-current" />
          <span className="absolute block h-px w-4 -rotate-45 bg-current" />
        </div>
      </header>
    </div>
  )
}

export default Menu
