'use client'

import { useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { products, categories } from '@/lib/data/products'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ViewMode } from '@/types'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug)
  
  if (!category) {
    notFound()
  }

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState('relevance')

  const categoryProducts = useMemo(() => {
    let filtered = products.filter((p) => p.category === params.slug)

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        break
      default:
        break
    }

    return filtered
  }, [params.slug, sortBy])

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: 'Categories', href: '/categories' },
            { label: category.name, href: `/categories/${category.slug}` },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-neutral-600">{category.description}</p>
          <p className="text-neutral-600 mt-2">
            Showing {categoryProducts.length} products
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-neutral-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-2 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-neutral-400 hover:bg-neutral-100'
              }`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zM10 14H3v7h7v-7zm11 0h-7v7h7v-7z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-neutral-400 hover:bg-neutral-100'
              }`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products */}
        {categoryProducts.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} view={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-neutral-600">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}