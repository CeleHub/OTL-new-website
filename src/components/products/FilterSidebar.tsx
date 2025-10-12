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
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-medium text-neutral-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.slug} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories?.includes(category.slug) || false}
                onChange={() => handleCheckboxChange('categories', category.slug)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-neutral-900 mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={() => handleCheckboxChange('brands', brand)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Make Filter */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-neutral-900 mb-3">Vehicle Make</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {makes.map((make) => (
            <label key={make} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.makes?.includes(make) || false}
                onChange={() => handleCheckboxChange('makes', make)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{make}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-neutral-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          {[
            { label: 'Under $50', min: 0, max: 50 },
            { label: '$50 - $100', min: 50, max: 100 },
            { label: '$100 - $250', min: 100, max: 250 },
            { label: '$250 - $500', min: 250, max: 500 },
            { label: 'Over $500', min: 500, max: 10000 },
          ].map((range) => (
            <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="border-t pt-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => {
              const newFilters = { ...filters, inStock: e.target.checked }
              setFilters(newFilters)
              onFilterChange(newFilters)
            }}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-neutral-900">In Stock Only</span>
        </label>
      </div>
    </div>
  )
}