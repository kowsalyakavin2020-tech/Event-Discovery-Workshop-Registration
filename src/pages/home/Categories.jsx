import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/site'
import SectionTitle from '../../components/ui/SectionTitle'

export default function Categories() {
  return (
    <section className="section cats">
      <div className="container">
        <SectionTitle title="Pick your corner of the room" text="Eight topics, hosts who practise them, and a seat for every level. Hover a panel to open it." />
      </div>
      <div className="container">
        <div className="cats__rail" data-anim="curtain">
          {CATEGORIES.map((c) => (
            <Link key={c.name} to={`/events?category=${c.name}`} className="cat">
              <img src={`/images/${c.image}.webp`} alt="" loading="lazy" />
              <span className="cat__label">{c.name}</span>
              <span className="cat__body">
                <i className={`fa-solid ${c.icon}`} />
                <strong>{c.name}</strong>
                <small>{c.blurb}</small>
                <em>Browse {c.name} <i className="fa-solid fa-arrow-right" /></em>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
