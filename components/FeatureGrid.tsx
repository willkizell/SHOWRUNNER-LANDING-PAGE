'use client'

import { motion } from 'framer-motion'
import { Music, Zap, Smartphone } from 'lucide-react'
import { fadeUp, staggerParent } from '@/lib/motion'

const features = [
  {
    icon: Music,
    title: 'Curated Playlists',
    desc: 'Dynamic music selection that matches the mood and moment perfectly.'
  },
  {
    icon: Zap,
    title: 'Auto Announcements',
    desc: 'Context-aware scripts delivered at precisely the right moments.'
  },
  {
    icon: Smartphone,
    title: 'Operator Mode',
    desc: 'Your live command center. Adjust the vibe, trigger announcements, or swap tracks instantly — all from a sleek control panel designed for real-time performance.'
  }
]

export default function FeatureGrid() {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Everything you need to run the perfect event
      </motion.h2>
      <motion.p 
        className="text-xl text-slate-soft max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        From planning to execution, ShowRunner handles the details so you can focus on what matters most.
      </motion.p>

      <motion.div
        variants={staggerParent(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            className="group p-8 sm:p-10 lg:p-8 rounded-xl bg-slate-soft/5 border border-slate-soft/10 hover:border-brand-gold/30 hover:bg-slate-soft/10 transition-all duration-300 h-full"
          >
            <div className="mb-4">
              <feature.icon className="w-8 h-8 text-brand-gold group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-off-white mb-3 group-hover:text-brand-gold transition-colors">
              {feature.title}
            </h3>
            <p className="text-slate-soft">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
