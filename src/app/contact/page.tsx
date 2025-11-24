import Link from 'next/link'
import { companyInfo } from '@/lib/data/content'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactForm from '@/components/forms/ContactForm'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Contact Us - OBIJONS TRADE LINK LIMITED',
  description: 'Get in touch with OBIJONS TRADE LINK LIMITED for expert assistance with automotive parts and accessories.',
}

const contactChannels = [
  {
    label: 'Call Us',
    value: companyInfo.phone,
    href: `tel:${companyInfo.phone}`,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: companyInfo.whatsapp,
    href: companyInfo.social.whatsapp,
    external: true,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

        {/* Hero */}
        <section className="glass-dark rounded-3xl border border-primary-500/30 p-8 lg:p-12 overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-200 text-sm font-semibold">
                📡 Mission Control
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">High-response support for every automotive request</h1>
              <p className="text-neutral-300 text-lg leading-relaxed">
                Speak with sourcing specialists, confirm inventory, or request bespoke quotations. Our Lagos command center responds in minutes—no matter the channel.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {contactChannels.map((channel) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="glass rounded-2xl border border-white/10 p-4 hover:border-primary-500/40 transition-all duration-300"
                  >
                    <div className="text-primary-300 mb-2">{channel.icon}</div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">{channel.label}</p>
                  <p className="text-white font-semibold break-words">{channel.value}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="glass bg-gradient-to-br from-primary-900/40 to-neutral-900/60 rounded-3xl border border-white/10 p-6 space-y-4 shadow-neon">
              <p className="text-sm uppercase tracking-wide text-neutral-400">Field Headquarters</p>
              <h3 className="text-white text-2xl font-semibold">Visit us</h3>
              <p className="text-neutral-300 leading-relaxed">
                {companyInfo.address.street}<br />
                {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-neutral-300">
                <div className="glass-dark rounded-2xl border border-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Weekdays</p>
                  <p className="text-white font-semibold">{companyInfo.hours.weekdays}</p>
                </div>
                <div className="glass-dark rounded-2xl border border-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Weekend</p>
                  <p className="text-white font-semibold">{companyInfo.hours.saturday}</p>
                  <p className="text-white font-semibold">{companyInfo.hours.sunday}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address.street)}`}
                  target="_blank"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Open in Maps
                  </Button>
                </Link>
                <Link href={companyInfo.social.whatsapp} target="_blank" className="flex-1">
                  <Button
                    className="w-full"
                    glow
                  >
                    Book Visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="glass-dark rounded-3xl border border-white/10 p-6 space-y-4">
              <h2 className="text-white text-xl font-semibold">Dedicated Response Cell</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Drop us a note via the form and we&apos;ll reply within 1 business hour. For urgent sourcing, use the quick contacts below.
              </p>
              <div className="space-y-3 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <span className="text-primary-300">📞</span>
                  <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">{companyInfo.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary-300">💬</span>
                  <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {companyInfo.whatsapp}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary-300">✉️</span>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors break-words">
                  {companyInfo.email}
                </a>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors break-words">
                  {companyInfo.email}
                </a>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-3xl border border-primary-500/20 p-6 space-y-4">
              <h2 className="text-white text-xl font-semibold">Quick Contact Boost</h2>
              <div className="flex flex-col gap-3">
                <WhatsAppButton
                  message="Hi OTL team! I need help sourcing automotive parts."
                  className="w-full justify-center"
                  size="md"
                >
                  💬 Instant WhatsApp
                </WhatsAppButton>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="btn btn-primary w-full justify-center"
                >
                  📞 Call Procurement
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 glass-dark rounded-3xl border border-white/10 p-8">
            <h2 className="text-white text-2xl font-semibold mb-4">Send us the mission details</h2>
            <p className="text-neutral-400 mb-6">Share your vehicle specs, required quantities, or RFQ reference numbers. Our team will acknowledge instantly.</p>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  )
}
