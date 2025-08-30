'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface StepCardProps {
  index: string
  title: string
  desc: string
}

export default function StepCard({ index, title, desc }: StepCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative p-6 rounded-xl bg-slate-soft/5 border border-slate-soft/10 hover:border-brand-gold/30 transition-all duration-300"
    >
      {/* Step number */}
      <div className="mb-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-lg">
          {index}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-off-white mb-3 group-hover:text-brand-gold transition-colors">
        {title}
      </h3>
      <p className="text-slate-soft leading-relaxed">
        {desc}
      </p>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-gold/5 to-transparent" />
      </div>
    </motion.div>
  )
}
