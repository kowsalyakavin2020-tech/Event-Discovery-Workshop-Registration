import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'
import useScrollAnimations from '../../hooks/useScrollAnimations'
import EventCard from '../../components/events/EventCard'
import EventModal from '../../components/events/EventModal'

export default function WishlistPage() {
  const page = useRef(null)
  useScrollAnimations(page)
  const { favorites } = useRegistrations()
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])
  const items = EVENTS.filter((e) => favorites.includes(e.id)).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div ref={page}>
      <section className="xban">
        <div className="container">
          <div className="xban__panel xban__panel--single">
            <div>
              <p className="xban__crumb"><i className="fa-solid fa-heart" /> Wishlist</p>
              <h1 className="xban__title"><span className="line"><span data-anim="rise">Your saved events.</span></span></h1>
              <p className="xban__lead" data-anim="up:0.1">
                {items.length
                  ? `You have saved ${items.length} ${items.length === 1 ? 'event' : 'events'}. Open one to register, or tap the heart to remove it.`
                  : 'Tap the heart on any event to keep it here for later.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {items.length ? (
            <div className="events__grid" data-stagger>
              {items.map((e) => <EventCard key={e.id} event={e} onOpen={(event, step = 'details') => setSelected({ event, step })} />)}
            </div>
          ) : (
            <div className="empty empty--wide">
              <img src={`${import.meta.env.BASE_URL}images/gallery-5.webp`} alt="" />
              <div>
                <h2>Your wishlist is empty</h2>
                <p>Save the events you like and they will show up here, ready to register.</p>
                <Link to="/events" className="btn btn--copper"><i className="fa-solid fa-compass" /> Explore Events</Link>
              </div>
            </div>
          )}
        </div>
      </section>
      {selected && <EventModal event={selected.event} initialStep={selected.step} onClose={close} />}
    </div>
  )
}
