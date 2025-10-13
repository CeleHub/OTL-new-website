'use client'

import Link from 'next/link'
import { useState } from 'react'
import { companyInfo } from '@/lib/data/content'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white">
        <div className="container">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <a href={`tel:${companyInfo.phone}`} className="hover:text-primary-200">
                📞 {companyInfo.phone}
              </a>
              <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary-200 hidden sm:block">
                💬 WhatsApp
              </a>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-primary-200 hidden md:block">
                ✉️ {companyInfo.email}
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>🕒 {companyInfo.hours.weekdays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              OTL
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-neutral-900">OTL Motor Parts</div>
              <div className="text-xs text-neutral-600">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/search"
              className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg hover:border-primary-500 transition-colors"
            >
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-neutral-600">Search parts...</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-neutral-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="block px-4 py-3 rounded-lg text-neutral-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔍 Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}