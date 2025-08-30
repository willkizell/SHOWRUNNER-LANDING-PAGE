'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  className?: string
}

export default function Marquee({ items, className = '' }: MarqueeProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div 
        className="flex space-x-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-slate-soft/60 font-medium text-lg tracking-wide"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
