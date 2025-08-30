'use client'

import { useEffect, useRef } from 'react'
import Button from './Button'

export default function WhatIsShowRunner() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(section.querySelectorAll<HTMLElement>('.reveal'))

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('in')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
    )

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${i * 90}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 border-t border-slate-soft/10"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-off-white">
              <span className="font-normal text-off-white">What is </span>
              <span className="font-semibold text-brand-gold">ShowRunner▸</span>
              <span className="font-normal text-off-white">?</span>
            </h2>

            <p className="text-xl text-slate-soft leading-relaxed">
              ShowRunner is your event operator. Tell us what's happening and when — dinner,
              speeches, dancing — and we take care of the rest.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-gold">Imagine this:</h3>

              <p className="text-base text-off-white/90 leading-relaxed">
                You're hosting a wedding, a birthday party, or a company gala. Normally, you'd hire
                a DJ or hope someone manages the mic and music cues. With ShowRunner, you don't
                need either.
              </p>

              <ul className="space-y-3 text-base text-off-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 flex-shrink-0" />
                  Background music flows seamlessly during cocktails and dinner.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 flex-shrink-0" />
                  Announcements happen right on time — like introducing the couple's first dance or
                  cueing a toast.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 flex-shrink-0" />
                  The playlist shifts into party mode the moment the dance floor opens.
                </li>
              </ul>

              <p className="text-base text-off-white/90 leading-relaxed pt-2">
                No stress. No missed cues. Just a smooth, professional-feeling event — every time.
              </p>
            </div>

            <div className="pt-4">
              <Button href="/coming-soon" variant="primary" ariaLabel="Get Started">
                Get Started
              </Button>
            </div>
          </div>

          {/* Right Column - Visuals */}
          <div className="space-y-6">
            {/* Top: 2-up grid of lifestyle photos (wider aspect) */}
            <div className="grid grid-cols-2 gap-2">
            <div className="reveal aspect-[16/10] rounded-sm overflow-hidden bg-slate-soft/5">
            <img
                  src="https://images.unsplash.com/photo-1648052845307-61eb1450f1bc?auto=format&fit=crop&w=1200&q=80"
                  alt="Wedding celebration with guests raising hands in joy"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="reveal aspect-[16/10] rounded-sm overflow-hidden bg-slate-soft/5">
              <img
                  src="https://t4.ftcdn.net/jpg/09/29/21/03/360_F_929210352_tMoJG55sk4gjwycNUNJiJCItnZ5gbgZN.jpg"
                  alt="Elegant event venue with ambient lighting and guests"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

           {/* Bottom: UI screenshot with branded background glow */}
<div className="reveal relative -mt-px">
  {/* glow */}
  <div className="pointer-events-none absolute inset-0 -z-10 rounded-md blur-2xl bg-gradient-radial from-brand-gold/20 via-brand-gold/5 to-transparent" />

  {/* image wrapper controls height/ratio */}
  <div className="relative aspect-[16/9] max-h-72 sm:max-h-80 lg:max-h-[26rem] overflow-hidden">
    <img
      src="/ShowRunner (Website) (2).svg"
      alt="ShowRunner dashboard interface"
      className="w-full h-full object-contain rounded-sm"
    />
  </div>
</div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px) scale(0.98);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  )
}
