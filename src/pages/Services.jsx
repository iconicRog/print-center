import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Printer, Image, ScanLine, Scissors, BookOpen, Plus, Minus, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import AnimatedContainer from '../components/AnimatedContainer'
import CTAButton from '../components/CTAButton'

const services = [
  {
    icon: Printer,
    title: 'Digital Printing',
    summary: 'Sharp, full-colour prints for any purpose.',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    details: [
      'Business cards, letterheads, and branded stationery',
      'Booklets, brochures, and multi-page documents',
      'Same-day service available for urgent orders',
      'Gloss, matte, or silk paper options',
      'Black & white and full colour',
    ],
    tag: 'Most Popular',
  },
  {
    icon: Image,
    title: 'Banners & Flyers',
    summary: 'Eye-catching large-format prints that stand out.',
    img: 'https://images.unsplash.com/photo-1509817557771-f2ed25dd00ce?auto=format&fit=crop&w=800&q=80',
    details: [
      'PVC, fabric, and mesh banners in custom sizes',
      'A6 to A2 flyer printing with fast turnaround',
      'Weatherproof inks for outdoor displays',
      'Eyelet fitting and pole pockets available',
      'Bulk pricing for large quantities',
    ],
    tag: null,
  },
  {
    icon: ScanLine,
    title: 'Scanning & Photocopying',
    summary: 'High-resolution scanning and crystal-clear copies.',
    img: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?auto=format&fit=crop&w=800&q=80',
    details: [
      'Flatbed scanning up to A3 at 1200 DPI',
      'Multi-page document scanning with PDF export',
      'Fast photocopying — up to 80 pages per minute',
      'Reduction and enlargement options',
      'Colour and black & white photocopying',
    ],
    tag: null,
  },
  {
    icon: Scissors,
    title: 'Laminating',
    summary: 'Protect and enhance any printed document.',
    img: 'https://images.unsplash.com/photo-1586953208270-98c95f01eac1?auto=format&fit=crop&w=800&q=80',
    details: [
      'Gloss, matte, and anti-glare finishes',
      'Sizes from credit card to A0',
      'Thermal and cold lamination options',
      'Ideal for menus, ID cards, posters, and certificates',
      'Ready while you wait for most sizes',
    ],
    tag: 'Fast Service',
  },
  {
    icon: BookOpen,
    title: 'Stationery Supplies',
    summary: 'Everything your office or school needs, in stock.',
    img: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=800&q=80',
    details: [
      'Premium paper in multiple weights and finishes',
      'Pens, markers, highlighters, and correction tools',
      'Folders, binders, and filing accessories',
      'Sticky notes, notebooks, and planners',
      'Bulk ordering available for schools and offices',
    ],
    tag: null,
  },
]

function ServiceAccordion({ service }) {
  const [open, setOpen] = useState(false)
  const { icon: Icon, title, summary, details, tag, img } = service

  return (
    <AnimatedContainer>
      <div className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${open ? 'border-gold/50 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gold/30'}`}>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full flex items-center gap-5 px-6 py-5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-inset group"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${open ? 'bg-gold text-navy' : 'bg-navy text-gold group-hover:bg-gold group-hover:text-navy'}`}>
            <Icon size={20} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-['Playfair_Display'] font-600 text-lg text-navy">{title}</h3>
              {tag && (
                <span className="text-xs font-semibold bg-gold/15 text-gold px-2.5 py-0.5 rounded-full">{tag}</span>
              )}
            </div>
            <p className="text-muted text-sm mt-0.5">{summary}</p>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-gold"
          >
            {open ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1">
                {img && (
                  <div className="rounded-xl overflow-hidden h-36 sm:h-44 mb-5">
                    <img src={img} alt={`${title} example`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="h-px bg-linear-to-r from-gold/30 to-transparent mb-5" />
                <ul className="space-y-2.5">
                  {details.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-navy-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/contact">
                    <CTAButton variant="sky">
                      Request This Service <ArrowRight size={15} aria-hidden="true" />
                    </CTAButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedContainer>
  )
}

export default function Services() {
  return (
    <div className="pt-24">
      <section className="bg-linear-to-br from-navy to-navy-mid py-20 px-4 sm:px-6 lg:px-8 text-center" aria-label="Services header">
        <SectionHeader
          light
          eyebrow="Our Services"
          title="Everything Print & Stationery"
          subtitle="Professional services for individuals, businesses, schools, and events."
        />
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface" aria-label="Service list">
        <div className="max-w-3xl mx-auto space-y-4">
          {services.map((s) => (
            <ServiceAccordion key={s.title} service={s} />
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white border-t border-gray-100" aria-label="CTA">
        <AnimatedContainer className="max-w-2xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] font-700 text-4xl text-navy mb-4">
            Not sure what you need?
          </h2>
          <p className="text-muted text-lg mb-8">
            Just bring your project to us — we'll help you choose the right service and get it done right.
          </p>
          <Link to="/contact">
            <CTAButton variant="sky">
              Talk to Us <ArrowRight size={15} aria-hidden="true" />
            </CTAButton>
          </Link>
        </AnimatedContainer>
      </section>
    </div>
  )
}
