'use client'

import { AudioPlayer } from './AudioPlayer'

const TRACKS = [
  {
    title: 'HOÜDINI (preview)',
    artist: 'KAMEL — MONACO',
    src: '/audio/houdini-preview.mp3',
    artwork: '/images/monaco/painting-crop.jpg',
  },
]

export function MusicPlayer() {
  return <AudioPlayer tracks={TRACKS} />
}
