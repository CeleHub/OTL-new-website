'use client'

import { useState } from 'react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const faqs = [
  {
    question: 'Do you ship nationwide?',
    answer: 'Yes, we ship to all 50 states. Most orders arrive within 3-5 business days. Expedited shipping options are available at checkout.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on most parts. Items must be unused and in original packaging. Core charges may apply to certain electrical components.',
  },
  {
    question: 'Are these OEM or aftermarket parts?',
    answer: 'We carry both OEM and high-quality aftermarket parts. Each product listing clearly indicates the part type and manufacturer.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'We are primarily a parts supplier, but we can recommend trusted local mechanics and shops in your area.',
  },
  {
    question: 'How do I know if a part fits my vehicle?',
    answer: 'Each product page includes a compatibility checker. Simply enter your vehicle\'s year, make, and model to verify fitment. You can also contact us for assistance.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and wire transfers for large orders.',
  },
  {
    question: 'Do you offer warranties on parts?',
    answer: 'Yes, all parts come with manufacturer warranties. Warranty terms vary by part and manufacturer - see individual product pages for details.',
  },
  {
    question: 'Can I get a bulk discount?',
    answer: 'Yes, we offer discounts for bulk orders and fleet customers. Contact us with your requirements for a custom quote.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="text-neutral-600">
              Find answers to common questions about our products and services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-neutral-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-neutral-700 mb-6">
              Our team is here to help. Contact us for personalized assistance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}