import { useRef } from 'react'
import useScrollAnimations from '../../hooks/useScrollAnimations'
import Hero from './Hero'
import Ticker from './Ticker'
import Categories from './Categories'
import FeaturedEvents from './FeaturedEvents'
import UpcomingEvents from './UpcomingEvents'
import Process from './Process'
import Spotlight from './Spotlight'
import Moments from './Moments'
import Voices from './Voices'
import Newsletter from './Newsletter'

export default function HomePage() {
  const page = useRef(null)
  useScrollAnimations(page)

  return (
    <div ref={page}>
      <Hero />
      <Ticker />
      <Categories />
      <FeaturedEvents />
      <UpcomingEvents />
      <Process />
      <Spotlight />
      <Moments />
      <Voices />
      <Newsletter />
    </div>
  )
}
