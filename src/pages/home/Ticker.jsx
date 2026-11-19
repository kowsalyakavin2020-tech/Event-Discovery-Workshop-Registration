import { CATEGORIES } from '../../data/site'

export default function Ticker() {
  const items = [...CATEGORIES, ...CATEGORIES]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((c, i) => (
          <span key={i} className="ticker__item"><i className={`fa-solid ${c.icon}`} /> {c.name}</span>
        ))}
      </div>
    </div>
  )
}
