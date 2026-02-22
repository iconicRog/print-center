import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import AnimatedContainer from '../components/AnimatedContainer'

const SERVICE_OPTIONS = [
  'Digital Printing', 'Banners & Flyers', 'Scanning & Photocopying',
  'Laminating', 'Stationery Supplies', 'Other',
]

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent hover:border-gold/50'

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.service)        e.service = 'Please select a service.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-24">
      <section className="bg-linear-to-br from-navy to-navy-mid py-20 px-4 sm:px-6 lg:px-8 text-center" aria-label="Contact header">
        <SectionHeader
          light
          eyebrow="Get In Touch"
          title="Let's bring your project to life"
          subtitle="Fill out the form or reach us directly — we respond fast."
        />
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface" aria-label="Contact form and info">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── FORM ── */}
          <AnimatedContainer className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-10">
              <h2 className="font-['Playfair_Display'] font-700 text-2xl text-navy mb-7">Send us a message</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'backOut' }}
                    className="text-center py-12"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="text-green-500" size={36} aria-hidden="true" />
                    </div>
                    <h3 className="font-['Playfair_Display'] font-700 text-2xl text-navy mb-2">Message Sent!</h3>
                    <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                      Thank you, <strong>{form.name}</strong>! We'll get back to you within 1 business hour.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                      className="mt-6 text-sm text-sky underline cursor-pointer hover:text-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky rounded"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                    aria-label="Contact form"
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy-light mb-1.5">
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text" autoComplete="name"
                        value={form.name} onChange={handleChange}
                        placeholder="Jane Smith"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`${inputBase} ${errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'}`}
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">{errors.name}</p>}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy-light mb-1.5">
                          Email <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="email" name="email" type="email" autoComplete="email"
                          value={form.email} onChange={handleChange}
                          placeholder="jane@example.com"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`${inputBase} ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'}`}
                        />
                        {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-navy-light mb-1.5">Phone (optional)</label>
                        <input
                          id="phone" name="phone" type="tel" autoComplete="tel"
                          value={form.phone} onChange={handleChange}
                          placeholder="+1 234 567 890"
                          className={`${inputBase} border-gray-200`}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-navy-light mb-1.5">
                        Service Needed <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="service" name="service"
                        value={form.service} onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                        className={`${inputBase} cursor-pointer ${errors.service ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'}`}
                      >
                        <option value="" disabled>Select a service…</option>
                        {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.service && <p id="service-error" className="mt-1 text-xs text-red-500" role="alert">{errors.service}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-navy-light mb-1.5">
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message" name="message" rows={5}
                        value={form.message} onChange={handleChange}
                        placeholder="Describe your project, quantity, deadline, and any special requirements…"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`${inputBase} resize-none ${errors.message ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'}`}
                      />
                      {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={loading ? {} : { scale: 1.02, boxShadow: '0 0 24px rgba(3,105,161,0.35)' }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-sky text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-sky-light transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={17} aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedContainer>

          {/* ── INFO PANEL ── */}
          <AnimatedContainer delay={0.15} className="lg:col-span-2 space-y-5">
            {/* Contact details */}
            <div className="bg-navy rounded-3xl p-5 sm:p-8 text-white">
              <h3 className="font-['Playfair_Display'] font-600 text-xl mb-6">Contact Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-gold shrink-0 mt-0.5" size={18} aria-hidden="true" />
                  <p className="text-white/70 text-sm leading-relaxed">123 Print Street, Business District, City</p>
                </li>
                <li>
                  <a href="tel:+1234567890" className="flex items-center gap-3 text-white/70 text-sm hover:text-gold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold rounded">
                    <Phone className="text-gold shrink-0" size={18} aria-hidden="true" />
                    +1 (234) 567-890
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@printcenter.com" className="flex items-center gap-3 text-white/70 text-sm hover:text-gold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold rounded">
                    <Mail className="text-gold shrink-0" size={18} aria-hidden="true" />
                    hello@printcenter.com
                  </a>
                </li>
              </ul>
              <a
                href="https://wa.me/1234567890?text=Hi%2C%20I%27d%20like%20a%20print%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-[#1ebe5d] active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-navy"
              >
                {/* Official WhatsApp logo */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="text-gold" size={20} aria-hidden="true" />
                <h3 className="font-['Playfair_Display'] font-600 text-lg text-navy">Business Hours</h3>
              </div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { day: 'Mon – Fri', hours: '8:00 AM – 6:00 PM', open: true  },
                  { day: 'Saturday',  hours: '9:00 AM – 4:00 PM', open: true  },
                  { day: 'Sunday',    hours: 'Closed',             open: false },
                ].map(({ day, hours, open }) => (
                  <li key={day} className="flex items-center justify-between">
                    <span className="text-navy-light font-medium">{day}</span>
                    <span className={open ? 'text-muted' : 'text-red-400 font-medium'}>{hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                Currently Open
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm aspect-video relative">
              <img
                src="https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?auto=format&fit=crop&w=800&q=80"
                alt="Aerial view of our business district location"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
                <MapPin className="text-sky shrink-0" size={16} aria-hidden="true" />
                <span className="text-navy text-xs font-medium">123 Print Street, Business District</span>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </div>
  )
}
