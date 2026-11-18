import { Hero } from '@/components/sections/Hero'
import { Tracklist } from '@/components/sections/Tracklist'
import { Circuit } from '@/components/sections/Circuit'
import { Video } from '@/components/sections/Video'
import { Gallery } from '@/components/sections/Gallery'
import { Merch } from '@/components/sections/Merch'
import { Footer } from '@/components/sections/Footer'
import { GlobeSection } from '@/components/sections/GlobeSection'
import { Marquee } from '@/components/ui/Marquee'
import { MONACO } from '@/lib/constants'

const TICKER = [
  MONACO.title,
  'Out now',
  'The job is Monaco',
  `Stream ${MONACO.focusTrack}`,
  '8 tracks',
  MONACO.runtime,
  'Kamel Motorsport',
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <Marquee items={TICKER} />
      <Tracklist />
      <Merch />
      <Circuit />
      <Video />
      <Gallery />
      <GlobeSection />
      <Footer />
    </main>
  )
}
