import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// data-anim="type:delay" -> one-off reveal when the element enters the viewport
const REVEALS = {
  up: [{ y: 60, opacity: 0 }, { y: 0, opacity: 1 }],
  left: [{ x: -90, opacity: 0 }, { x: 0, opacity: 1 }],
  right: [{ x: 90, opacity: 0 }, { x: 0, opacity: 1 }],
  rise: [{ yPercent: 115 }, { yPercent: 0 }],
  wipe: [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }],
  curtain: [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)' }],
  pop: [{ scale: 0.5, opacity: 0, rotate: -10 }, { scale: 1, opacity: 1, rotate: 0 }],
}

export default function useScrollAnimations(scope) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-anim]').forEach((el) => {
        const [type, delay] = el.dataset.anim.split(':')
        const [from, to] = REVEALS[type]
        gsap.fromTo(el, from, {
          ...to,
          delay: Number(delay) || 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // data-stagger on a parent -> children rise in one after another
      gsap.utils.toArray('[data-stagger]').forEach((box) => {
        gsap.fromTo(box.children, { y: 50, opacity: 0 }, {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: box, start: 'top 85%', once: true },
        })
      })

      // data-parallax="-12" -> element drifts (percent) while its parent scrolls past
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax),
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // data-count="18400" -> number counts up when visible
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const state = { v: 0 }
        gsap.to(state, {
          v: Number(el.dataset.count),
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => (el.textContent = Math.round(state.v).toLocaleString('en-IN')),
        })
      })
    }, scope)

    const refresh = () => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }
    const timers = [setTimeout(refresh, 60), setTimeout(refresh, 800), setTimeout(refresh, 2000)]
    window.addEventListener('load', refresh)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [scope])
}
