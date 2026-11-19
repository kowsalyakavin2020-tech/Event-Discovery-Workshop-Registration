import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../../data/events'
import SectionTitle from '../../components/ui/SectionTitle'
import EventCard from '../../components/events/EventCard'
import EventModal from '../../components/events/EventModal'

const UPCOMING = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6)

export default function UpcomingEvents() {
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section className="section upc">
      <div className="container">
        <SectionTitle title="Upcoming events" text="The next six sessions on the calendar. Open one for details and register in a minute." />
        <div className="events__grid" data-stagger>
          {UPCOMING.map((e) => <EventCard key={e.id} event={e} onOpen={(event, step = 'details') => setSelected({ event, step })} />)}
        </div>
        <div className="upc__more" data-anim="up">
          <Link to="/events" className="btn btn--solid">Explore Events <i className="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
      {selected && <EventModal event={selected.event} initialStep={selected.step} onClose={close} />}
    </section>
  )
}
