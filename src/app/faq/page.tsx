'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'

const faqs = [
  {
    question: 'Do you ship nationwide?',
    answer: 'Yes, we ship across all Nigerian states with tracked logistics partners. Priority dispatch can be arranged for Lagos same-day deliveries.',
  },
  {
    question: 'What is your return policy?',
    answer: 'Items can be returned within 30 days if unused and still in original packaging. Electronic parts require bench testing prior to approval.',
  },
  {
    question: 'Are these OEM or aftermarket parts?',
    answer: 'Both. Each listing specifies OEM, OEM-equivalent, or premium aftermarket so you can match budgets and performance expectations.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'We focus on sourcing, but we have a vetted network of partner workshops we can connect you with for installation.',
  },
  {
    question: 'How do I confirm compatibility?',
    answer: 'Use our product compatibility tables, or send your VIN/make/model/year and we will validate the part number before shipping.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Major cards, bank transfers, and corporate purchase orders for approved accounts.',
  },
  {
    question: 'Are parts covered by warranty?',
    answer: 'Absolutely. Warranties vary by manufacturer, ranging from 12 months to lifetime coverage on select components.',
  },
  {
    question: 'Do you support fleet/bulk procurement?',
    answer: 'Yes—we offer negotiated pricing, scheduled deliveries, and dedicated account managers for fleet customers.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-200 text-sm font-semibold">
            🧠 Knowledge Base
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Missions</h1>
          <p className="text-neutral-400 text-lg">
            Everything you need to know about shipping, fitment, procurement, and support before you place an order.
          </p>
        </header>

        <section className="glass-dark rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-primary-500/30"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center gap-4"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <p className="text-sm uppercase tracking-wide text-neutral-500">Question {index + 1}</p>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{faq.question}</h3>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300">
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 text-neutral-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden px-4 sm:px-6 pb-4">
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="glass-dark rounded-3xl border border-primary-500/30 p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Still need clarity?</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Our sourcing desk is online 6 days a week. Call, chat, or send your RFQ and we&apos;ll respond within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="flex-1">
              <Button size="lg" glow className="w-full">
                Contact Support
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button size="lg" variant="outline" className="w-full">
                Browse Products
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}