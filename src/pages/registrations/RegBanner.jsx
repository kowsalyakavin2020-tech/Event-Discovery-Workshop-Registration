import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { EVENTS } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'

const parts = (ms) => {
  const s = Math.max(Math.floor(ms / 1000), 0)
  return [['days', Math.floor(s / 86400)], ['hours', Math.floor(s / 3600) % 24], ['mins', Math.floor(s / 60) % 60], ['secs', s % 60]]
}

export default function RegBanner() {
  const root = useRef(null)
  const { registrations } = useRegistrations()
  const [now, setNow] = useState(() => Date.now())

  const next = useMemo(
    () => registrations.map((r) => EVENTS.find((e) => e.id === r.eventId)).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date))[0],
    [registrations],
  )
  const seats = registrations.reduce((sum, r) => sum + r.seats, 0)

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.rban__title .line > span', { yPercent: 120, duration: 1, stagger: 0.12 })
        .from('.rban__lead', { y: 24, opacity: 0, duration: 0.8 }, 0.4)
        .fromTo('.rban__tile', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, clearProps: 'transform,opacity' }, 0.6)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="rban" ref={root}>
      <img className="rban__bg" src={`${import.meta.env.BASE_URL}images/about-studio.webp`} alt="" />
      <div className="container rban__grid">
        <div>
          <p className="xban__crumb"><i className="fa-solid fa-ticket" /> My registrations</p>
          <h1 className="rban__title">
            <span className="line"><span>Your seats,</span></span>
            <span className="line"><span>all in one place.</span></span>
          </h1>
          <p className="rban__lead">Passes, dates and a countdown to your next session. Everything is saved in this browser.</p>
        </div>

        <div className="rban__panel">
          <div className="rban__tile">
            <i className="fa-solid fa-calendar-check" />
            <b>{registrations.length}</b>
            <span>{registrations.length === 1 ? 'booking' : 'bookings'}</span>
          </div>
          <div className="rban__tile">
            <i className="fa-solid fa-chair" />
            <b>{seats}</b>
            <span>{seats === 1 ? 'seat reserved' : 'seats reserved'}</span>
          </div>
          <div className="rban__tile rban__tile--wide">
            <i className="fa-regular fa-hourglass-half" />
            {next ? (
              <>
                <span className="rban__next">Next: {next.title}</span>
                <div className="rban__clock">
                  {parts(new Date(`${next.date}T00:00:00`).getTime() - now).map(([label, value]) => (
                    <p key={label}><b>{String(value).padStart(2, '0')}</b><small>{label}</small></p>
                  ))}
                </div>
              </>
            ) : (
              <span className="rban__next">Book a session to start your countdown.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
