'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { companyInfo } from '@/lib/data/content'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-neutral-900/80 border-b border-primary-500/20' : 'backdrop-blur-md bg-neutral-900/60 border-b border-primary-500/10'}`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-900/80 via-primary-800/80 to-primary-900/80 backdrop-blur-sm border-b border-primary-500/20">
        <div className="container">
          <div className="flex justify-between items-center py-2 text-xs md:text-sm">
            <div className="flex items-center space-x-3 md:space-x-6">
              <a 
                href={`tel:${companyInfo.phone}`} 
                className="text-primary-200 hover:text-white transition-all duration-200 hover:scale-105 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">{companyInfo.phone}</span>
              </a>
              <a 
                href={companyInfo.social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-200 hover:text-white transition-all duration-200 hover:scale-105 flex items-center gap-1 hidden sm:flex"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a 
                href={`mailto:${companyInfo.email}`} 
                className="text-primary-200 hover:text-white transition-all duration-200 hover:scale-105 flex items-center gap-1 hidden md:flex"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden lg:inline">{companyInfo.email}</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-primary-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">{companyInfo.hours.weekdays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl group-hover:bg-primary-500/40 transition-all duration-300"></div>
              <Image
                src="/images/logo.png"
                alt="OBIJONS TRADE LINK LIMITED Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain relative z-10"
                priority
              />
            </div>
            <div className="block">
              <div className="font-bold text-sm sm:text-xl gradient-text">OBIJONS TRADE LINK LIMITED</div>
              <div className="text-xs text-primary-300/80 hidden sm:block">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-neutral-300 hover:text-white font-medium transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-primary-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/search"
              className="group flex items-center space-x-2 px-4 py-2 glass border border-primary-500/30 rounded-xl hover:border-primary-500/60 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-neutral-400 group-hover:text-neutral-300 text-sm">Search parts...</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl glass border border-primary-500/30 hover:border-primary-500/60 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-primary-500/20 glass-dark animate-fade-in-down">
          <nav className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-neutral-300 hover:bg-primary-500/20 hover:text-white font-medium transition-all duration-300 hover:translate-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="block px-4 py-3 rounded-xl text-neutral-300 hover:bg-primary-500/20 hover:text-white font-medium transition-all duration-300 hover:translate-x-2"
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