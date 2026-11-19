import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationProvider from './context/RegistrationProvider'
import Layout from './components/layout/Layout'
import Preloader from './components/layout/Preloader'
import HomePage from './pages/home/HomePage'
import ExplorePage from './pages/explore/ExplorePage'
import RegistrationsPage from './pages/registrations/RegistrationsPage'
import NotFoundPage from './pages/NotFoundPage'
import WishlistPage from './pages/wishlist/WishlistPage'

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  const [revealed, setRevealed] = useState(false) // pages mount as the preloader slides away
  const [finished, setFinished] = useState(false)

  return (
    <RegistrationProvider>
      <BrowserRouter basename={BASENAME}>
        {!finished && <Preloader onReveal={() => setRevealed(true)} onDone={() => setFinished(true)} />}
        {revealed && (
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="events" element={<ExplorePage />} />
              <Route path="my-registrations" element={<RegistrationsPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </RegistrationProvider>
  )
}
