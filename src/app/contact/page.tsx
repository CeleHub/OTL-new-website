import { companyInfo } from '@/lib/data/content'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactForm from '@/components/forms/ContactForm'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata = {
  title: 'Contact Us - OTL Motor Parts',
  description: 'Get in touch with OTL Motor Parts for expert assistance with automotive parts and accessories.',
}

export default function ContactPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-neutral-600">
            Have a question? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {companyInfo.phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">WhatsApp</h3>
                  <a
                    href={companyInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {companyInfo.whatsapp}
                  </a>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {companyInfo.email}
                  </a>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Address</h3>
                  <p className="text-neutral-700">
                    {companyInfo.address.street}<br />
                    {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              <div className="space-y-2 text-neutral-700">
                <p>{companyInfo.hours.weekdays}</p>
                <p>{companyInfo.hours.saturday}</p>
                <p>{companyInfo.hours.sunday}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              
              {/* Quick Contact Options */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">Quick Contact Options</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <WhatsAppButton 
                    message="Hello! I'm interested in your automotive parts. Can you help me find what I need?"
                    size="md"
                    className="flex-1"
                  >
                    💬 Chat on WhatsApp
                  </WhatsAppButton>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}