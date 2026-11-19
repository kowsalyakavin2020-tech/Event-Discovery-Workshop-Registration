import { useCallback, useState } from 'react'
import { EVENTS, formatDate, formatPrice } from '../../data/events'
import SectionTitle from '../../components/ui/SectionTitle'
import EventModal from '../../components/events/EventModal'
import useRegistrations from '../../hooks/useRegistrations'

const PICKS = [
  { id: 1, tone: 'forest' },
  { id: 3, tone: 'copper' },
  { id: 6, tone: 'sage' },
]

export default function FeaturedEvents() {
  const [selected, setSelected] = useState(null)
  const { isRegistered } = useRegistrations()
  const close = useCallback(() => setSelected(null), [])

  return (
    <section className="section feat">
      <div className="container">
        <SectionTitle title="Three seats we would take first" text="Scroll down and the cards stack up. Open one to see the full agenda, or register straight away." />
        <div className="feat__stack">
          {PICKS.map(({ id, tone }, i) => {
            const e = EVENTS.find((x) => x.id === id)
            return (
              <article key={id} className={`feat-card feat-card--${tone}`} style={{ '--i': i }}>
                <div className="feat-card__text">
                  <p className="feat-card__tag"><i className="fa-regular fa-calendar" /> {formatDate(e.date)} in {e.city}</p>
                  <h3>{e.title}</h3>
                  <p>{e.blurb}</p>
                  <ul>
                    <li><i className="fa-solid fa-user-tie" /> {e.host}</li>
                    <li><i className="fa-solid fa-layer-group" /> {e.level}</li>
                    <li><i className="fa-solid fa-indian-rupee-sign" /> {formatPrice(e.price)}</li>
                  </ul>
                  <div className="feat-card__actions">
                    {isRegistered(e.id) ? (
                      <span className="feat-card__done"><i className="fa-solid fa-circle-check" /> You are registered</span>
                    ) : (
                      <button type="button" className="btn btn--solid" onClick={() => setSelected({ event: e, step: 'form' })}>
                        Register Now <i className="fa-solid fa-arrow-right" />
                      </button>
                    )}
                    <button type="button" className="btn btn--outline" onClick={() => setSelected({ event: e, step: 'details' })}>
                      View Details
                    </button>
                  </div>
                </div>
                <figure className="feat-card__img">
                  <img src={`/images/${e.image}.webp`} alt={e.title} loading="lazy" />
                </figure>
              </article>
            )
          })}
        </div>
      </div>
      {selected && <EventModal event={selected.event} initialStep={selected.step} onClose={close} />}
    </section>
  )
}
