'use client'

import { useState, useMemo, useEffect } from 'react'
import { getProducts } from '@/lib/data/database-client'
import ProductCard from '@/components/products/ProductCard'
import FilterSidebar from '@/components/products/FilterSidebar'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ViewMode, Product } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<any>({})
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (filters.categories?.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category))
    }

    if (filters.brands?.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand))
    }

    if (filters.makes?.length > 0) {
      filtered = filtered.filter((p) => p.compatibility.some((c) => filters.makes.includes(c.make)))
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    }

    if (filters.inStock) {
      filtered = filtered.filter((p) => p.inStock)
    }

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
  }, [filters, sortBy])

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs items={[{ label: 'Products', href: '/products' }]} />

        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-200 text-sm font-semibold">
            🛠️ Advanced Catalog
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">All Products</h1>
              <p className="text-neutral-400">
                {loading ? 'Loading...' : `Showing ${filteredProducts.length} of ${products.length} references`}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Compatibility Matches', value: '350+' },
                { label: 'Featured Items', value: products.filter((p) => p.featured).length },
                { label: 'Brands', value: '3+' },
              ].map((stat) => (
                <div key={stat.label} className="glass-dark rounded-2xl border border-white/10 py-3 px-4">
                  <p className="text-white text-xl font-bold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <FilterSidebar onFilterChange={setFilters} initialFilters={filters} />
          </aside>

          <div className="flex-grow space-y-6">
            <div className="glass-dark rounded-3xl border border-white/10 p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <label className="text-sm uppercase tracking-wide text-neutral-400">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input bg-neutral-900/40 border border-white/10 text-neutral-100 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {(['grid', 'list'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-xl border transition-all ${
                      viewMode === mode
                        ? 'border-primary-500/60 bg-primary-500/10 text-primary-200'
                        : 'border-white/10 text-neutral-500 hover:text-white'
                    }`}
                    aria-label={`${mode} view`}
                  >
                    {mode === 'grid' ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zM10 14H3v7h7v-7zm11 0h-7v7h7v-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="glass-dark rounded-3xl border border-white/10 p-12 text-center">
                <p className="text-neutral-400">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
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
              <div className="glass-dark rounded-3xl border border-white/10 p-12 text-center">
                <p className="text-xl text-neutral-300 mb-4">
                  No products match the current filters.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="text-primary-300 hover:text-primary-100 font-semibold"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}