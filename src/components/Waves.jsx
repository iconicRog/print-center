import { useEffect, useRef } from 'react'
import './Waves.css'

class Noise {
  constructor(octaves = 4) {
    this.p = new Uint8Array(512)
    this.octaves = octaves
    this.seed()
  }

  seed() {
    for (let i = 0; i < 256; i++) this.p[i] = i
    for (let i = 255; i > 0; i--) {
      const n = Math.floor((i + 1) * Math.random())
      const q = this.p[i]
      this.p[i] = this.p[n]
      this.p[n] = q
    }
    for (let i = 0; i < 256; i++) this.p[i + 256] = this.p[i]
  }

  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
  lerp(t, a, b) { return a + t * (b - a) }

  grad(hash, x, y, z) {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  noise(x, y, z) {
    const p = this.p
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const Z = Math.floor(z) & 255
    x -= Math.floor(x)
    y -= Math.floor(y)
    z -= Math.floor(z)
    const u = this.fade(x)
    const v = this.fade(y)
    const w = this.fade(z)
    const A  = p[X]     + Y; const AA = p[A]     + Z; const AB = p[A + 1] + Z
    const B  = p[X + 1] + Y; const BA = p[B]     + Z; const BB = p[B + 1] + Z
    return this.lerp(w,
      this.lerp(v,
        this.lerp(u, this.grad(p[AA],     x,     y,     z),  this.grad(p[BA],     x - 1, y,     z)),
        this.lerp(u, this.grad(p[AB],     x,     y - 1, z),  this.grad(p[BB],     x - 1, y - 1, z))
      ),
      this.lerp(v,
        this.lerp(u, this.grad(p[AA + 1], x,     y,     z - 1), this.grad(p[BA + 1], x - 1, y,     z - 1)),
        this.lerp(u, this.grad(p[AB + 1], x,     y - 1, z - 1), this.grad(p[BB + 1], x - 1, y - 1, z - 1))
      )
    )
  }
}

export default function Waves({
  lineColor       = 'rgba(255,255,255,0.2)',
  backgroundColor = 'transparent',
  waveSpeedX      = 0.0125,
  waveSpeedY      = 0.005,
  waveAmpX        = 32,
  waveAmpY        = 16,
  xGap            = 10,
  yGap            = 32,
  friction        = 0.925,
  tension         = 0.005,
  maxCursorMove   = 120,
  style           = {},
  className       = '',
}) {
  const canvasRef  = useRef(null)
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 })
  const noiseRef   = useRef(new Noise(4))
  const linesRef   = useRef([])
  const mouseRef   = useRef({ x: 0, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false })
  const rafRef     = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const setSize = () => {
      const rect = canvas.getBoundingClientRect()
      boundingRef.current = rect
      const dpr = window.devicePixelRatio || 1
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      setLines()
    }

    const setLines = () => {
      const { width, height } = boundingRef.current
      linesRef.current = []
      const oWidth      = width  + 200
      const oHeight     = height + 30
      const totalLines  = Math.ceil(oWidth  / xGap)
      const totalPoints = Math.ceil(oHeight / yGap)
      const xStart = (width  - xGap * totalLines)  / 2
      const yStart = (height - yGap * totalPoints) / 2
      for (let i = 0; i <= totalLines; i++) {
        const pts = []
        for (let j = 0; j <= totalPoints; j++) {
          pts.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave:   { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          })
        }
        linesRef.current.push(pts)
      }
    }

    const onMouseMove = (e) => {
      const mouse = mouseRef.current
      const rect  = boundingRef.current
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (!mouse.set) { mouse.lx = mouse.x; mouse.ly = mouse.y; mouse.set = true }
    }

    const tick = (t) => {
      const { width, height } = boundingRef.current
      ctx.clearRect(0, 0, width, height)
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, width, height)
      }

      const mouse = mouseRef.current
      const n     = noiseRef.current

      mouse.sx += (mouse.x - mouse.lx) * 0.1
      mouse.sy += (mouse.y - mouse.ly) * 0.1
      mouse.sx *= friction
      mouse.sy *= friction
      mouse.v   = Math.sqrt(mouse.sx * mouse.sx + mouse.sy * mouse.sy)
      mouse.vs += (mouse.v - mouse.vs) * 0.1
      mouse.vs *= friction
      mouse.a   = Math.atan2(mouse.sy, mouse.sx)
      mouse.lx  = mouse.x
      mouse.ly  = mouse.y

      ctx.strokeStyle = lineColor
      ctx.lineWidth   = 1
      ctx.beginPath()

      linesRef.current.forEach((pts) => {
        pts.forEach((p, j) => {
          const n1 = n.noise(p.x * 0.002 + t * waveSpeedX, p.y * 0.004, t * waveSpeedY)
          const n2 = n.noise(p.x * 0.002 - t * waveSpeedX, p.y * 0.004, t * waveSpeedY)
          p.wave.x = Math.cos(n1 * Math.PI * 2) * waveAmpX
          p.wave.y = Math.cos(n2 * Math.PI * 2) * waveAmpY

          const dx  = p.x - mouse.x
          const dy  = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mf   = Math.max(0, 1 - dist / (maxCursorMove * 2))

          p.cursor.vx += (Math.cos(mouse.a) * mouse.vs * 48 - p.cursor.x) * tension
          p.cursor.vy += (Math.sin(mouse.a) * mouse.vs * 48 - p.cursor.y) * tension
          p.cursor.vx *= friction
          p.cursor.vy *= friction
          p.cursor.x  += p.cursor.vx * mf
          p.cursor.y  += p.cursor.vy * mf

          const nx = p.x + p.wave.x + p.cursor.x
          const ny = p.y + p.wave.y + p.cursor.y
          if (j === 0) ctx.moveTo(nx, ny)
          else         ctx.lineTo(nx, ny)
        })
      })

      ctx.stroke()
      rafRef.current = requestAnimationFrame(tick)
    }

    setSize()
    window.addEventListener('resize',    setSize)
    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize',    setSize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, xGap, yGap, friction, tension, maxCursorMove])

  return (
    <canvas
      ref={canvasRef}
      className={`waves ${className}`}
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}
