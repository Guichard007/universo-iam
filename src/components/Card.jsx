import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`glass rounded-2xl p-6 transition-all duration-300 hover:shadow-neon hover:border-iam-blue/30 ${className}`}
    >
      {children}
    </motion.div>
  )
}
