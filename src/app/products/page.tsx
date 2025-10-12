'use client'

import { useState, useMemo } from 'react'
import { products } from '@/lib/data/products'
import ProductCard from '@/components/products/ProductCard'
import FilterSidebar from '@/components/products/FilterSidebar'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ViewMode } from '@/types'

export default function ProductsPage() {
  const [filters, setFilters] = useState<any>({})
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState('relevance')

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Apply category filter
    if (filters.categories?.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category))
    }

    // Apply brand filter
    if (filters.brands?.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand))
    }

    // Apply make filter
    if (filters.makes?.length > 0) {
      filtered = filtered.filter(p =>
        p.compatibility.some(c => filters.makes.includes(c.make))
      )
    }

    // Apply price filter
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filtered = filtered.filter(p =>
        p.price >= filters.minPrice && p.price <= filters.maxPrice
      )
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        // Would sort by date if we had it
        break
      default:
        // relevance - keep original order
        break
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: 'Products', href: '/products' }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-neutral-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar onFilterChange={setFilters} initialFilters={filters} />
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
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

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={viewMode} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-neutral-600 mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}