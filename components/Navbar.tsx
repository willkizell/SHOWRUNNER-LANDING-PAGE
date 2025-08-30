'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleResize = () => {
      // Force a re-render when window is resized (monitor changes)
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'nav-glass' : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center text-brand-gold hover:text-brand-gold/80 transition-colors no-underline">
          <span className="text-xl font-semibold">
            ShowRunner
            <span style={{ 
              letterSpacing: '-0.25em'
            }}>▸</span>
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-off-white/80 hover:text-off-white transition-colors focus:outline-none focus:text-brand-gold"
          >
            Features
          </a>
          <a 
            href="#how" 
            className="text-off-white/80 hover:text-off-white transition-colors focus:outline-none focus:text-brand-gold"
          >
            How it works
          </a>
          
          <a 
            href="#faq" 
            className="text-off-white/80 hover:text-off-white transition-colors focus:outline-none focus:text-brand-gold"
          >
            FAQ
          </a>
          
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-off-white focus:outline-none focus:text-brand-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </motion.nav>
  )
}
