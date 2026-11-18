export const SITE = {
  name: 'KAMEL — MONACO',
  tagline: 'THE JOB IS MONACO',
  description: 'MONACO, the new tape from Kamel. Eight tracks. Out now.',
}

export const MONACO = {
  title: 'MONACO',
  artist: 'KAMEL',
  // Midnight Pacific time on release day
  releaseDate: '2026-11-13T00:00:00-08:00',
  releaseLabel: '11.13.26',
  runtime: '18:34',
  focusTrack: 'HOÜDINI',
  // Official order and spellings, as listed on EngineEars
  tracks: [
    { title: 'KATHY BATES' },
    { title: 'HOÜDINI', preview: '/audio/houdini-preview.mp3' },
    { title: 'FRANK LUCAS' },
    { title: 'ëuros' },
    { title: 'Meet My Price', feat: 'THE MUSALINI' },
    { title: 'BAD GUY' },
    { title: 'NØ ALARM', feat: 'ISH' },
    { title: 'PRESS PLAY' },
  ],
} as const

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

export const VIDEOS = [
  { id: '-d6PxWFS3qo', title: 'BAD GUY' },
  { id: 'YAZTZ3uvV2w', title: 'MEET MY PRICE ft. The Musalini' },
  { id: 'xfUUhkB10Jk', title: 'ëUROS' },
] as const

// Three photos per video (BAD GUY, MEET MY PRICE, ëUROS); each opens its music video on YouTube
export const GALLERY = [
  { src: '/images/gallery/mmp-01.jpg', width: 933, height: 1400, href: 'https://www.youtube.com/watch?v=YAZTZ3uvV2w', alt: 'Kamel, MEET MY PRICE shoot' },
  { src: '/images/gallery/badguy-02.jpg', width: 1400, height: 928, href: 'https://www.youtube.com/watch?v=-d6PxWFS3qo', alt: 'Kamel, BAD GUY shoot' },
  { src: '/images/gallery/euros-03.jpg', width: 1080, height: 720, href: 'https://www.youtube.com/watch?v=xfUUhkB10Jk', alt: 'Kamel, ëUROS shoot' },
  { src: '/images/gallery/badguy-04.jpg', width: 928, height: 1400, href: 'https://www.youtube.com/watch?v=-d6PxWFS3qo', alt: 'Kamel, BAD GUY shoot' },
  { src: '/images/gallery/mmp-05.jpg', width: 1400, height: 933, href: 'https://www.youtube.com/watch?v=YAZTZ3uvV2w', alt: 'Kamel, MEET MY PRICE shoot' },
  { src: '/images/gallery/euros-06.jpg', width: 1000, height: 667, href: 'https://www.youtube.com/watch?v=xfUUhkB10Jk', alt: 'Kamel, ëUROS shoot' },
  { src: '/images/gallery/euros-07.jpg', width: 480, height: 720, href: 'https://www.youtube.com/watch?v=xfUUhkB10Jk', alt: 'Kamel, ëUROS shoot' },
  { src: '/images/gallery/badguy-08.jpg', width: 1400, height: 788, href: 'https://www.youtube.com/watch?v=-d6PxWFS3qo', alt: 'Kamel, BAD GUY shoot' },
  { src: '/images/gallery/mmp-09.jpg', width: 1400, height: 933, href: 'https://www.youtube.com/watch?v=YAZTZ3uvV2w', alt: 'Kamel, MEET MY PRICE shoot' },
] as const

// Each size has its own Stripe Payment Link (paste it into `checkout`); set `soldOut` to close a size.
// A size with no link shows as not yet on sale.
export const MERCH_ITEMS = [
  {
    src: '/images/monaco/merch-tee.jpg',
    name: 'Car Tee',
    note: 'Top-down 47',
    price: 35,
    shipping: 6,
    sizes: [
      { size: 'S', checkout: '', soldOut: false },
      { size: 'M', checkout: '', soldOut: false },
      { size: 'L', checkout: '', soldOut: false },
      { size: 'XL', checkout: '', soldOut: false },
      { size: '2XL', checkout: '', soldOut: false },
    ],
  },
] as const
