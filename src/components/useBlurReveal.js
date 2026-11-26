import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Page-wide scroll-scrubbed blur reveal (Luke Baffait style).
// Finds every text block inside `rootRef`, splits it into words, and each word
// goes from blurred + faded to sharp as you scroll. Scrolling up reverses it.
//
// Opt an element (and everything inside it) out with: data-no-reveal
//
// Tweak to taste:
//   selector – which elements get the effect
//   blur     – starting blur in px
//   opacity  – starting opacity
//   start / end – ScrollTrigger positions for each block
export default function useBlurReveal(
  rootRef,
  {
    selector = 'h1, h2, h3, h4, p',
    blur = 12,
    opacity = 0.15,
    start = 'top 88%',
    end = 'bottom 55%',
  } = {}
) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const restore = [] // [wrapperSpan, originalTextNode]
    const blocks = Array.from(root.querySelectorAll(selector)).filter(
      (el) =>
        !el.closest('[data-no-reveal]') &&
        // skip blocks nested in another block (e.g. <p> inside <h2>)
        !el.parentElement?.closest(selector)
    )

    blocks.forEach((block) => {
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT)
      const textNodes = []
      while (walker.nextNode()) {
        if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode)
      }
      textNodes.forEach((node) => {
        const wrapper = document.createElement('span')
        wrapper.style.display = 'contents'
        node.nodeValue.split(/(\s+)/).forEach((part) => {
          if (!part) return
          if (!part.trim()) {
            wrapper.appendChild(document.createTextNode(part))
          } else {
            const w = document.createElement('span')
            w.className = 'br-word'
            w.style.display = 'inline-block'
            w.style.willChange = 'filter, opacity, transform'
            w.textContent = part
            wrapper.appendChild(w)
          }
        })
        node.parentNode.replaceChild(wrapper, node)
        restore.push([wrapper, node])
      })
    })

    const ctx = gsap.context(() => {
      blocks.forEach((block) => {
        const words = block.querySelectorAll('.br-word')
        if (!words.length) return
        gsap.fromTo(
          words,
          { filter: `blur(${blur}px)`, opacity, yPercent: 8 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            yPercent: 0,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: { trigger: block, start, end, scrub: 0.6 },
          }
        )
      })
    }, root)

    // recalc positions once images/videos have loaded
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 500)

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
      ctx.revert()
      // put React's original text nodes back
      restore.forEach(([wrapper, node]) => {
        if (wrapper.parentNode) wrapper.parentNode.replaceChild(node, wrapper)
      })
    }
  }, [rootRef, selector, blur, opacity, start, end])
}
