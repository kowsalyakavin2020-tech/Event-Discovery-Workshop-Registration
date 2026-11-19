import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Scroll positions per history entry, so "Go back" from the 404 page returns to the same spot
const positions = {}

export default function Layout() {
  const { pathname, key } = useLocation()
  const navType = useNavigationType()

  // Remember where the user was at the moment they click a link or submit a form
  useEffect(() => {
    const save = () => { positions[key] = window.scrollY }
    save()
    window.addEventListener('click', save, true)
    window.addEventListener('submit', save, true)
    return () => {
      window.removeEventListener('click', save, true)
      window.removeEventListener('submit', save, true)
    }
  }, [key])

  useLayoutEffect(() => {
    const saved = positions[key]
    if (navType === 'POP' && saved) {
      const go = () => window.scrollTo({ top: saved, left: 0, behavior: 'instant' })
      go()
      const timers = [setTimeout(go, 250), setTimeout(go, 900)]
      return () => timers.forEach(clearTimeout)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
