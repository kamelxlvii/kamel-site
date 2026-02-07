'use client'

import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'

// Coordinates
const LA = { lat: 34.0522, lng: -118.2437 }
const ALEXANDRIA = { lat: 31.2001, lng: 29.9187 }

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0.3)

  useEffect(() => {
    let width = 0
    let globe: ReturnType<typeof createGlobe> | null = null

    const onResize = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.15, 0.15, 0.15],
        markerColor: [1, 0.84, 0],
        glowColor: [0.1, 0.1, 0.1],
        markers: [
          { location: [LA.lat, LA.lng], size: 0.1 },
          { location: [ALEXANDRIA.lat, ALEXANDRIA.lng], size: 0.1 },
        ],
        onRender: (state) => {
          // Auto-rotate when not interacting
          if (pointerInteracting.current === null) {
            phiRef.current += 0.003
          }
          state.phi = phiRef.current + pointerInteractionMovement.current
        },
      })
    }

    return () => {
      globe?.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Pointer event handlers for drag interaction
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX
  }, [])

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null
    phiRef.current += pointerInteractionMovement.current
    pointerInteractionMovement.current = 0
  }, [])

  const onPointerOut = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiRef.current += pointerInteractionMovement.current
      pointerInteractionMovement.current = 0
    }
    pointerInteracting.current = null
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta / 100
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[600px] aspect-square mx-auto"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ contain: 'layout paint size' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerOut}
        onPointerMove={onPointerMove}
      />

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <span className="text-[10px] text-neutral-500 tracking-wide">drag to rotate</span>
      </div>
    </div>
  )
}
