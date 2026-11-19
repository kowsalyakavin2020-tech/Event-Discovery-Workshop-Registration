import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { EVENTS, formatDate } from '../../data/events'
import useSeats from '../../hooks/useSeats'
import EventModal from '../../components/events/EventModal'

const REELS = [
  ['hero-speaker', 'featured-coding', 'category-art', 'experience-1'],
  ['hero-workshop', 'category-music', 'featured-cooking', 'hero-network'],
  ['experience-2', 'featured-design', 'category-wellness', 'gallery-1'],
]
const NEXT = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date))[0]

export default function Hero() {
  const root = useRef(null)
  const seatsLeft = useSeats()(NEXT)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const [days] = useState(() => Math.max(Math.ceil((new Date(`${NEXT.date}T00:00:00`) - Date.now()) / 86400000), 0))

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero__title .line > span', { yPercent: 120, duration: 1.1, stagger: 0.12 })
        .from('.hero__kicker, .hero__lead, .hero__actions, .hero__trust li', { y: 30, opacity: 0, stagger: 0.09, duration: 0.8 }, 0.5)
        .from('.reel', { y: (i) => (i % 2 ? -140 : 140), opacity: 0, stagger: 0.14, duration: 1.3 }, 0.2)
        .from('.hero__card', { scale: 0.8, opacity: 0, y: 30, duration: 0.9, ease: 'back.out(1.8)' }, 1.3)
      gsap.to('.hero__card', { y: -10, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.4 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root} id="top">
      <div className="container">
        <div className="hero__panel">
          <div className="hero__copy">
            <p className="hero__kicker"><i className="fa-solid fa-location-dot" /> Live in Madurai, Chennai and online</p>
            <h1 className="hero__title">
              <span className="line"><span>Book the rooms</span></span>
              <span className="line"><span>worth showing</span></span>
              <span className="line"><span>up for.</span></span>
            </h1>
            <p className="hero__lead">Workshops, talks and meetups from hosts who do the work every day. Pick an event, read the details and register in a minute.</p>
            <div className="hero__actions">
              <Link to="/events" className="btn btn--copper"><i className="fa-solid fa-compass" /> Explore Events</Link>
              <Link to="/my-registrations" className="btn btn--ghost"><i className="fa-solid fa-ticket" /> My Registrations</Link>
            </div>
            <ul className="hero__trust">
              <li><i className="fa-solid fa-calendar-check" /> <b>{EVENTS.length}</b> events this season</li>
              <li><i className="fa-solid fa-star" /> <b>4.9</b> average rating</li>
            </ul>
          </div>

          <div className="hero__visual">
            <div className="hero__reels" aria-hidden="true">
              {REELS.map((imgs, col) => (
                <div key={col} className={`reel ${col === 1 ? 'reel--down' : ''}`}>
                  <div className="reel__track">
                    {[...imgs, ...imgs].map((img, i) => (
                      <figure key={i} className="reel__item"><img src={`/images/${img}.webp`} alt="" /></figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="hero__card" onClick={() => setOpen(true)}>
              <img src={`/images/${NEXT.image}.webp`} alt="" />
              <div>
                <small>Upcoming event</small>
                <strong>{NEXT.title}</strong>
                <span><i className="fa-regular fa-calendar" /> {formatDate(NEXT.date)}, {NEXT.time}</span>
                <span><i className="fa-solid fa-location-dot" /> {NEXT.city}</span>
                <em>{days} days to go, {seatsLeft} seats left <i className="fa-solid fa-arrow-right" /></em>
              </div>
            </button>
          </div>
        </div>
      </div>
      {open && <EventModal event={NEXT} onClose={close} />}
    </section>
  )
}
