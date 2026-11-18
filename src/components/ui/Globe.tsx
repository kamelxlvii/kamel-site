'use client'

import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'

const MONACO = { lat: 43.7384, lng: 7.4246 }

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  // start with Monaco facing the viewer
  const phiRef = useRef(Math.PI - ((MONACO.lng * Math.PI) / 180 - Math.PI / 2))

  useEffect(() => {
    let width = 0
    let globe: ReturnType<typeof createGlobe> | null = null

    // Build the globe once the container has a real size, and keep it matched to the container,
    // so a zero-size first layout (or a later resize) can't leave it blank
    const create = () => {
      if (globe || !canvasRef.current || width === 0) return
      // createGlobe throws when WebGL is unavailable; skip the globe rather than crash the page
      try {
        globe = createGlobe(canvasRef.current, {
          devicePixelRatio: 2,
          width: width * 2,
          height: width * 2,
          phi: 0,
          theta: 0.45,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.14, 0.13, 0.11],
          markerColor: [1, 0.75, 0.01],
          glowColor: [0.16, 0.13, 0.04],
          markers: [{ location: [MONACO.lat, MONACO.lng], size: 0.12 }],
          onRender: (state) => {
            // Auto-rotate when not interacting
            if (pointerInteracting.current === null) {
              phiRef.current += 0.003
            }
            state.phi = phiRef.current + pointerInteractionMovement.current
            state.width = width * 2
            state.height = width * 2
          },
        })
      } catch {
        globe = null
      }
    }

    const ro = new ResizeObserver(() => {
      width = containerRef.current?.offsetWidth ?? 0
      create()
    })
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      globe?.destroy()
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
      className="relative w-full aspect-square"
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
    </div>
  )
}
