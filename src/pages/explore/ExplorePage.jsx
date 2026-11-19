import { useRef } from 'react'
import useScrollAnimations from '../../hooks/useScrollAnimations'
import ExploreBanner from './ExploreBanner'
import EventBrowser from './EventBrowser'
import HostCta from './HostCta'

export default function ExplorePage() {
  const page = useRef(null)
  useScrollAnimations(page)

  return (
    <div ref={page}>
      <ExploreBanner />
      <EventBrowser />
      <HostCta />
    </div>
  )
}
