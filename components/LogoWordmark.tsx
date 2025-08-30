'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { letterFlip, staggerParent, motionSafe } from '@/lib/motion'

interface LogoWordmarkProps {
  text: string
  onComplete?: () => void
  className?: string
}

export default function LogoWordmark({ text, onComplete, className = '' }: LogoWordmarkProps) {
  const prefersReduced = useReducedMotion()
  
  const variants = prefersReduced ? motionSafe.letterFlip : letterFlip
  const parentVariants = staggerParent(0.06)

  return (
    <div className={`perspective-900 ${className}`}>
      <motion.div 
        className="flex justify-center"
        variants={parentVariants}
        initial="hidden"
        animate="show"
        onAnimationComplete={onComplete}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={variants}
            className="inline-block text-5xl sm:text-7xl lg:text-8xl font-bold text-brand-gold"
            style={{ 
              transformOrigin: '50% 50% -20px',
              backfaceVisibility: 'hidden',
              letterSpacing: char === '▸' ? '-0.25em' : '-0.06em'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
