import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STEPS } from '../../data/site'
import SectionTitle from '../../components/ui/SectionTitle'

export default function Process() {
  const root = useRef(null)
  const fill = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    // Desktop: the section pins and scrolling walks through the four steps
    mm.add('(min-width: 861px)', () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top+=100',
        end: `+=${STEPS.length * 55}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)))
          gsap.set(fill.current, { scaleY: self.progress })
        },
      })
    })
    // Mobile: steps simply rise in one by one
    mm.add('(max-width: 860px)', () => {
      root.current.querySelectorAll('.pstep').forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="proc" ref={root}>
      <div className="container proc__stage">
        <div className="proc__left">
          <SectionTitle title="From curious to checked in" text="Four steps, and the last one is just showing up. Keep scrolling to walk through them." />
          <ol className="psteps">
            <span className="psteps__rail" aria-hidden="true"><i ref={fill} /></span>
            {STEPS.map((s, i) => (
              <li key={s.title} className={`pstep ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}>
                <span className="pstep__num">0{i + 1}</span>
                <div className="pstep__body">
                  <h3>{s.title}</h3>
                  <div className="pstep__more"><p>{s.text}</p></div>
                  <img className="pstep__img" src={`/images/${s.image}.webp`} alt="" loading="lazy" />
                </div>
                <i className={`fa-solid ${s.icon} pstep__icon`} />
              </li>
            ))}
          </ol>
        </div>

        <div className="proc__media" aria-hidden="true">
          {STEPS.map((s, i) => (
            <figure key={s.title} className={`proc__frame ${i === active ? 'is-on' : ''}`}>
              <img src={`/images/${s.image}.webp`} alt="" loading="lazy" />
            </figure>
          ))}
          <span className="proc__count"><b>0{active + 1}</b> / 0{STEPS.length}</span>
        </div>
      </div>
    </section>
  )
}
