import Link from 'next/link'
import { companyInfo } from '@/lib/data/content'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'About Us - OBIJONS TRADE LINK LIMITED',
  description: 'Learn about OBIJONS TRADE LINK LIMITED - your trusted source for quality automotive parts and accessories.',
}

const pillars = [
  {
    title: 'Quality First',
    description: 'OEM-grade and premium aftermarket components that meet or exceed global standards.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Transparent Pricing',
    description: 'Competitive quotes, fleet discounts, and bulk procurement without hidden fees.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Expert Support',
    description: 'Seasoned technicians ready to spec-fit any vehicle with precision and speed.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

const milestones = [
  { year: '2002', title: 'Launch', detail: 'Opened our first warehouse at ASPMDA Trade Fair Complex.' },
  { year: '2010', title: 'Nationwide Reach', detail: 'Expanded logistics network to cover all Nigerian states.' },
  { year: '2016', title: 'OEM Partnerships', detail: 'Signed strategic distribution deals with global manufacturers.' },
  { year: '2024', title: 'Digital Upgrade', detail: 'Launched the next-gen catalog with real-time availability.' },
]

const stats = [
  { label: 'Years of Service', value: '22+' },
  { label: 'Parts in Catalog', value: '10K+' },
  { label: 'Partner Garages', value: '500+' },
  { label: 'Delivery Accuracy', value: '99%' },
]

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/90 via-neutral-950/80 to-neutral-950" />

      <div className="container py-10 space-y-16 relative z-10">
        <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />

        {/* Hero */}
        <section className="glass-dark border border-primary-500/20 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-200 text-sm font-semibold">
                🚗 Nigerian Automotive Backbone
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Powering West Africa&apos;s automotive supply chain since 2002
              </h1>
              <p className="text-neutral-300 text-lg leading-relaxed">
                OBIJONS TRADE LINK LIMITED delivers precision-fit components, smart procurement, and lightning-fast fulfillment for
                workshops, fleets, and enthusiasts. Our Lagos HQ orchestrates a nationwide network of technicians, warehouses, and logistics partners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" glow endIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }>
                    Explore Catalog
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" startIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }>
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="glass border border-white/10 rounded-3xl p-6 space-y-6 shadow-neon">
              <h2 className="text-white text-xl font-semibold">Mission Snapshot</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Connect Nigeria&apos;s automotive ecosystem with guaranteed components, rigorous QA, and support teams that understand every chassis on the road.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-dark rounded-2xl p-4 text-center border border-white/10">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center">Our Pillars</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="glass-dark rounded-3xl border border-primary-500/20 p-6 group hover:border-primary-400/60 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-300 mb-4 group-hover:scale-110 group-hover:text-primary-200 transition-all duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="glass-dark rounded-3xl border border-white/10 p-8 lg:p-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Two decades of momentum</h2>
              <p className="text-neutral-400">Milestones that shaped our supply chain innovations.</p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-neutral-300 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              Continuous evolution
            </span>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 border-l border-primary-500/30 hidden md:block" aria-hidden />
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative md:pl-12">
                  <div className="absolute left-1 md:left-2 top-3 w-2 h-2 rounded-full bg-primary-400 shadow-neon hidden md:block" />
                  <div className="glass border border-white/10 rounded-2xl p-5 hover:border-primary-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 text-sm text-primary-300 font-semibold tracking-wide uppercase">
                      <span>{milestone.year}</span>
                      <span className="w-6 h-px bg-primary-500/50 hidden sm:block" />
                      <span className="text-white text-base normal-case">{milestone.title}</span>
                    </div>
                    <p className="text-neutral-400 mt-2">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="glass-dark rounded-3xl border border-primary-500/30 p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to co-create the future of automotive logistics?</h2>
          <p className="text-neutral-300 max-w-3xl mx-auto text-lg">
            Whether you manage a single shop or a nationwide fleet, we deliver the accuracy, scale, and responsiveness modern operations demand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" glow endIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }>
                Browse Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="ghost" startIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }>
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}