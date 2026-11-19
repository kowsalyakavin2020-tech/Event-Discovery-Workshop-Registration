import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EVENTS } from '../../data/events'

const TILES = [
  { img: 'featured-coding', label: 'Tech', icon: 'fa-code' },
  { img: 'featured-design', label: 'Design', icon: 'fa-pen-ruler' },
  { img: 'featured-cooking', label: 'Culinary', icon: 'fa-utensils' },
  { img: 'category-music', label: 'Music', icon: 'fa-guitar' },
]

export default function ExploreBanner() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.xban__title .line > span', { yPercent: 120, duration: 1, stagger: 0.12 })
        .from('.xban__crumb, .xban__lead, .xban__stats li', { y: 26, opacity: 0, stagger: 0.09, duration: 0.8 }, 0.4)
        .from('.xtile', { x: (i) => (i % 2 ? 90 : -90), y: (i) => (i < 2 ? -60 : 60), opacity: 0, scale: 0.9, stagger: 0.12, duration: 1.2 }, 0.2)
        .from('.xban__chip', { scale: 0, duration: 0.7, ease: 'back.out(2.4)' }, 1.2)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="xban" ref={root}>
      <div className="container">
        <div className="xban__panel">
          <div>
            <p className="xban__crumb"><i className="fa-solid fa-compass" /> Explore events</p>
            <h1 className="xban__title">
              <span className="line"><span>Every workshop,</span></span>
              <span className="line"><span>talk and meetup</span></span>
              <span className="line"><span>in one place.</span></span>
            </h1>
            <p className="xban__lead">Search by topic, city or price, read the agenda, then reserve your seat without leaving the page.</p>
            <ul className="xban__stats">
              <li><b data-count={EVENTS.length}>0</b> events this season</li>
              <li><b data-count="4">0</b> cities and online</li>
              <li><b data-count={EVENTS.filter((e) => e.price === 0).length}>0</b> free sessions</li>
            </ul>
          </div>

          <div className="xban__mosaic">
            {TILES.map((t) => (
              <figure key={t.label} className="xtile">
                <img src={`${import.meta.env.BASE_URL}images/${t.img}.webp`} alt={`${t.label} workshop`} />
                <figcaption><i className={`fa-solid ${t.icon}`} /> {t.label}</figcaption>
              </figure>
            ))}
            <span className="xban__chip"><i className="fa-solid fa-bolt" /> Seats update live</span>
          </div>
        </div>
      </div>
    </section>
  )
}
