'use client'

import { useState } from 'react'
import { brands, makes } from '@/lib/data/products'
import { categories } from '@/lib/data/products'
import Button from '@/components/ui/Button'

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void
  initialFilters?: any
}

export default function FilterSidebar({ onFilterChange, initialFilters = {} }: FilterSidebarProps) {
  const [filters, setFilters] = useState(initialFilters)

  const handleCheckboxChange = (filterType: string, value: string) => {
    const currentValues = filters[filterType] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value]
    
    const newFilters = { ...filters, [filterType]: newValues }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = { ...filters, minPrice: min, maxPrice: max }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    setFilters({})
    onFilterChange({})
  }

  return (
    <div className="glass-dark rounded-3xl border border-white/10 p-6 space-y-6 text-neutral-200">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">Refine</p>
          <h3 className="font-semibold text-xl text-white">Filters</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-primary-300 hover:text-primary-100 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.slug} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories?.includes(category.slug) || false}
                onChange={() => handleCheckboxChange('categories', category.slug)}
                className="w-4 h-4 text-primary-500 rounded border-neutral-600 bg-neutral-900/40 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="text-sm text-neutral-300 group-hover:text-white">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="border-t border-white/5 pt-6">
        <h4 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-modern">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={() => handleCheckboxChange('brands', brand)}
                className="w-4 h-4 text-primary-500 rounded border-neutral-600 bg-neutral-900/40 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="text-sm text-neutral-300 group-hover:text-white">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Make Filter */}
      <div className="border-t border-white/5 pt-6">
        <h4 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-3">Vehicle Make</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-modern">
          {makes.map((make) => (
            <label key={make} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.makes?.includes(make) || false}
                onChange={() => handleCheckboxChange('makes', make)}
                className="w-4 h-4 text-primary-500 rounded border-neutral-600 bg-neutral-900/40 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="text-sm text-neutral-300 group-hover:text-white">{make}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-white/5 pt-6">
        <h4 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-3">Price Range</h4>
        <div className="space-y-2">
          {[
            { label: 'Under ₦15,000', min: 0, max: 15000 },
            { label: '₦15,000 - ₦30,000', min: 15000, max: 30000 },
            { label: '₦30,000 - ₦50,000', min: 30000, max: 50000 },
            { label: '₦50,000 - ₦100,000', min: 50000, max: 100000 },
            { label: 'Over ₦100,000', min: 100000, max: 1000000 },
          ].map((range) => (
            <label key={range.label} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
                className="w-4 h-4 text-primary-500 border-neutral-600 bg-neutral-900/40 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="text-sm text-neutral-300 group-hover:text-white">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="border-t border-white/5 pt-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => {
              const newFilters = { ...filters, inStock: e.target.checked }
              setFilters(newFilters)
              onFilterChange(newFilters)
            }}
            className="w-4 h-4 text-primary-500 rounded border-neutral-600 bg-neutral-900/40 focus:ring-primary-500 focus:ring-offset-0"
          />
          <span className="text-sm font-medium text-white">In Stock Only</span>
        </label>
      </div>

      <div className="pt-6 border-t border-white/5">
        <Button variant="ghost" className="w-full" onClick={handleReset}>
          Clear filters
        </Button>
      </div>
    </div>
  )
}