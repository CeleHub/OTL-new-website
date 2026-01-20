'use client'

import { useState, useMemo, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { getProducts, getCategories } from '@/lib/data/database-client'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ViewMode, Product, Category } from '@/types'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    async function loadData() {
      try {
        const [allCategories, allProducts] = await Promise.all([
          getCategories(),
          getProducts({ category: params.slug }),
        ])
        
        const foundCategory = allCategories.find((c) => c.slug === params.slug)
        if (!foundCategory) {
          notFound()
        }
        
        setCategory(foundCategory)
        setProducts(allProducts)
      } catch (error) {
        console.error('Error loading category:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [params.slug])

  const categoryProducts = useMemo(() => {
    let filtered = [...products]

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
  }, [params.slug, sortBy, products])

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Categories', href: '/categories' },
            { label: category.name, href: `/categories/${category.slug}` },
          ]}
        />

        <header className="space-y-4">
          {category && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-200 text-sm font-semibold">
                🧩 {category.name} cluster
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-white">{category.name}</h1>
                  <p className="text-neutral-400">{category.description}</p>
                  <p className="text-neutral-500 text-sm mt-2">
                    {loading ? 'Loading...' : `${categoryProducts.length} product${categoryProducts.length === 1 ? '' : 's'}`}
                  </p>
                </div>
              </div>
            </>
          )}
        </header>

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
        ) : categoryProducts.length > 0 ? (
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
          <div className="glass-dark rounded-3xl border border-white/10 p-12 text-center">
            <p className="text-xl text-neutral-300">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
