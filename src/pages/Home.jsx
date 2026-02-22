import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import SectionHeader from '../components/SectionHeader'
import AnimatedContainer from '../components/AnimatedContainer'
import CTAButton from '../components/CTAButton'
import {
  Printer, Image, ScanLine, Scissors, BookOpen,
  ShieldCheck, Clock, Star, Users, ArrowRight,
} from 'lucide-react'

const services = [
  { icon: Printer,   title: 'Digital Printing',       description: 'Crystal-clear prints in any size — brochures, documents, business cards & more, finished same day.' },
  { icon: Image,     title: 'Banners & Flyers',        description: 'Large-format banners, event flyers, and posters that demand attention. Indoor & outdoor options.' },
  { icon: ScanLine,  title: 'Scanning & Photocopying', description: 'High-resolution scanning up to A3 and fast, crisp photocopying for personal or business needs.' },
  { icon: Scissors,  title: 'Laminating',              description: 'Protect and enhance your prints with gloss or matte lamination in standard or custom sizes.' },
  { icon: BookOpen,  title: 'Stationery Supplies',     description: 'Pens, notebooks, paper reams, folders, and office essentials — all in one convenient place.' },
]

const whyUs = [
  { icon: ShieldCheck, title: 'Premium Quality',  desc: 'Professional-grade equipment for sharp, vibrant results on every job.' },
  { icon: Clock,       title: 'Fast Turnaround',  desc: 'Most orders ready within hours. Rush service available for urgent needs.' },
  { icon: Star,        title: 'Expert Team',      desc: 'Experienced staff who care about your project as much as you do.' },
  { icon: Users,       title: 'Friendly Service', desc: 'Walk in and get real, personable help — no complicated online forms.' },
]

const capabilities = [
  { label: 'Large Format Printing', color: 'from-sky to-navy',        img: '/images/large-format-printing.png' },
  { label: 'Custom Stationery',     color: 'from-gold to-sky',        img: '/images/custom-stationery.png' },
  { label: 'Event Materials',       color: 'from-navy-mid to-sky',    img: '/images/event-materials.png' },
  { label: 'Business Branding',     color: 'from-sky to-gold',        img: '/images/business-branding.png' },
  { label: 'Photo Printing',        color: 'from-gold to-navy-mid',   img: '/images/photo-printing.png' },
  { label: 'Office Supplies',       color: 'from-navy to-navy-light', img: '/images/Office-Supplies.png' },
]

function CounterStat({ end, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className="text-center"
    >
      <p className="font-['Playfair_Display'] font-700 text-3xl sm:text-4xl gold-text">{end}</p>
      <p className="text-muted text-sm mt-1">{label}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />

      {/* ── Services ── */}
      <section className="bg-navy py-24 px-4 sm:px-6 lg:px-8" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            light
            eyebrow="What We Do"
            title="Complete Print Solutions"
            subtitle="From a single sheet to a full event campaign — we handle it all with precision."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedContainer key={s.title} delay={i * 0.07}>
                <ServiceCard {...s} dark />
              </AnimatedContainer>
            ))}
          </div>
          <AnimatedContainer delay={0.4} className="mt-10 text-center">
            <Link to="/services">
              <CTAButton variant="outline">
                View All Services
                <ArrowRight size={16} aria-hidden="true" />
              </CTAButton>
            </Link>
          </AnimatedContainer>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface" aria-label="Why choose us">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Why PrintCenter"
            title="Trusted by Thousands"
            subtitle="Quality, speed, and service that keeps our customers coming back."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14">
            <CounterStat end="10K+" label="Jobs Completed"    />
            <CounterStat end="500+" label="Happy Clients"     />
            <CounterStat end="24hr" label="Avg. Turnaround"   />
            <CounterStat end="99%"  label="Satisfaction Rate" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedContainer key={title} delay={i * 0.08}>
                <div className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-md transition-all duration-200 cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-200">
                    <Icon className="text-gold group-hover:text-navy transition-colors duration-200" size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-['Playfair_Display'] font-600 text-lg text-navy mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Capabilities ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" aria-label="Capabilities">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Capabilities"
            title="Built for Every Print Need"
            subtitle="Whatever you're creating, we have the equipment, materials, and expertise."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {capabilities.map(({ label, color, img }, i) => (
              <AnimatedContainer key={label} delay={i * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative rounded-2xl overflow-hidden aspect-video bg-linear-to-br ${color} cursor-default`}
                >
                  <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-['Playfair_Display'] font-600 text-lg text-center px-4">{label}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                    <p className="text-white font-semibold text-sm">{label}</p>
                  </div>
                </motion.div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-4 sm:px-6 bg-linear-to-r from-navy via-navy-mid to-sky" aria-label="Call to action">
        <AnimatedContainer className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] font-700 text-4xl sm:text-5xl text-white mb-4">
            Ready to start your <span className="gold-text italic">print project?</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">Visit us, call, or send a message — we'll handle the rest.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <CTAButton variant="primary">Get a Free Quote <ArrowRight size={16} aria-hidden="true" /></CTAButton>
            </Link>
            <Link to="/services">
              <CTAButton variant="secondary">Browse Services</CTAButton>
            </Link>
          </div>
        </AnimatedContainer>
      </section>
    </div>
  )
}
