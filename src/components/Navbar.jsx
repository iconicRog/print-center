import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Printer, Sparkles, Crown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/services', label: 'Services' },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { theme, toggleTheme }  = useTheme()
  const { pathname }            = useLocation()
  const isAurora = theme === 'aurora'

  // Use transparent dark-context style only on the Home page hero area
  const isDark = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer when clicking outside the nav
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!e.target.closest('nav')) setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [open])

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  /* Active link: gold pill with ring
     Inactive: full-opacity text, always readable on both dark and light backgrounds */
  const linkClass = ({ isActive }) => {
    const base = 'text-sm font-medium transition-all duration-200 focus:outline-none rounded-lg px-3 py-1.5'
    if (isActive) {
      return `${base} font-semibold text-gold bg-gold/15 ring-1 ring-gold/40`
    }
    return isDark
      ? `${base} text-white hover:text-gold hover:bg-white/10`
      : `${base} text-navy hover:text-gold hover:bg-gold/10`
  }

  const mobileLinkClass = ({ isActive }) => {
    if (isActive) {
      return 'flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-gold bg-gold/15 border-l-2 border-gold transition-colors duration-200'
    }
    return isDark
      ? 'flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/10 hover:text-gold transition-colors duration-200'
      : 'flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-navy hover:bg-gold/10 hover:text-gold transition-colors duration-200'
  }

  return (
    <nav
      className={`fixed top-3 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
        isDark
          ? 'bg-white/5 backdrop-blur-sm border border-white/15'
          : 'glass-light shadow-lg'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold rounded-lg shrink-0"
          aria-label="PrintCenter home"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-gold to-sky flex items-center justify-center">
            <Printer className="text-white" size={18} aria-hidden="true" />
          </div>
          <span className={`font-['Playfair_Display'] font-700 text-lg transition-colors duration-200 ${isDark ? 'text-white' : 'text-navy'}`}>
            PrintCenter
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-2">

          {/* Theme switcher pill */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            aria-label={`Switch to ${isAurora ? 'Classic' : 'Aurora'} theme`}
            title={`Switch to ${isAurora ? 'Classic' : 'Aurora'} theme`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold border ${
              isDark
                ? 'border-white/25 text-white/90 bg-white/8 hover:bg-white/15'
                : 'border-gold/40 text-gold bg-gold/8 hover:bg-gold/15'
            }`}
          >
            {isAurora
              ? <><Crown size={13} aria-hidden="true" /> Classic</>
              : <><Sparkles size={13} aria-hidden="true" /> Aurora</>
            }
          </motion.button>

          {/* Get a Quote */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-navy text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gold-light transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile: theme icon + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${isAurora ? 'Classic' : 'Aurora'} theme`}
            className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold ${isDark ? 'text-white/80' : 'text-gold'}`}
          >
            {isAurora
              ? <Crown size={18} aria-hidden="true" />
              : <Sparkles size={18} aria-hidden="true" />
            }
          </motion.button>
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold ${isDark ? 'text-white' : 'text-navy'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
          >
            <ul className={`px-4 pb-4 space-y-1 pt-3 border-t ${isDark ? 'border-white/10' : 'border-navy/10'}`}>
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block mt-2 text-center bg-gold text-navy font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gold-light transition-colors duration-200 cursor-pointer"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
