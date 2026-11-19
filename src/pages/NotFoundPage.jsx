import { useLayoutEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const FLOATERS = [
  ['fa-map-location-dot', 'a'], ['fa-ticket', 'b'], ['fa-route', 'c'], ['fa-calendar-xmark', 'd'],
  ['fa-signs-post', 'e'], ['fa-magnifying-glass-location', 'f'], ['fa-compass', 'g'],
]

export default function NotFoundPage() {
  const root = useRef(null)
  const navigate = useNavigate()
  const { key } = useLocation()

  // "default" means this was the first page opened, so there is nothing to go back to
  const goBack = () => (key === 'default' ? navigate('/') : navigate(-1))

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.nf__digit', { yPercent: 130, rotate: 10, stagger: 0.12, duration: 1.1 })
        .from('.nf__copy > *', { y: 24, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.5)
        .from('.nf__float', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'back.out(2)' }, 0.3)
      gsap.to('.nf__float', { y: 'random(-18, 18)', x: 'random(-10, 10)', rotate: 'random(-14, 14)', duration: 'random(2.2, 3.6)', repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.nf__spin', { rotate: 360, duration: 14, repeat: -1, ease: 'none' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <main className="nf" ref={root}>
      {FLOATERS.map(([icon, pos]) => (
        <span key={icon} className={`nf__float nf__float--${pos}`} aria-hidden="true"><i className={`fa-solid ${icon}`} /></span>
      ))}

      <div className="nf__inner">
        <h1 className="nf__code" aria-label="Error 404">
          <span className="line"><span className="nf__digit">4</span></span>
          <span className="line"><span className="nf__digit nf__digit--ring"><i className="fa-solid fa-compass nf__spin" /></span></span>
          <span className="line"><span className="nf__digit">4</span></span>
        </h1>
        <div className="nf__copy">
          <p className="nf__tag"><i className="fa-solid fa-triangle-exclamation" /> Page not found</p>
          <h2>Looks like you took a wrong turn.</h2>
          <p>This page does not exist yet. Head back home, or return to where you were.</p>
          <div className="nf__actions">
            <Link to="/" className="btn btn--copper"><i className="fa-solid fa-house" /> Back to Home</Link>
            <button type="button" className="btn btn--ghost" onClick={goBack}><i className="fa-solid fa-arrow-left" /> Go Back</button>
          </div>
        </div>
      </div>
    </main>
  )
}
