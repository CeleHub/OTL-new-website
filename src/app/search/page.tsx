'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { debounce } from '@/lib/utils'

const quickQueries = ['Bushing', 'Engine mount', 'Brake rotor', 'Seat cushion']

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handler = debounce((value: string) => {
      setDebouncedQuery(value)
    }, 300)

    handler(query)
  }, [query])

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return []
    }

    const searchTerm = debouncedQuery.toLowerCase()

    return products.filter((product) => {
      if (product.name.toLowerCase().includes(searchTerm)) return true
      if (product.description.toLowerCase().includes(searchTerm)) return true
      if (product.partNumber.toLowerCase().includes(searchTerm)) return true
      if (product.oemNumber?.toLowerCase().includes(searchTerm)) return true
      if (product.brand.toLowerCase().includes(searchTerm)) return true
      if (product.category.toLowerCase().includes(searchTerm)) return true
      if (
        product.compatibility.some(
          (c) =>
            c.make.toLowerCase().includes(searchTerm) ||
            c.model.toLowerCase().includes(searchTerm)
        )
      )
        return true
      return false
    })
  }, [debouncedQuery])

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs items={[{ label: 'Search', href: '/search' }]} />

        <section className="glass-dark rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-200 text-sm font-semibold">
              🔍 Universal Search Console
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Search Products</h1>
            <p className="text-neutral-400">
              Query the catalog by part number, keyword, vehicle spec, or OEM reference.
            </p>
          </div>
          <div className="max-w-3xl">
            <Input
              type="text"
              placeholder="Search by part name, SKU, OEM number, vehicle make/model..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              className="text-lg"
              autoFocus
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((suggestion) => (
              <Button
                key={suggestion}
                variant="ghost"
                size="sm"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
          {debouncedQuery && (
            <p className="text-neutral-400">
              {searchResults.length > 0
                ? `Found ${searchResults.length} match${searchResults.length === 1 ? '' : 'es'} for “${debouncedQuery}”`
                : `No results found for “${debouncedQuery}”`}
            </p>
          )}
        </section>

        {!debouncedQuery ? (
          <div className="glass-dark rounded-3xl border border-white/10 p-12 text-center space-y-4">
            <div className="text-6xl">🔎</div>
            <h2 className="text-2xl font-semibold text-white">Start your discovery</h2>
            <p className="text-neutral-400">
              Try searching for a part family (e.g. “engine mount”), a specific SKU, or a vehicle make/model combo.
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-dark rounded-3xl border border-white/10 p-12 text-center space-y-4">
            <div className="text-6xl">🛰️</div>
            <h2 className="text-2xl font-semibold text-white">No signals detected</h2>
            <p className="text-neutral-400">
              We couldn’t match “{debouncedQuery}”. Adjust your query or provide more vehicle detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Button variant="ghost" onClick={() => setQuery('')}>
                Reset search
              </Button>
              <Link href="/contact">
                <Button glow>
                  Contact procurement
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}