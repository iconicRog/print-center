import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Lightbulb, Leaf, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import AnimatedContainer from '../components/AnimatedContainer'
import CTAButton from '../components/CTAButton'

const values = [
  { icon: Heart,     title: 'Customer First',      desc: "Every decision we make is guided by what's best for the people we serve." },
  { icon: Lightbulb, title: 'Constant Innovation', desc: 'We invest in the latest technology to deliver sharper, faster, better prints.' },
  { icon: Leaf,      title: 'Sustainability',      desc: 'Eco-friendly inks, recycled paper options, and responsible waste practices.' },
]

const steps = [
  { num: '01', title: 'Request',          desc: 'Submit your files and requirements online, by phone, or walk in.' },
  { num: '02', title: 'Prepare',          desc: 'Our team reviews artwork, confirms specs, and preps files for print.' },
  { num: '03', title: 'Print',            desc: 'Professional-grade equipment delivers precise, vibrant results.' },
  { num: '04', title: 'Finish & Deliver', desc: 'Cutting, binding, laminating — then ready for collection or delivery.' },
]

export default function About() {
  return (
    <div className="pt-24">
      {/* ── Intro ── */}
      <section className="bg-linear-to-br from-navy to-navy-mid py-24 px-4 sm:px-6 lg:px-8" aria-label="About us">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedContainer>
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.2em] mb-4">Our Story</p>
            <h1 className="font-['Playfair_Display'] font-700 text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Printing with <span className="gold-text italic">purpose</span> since 2010.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              PrintCenter started as a small copy shop and grew into a full-service digital print center trusted by businesses, schools, and creatives across the city.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              We believe great print starts with great people. Our team combines expertise with genuine care — whether you need 10 copies or 10,000, you'll get the same attention to detail every time.
            </p>
            <Link to="/contact">
              <CTAButton variant="primary">
                Work With Us <ArrowRight size={16} aria-hidden="true" />
              </CTAButton>
            </Link>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-linear-to-br from-sky to-gold opacity-20 absolute inset-0 blur-xl scale-105" aria-hidden="true" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Our team collaborating at PrintCenter"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/65" aria-hidden="true" />
                <div className="relative flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <p className="font-['Playfair_Display'] font-700 text-6xl gold-text mb-2">14</p>
                    <p className="text-white/70 text-lg">Years of Excellence</p>
                    <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="font-['Playfair_Display'] font-700 text-3xl text-white">10K+</p>
                        <p className="text-white/50 text-xs mt-1">Print Jobs</p>
                      </div>
                      <div>
                        <p className="font-['Playfair_Display'] font-700 text-3xl text-white">500+</p>
                        <p className="text-white/50 text-xs mt-1">Clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface" aria-label="Values">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Our Values"
            title="What drives us"
            subtitle="More than just a print shop — we're partners in your creative and business journey."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedContainer key={title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gold/40 hover:shadow-lg transition-all duration-200 text-center cursor-default">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-5"
                  >
                    <Icon className="text-gold" size={24} aria-hidden="true" />
                  </motion.div>
                  <h3 className="font-['Playfair_Display'] font-600 text-xl text-navy mb-3">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Timeline ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-navy" aria-label="Our process">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            light
            eyebrow="How It Works"
            title="From request to delivery"
            subtitle="Our streamlined process ensures every job is handled efficiently and with care."
          />
          <div className="mt-16 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-gold via-sky to-transparent hidden sm:block" aria-hidden="true" />
            <div className="space-y-8">
              {steps.map(({ num, title, desc }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }}
                  className="sm:flex gap-8 items-start"
                >
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-gold to-sky flex items-center justify-center mb-4 sm:mb-0 shadow-lg">
                    <span className="font-['Playfair_Display'] font-700 text-white text-sm">{num}</span>
                  </div>
                  <div className="glass rounded-2xl p-6 flex-1">
                    <h3 className="font-['Playfair_Display'] font-600 text-xl text-white mb-2">{title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
