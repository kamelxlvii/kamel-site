import { Hero } from '@/components/sections/Hero'
import { Music } from '@/components/sections/Music'
import { Video } from '@/components/sections/Video'
import { Gallery } from '@/components/sections/Gallery'
import { Footer } from '@/components/sections/Footer'
import { SocialConnect } from '@/components/ui/SocialConnect'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Music />
      <Video />
      <Gallery />
      <SocialConnect />
      <Footer />
    </main>
  )
}
