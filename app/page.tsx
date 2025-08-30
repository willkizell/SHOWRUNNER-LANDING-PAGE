'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerParent, fadeUp } from '@/lib/motion'

// Components
import Navbar from '@/components/Navbar'
import LogoWordmark from '@/components/LogoWordmark'
import Typewriter from '@/components/Typewriter'
import Button from '@/components/Button'
import Marquee from '@/components/Marquee'
import StepCard from '@/components/StepCard'

import TimelineTeaser from '@/components/TimelineTeaser'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import NoiseOverlay from '@/components/NoiseOverlay'
import WhatIsShowRunner from '@/components/WhatIsShowRunner'
import DemoSection from '@/components/DemoSection'

export default function Page() {
  const [heroDone, setHeroDone] = useState(false)
  const prefersReduced = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth-scroll demo button to timeline if hash present
    if (window.location.hash === '#timeline' && timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div>
      <NoiseOverlay />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-48 sm:pt-52 pb-24 sm:pb-28 overflow-hidden">
        <div className="container text-center max-w-3xl">
          <LogoWordmark 
            text="ShowRunner▸" 
            className="font-semibold"
            onComplete={() => {
              // Start typewriter ~200ms after wordmark finishes to meet acceptance test (<300ms)
              setTimeout(() => setHeroDone(true), 200)
            }} 
          />

          <div className="mt-6 text-xl sm:text-2xl lg:text-3xl text-slate-soft">
            <Typewriter
              text="Plan the Night. Run the Show."
              speedMs={50}
              pauseMs={900}
              loop={false}
              start={heroDone}
            />
          </div>

          <p className="mt-4 text-base sm:text-lg text-off-white/90 max-w-3xl mx-auto">
            The AI event operator that schedules announcements, curates playlists, and keeps your night perfectly on‑beat.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button href="/coming-soon" variant="primary" ariaLabel="Get Started">
              Get Started
            </Button>
            <Button href="#demo" variant="ghost" ariaLabel="Try Live Demo">
              Try Live Demo
            </Button>
          </div>
        </div>

        {/* Hero glow */}
        {!prefersReduced && (
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-radial" />
        )}
      </section>

      {/* Social Proof */}
      <section aria-label="Trusted by" className="py-8 sm:py-12 lg:py-16">
        <div className="container">
          <Marquee items={[
            'Never miss a cue', 'Events that run themselves', 'Intros', 'Perfectly timed first dances', 'Plan The Night', 'Run The Show', 'Approve The Songs and Announcements', 'Stress-free event control'
          ]} />
        </div>
      </section>

      {/* What is ShowRunner */}
      <WhatIsShowRunner />

      {/* How it works */}
      <section id="how" className="py-16 sm:py-24 lg:py-32">
        <div className="pt-12 border-t border-slate-soft/10" />
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-6">
              How it works
            </h2>
            <p className="text-xl text-slate-soft max-w-2xl mx-auto">
              Set it up. Approve it. Run it.
            </p>
          </motion.div>

          <motion.div
            variants={staggerParent(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 sm:grid-cols-3"
          >
            <StepCard 
              index="01" 
              title="Plan Your Night" 
              desc="Input what’s happening and when — the vibe you want to create, the announcements you need, and the music to match. Map out the whole flow of your event in minutes.
." 
            />
            <StepCard 
              index="02" 
              title="Approve The Songs and Announcements" 
              desc="ShowRunner curates songs and builds a Spotify playlist, then drafts announcements for you. Make quick edits, approve your blocks, and you’re ready." 
            />
            <StepCard 
              index="03" 
              title="Run The Show" 
              desc="Right before your event, click play once. Your music plays automatically, and your announcements fire exactly when you want, no stress, no mic needed." 
            />
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo */}
      <div className="pt-12 border-t border-slate-soft/10" />
      <section id="demo" className="relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-brand-gold/10 via-brand-gold/3 to-transparent pointer-events-none" />
        <div className="relative">
          <DemoSection />
        </div>
      </section>

      {/* Timeline Teaser */}
      <div className="pt-12 border-t border-slate-soft/10" />
      <section id="timeline" ref={timelineRef} className="py-16 sm:py-24 lg:py-34">
        <div className="container">
          <TimelineTeaser />
        </div>
      </section>

      

      {/* FAQ */}
      <div className="pt-12 border-t border-slate-soft/10" />
      <section id="faq" className="py-16 sm:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-brand-gold/1 to-transparent pointer-events-none" />
        <div className="container max-w-3xl relative">
          <FAQ />
        </div>
      </section>

      <Footer />
    </div>
  )
}
