import { STATS } from '../../data/site'

export default function Spotlight() {
  return (
    <section className="spot">
      <div className="spot__bg" aria-hidden="true">
        <img data-parallax="14" src={`${import.meta.env.BASE_URL}images/spotlight-main.webp`} alt="" loading="lazy" />
      </div>
      <div className="container spot__grid">
        <div>
          <h2 className="spot__title"><span className="line"><span data-anim="rise">A room full of people who came to learn.</span></span></h2>
          <p data-anim="up:0.2">Every session is capped so you can ask questions and get answers. These numbers are the proof it keeps working.</p>
          <ul className="spot__stats" data-stagger>
            {STATS.map((s) => (
              <li key={s.label}>
                <b data-count={s.value}>0</b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="spot__orb" data-anim="pop:0.2">
          <img src={`${import.meta.env.BASE_URL}images/spotlight-detail.webp`} alt="Two attendees reviewing code together on a laptop" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}
