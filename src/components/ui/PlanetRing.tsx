'use client'

import { useEffect, useRef } from 'react'
import { Globe } from '@/components/ui/Globe'

// The globe with "A PLANET OF YOUR OWN" circling it like a Saturn ring: a tilted, see-through band of letters.
// The far half is drawn on a canvas behind the globe, the near half on one in front, so the ring passes behind and around it.
const PHRASE = 'A PLANET OF YOUR OWN  •  '
const REPEATS = 2
const TILT = -0.26 // whole ring rotated, radians
const FLAT = 0.28 // ellipse height / width: how edge-on the ring is
const RING_R = 0.46 // ring radius, fraction of the component width
const SPIN = 0.18 // radians per second
const ASPECT = 0.74 // component height / width: the globe plus the ring's top and bottom

export function PlanetRing() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLCanvasElement>(null)
  const frontRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current!
    const layers = [backRef.current!, frontRef.current!].map(c => ({ c, ctx: c.getContext('2d')! }))
    const css = getComputedStyle(document.documentElement)
    const ACCENT = css.getPropertyValue('--accent').trim() || '#FFC002'
    const FONT = css.getPropertyValue('--font-archivo').trim() || 'sans-serif'
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let size = 0 // component width
    let height = 0
    let dpr = 1
    let glyphs: { ch: string; at: number }[] = [] // each letter's angle along the ring, measured from the phrase start
    let fontPx = 0
    let spin = 0
    let raf = 0
    let last = 0
    let visible = false

    const layout = () => {
      size = wrap.clientWidth
      height = size * ASPECT
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const { c } of layers) { c.width = Math.round(size * dpr); c.height = Math.round(height * dpr) }
      // size the font so the phrase, repeated, wraps the ring exactly once
      const R = size * RING_R
      const ctx = layers[0].ctx
      ctx.font = `900 italic 100px ${FONT}`
      const text = PHRASE.repeat(REPEATS)
      const full = ctx.measureText(text).width
      fontPx = (100 * 2 * Math.PI * R) / full
      ctx.font = `900 italic ${fontPx}px ${FONT}`
      glyphs = []
      let run = 0
      for (const ch of text) {
        const w = ctx.measureText(ch).width
        glyphs.push({ ch, at: (run + w / 2) / R })
        run += w
      }
      draw()
    }

    const draw = () => {
      const R = size * RING_R
      const cx = size / 2
      const cy = height / 2
      const band = fontPx * 0.62 // half-height of the band edges around the letters
      const cosT = Math.cos(TILT)
      const sinT = Math.sin(TILT)
      for (const { c, ctx } of layers) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, c.width, c.height)
      }
      // point on the ring at angle a, offset along the band's up direction; depth > 0 is the near side
      const at = (a: number, up: number) => {
        const x0 = R * Math.cos(a)
        const y0 = R * FLAT * Math.sin(a)
        return { x: cx + x0 * cosT - y0 * sinT + up * sinT, y: cy + x0 * sinT + y0 * cosT - up * cosT, depth: Math.sin(a) }
      }

      // the ring itself: a see-through band tinted Monaco yellow, one shape per half so there are no seams or outlines
      for (const front of [false, true]) {
        const { ctx } = layers[front ? 1 : 0]
        const from = front ? 0 : Math.PI
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.beginPath()
        for (let i = 0; i <= 90; i++) { const p = at(from + (i / 90) * Math.PI, band); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y) }
        for (let i = 90; i >= 0; i--) { const p = at(from + (i / 90) * Math.PI, -band); ctx.lineTo(p.x, p.y) }
        ctx.closePath()
        ctx.fillStyle = ACCENT
        ctx.globalAlpha = front ? 0.13 : 0.07
        ctx.fill()
      }

      // letters stand on the band facing outward: sideways they foreshorten, behind the globe they read mirrored
      for (const g of glyphs) {
        const a = Math.PI / 2 + spin - g.at // the phrase reads left to right across the near side
        const p = at(a, 0)
        const ux = Math.sin(a)
        const uy = -FLAT * Math.cos(a)
        const front = p.depth > 0
        const { ctx } = layers[front ? 1 : 0]
        ctx.setTransform(
          dpr * (ux * cosT - uy * sinT), dpr * (ux * sinT + uy * cosT),
          dpr * -sinT, dpr * cosT,
          dpr * p.x, dpr * p.y,
        )
        ctx.font = `900 italic ${fontPx}px ${FONT}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = ACCENT
        ctx.globalAlpha = front ? 0.4 + 0.35 * p.depth : 0.2
        ctx.fillText(g.ch, 0, 0)
      }
      for (const { ctx } of layers) ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      spin += Math.min(0.05, (now - last) / 1000) * SPIN
      last = now
      draw()
      if (visible) raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !still) { last = performance.now(); raf = requestAnimationFrame(loop) }
    })

    // wait for the display font so the ring is measured with it
    document.fonts.ready.then(layout)
    layout()
    io.observe(wrap)
    window.addEventListener('resize', layout)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', layout)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[560px]" style={{ aspectRatio: `1 / ${ASPECT}` }}>
      <canvas ref={backRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2">
        <Globe />
      </div>
      <canvas ref={frontRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
      <span className="sr-only">A Planet of Your Own</span>
    </div>
  )
}
