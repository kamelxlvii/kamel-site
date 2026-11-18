'use client'

import { useEffect, useRef } from 'react'

// Top-down street racer: drive the yellow 47 three laps around Monaco, switching lanes through traffic.
// Logical canvas is 360x480; it scales to the container and the device pixel ratio.
const W = 360
const H = 480
const ROAD_L = 60
const ROAD_R = 300
const LANES = 3
const LANE_W = (ROAD_R - ROAD_L) / LANES
const CAR_W = 34
const CAR_H = 62
const PLAYER_Y = 390
const LAP_M = 3337 // Circuit de Monaco lap length in metres
const LAPS = 3
const RACE_M = LAP_M * LAPS
const PX_PER_M = 4 // world pixels per metre: about 30 s a lap
const TRAFFIC = 0.5 // traffic drives at half your speed, all cars alike, so gaps never close
const FINISH_CLEAR_M = 250 // no traffic on the run to the flag
// race pace rises from 280 to 520 px/s over the three laps
const pace = (progress: number) => 280 + 240 * progress
// time you get to switch lanes between two rows of traffic, in seconds (shrinks from 0.95 to 0.6 over the race)
const window_ = (progress: number) => 0.95 - 0.35 * progress
const GAS = 1.3 // ↑ holds 30% over race pace
const BRAKE = 0.7 // ↓ holds 30% under
const BEST_KEY = 'monaco-best-time'

type Phase = 'ready' | 'playing' | 'paused' | 'over' | 'won'
type Rival = { lane: number; y: number; color: string }

const laneX = (lane: number) => ROAD_L + LANE_W * (lane + 0.5)
const RIVAL_COLORS = ['#13204A', '#EFE8D8', '#6E1423', '#3A3A3A', '#1F5F4A']

function fmtTime(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${(s - m * 60).toFixed(1).padStart(4, '0')}`
}

function drawCar(ctx: CanvasRenderingContext2D, x: number, y: number, body: string, trim: string, number?: string) {
  ctx.save()
  ctx.translate(x, y)
  // wheels
  ctx.fillStyle = '#0b0b0b'
  for (const [wx, wy] of [[-CAR_W / 2 - 4, -CAR_H / 2 + 8], [CAR_W / 2 - 4, -CAR_H / 2 + 8], [-CAR_W / 2 - 5, CAR_H / 2 - 22], [CAR_W / 2 - 3, CAR_H / 2 - 22]]) {
    ctx.fillRect(wx, wy, 8, 15)
  }
  // front and rear wings
  ctx.fillStyle = trim
  ctx.fillRect(-CAR_W / 2, -CAR_H / 2, CAR_W, 6)
  ctx.fillRect(-CAR_W / 2 + 2, CAR_H / 2 - 7, CAR_W - 4, 7)
  // body: nose, sidepods
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.moveTo(-4, -CAR_H / 2 + 4)
  ctx.lineTo(4, -CAR_H / 2 + 4)
  ctx.lineTo(7, -8)
  ctx.lineTo(CAR_W / 2 - 3, 0)
  ctx.lineTo(CAR_W / 2 - 3, CAR_H / 2 - 12)
  ctx.lineTo(-CAR_W / 2 + 3, CAR_H / 2 - 12)
  ctx.lineTo(-CAR_W / 2 + 3, 0)
  ctx.lineTo(-7, -8)
  ctx.closePath()
  ctx.fill()
  // cockpit + helmet, set forward to leave the engine cover for the race number
  ctx.fillStyle = '#111'
  ctx.fillRect(-5, -8, 10, 12)
  ctx.fillStyle = trim
  ctx.beginPath()
  ctx.arc(0, -2, 4, 0, Math.PI * 2)
  ctx.fill()
  if (number) {
    ctx.font = '900 italic 13px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.lineWidth = 3
    ctx.strokeStyle = '#EFE8D8'
    ctx.strokeText(number, 0, 12)
    ctx.fillStyle = '#13204A'
    ctx.fillText(number, 0, 12)
  }
  ctx.restore()
}

export function RaceGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const css = getComputedStyle(document.documentElement)
    const ACCENT = css.getPropertyValue('--accent').trim() || '#FFC002'
    const FONT = css.getPropertyValue('--font-archivo').trim() || 'sans-serif'

    let best = 0 // best finishing time in seconds, 0 = never finished
    try { best = Number(localStorage.getItem(BEST_KEY)) || 0 } catch {}

    let phase: Phase = 'ready'
    let lane = 1
    let px = laneX(1)
    let speed = 0
    let dist = 0 // metres driven
    let time = 0
    let rivals: Rival[] = []
    let rowGap = 0 // traffic distance until the next row spawns, px
    let prevFree = [0, 1, 2] // open lanes in the last row of traffic
    let endT = 0 // seconds since the race ended, for the flash and the restart lock
    let newBest = false
    let inView = false
    let throttle = 0 // 1 = gas, -1 = brake, 0 = race pace
    let last = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(w * (H / W) * dpr)
      ctx.setTransform((w * dpr) / W, 0, 0, (w * dpr) / W, 0, 0)
      draw()
    }

    const reset = () => {
      lane = 1; px = laneX(1); speed = pace(0); dist = 0; time = 0; throttle = 0
      rivals = []; rowGap = 260; prevFree = [0, 1, 2]; endT = 0; newBest = false
    }

    const start = () => {
      if (phase === 'playing') return
      // a short lock after a crash or finish so mashing keys doesn't instantly restart
      if ((phase === 'over' || phase === 'won') && endT < 0.7) return
      if (phase !== 'paused') reset()
      phase = 'playing'
      last = performance.now()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }

    const steer = (dir: number) => {
      if (phase !== 'playing') return start()
      lane = Math.max(0, Math.min(LANES - 1, lane + dir))
    }

    // One row of traffic. A row blocks one or two lanes and always leaves an open lane
    // within one lane change of every open lane in the previous row, so you never need two moves at once.
    const spawnRow = () => {
      const progress = dist / RACE_M
      const double = Math.random() < 0.2 + progress * 0.45
      let free: number[]
      if (double) {
        const options = [0, 1, 2].filter(f => prevFree.every(p => Math.abs(p - f) <= 1))
        free = [options[(Math.random() * options.length) | 0]]
      } else {
        const blocked = (Math.random() * LANES) | 0
        free = [0, 1, 2].filter(l => l !== blocked)
      }
      for (let l = 0; l < LANES; l++) {
        if (!free.includes(l)) rivals.push({ lane: l, y: -CAR_H, color: RIVAL_COLORS[(Math.random() * RIVAL_COLORS.length) | 0] })
      }
      prevFree = free
      // Space rows by time, not distance: after this row's cars clear you and before the next row's
      // cars reach you, there's always at least window_() seconds to change lanes. Sized for full gas,
      // so holding ↑ can never squeeze a gap below that; race pace and braking get more time.
      const clear = 2 * (CAR_H - 12) + 24 // px of track both rows' cars occupy around you, plus margin
      rowGap = clear + pace(progress) * GAS * TRAFFIC * (window_(progress) + Math.random() * 0.35 + (double ? 0.1 : 0))
    }

    const finish = (won: boolean) => {
      phase = won ? 'won' : 'over'
      endT = 0
      if (won && (best === 0 || time < best)) {
        best = time; newBest = true
        try { localStorage.setItem(BEST_KEY, String(best)) } catch {}
      }
    }

    const update = (dt: number) => {
      time += dt
      const target = pace(dist / RACE_M) * (throttle > 0 ? GAS : throttle < 0 ? BRAKE : 1)
      speed += Math.max(-360 * dt, Math.min(260 * dt, target - speed))
      dist += (speed * dt) / PX_PER_M
      px += (laneX(lane) - px) * Math.min(1, dt * 14)

      const rel = speed * TRAFFIC // traffic moves down the screen at this rate
      for (const r of rivals) r.y += rel * dt
      rivals = rivals.filter(r => r.y < H + CAR_H)

      rowGap -= rel * dt
      if (rowGap <= 0 && dist < RACE_M - FINISH_CLEAR_M) spawnRow()

      for (const r of rivals) {
        if (Math.abs(laneX(r.lane) - px) < CAR_W - 8 && Math.abs(r.y - PLAYER_Y) < CAR_H - 12) return finish(false)
      }
      if (dist >= RACE_M) finish(true)
    }

    const text = (s: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = 'center', weight = '900 italic') => {
      ctx.font = `${weight} ${size}px ${FONT}`
      ctx.textAlign = align
      ctx.fillStyle = color
      ctx.fillText(s, x, y)
    }

    // Lap and finish lines are checkered strips at fixed track positions
    const checkered = (y: number) => {
      for (let x = ROAD_L, i = 0; x < ROAD_R; x += 10, i++) {
        ctx.fillStyle = i % 2 ? '#111' : '#EFE8D8'
        ctx.fillRect(x, y, 10, 7)
        ctx.fillStyle = i % 2 ? '#EFE8D8' : '#111'
        ctx.fillRect(x, y + 7, 10, 7)
      }
    }

    const draw = () => {
      const world = dist * PX_PER_M // px of track driven
      const scroll = world % 40

      // harbour on the left, grandstands on the right
      ctx.fillStyle = '#0d0c0a'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#13204A'
      ctx.fillRect(0, 0, ROAD_L - 14, H)
      ctx.fillStyle = '#1a1814'
      ctx.fillRect(ROAD_R + 14, 0, W - ROAD_R - 14, H)

      // trackside boards scroll past: MONACO on the harbour side, KAMEL MOTORSPORT on the grandstand side
      const BOARD = 230
      for (let y = -BOARD + (world % BOARD); y < H; y += BOARD) {
        ctx.save()
        ctx.translate(23, y + BOARD / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.fillStyle = ACCENT
        ctx.fillRect(-80, -12, 160, 24)
        ctx.font = `900 italic 15px ${FONT}`
        ctx.textAlign = 'center'
        ctx.fillStyle = '#0b0a08'
        ctx.fillText('MONACO', 0, 6)
        ctx.restore()

        ctx.save()
        ctx.translate(W - 23, y + 40)
        ctx.rotate(Math.PI / 2)
        ctx.fillStyle = '#EFE8D8'
        ctx.fillRect(-95, -12, 190, 24)
        ctx.font = `900 italic 12px ${FONT}`
        ctx.textAlign = 'center'
        ctx.fillStyle = '#0b0a08'
        ctx.fillText('KAMEL', -42, 5)
        ctx.fillStyle = '#C99400'
        ctx.fillText('MOTORSPORT', 30, 5)
        ctx.restore()
      }

      // asphalt
      ctx.fillStyle = '#2b2924'
      ctx.fillRect(ROAD_L, 0, ROAD_R - ROAD_L, H)

      // names painted on the track, alternating
      const PAINT = 700
      const k = Math.floor(world / PAINT)
      for (let j = 0; j < 2; j++) {
        const y = PLAYER_Y - 300 + (world % PAINT) - j * PAINT
        if (y < -60 || y > H + 60) continue
        ctx.save()
        ctx.globalAlpha = 0.13
        text((k - j) % 2 ? 'KAMEL' : 'MONACO', (ROAD_L + ROAD_R) / 2, y, 44, '#EFE8D8')
        ctx.restore()
      }

      // kerbs
      for (let y = -40 + scroll; y < H; y += 40) {
        for (const x of [ROAD_L - 14, ROAD_R]) {
          ctx.fillStyle = '#C8102E'
          ctx.fillRect(x, y, 14, 20)
          ctx.fillStyle = '#EFE8D8'
          ctx.fillRect(x, y + 20, 14, 20)
        }
      }
      // lane dashes
      ctx.fillStyle = 'rgba(239,232,216,0.35)'
      for (let i = 1; i < LANES; i++) {
        for (let y = -40 + scroll; y < H; y += 40) ctx.fillRect(ROAD_L + LANE_W * i - 1.5, y, 3, 20)
      }
      // the lap line just passed and the one coming up
      const lapsDone = Math.floor(dist / LAP_M)
      for (const lineM of [lapsDone * LAP_M, (lapsDone + 1) * LAP_M]) {
        if (lineM <= 0 || lineM > RACE_M) continue
        const y = PLAYER_Y - CAR_H / 2 - (lineM - dist) * PX_PER_M
        if (y > -20 && y < H) checkered(y)
      }

      for (const r of rivals) drawCar(ctx, laneX(r.lane), r.y, r.color, '#777')
      if (phase !== 'ready') drawCar(ctx, px, PLAYER_Y, ACCENT, '#13204A', '47')

      // HUD sits on a dark strip over the road, clear of the trackside boards
      if (phase === 'playing' || phase === 'paused') {
        ctx.fillStyle = 'rgba(11,10,8,0.6)'
        ctx.fillRect(ROAD_L, 0, ROAD_R - ROAD_L, 50)
        text(`LAP ${Math.min(LAPS, lapsDone + 1)}/${LAPS}`, ROAD_L + 10, 22, 14, ACCENT, 'left')
        text(`${Math.round(speed / 2)} KM/H`, ROAD_L + 10, 39, 10, '#B5AD9C', 'left', '700')
        text(fmtTime(time), ROAD_R - 10, 22, 15, '#EFE8D8', 'right')
        if (best) text(`BEST ${fmtTime(best)}`, ROAD_R - 10, 39, 10, '#B5AD9C', 'right', '700')
        // race progress
        ctx.fillStyle = 'rgba(239,232,216,0.15)'
        ctx.fillRect(ROAD_L, 47, ROAD_R - ROAD_L, 3)
        ctx.fillStyle = ACCENT
        ctx.fillRect(ROAD_L, 47, (ROAD_R - ROAD_L) * Math.min(1, dist / RACE_M), 3)
      }

      if (phase !== 'playing') {
        const flash = Math.max(0, 1 - endT * 2)
        ctx.fillStyle = phase === 'over' ? `rgba(110,20,35,${0.55 + flash * 0.3})` : phase === 'won' ? 'rgba(11,10,8,0.75)' : 'rgba(11,10,8,0.72)'
        ctx.fillRect(0, 0, W, H)
        const again = endT >= 0.7 ? 'TAP OR PRESS SPACE TO RACE AGAIN' : ''
        if (phase === 'ready') {
          drawCar(ctx, W / 2, 340, ACCENT, '#13204A', '47')
          text('KAMEL MOTORSPORT', W / 2, 118, 12, '#EFE8D8', 'center', '800 italic')
          text('MONACO', W / 2, 162, 46, ACCENT)
          text(`${LAPS} LAPS · STREET CIRCUIT`, W / 2, 186, 11, '#EFE8D8', 'center', '700')
          text('TAP OR PRESS SPACE TO RACE', W / 2, 236, 12, '#EFE8D8', 'center', '700')
          text('← → SWITCH LANES  ·  ↑ GAS  ·  ↓ BRAKE', W / 2, 256, 9, '#B5AD9C', 'center', '600')
          text('ON YOUR PHONE: TAP LEFT / RIGHT', W / 2, 270, 8, '#7D766A', 'center', '600')
          if (best) text(`BEST ${fmtTime(best)}`, W / 2, 290, 10, ACCENT, 'center', '700')
        } else if (phase === 'paused') {
          text('PAUSED', W / 2, 220, 34, ACCENT)
          text('TAP TO RESUME', W / 2, 250, 12, '#EFE8D8', 'center', '700')
        } else if (phase === 'won') {
          for (let i = 0; i < 2; i++) checkered(100 + i * 14)
          text('CHECKERED FLAG', W / 2, 170, 30, ACCENT)
          text('KAMEL WINS MONACO', W / 2, 198, 13, '#EFE8D8', 'center', '800 italic')
          text(fmtTime(time), W / 2, 248, 34, '#EFE8D8')
          text(newBest ? 'NEW BEST TIME' : `BEST ${fmtTime(best)}`, W / 2, 272, 11, ACCENT, 'center', '700')
          text(again, W / 2, 320, 11, '#EFE8D8', 'center', '700')
        } else {
          text('CRASHED', W / 2, 170, 40, '#EFE8D8')
          text(`LAP ${Math.min(LAPS, lapsDone + 1)}/${LAPS} · ${Math.floor((dist / RACE_M) * 100)}% OF THE RACE`, W / 2, 204, 11, ACCENT, 'center', '700')
          if (best) text(`BEST ${fmtTime(best)}`, W / 2, 226, 10, '#EFE8D8', 'center', '700')
          text(again, W / 2, 290, 11, '#EFE8D8', 'center', '700')
        }
      }
    }

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (phase === 'playing') update(dt)
      else endT += dt
      draw()
      // keep animating through the crash flash and until the restart prompt appears
      if (phase === 'playing' || ((phase === 'over' || phase === 'won') && endT < 0.8)) raf = requestAnimationFrame(loop)
    }

    const pause = () => {
      throttle = 0
      if (phase === 'playing') { phase = 'paused'; draw() }
    }

    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      const go = k === ' ' || k === 'Enter'
      const left = k === 'ArrowLeft' || k === 'a' || k === 'A'
      const right = k === 'ArrowRight' || k === 'd' || k === 'D'
      const gas = k === 'ArrowUp' || k === 'w' || k === 'W'
      const brake = k === 'ArrowDown' || k === 's' || k === 'S'
      // while you race, ↑/↓ are gas and brake and the page stays put
      if (phase === 'playing' && (gas || brake || k === 'PageUp' || k === 'PageDown')) {
        e.preventDefault()
        if (gas || brake) throttle = gas ? 1 : -1
        return
      }
      // otherwise keys only reach the game when it's focused or on screen, so the page still scrolls normally
      if (phase !== 'playing' && document.activeElement !== canvas && !inView) return
      if (!(go || left || right)) return
      e.preventDefault()
      if (e.repeat) return // holding a key moves one lane, not three
      if (go) start()
      else steer(left ? -1 : 1)
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key
      if (throttle > 0 && (k === 'ArrowUp' || k === 'w' || k === 'W')) throttle = 0
      if (throttle < 0 && (k === 'ArrowDown' || k === 's' || k === 'S')) throttle = 0
    }

    const onPointer = (e: PointerEvent) => {
      canvas.focus({ preventScroll: true })
      if (phase !== 'playing') return start()
      const rect = canvas.getBoundingClientRect()
      steer(e.clientX - rect.left < rect.width / 2 ? -1 : 1)
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.6
      if (entry.intersectionRatio < 0.3) pause()
    }, { threshold: [0, 0.3, 0.6, 1] })
    const onHidden = () => { if (document.hidden) pause() }

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKeyUp)
    document.addEventListener('visibilitychange', onHidden)
    window.addEventListener('blur', pause) // switching apps pauses the race
    canvas.addEventListener('pointerdown', onPointer)
    canvas.addEventListener('blur', pause)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('visibilitychange', onHidden)
      window.removeEventListener('blur', pause)
      canvas.removeEventListener('pointerdown', onPointer)
      canvas.removeEventListener('blur', pause)
    }
  }, [])

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 'min(600px, calc((100svh - 190px) * 0.75))' }}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label="Monaco street racer game. Press space to start, left and right arrows to switch lanes, up for gas, down to brake. Three laps to win."
        className="block w-full aspect-[3/4] touch-manipulation select-none ring-1 ring-[var(--accent)]/30 shadow-[0_0_60px_rgba(255,192,2,0.08)] focus:outline-none focus-visible:ring-[var(--accent)]"
      />
    </div>
  )
}
