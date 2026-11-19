import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { EVENTS, formatDate, formatPrice } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'

export default function TicketList() {
  const root = useRef(null)
  const { registrations, cancel } = useRegistrations()
  const [confirming, setConfirming] = useState(null)

  const tickets = registrations
    .map((r) => ({ ...r, event: EVENTS.find((e) => e.id === r.eventId) }))
    .filter((t) => t.event)
    .sort((a, b) => a.event.date.localeCompare(b.event.date))

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ticket', { x: -70, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [tickets.length])

  return (
    <section className="section tickets" ref={root}>
      <div className="container">
        {tickets.length === 0 ? (
          <div className="empty empty--wide">
            <img src={`${import.meta.env.BASE_URL}images/experience-2.webp`} alt="" />
            <div>
              <h2>No seats reserved yet</h2>
              <p>When you register for a workshop, your pass shows up here with its code and date.</p>
              <Link to="/events" className="btn btn--copper"><i className="fa-solid fa-compass" /> Explore events</Link>
            </div>
          </div>
        ) : (
          <ul className="ticket__list">
            {tickets.map((t) => (
              <li key={t.id} className="ticket">
                <figure className="ticket__img"><img src={`${import.meta.env.BASE_URL}images/${t.event.image}.webp`} alt="" loading="lazy" /></figure>
                <div className="ticket__main">
                  <p className="ticket__cat">{t.event.category}</p>
                  <h3>{t.event.title}</h3>
                  <ul className="ticket__facts">
                    <li><i className="fa-regular fa-calendar" /> {formatDate(t.event.date)}, {t.event.time}</li>
                    <li><i className="fa-solid fa-location-dot" /> {t.event.city}</li>
                    <li><i className="fa-solid fa-chair" /> {t.seats} {t.seats > 1 ? 'seats' : 'seat'}</li>
                    <li><i className="fa-solid fa-indian-rupee-sign" /> {formatPrice(t.event.price * t.seats)}</li>
                  </ul>
                  <p className="ticket__who"><i className="fa-solid fa-user" /> {t.name}, {t.email}</p>
                </div>
                <div className="ticket__stub">
                  <small>Pass code</small>
                  <strong>{t.code}</strong>
                  {confirming === t.id ? (
                    <span className="ticket__confirm">
                      <button type="button" onClick={() => { cancel(t.id); setConfirming(null) }}>Yes, cancel</button>
                      <button type="button" onClick={() => setConfirming(null)}>Keep</button>
                    </span>
                  ) : (
                    <button type="button" className="ticket__cancel" onClick={() => setConfirming(t.id)}>
                      <i className="fa-solid fa-trash-can" /> Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
