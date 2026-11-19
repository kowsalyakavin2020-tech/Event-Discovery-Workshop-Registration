import { REVIEWS, VOICES } from '../../data/site'
import SectionTitle from '../../components/ui/SectionTitle'

const Stars = () => (
  <span className="stars" aria-label="5 out of 5">
    {Array.from({ length: 5 }, (_, s) => <i key={s} className="fa-solid fa-star" />)}
  </span>
)

export default function Voices() {
  return (
    <section className="section voices">
      <div className="container">
        <div className="voices__head">
          <SectionTitle title="Seats well spent" text="What attendees say after the session ends." />
          <div className="voices__score" data-anim="pop:0.2">
            <b>4.9</b>
            <Stars />
            <span><i data-count="2300">0</i>+ verified reviews</span>
          </div>
        </div>

        <div className="voices__grid">
          {VOICES.map((v, i) => (
            <figure key={v.name} className="voice">
              <div className="voice__photo" data-anim={i ? 'curtain:0.1' : 'curtain'}>
                <img src={`${import.meta.env.BASE_URL}images/${v.image}.webp`} alt={v.name} loading="lazy" />
              </div>
              <blockquote data-anim={i ? 'right:0.15' : 'left:0.15'}>
                <i className="fa-solid fa-quote-left" />
                <p>{v.quote}</p>
                <Stars />
                <figcaption><strong>{v.name}</strong> {v.role}</figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>

      <div className="reviews" aria-label="More reviews">
        <div className="reviews__track">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <article key={i} className="review">
              <Stars />
              <p>{r.text}</p>
              <footer><strong>{r.name}</strong> {r.city}</footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
