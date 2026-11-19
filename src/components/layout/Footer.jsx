import { Link } from 'react-router-dom'
import { BRAND, CATEGORIES, NAV_LINKS } from '../../data/site'
import Logo from './Logo'

const SOCIALS = [
  ['fa-instagram', 'Instagram'],
  ['fa-linkedin-in', 'LinkedIn'],
  ['fa-youtube', 'YouTube'],
  ['fa-x-twitter', 'X'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo light />
          <p>{BRAND.name} lists workshops, talks and meetups from hosts we know, and keeps your seat safe until the day.</p>
          <ul className="footer__social">
            {SOCIALS.map(([icon, label]) => (
              <li key={label}>
                <Link to="/404" aria-label={label}>
                  <i className={`fa-brands ${icon}`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h3>Explore</h3>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Topics">
          <h3>Topics</h3>
          <ul>
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.name}><Link to="/404">{c.name}</Link></li>
            ))}
          </ul>
        </nav>

        <address className="footer__contact">
          <h3>Say hello</h3>
          <p><i className="fa-solid fa-location-dot" /> <span>MMR Complex, Salem,<br />Tamil Nadu 636008</span></p>
          <p><i className="fa-solid fa-phone" /> <a href="tel:+919867545987">+91 9867545987</a></p>
          <p><i className="fa-solid fa-envelope" /> <a href="mailto:info@thestackly.com">info@thestackly.com</a></p>
        </address>
      </div>

      <div className="container footer__legal">
        <p>© 2026 {BRAND.name}. All rights reserved.</p>
        <ul>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
        </ul>
      </div>
    </footer>
  )
}
