export const SITE = {
  name: 'KAMEL',
  tagline: '',
  description: 'Artist. Rapper. Genre-fluid. Connecting two worlds across the globe.',
}

export const STREAMING_LINKS = [
  {
    platform: 'spotify',
    label: 'Spotify',
    url: 'https://open.spotify.com/artist/1b0Pti5rHGhBvl36SHEh1g',
  },
  {
    platform: 'apple',
    label: 'Apple Music',
    url: 'https://music.apple.com/us/artist/kamel/1485727056',
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    url: 'https://youtube.com/@kamelxlvii',
  },
] as const

export const SOCIAL_LINKS = [
  {
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/finest_alchemy',
  },
  {
    platform: 'twitter',
    label: 'X',
    url: 'https://x.com/finestalchemy',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    url: 'https://tiktok.com/@kamelxlvii',
  },
] as const

export const BIO = {
  short: 'Both parents from Alexandria, Egypt. Raised in Los Angeles. Making music that connects two worlds across the globe.',
  full: `Both parents from Alexandria, Egypt. Raised in Los Angeles. Regular travel between LA and Egypt shapes a unique sonic identity that blends cultures, languages, and genres.

Debut EP "Egyptian Royal" dropped in 2021, followed by "ma$ari" in 2024. Recent singles include "ëuros," "CARBON COPY," "CLARK KENT // BATHING APE," "purple haze," and "six summers."

Everyone has a unique perspective worth expressing. This is mine.`,
}

export const LATEST_RELEASE = {
  title: 'BAD GUY',
  year: '2026',
  type: 'Single',
}

export const GALLERY_IMAGES = [
  { src: '/images/press-1.jpg', alt: 'Kamel press photo' },
  { src: '/images/press-2.jpg', alt: 'Kamel live performance' },
  { src: '/images/press-3.jpg', alt: 'Kamel studio session' },
  { src: '/images/album-art.jpg', alt: 'Album artwork' },
] as const
