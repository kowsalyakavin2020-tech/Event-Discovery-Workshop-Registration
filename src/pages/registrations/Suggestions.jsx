import { useCallback, useState } from 'react'
import { EVENTS } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'
import SectionTitle from '../../components/ui/SectionTitle'
import EventCard from '../../components/events/EventCard'
import EventModal from '../../components/events/EventModal'

export default function Suggestions() {
  const { registrations, isRegistered } = useRegistrations()
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  const booked = new Set(registrations.map((r) => EVENTS.find((e) => e.id === r.eventId)?.category))
  const picks = EVENTS.filter((e) => !isRegistered(e.id))
    .sort((a, b) => Number(booked.has(b.category)) - Number(booked.has(a.category)) || a.date.localeCompare(b.date))
    .slice(0, 3)

  return (
    <section className="section sugg">
      <div className="container">
        <SectionTitle title="Keep the momentum going" text="More sessions that fit with what you have already booked." />
        <div className="events__grid events__grid--three" data-stagger>
          {picks.map((e, i) => <EventCard key={e.id} event={e} index={i} onOpen={(event, step = 'details') => setSelected({ event, step })} />)}
        </div>
      </div>
      {selected && <EventModal event={selected.event} initialStep={selected.step} onClose={close} />}
    </section>
  )
}
