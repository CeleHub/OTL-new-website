'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { products } from '@/lib/data/products'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Input from '@/components/ui/Input'
import { debounce } from '@/lib/utils'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Debounce search query
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
      // Search in name
      if (product.name.toLowerCase().includes(searchTerm)) return true
      
      // Search in description
      if (product.description.toLowerCase().includes(searchTerm)) return true
      
      // Search in part number
      if (product.partNumber.toLowerCase().includes(searchTerm)) return true
      
      // Search in OEM number
      if (product.oemNumber?.toLowerCase().includes(searchTerm)) return true
      
      // Search in brand
      if (product.brand.toLowerCase().includes(searchTerm)) return true
      
      // Search in category
      if (product.category.toLowerCase().includes(searchTerm)) return true
      
      // Search in vehicle compatibility
      if (product.compatibility.some(c => 
        c.make.toLowerCase().includes(searchTerm) ||
        c.model.toLowerCase().includes(searchTerm)
      )) return true
      
      return false
    })
  }, [debouncedQuery])

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: 'Search', href: '/search' }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Search Products</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="max-w-2xl">
              <Input
                type="text"
                placeholder="Search by part name, number, vehicle make/model..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg"
                autoFocus
              />
            </div>
          </div>

          {debouncedQuery && (
            <p className="text-neutral-600">
              {searchResults.length > 0
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${debouncedQuery}"`
                : `No results found for "${debouncedQuery}"`}
            </p>
          )}
        </div>

        {!debouncedQuery ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">Start Your Search</h2>
            <p className="text-neutral-600">
              Enter a part name, number, or vehicle make/model to find what you need
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
            <p className="text-neutral-600 mb-6">
              We couldn't find any products matching "{debouncedQuery}"
            </p>
            <p className="text-neutral-600">
              Try adjusting your search or{' '}
              <a href="/contact" className="link">
                contact us
              </a>{' '}
              for assistance
            </p>
          </div>
        )}
      </div>
    </div>
  )
}