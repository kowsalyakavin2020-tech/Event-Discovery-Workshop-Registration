import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/site'
import useRegistrations from '../../hooks/useRegistrations'
import Logo from './Logo'

const measure = (list, index) => {
  const li = list?.children[index]
  return li ? { left: li.offsetLeft, width: li.offsetWidth, ready: true } : { left: 0, width: 0, ready: false }
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState(null)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })
  const list = useRef(null)
  const { registrations, favorites } = useRegistrations()
  const { pathname } = useLocation()

  const active = NAV_LINKS.findIndex((l) => (l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)))
  const lit = hover ?? active // link under the sliding highlight (-1 hides it, e.g. on the wishlist page)

  useLayoutEffect(() => {
    const place = () => setPill(measure(list.current, lit))
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [lit])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  const close = () => setOpen(false)
  const badge = (link) => (link.to === '/my-registrations' && registrations.length > 0 ? registrations.length : 0)

  return (
    <header className={`header ${scrolled ? 'header--solid' : ''}`}>
      <div className="header__bar container">
        <Logo />

        <nav className="nav" aria-label="Main navigation">
          <div className="nav__rail">
            <span className="nav__pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width, opacity: pill.ready ? 1 : 0 }} />
            <ul className="nav__list" ref={list} onMouseLeave={() => setHover(null)}>
              {NAV_LINKS.map((link, i) => (
                <li key={link.to} onMouseEnter={() => setHover(i)}>
                  <NavLink to={link.to} end={link.to === '/'} className={`nav__link ${i === lit ? 'is-lit' : ''}`}>
                    <i className={`fa-solid ${link.icon}`} /> {link.label}
                    {badge(link) > 0 && <span className="nav__count">{badge(link)}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="header__right">
          <Link to="/wishlist" className={`wish ${pathname === '/wishlist' ? 'is-active' : ''}`} aria-label={`Wishlist, ${favorites.length} saved events`} onClick={close}>
            <i className={`${favorites.length ? 'fa-solid' : 'fa-regular'} fa-heart`} />
            {favorites.length > 0 && <span key={favorites.length} className="wish__count">{favorites.length}</span>}
          </Link>
          <button type="button" className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars-staggered'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu: covers the whole screen, sits behind the header bar */}
      <div className={`drawer ${open ? 'drawer--open' : ''}`} aria-hidden={!open}>
        <ul className="drawer__list">
          {[...NAV_LINKS, { to: '/wishlist', label: 'Wishlist', icon: 'fa-heart' }].map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className="drawer__link" onClick={close} tabIndex={open ? 0 : -1}>
                <span><i className={`fa-solid ${link.icon}`} /> {link.label}</span>
                {link.to === '/wishlist' && favorites.length > 0 && <b>{favorites.length}</b>}
                {badge(link) > 0 && <b>{badge(link)}</b>}
                <i className="fa-solid fa-arrow-right drawer__arrow" />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
