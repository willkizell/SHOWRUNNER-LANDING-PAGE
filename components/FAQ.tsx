'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How does ShowRunner▸ integrate with my existing event setup?',
    answer: 'ShowRunner▸ works with your current audio system and event flow. Our system connects to most standard PA systems and can integrate with popular event management platforms. Setup typically takes less than 30 minutes.'
  },
  {
    question: 'What if I want to make changes to the announcement?',
    answer: 'Each announcement is generated for you, but before you run your event, you will have the chance to review, revise or completely rewrite each one. That way, every announcement sounds exactly how you want it.'
  },
  {
    question: 'Can I make changes to the event plan once it’s set?',
    answer: 'Yes, absolutely! While we recommend finalizing your blocks before the event starts, you can still adjust things like timings, vibes, or song blocks whenever you need.'
  },
  {
    question: 'What if I need to update announcements during the event?',
    answer: 'urrently, quick edits mid-event aren’t fully supported. But we’re working on real-time controls so you’ll be able to drop in quick announcements, tweak the music vibe, or even add last-minute updates on the fly. Stay tuned — it’s coming soon.'
  },
  {
    question: 'How does ShowRunner▸ know what songs to play?',
    answer: 'You set the vibe for each block — chill, hype, romantic, etc. — and ShowRunner▸ curates music to match. You can review and swap songs ahead of time so nothing catches you off guard.'
  },
  {
    question: 'Do I need Spotify to use ShowRunner▸?',
    answer: 'Yes — right now ShowRunner is designed to work seamlessly with Spotify. That means you get access to the world’s most familiar music library, your own playlists, and all the songs you already know and love. We’re also working on adding more platforms in the future so you’ll have even more options to run your event exactly the way you want.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Frequently asked questions
      </motion.h2>
      <motion.p 
        className="text-xl text-slate-soft text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Everything you need to know about ShowRunner▸.
      </motion.p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-black/40 border border-slate-soft/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-black/20 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-medium text-off-white pr-4">
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-slate-soft transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-slate-soft leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
