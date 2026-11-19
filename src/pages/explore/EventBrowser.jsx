import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { CATEGORIES } from '../../data/site'
import { EVENTS } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'
import EventCard from '../../components/events/EventCard'
import EventModal from '../../components/events/EventModal'

const CITIES = [...new Set(EVENTS.map((e) => e.city))]

export default function EventBrowser() {
  const [params, setParams] = useSearchParams()
  const grid = useRef(null)
  const { favorites } = useRegistrations()
  const [query, setQuery] = useState(params.get('q') || '')
  const [location, setLocation] = useState('All')
  const [favOnly, setFavOnly] = useState(false)
  const [sort, setSort] = useState('date')
  const [selected, setSelected] = useState(() => {
    const found = EVENTS.find((e) => e.id === Number(params.get('open')))
    return found ? { event: found, step: 'details' } : null
  })
  const category = params.get('category') || 'All'
  const closeModal = useCallback(() => setSelected(null), [])

  const setCategory = (name) => {
    const next = new URLSearchParams(params)
    name === 'All' ? next.delete('category') : next.set('category', name)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return EVENTS.filter((e) => category === 'All' || e.category === category)
      .filter((e) => location === 'All' || e.city === location)
      .filter((e) => !favOnly || favorites.includes(e.id))
      .filter((e) => !q || e.title.toLowerCase().includes(q))
      .sort((a, b) =>
        sort === 'seats' ? (b.seats - b.taken) - (a.seats - a.taken) : sort === 'price' ? a.price - b.price : a.date.localeCompare(b.date),
      )
  }, [query, category, location, favOnly, favorites, sort])

  // cards slide up each time the result set changes
  const key = results.map((e) => e.id).join('-')
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.event-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity' })
    }, grid)
    return () => ctx.revert()
  }, [key])

  const reset = () => {
    setQuery(''); setLocation('All'); setFavOnly(false); setSort('date'); setCategory('All')
  }

  return (
    <section className="section browser" id="results">
      <div className="container">
        <div className="toolbar" data-anim="up">
          <label className="search">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="search" placeholder="Search by event name" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search events by name" />
          </label>

          <label className="sort">
            <i className="fa-solid fa-location-dot" />
            <select value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Filter by location">
              <option value="All">All locations</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>

          <label className="sort">
            <i className="fa-solid fa-arrow-down-wide-short" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort events">
              <option value="date">Sort by date</option>
              <option value="price">Lowest price</option>
              <option value="seats">Most seats left</option>
            </select>
          </label>

          <button type="button" className={`favtoggle ${favOnly ? 'is-on' : ''}`} aria-pressed={favOnly} onClick={() => setFavOnly((v) => !v)}>
            <i className={`${favOnly ? 'fa-solid' : 'fa-regular'} fa-heart`} /> Favourites
            <span>{favorites.length}</span>
          </button>
        </div>

        <div className="chips" data-anim="up:0.1">
          {['All', ...CATEGORIES.map((c) => c.name)].map((name) => (
            <button key={name} type="button" className={`chip ${category === name ? 'is-on' : ''}`} onClick={() => setCategory(name)}>
              <i className={`fa-solid ${name === 'All' ? 'fa-border-all' : CATEGORIES.find((c) => c.name === name).icon}`} /> {name}
            </button>
          ))}
        </div>

        <p className="browser__count" aria-live="polite">{results.length} {results.length === 1 ? 'event' : 'events'} found</p>

        {results.length ? (
          <div className="events__grid" ref={grid}>
            {results.map((e) => <EventCard key={e.id} event={e} onOpen={(event, step = 'details') => setSelected({ event, step })} />)}
          </div>
        ) : (
          <div className="empty" ref={grid}>
            <img src="/images/gallery-5.webp" alt="" />
            <h3>No events match your search</h3>
            <p>Try a different name, location or category, or clear the filters to see every event.</p>
            <button type="button" className="btn btn--copper" onClick={reset}><i className="fa-solid fa-rotate-left" /> Clear filters</button>
          </div>
        )}
      </div>
      {selected && <EventModal event={selected.event} initialStep={selected.step} onClose={closeModal} />}
    </section>
  )
}
