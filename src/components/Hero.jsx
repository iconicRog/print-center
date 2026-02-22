import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import CTAButton from './CTAButton'
import Ballpit from './Ballpit'
import Orb from './Orb'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const { theme } = useTheme()

  // colors[0] becomes the PointLight color — must be bright enough to illuminate the scene.
  // Classic: gold → sky-blue gradient. Aurora: violet → orange gradient.
  const ballColors = theme === 'aurora'
    ? [0xA78BFA, 0x7C3AED, 0xC084FC, 0xF97316, 0xFB923C]   // violet light → orange
    : [0xC9A84C, 0xE4C97E, 0xF8FAFC, 0x0EA5E9, 0x0369A1]   // gold light → sky-blue

  // Orb hue: Classic = 40° (warm gold/amber), Aurora = 260° (violet)
  const orbHue          = theme === 'aurora' ? 260 : 40
  const orbBgColor      = theme === 'aurora' ? '#09090F' : '#0F172A'

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Animated gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-linear-to-br from-navy via-navy-mid to-sky"
        aria-hidden="true"
      />

      {/* Ballpit animation */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Ballpit
          followCursor
          count={180}
          colors={ballColors}
          ambientColor={0xffffff}
          ambientIntensity={1.2}
          lightIntensity={220}
          gravity={0.45}
          friction={0.9975}
          wallBounce={0.95}
          maxVelocity={0.15}
          minSize={0.4}
          maxSize={0.9}
          materialParams={{ metalness: 0.4, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.1 }}
        />
      </div>

      {/* Orb shader — large glowing sphere on the right */}
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[680px] h-[680px] pointer-events-none"
        aria-hidden="true"
      >
        <Orb
          hue={orbHue}
          hoverIntensity={2}
          rotateOnHover
          forceHoverState={false}
          backgroundColor={orbBgColor}
        />
      </div>

      {/* Decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">

            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              <span className="text-white/80 text-xs font-medium tracking-wide">Premium Print &amp; Stationery</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-['Playfair_Display'] font-700 text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6"
            >
              Printing{' '}
              <span className="gold-text italic">Ideas.</span>
              <br />
              Supplying{' '}
              <span className="text-sky-light">Productivity.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p variants={item} className="text-white/70 text-base sm:text-xl leading-relaxed mb-10 max-w-xl">
              Your one-stop Stationery &amp; Digital Print Center: high quality, fast turnaround, professional finish every time.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <CTAButton variant="primary">
                  Get a Free Quote
                  <ArrowRight size={16} aria-hidden="true" />
                </CTAButton>
              </Link>
              <Link to="/services">
                <CTAButton variant="secondary">
                  <PlayCircle size={18} aria-hidden="true" />
                  Explore Services
                </CTAButton>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={item} className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-5 sm:gap-8">
              {[
                { value: '10K+', label: 'Jobs Completed'    },
                { value: '500+', label: 'Happy Clients'     },
                { value: '24hr', label: 'Avg. Turnaround'   },
                { value: '99%',  label: 'Satisfaction Rate' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-['Playfair_Display'] font-700 text-2xl sm:text-3xl text-gold">{value}</p>
                  <p className="text-white/55 text-xs mt-0.5 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
