import { Link } from 'react-router-dom'
import { BRAND } from '../../data/site'

// The logo image already contains the icon. Light variant is for dark backgrounds.
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${BRAND.name} home`}>
      <img src={`${import.meta.env.BASE_URL}images/${light ? 'logo-light' : 'logo'}.png`} alt={BRAND.name} />
    </Link>
  )
}
