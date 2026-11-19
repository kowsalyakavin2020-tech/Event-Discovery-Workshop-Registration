import { CATEGORY_ICON } from '../../data/site'
import { formatDate, formatPrice } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'
import useSeats from '../../hooks/useSeats'

export default function EventCard({ event, onOpen }) {
  const seatsLeft = useSeats()(event)
  const { isRegistered, isFavorite, toggleFavorite } = useRegistrations()
  const favorite = isFavorite(event.id)
  const registered = isRegistered(event.id)
  const [day, month] = formatDate(event.date, { day: 'numeric', month: 'short' }).split(' ')

  return (
    <article className="event-card">
      <div className="event-card__media">
        <img src={`${import.meta.env.BASE_URL}images/${event.image}.webp`} alt={event.title} loading="lazy" />
        <span className="event-card__cat">
          <i className={`fa-solid ${CATEGORY_ICON[event.category]}`} /> {event.category}
        </span>
        <time className="event-card__date" dateTime={event.date}>
          <b>{day}</b>
          <small>{month}</small>
        </time>
        <span className="event-card__price">{formatPrice(event.price)}</span>
        <button
          type="button"
          className={`event-card__fav ${favorite ? 'is-on' : ''}`}
          aria-pressed={favorite}
          aria-label={favorite ? `Remove ${event.title} from favourites` : `Add ${event.title} to favourites`}
          onClick={() => toggleFavorite(event.id)}
        >
          <i className={`${favorite ? 'fa-solid' : 'fa-regular'} fa-heart`} />
        </button>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{event.title}</h3>
        <ul className="event-card__meta">
          <li><i className="fa-solid fa-location-dot" /> {event.city}</li>
          <li><i className="fa-regular fa-calendar" /> {formatDate(event.date)}</li>
          <li className={seatsLeft <= 5 ? 'is-low' : ''}>
            <i className="fa-solid fa-chair" /> {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Sold out'}
          </li>
        </ul>
        <div className="event-card__foot">
          <>
            <button type="button" className="btn btn--outline btn--sm" onClick={() => onOpen(event, 'details')}>
              View Details
            </button>
            {registered ? (
              <span className="event-card__done"><i className="fa-solid fa-circle-check" /> Registered</span>
            ) : seatsLeft === 0 ? (
              <span className="event-card__done">Sold out</span>
            ) : (
              <button type="button" className="btn btn--copper btn--sm" onClick={() => onOpen(event, 'form')}>
                Register Now
              </button>
            )}
          </>
        </div>
      </div>
    </article>
  )
}
