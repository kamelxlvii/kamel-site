'use client'

import { AudioPlayer } from './AudioPlayer'

const TRACKS = [
  {
    title: 'BAD GUY',
    artist: 'KAMEL',
    src: '/audio/bad-guy.wav',
    artwork: '/images/album-art.jpg',
  },
]

export function MusicPlayer() {
  return <AudioPlayer tracks={TRACKS} />
}
