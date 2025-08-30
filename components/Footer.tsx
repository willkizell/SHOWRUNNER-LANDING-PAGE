'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate subscription
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-slate-soft/5 border-t border-slate-soft/10">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
             
            <a href="/" className="flex items-center text-brand-gold hover:text-brand-gold/80 transition-colors no-underline">
          <span className="text-xl font-semibold">
            ShowRunner
            <span style={{ 
              letterSpacing: '-0.25em'
            }}>▸</span>
          </span>
        </a>
            </div>
            <p className="text-slate-soft mb-6 max-w-md">
              Your event operator that schedules announcements, curates playlists, and keeps your night perfectly on‑beat.
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-off-white font-semibold mb-3">Stay updated</h4>
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-soft/10 border border-slate-soft/20 rounded-lg text-off-white placeholder-slate-soft focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  required
                />
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleSubmit(new Event('submit') as any)}
                >
                  {subscribed ? '✓' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-off-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-slate-soft hover:text-brand-gold transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-soft hover:text-brand-gold transition-colors">Pricing</a></li>
              <li><a href="/demo" className="text-slate-soft hover:text-brand-gold transition-colors">Demo</a></li>
              <li><a href="/api" className="text-slate-soft hover:text-brand-gold transition-colors">API</a></li>
            </ul>
          </div>


        </div>

        {/* Bottom */}
        <div className="border-t border-slate-soft/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-soft text-sm">
            © 2025 ShowRunner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
