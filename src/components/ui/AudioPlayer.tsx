'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

interface Track {
  title: string
  artist: string
  src: string
  artwork?: string
}

interface AudioPlayerProps {
  tracks: Track[]
  className?: string
}

export function AudioPlayer({ tracks, className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(prev => prev + 1)
      } else {
        setIsPlaying(false)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrackIndex, tracks.length])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrackIndex])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skipBack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1)
    }
  }

  const skipForward = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = percent * duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (tracks.length === 0) return null

  return (
    <>
      <audio ref={audioRef} src={currentTrack?.src} preload="metadata" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 left-0 right-0 z-40 ${className}`}
          >
            <div className="bg-black/90 backdrop-blur-xl border-t border-white/10">
              <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                  {/* Track Info */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {currentTrack?.artwork && (
                      <div className="w-12 h-12 rounded bg-neutral-800 overflow-hidden flex-shrink-0">
                        <img
                          src={currentTrack.artwork}
                          alt={currentTrack.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {currentTrack?.title || 'No track selected'}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        {currentTrack?.artist}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={skipBack}
                      disabled={currentTrackIndex === 0}
                      className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={skipForward}
                      disabled={currentTrackIndex === tracks.length - 1}
                      className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs">
                    <span className="text-xs text-neutral-500 w-10 text-right">
                      {formatTime(currentTime)}
                    </span>
                    <div
                      onClick={handleProgressClick}
                      className="flex-1 h-1 bg-neutral-800 rounded-full cursor-pointer group"
                    >
                      <motion.div
                        className="h-full bg-[var(--accent)] rounded-full relative"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                    <span className="text-xs text-neutral-500 w-10">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Close player</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
