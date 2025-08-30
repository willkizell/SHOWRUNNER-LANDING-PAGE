'use client'

import { motion } from 'framer-motion'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-brand-gold">
              ShowRunner
              <span style={{ letterSpacing: '-0.25em' }}>▸</span>
            </h1>
          </div>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-medium text-off-white mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-slate-soft max-w-lg mx-auto">
              We're putting the finishing touches on ShowRunner. 
              Be the first to know when we launch!
            </p>
          </motion.div>

          {/* Tally Form Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <iframe
              data-tally-src="https://tally.so/embed/mO6jkR?alignLeft=1&hideTitle=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="400"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="ShowRunner Email Signup"
              className="rounded-lg"
            />
          </motion.div>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <a 
              href="/"
              className="text-slate-soft hover:text-brand-gold transition-colors underline"
            >
              ← Back to home
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Tally Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.head.appendChild(s);}
          `
        }}
      />
    </div>
  )
}
