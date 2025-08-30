import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  ariaLabel
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-transparent'
  
  const variants = {
    primary: 'bg-brand-gold text-black hover:bg-brand-gold/90 shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40',
    secondary: 'bg-slate-soft/10 text-off-white border border-slate-soft/20 hover:bg-slate-soft/20 hover:border-slate-soft/30',
    ghost: 'text-off-white hover:text-brand-gold hover:bg-brand-gold/10'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const Component = href ? motion.a : motion.button
  const props = href ? { href } : { onClick, type: 'button' as const }

  return (
    <Component
      {...props}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )
}
