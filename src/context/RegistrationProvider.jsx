import { useCallback, useEffect, useMemo, useState } from 'react'
import { RegistrationContext } from './RegistrationContext'

const STORAGE_KEY = 'stackly.registrations'
const FAV_KEY = 'stackly.favorites'

const load = (key = STORAGE_KEY) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

export default function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState(() => load())
  const [favorites, setFavorites] = useState(() => load(FAV_KEY))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations))
  }, [registrations])

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback(
    (id) => setFavorites((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
    [],
  )

  const register = useCallback((eventId, form) => {
    const entry = {
      id: `${eventId}-${Date.now()}`,
      eventId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      seats: Number(form.seats),
      code: `STK-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      bookedAt: new Date().toISOString(),
    }
    setRegistrations((list) => [entry, ...list])
    return entry
  }, [])

  const cancel = useCallback((id) => setRegistrations((list) => list.filter((r) => r.id !== id)), [])

  const value = useMemo(
    () => ({
      registrations,
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      register,
      cancel,
      isRegistered: (eventId) => registrations.some((r) => r.eventId === eventId),
      seatsBookedHere: (eventId) =>
        registrations.filter((r) => r.eventId === eventId).reduce((sum, r) => sum + r.seats, 0),
    }),
    [registrations, favorites, toggleFavorite, register, cancel],
  )

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
}
