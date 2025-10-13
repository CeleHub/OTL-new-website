import Link from 'next/link'
import { companyInfo } from '@/lib/data/content'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'About Us - Obijons Trade Link Limited',
  description: 'Learn about Obijons Trade Link Limited - your trusted source for quality automotive parts and accessories.',
}

export default function AboutPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-8">
          <h1 className="text-4xl font-bold mb-6">About Obijons Trade Link Limited</h1>
          <p className="text-xl text-neutral-700 leading-relaxed mb-6">
            For over two decades, Obijons Trade Link Limited has been the trusted source for quality
            automotive parts and accessories. We're dedicated to providing auto repair shops,
            mechanics, and car enthusiasts with the parts they need at competitive prices.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-neutral-700">
              We stock only high-quality OEM and aftermarket parts from trusted manufacturers,
              backed by comprehensive warranties.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
            <p className="text-neutral-700">
              Our competitive pricing and bulk discounts ensure you get the best value without
              compromising on quality.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-neutral-700">
              Our knowledgeable team is ready to help you find the right parts and answer
              any technical questions.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-700 text-white rounded-lg shadow-md p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Browse our extensive catalog or contact us for personalized assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                Browse Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}