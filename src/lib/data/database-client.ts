/**
 * Client-side database fetchers
 * These functions use API routes instead of direct Supabase calls
 * Use this in 'use client' components
 */

import { Product, Category } from '@/types'

// Fetch all products from API (client-side)
export async function getProducts(filters?: {
  category?: string
  brand?: string
  featured?: boolean
  inStock?: boolean
  search?: string
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.brand) params.append('brand', filters.brand)
    if (filters?.featured) params.append('featured', 'true')
    if (filters?.inStock) params.append('inStock', 'true')
    if (filters?.search) params.append('search', filters.search)

    const response = await fetch(`/api/products?${params.toString()}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const { products } = await response.json()
    return products || []
  } catch (error) {
    console.error('Error fetching products:', error)
    // Fallback to static data if database fails
    const { products } = await import('./products')
    return products
  }
}

// Fetch single product by ID (client-side)
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch product')
    }

    const { product } = await response.json()
    return product || null
  } catch (error) {
    console.error('Error fetching product:', error)
    // Fallback to static data
    const { products } = await import('./products')
    return products.find(p => p.id === id) || null
  }
}

// Fetch all categories from API (client-side)
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories', {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const { categories } = await response.json()
    return categories || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Fallback to static data
    const { categories } = await import('./products')
    return categories
  }
}

