'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Mic, Music, Users } from 'lucide-react'
import { fadeUp, staggerParent } from '@/lib/motion'
import { useState, useEffect } from 'react'

const timelineItems = [
  { time: '7:00 PM', type: 'announce', title: 'Welcome', desc: 'Kickoff from the host; set the tone.' },
  { time: '7:05 PM', type: 'music', title: 'Cocktail Jazz', desc: 'Smooth background for arrivals.' },
  { time: '8:00 PM', type: 'announce', title: 'Dinner Seating', desc: 'Invite guests to take their seats.' },
  { time: '8:05 PM', type: 'music', title: 'Dinner Ambience', desc: 'Low-key, conversational energy.' },
  { time: '9:30 PM', type: 'social', title: 'Networking', desc: 'Mingle and reconnect moments.' },
  { time: '10:00 PM', type: 'music', title: 'Dance Floor', desc: 'Upbeat tracks to lift the room.' }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'announce': return Mic
    case 'music': return Music
    case 'social': return Users
    default: return Mic
  }
}

export default function TimelineTeaser() {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (prefersReduced) return

    // Progressive activation timing: 0s, 5s, 10s, 15s, 20s, 25s
    const timers: NodeJS.Timeout[] = []
    
    timelineItems.forEach((_, index) => {
      const delay = index * 5000 // 5 second intervals
      const timer = setTimeout(() => {
        setActiveIndex(index)
      }, delay)
      timers.push(timer)
    })

    // Reset cycle after all items are shown
    const resetTimer = setTimeout(() => {
      setActiveIndex(0)
    }, timelineItems.length * 5000 + 2000) // Extra 2s pause before reset
    timers.push(resetTimer)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [prefersReduced])

  return (
    <div className="text-center">
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        See your event timeline in action
      </motion.h2>
      <motion.p 
        className="text-xl text-slate-soft max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Watch how ShowRunner orchestrates your event from first welcome to dance floor.
      </motion.p>

      {/* Vertical Timeline Container */}
      <motion.div 
        className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative pl-10 sm:pl-12">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d1a442]/60 to-transparent" />
          


          {/* Timeline Items */}
          <motion.div
            className="space-y-6 sm:space-y-7"
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {timelineItems.map((item, index) => {
              const Icon = getIcon(item.type)
              
              return (
                <section
                  key={index}
                  role="group"
                  aria-labelledby={`tl-${index}`}
                  className="relative flex items-start gap-4 sm:gap-5"
                >
                  {/* Node */}
                  <motion.div
                    className={`relative z-10 mt-12 h-3 w-3 -translate-x-[8px] sm:-translate-x-[10px] rounded-full flex-shrink-0 transition-all duration-500 ${
                      index === activeIndex 
                        ? 'bg-[#d1a442] ring-2 ring-[#d1a442]/30 shadow-lg shadow-[#d1a442]/20' 
                        : 'bg-slate-400/60 ring-2 ring-slate-400/20'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />

                  {/* Card */}
                  <motion.article
                    className="flex-1 rounded-xl border border-white/10 p-4 sm:p-5 transition-all duration-500 shadow-sm hover:shadow-lg/10"
                    style={{
                      background: index === activeIndex
                        ? 'linear-gradient(180deg, rgba(209,164,66,0.14), rgba(209,164,66,0.03))'
                        : 'linear-gradient(180deg, rgba(226,232,240,0.08), rgba(226,232,240,0.02))'
                    }}
                    variants={prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Time */}
                    <div className="text-xs uppercase tracking-wide text-off-white/60 mb-2">
                      {item.time}
                    </div>
                    
                    {/* Title with Icon */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 flex-shrink-0">
                        <Icon className="h-4 w-4 text-off-white/70" />
                      </div>
                      <h3 id={`tl-${index}`} className="font-semibold text-off-white">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-soft leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Screen reader time context */}
                    <div className="sr-only">
                      Event scheduled for {item.time}
                    </div>
                  </motion.article>
                </section>
              )
            })}
          </motion.div>
        </div>

        {/* Demo controls */}
        <motion.div 
          className="mt-8 flex items-center justify-center space-x-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-sm text-slate-soft">
            <div className="w-2 h-2 rounded-full bg-[#d1a442] animate-pulse" />
            <span>Live Timeline</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
