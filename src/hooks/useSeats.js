import useRegistrations from './useRegistrations'

// Seats left = capacity - seats already taken - seats booked from this browser
export default function useSeats() {
  const { seatsBookedHere } = useRegistrations()
  return (event) => Math.max(event.seats - event.taken - seatsBookedHere(event.id), 0)
}
