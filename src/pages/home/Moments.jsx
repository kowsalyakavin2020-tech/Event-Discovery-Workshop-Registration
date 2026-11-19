import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { GALLERY_BOTTOM, GALLERY_TOP } from '../../data/site'
import SectionTitle from '../../components/ui/SectionTitle'

const row = (list) => [...list, ...list]

export default function Moments() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      gsap.fromTo('.moments__row--a', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: trigger })
      gsap.fromTo('.moments__row--b', { xPercent: -35 }, { xPercent: 0, ease: 'none', scrollTrigger: trigger })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section moments" ref={root}>
      <div className="container">
        <SectionTitle title="Moments from past sessions" text="Packed halls, quiet workshops and long tables. The rows slide as you scroll." align="center" />
      </div>
      {[['a', GALLERY_TOP], ['b', GALLERY_BOTTOM]].map(([key, list]) => (
        <div key={key} className={`moments__row moments__row--${key}`}>
          {row(list).map((img, i) => (
            <figure key={i} className={`moments__item moments__item--${i % 3}`}>
              <img src={`${import.meta.env.BASE_URL}images/${img}.webp`} alt="Attendees at a past Stackly session" loading="lazy" />
            </figure>
          ))}
        </div>
      ))}
    </section>
  )
}
