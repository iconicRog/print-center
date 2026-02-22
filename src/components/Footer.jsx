import { Link } from 'react-router-dom'
import { Printer, Phone, Mail, MapPin } from 'lucide-react'

const nav = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/services', label: 'Services' },
  { to: '/contact',  label: 'Contact'  },
]

const services = [
  'Digital Printing', 'Banners & Flyers', 'Scanning & Photocopying',
  'Laminating', 'Stationery Supplies',
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white" role="contentinfo">
      {/* Top CTA strip */}
      <div className="bg-linear-to-r from-gold to-sky py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-['Playfair_Display'] font-700 text-xl sm:text-2xl text-white">Ready to print something great?</p>
            <p className="text-white/80 text-sm mt-1">Walk in or send us a message — we turn around fast.</p>
          </div>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#25D366] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#1ebe5d] active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white whitespace-nowrap shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-gold to-sky flex items-center justify-center">
                <Printer className="text-white" size={18} aria-hidden="true" />
              </div>
              <span className="font-['Playfair_Display'] font-700 text-lg">PrintCenter</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your one-stop Stationery &amp; Digital Print Center. Professional quality, fast turnaround.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-semibold text-sm text-white mb-4 uppercase tracking-widest">Navigation</p>
            <ul className="space-y-2">
              {nav.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/60 text-sm hover:text-gold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-sm text-white mb-4 uppercase tracking-widest">Services</p>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-white/60 text-sm hover:text-gold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold rounded">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-sm text-white mb-4 uppercase tracking-widest">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="shrink-0 mt-0.5 text-gold" size={15} aria-hidden="true" />
                123 Print Street, Business District
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-white/60 text-sm hover:text-gold transition-colors duration-200 cursor-pointer">
                  <Phone className="text-gold shrink-0" size={15} aria-hidden="true" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="mailto:hello@printcenter.com" className="flex items-center gap-2 text-white/60 text-sm hover:text-gold transition-colors duration-200 cursor-pointer">
                  <Mail className="text-gold shrink-0" size={15} aria-hidden="true" />
                  hello@printcenter.com
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 leading-relaxed">
              <p className="font-semibold text-white/70 mb-1">Business Hours</p>
              Mon–Fri: 8 AM – 6 PM<br />
              Saturday: 9 AM – 4 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} PrintCenter. All rights reserved.</p>
          <p>Designed with precision. Printed with care.</p>
        </div>
      </div>
    </footer>
  )
}
