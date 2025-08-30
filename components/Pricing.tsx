'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, HelpCircle } from 'lucide-react'
import { fadeUp, staggerParent } from '@/lib/motion'
import Button from './Button'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small events and getting started',
    features: [
      { name: 'Up to 50 guests', included: true },
      { name: 'Basic timeline management', included: true },
      { name: 'Pre-built announcement templates', included: true },
      { name: 'Email support', included: true },
      { name: 'Custom branding', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'Priority support', included: false }
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/month',
    description: 'Most popular for professional events',
    features: [
      { name: 'Up to 300 guests', included: true },
      { name: 'Advanced AI scheduling', included: true },
      { name: 'Custom announcement scripts', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom branding', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'API access', included: false }
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Venue',
    price: '$199',
    period: '/month',
    description: 'For venues and large-scale events',
    features: [
      { name: 'Unlimited guests', included: true },
      { name: 'Multi-event management', included: true },
      { name: 'White-label solution', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'API access', included: true }
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
]

export default function Pricing() {
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="text-center">
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Choose your plan
      </motion.h2>
      <motion.p 
        className="text-xl text-slate-soft max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Start free, upgrade as you grow. All plans include our core AI event management features.
      </motion.p>

      <motion.div
        variants={staggerParent(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto mb-16"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            variants={fadeUp}
            className={`
              relative p-8 rounded-2xl border transition-all duration-300
              ${plan.highlighted 
                ? 'bg-brand-gold/5 border-brand-gold/30 shadow-lg shadow-brand-gold/10' 
                : 'bg-slate-soft/5 border-slate-soft/10 hover:border-slate-soft/20'
              }
            `}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-brand-gold text-black text-sm font-medium px-4 py-2 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-off-white mb-2">{plan.name}</h3>
              <p className="text-slate-soft mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-off-white">{plan.price}</span>
                <span className="text-slate-soft ml-1">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-brand-gold mr-3 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-slate-soft/50 mr-3 flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-off-white' : 'text-slate-soft/50'}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlighted ? 'primary' : 'secondary'}
              className="w-full"
              href="/coming-soon"
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Help section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center text-slate-soft hover:text-brand-gold transition-colors"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          Need help deciding?
        </button>

        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 rounded-xl bg-slate-soft/5 border border-slate-soft/10 max-w-2xl mx-auto"
          >
            <h4 className="text-lg font-semibold text-off-white mb-4">Quick Comparison</h4>
            <div className="space-y-2 text-left">
              <p className="text-slate-soft"><strong className="text-off-white">Starter:</strong> Small private parties, intimate gatherings</p>
              <p className="text-slate-soft"><strong className="text-off-white">Pro:</strong> Corporate events, weddings, conferences</p>
              <p className="text-slate-soft"><strong className="text-off-white">Venue:</strong> Event venues, large-scale productions</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
