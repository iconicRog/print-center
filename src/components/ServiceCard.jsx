import { motion } from 'framer-motion'

export default function ServiceCard({ icon: Icon, title, description, dark = false }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: dark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(15,23,42,0.12)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative rounded-2xl p-7 cursor-default ${
        dark ? 'glass border border-white/10' : 'bg-white border border-gray-100 shadow-sm hover:border-gold/30'
      }`}
    >
      <motion.div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
          dark ? 'bg-gold/15 text-gold-light' : 'bg-navy text-gold'
        }`}
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.4 }}
      >
        <Icon size={22} aria-hidden="true" />
      </motion.div>

      <h3 className={`font-['Playfair_Display'] font-600 text-xl mb-2 ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}>
        {description}
      </p>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}
