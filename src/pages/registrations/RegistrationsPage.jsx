import { useRef } from 'react'
import useScrollAnimations from '../../hooks/useScrollAnimations'
import RegBanner from './RegBanner'
import TicketList from './TicketList'
import Suggestions from './Suggestions'

export default function RegistrationsPage() {
  const page = useRef(null)
  useScrollAnimations(page)

  return (
    <div ref={page}>
      <RegBanner />
      <TicketList />
      <Suggestions />
    </div>
  )
}
