'use client'

import Link from 'next/link'
import { useState } from 'react'
import { companyInfo } from '@/lib/data/content'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-space-900/90 backdrop-blur-md border-b border-space-700 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="container">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <a href={`tel:${companyInfo.phone}`} className="hover:text-primary-200 transition-colors">
                📞 {companyInfo.phone}
              </a>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-primary-200 hidden sm:block transition-colors">
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
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              🚀
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-white">OTL Motor Parts</div>
              <div className="text-xs text-space-300">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary-400 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/search"
              className="flex items-center space-x-2 px-4 py-2 bg-space-800 border border-space-600 rounded-lg hover:border-primary-500 hover:bg-space-700 transition-all"
            >
              <svg className="w-5 h-5 text-space-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-space-300">Search parts...</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-space-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-space-700 bg-space-900/95 backdrop-blur-md">
          <nav className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-white hover:bg-primary-600 hover:text-white font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="block px-4 py-3 rounded-lg text-white hover:bg-primary-600 hover:text-white font-medium transition-colors"
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