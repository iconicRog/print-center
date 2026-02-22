import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

export default function AnimatedContainer({ children, delay = 0, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
