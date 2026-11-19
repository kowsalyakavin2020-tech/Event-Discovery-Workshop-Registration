import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { BRAND } from '../../data/site'

const ICONS = ['fa-microphone-lines', 'fa-chalkboard-user', 'fa-calendar-days', 'fa-ticket', 'fa-people-group']

export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    document.body.classList.add('no-scroll')
    const ctx = gsap.context(() => {
      const progress = { v: 0 }
      const percent = root.current.querySelector('.pre__percent')
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('no-scroll')
          onDone()
        },
      })
      tl.from('.pre__icon', { scale: 0, rotate: -120, stagger: 0.15, duration: 0.6, ease: 'back.out(2.2)' })
        .fromTo('.pre__logo', { clipPath: 'inset(0 100% 0 0)', y: 20 }, { clipPath: 'inset(0 0% 0 0)', y: 0, duration: 0.9, ease: 'power4.out' }, 0.2)
        .to(progress, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => (percent.textContent = Math.round(progress.v)) }, 0)
        .to('.pre__bar i', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
        .to('.pre__icon', { y: -14, stagger: { each: 0.12, repeat: 1, yoyo: true }, duration: 0.35, ease: 'power2.out' }, 0.9)
        .add(onReveal, '+=0.1')
        .to('.pre__inner', { opacity: 0, y: -30, duration: 0.4 }, '<')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '<0.1')
    }, root)
    return () => {
      ctx.revert()
      document.body.classList.remove('no-scroll')
    }
  }, [onDone, onReveal])

  return (
    <div className="pre" ref={root} role="status" aria-label="Loading">
      <div className="pre__inner">
        <div className="pre__icons" aria-hidden="true">
          {ICONS.map((icon) => (
            <span key={icon} className="pre__icon"><i className={`fa-solid ${icon}`} /></span>
          ))}
        </div>
        <img className="pre__logo" src={`${import.meta.env.BASE_URL}images/logo-light.png`} alt={BRAND.name} />
        <div className="pre__meter">
          <div className="pre__bar"><i /></div>
          <span className="pre__percent">0</span>
        </div>
      </div>
    </div>
  )
}
