import { motion } from 'framer-motion'

const styles = {
  primary:
    'inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gold text-navy hover:bg-gold-light focus:ring-gold focus:ring-offset-navy',
  secondary:
    'inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-white/30 text-white bg-white/10 hover:bg-white/20 focus:ring-white focus:ring-offset-navy',
  sky:
    'inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-sky text-white hover:bg-sky-light focus:ring-sky focus:ring-offset-white',
  outline:
    'inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gold text-gold hover:bg-gold hover:text-navy focus:ring-gold focus:ring-offset-white',
}

const glows = {
  primary:   '0 0 24px rgba(201,168,76,0.45)',
  secondary: '0 0 20px rgba(255,255,255,0.15)',
  sky:       '0 0 24px rgba(3,105,161,0.45)',
  outline:   '0 0 20px rgba(201,168,76,0.3)',
}

export default function CTAButton({ children, variant = 'primary', href, onClick, type = 'button', className = '' }) {
  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: glows[variant] ?? glows.primary }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        type={href ? undefined : type}
        className={`${styles[variant] ?? styles.primary} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
