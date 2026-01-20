/**
 * Database data fetchers
 * These functions fetch data from Supabase directly (server-side)
 */

import { createClient } from '@/lib/supabase/server'
import { Product, Category } from '@/types'

// Fetch all products from database
export async function getProducts(filters?: {
  category?: string
  brand?: string
  featured?: boolean
  inStock?: boolean
  search?: string
}): Promise<Product[]> {
  try {
    const supabase = await createClient()
    
    // Get category ID if category slug provided
    let categoryId = null
    if (filters?.category) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', filters.category)
        .single()
      
      if (categoryError) {
        // Category not found or query failed - log and continue without category filter
        console.warn(`Category lookup failed for slug "${filters.category}":`, categoryError.message)
        categoryId = null
      } else {
        // Type assertion for category data
        const catData = category as { id: string } | null
        categoryId = catData?.id || null
      }
    }

    // Build query
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          slug,
          name
        ),
        product_images (
          id,
          url,
          alt_text,
          display_order
        ),
        product_specifications (
          id,
          spec_key,
          spec_value,
          display_order
        ),
        product_compatibility (
          id,
          make,
          model,
          year_start,
          year_end,
          engine_type
        )
      `)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (filters?.brand) {
      query = query.eq('brand', filters.brand)
    }

    if (filters?.featured) {
      query = query.eq('featured', true)
    }

    if (filters?.inStock) {
      query = query.eq('in_stock', true)
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,part_number.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    // Transform to match Product type
    return (data || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      partNumber: product.part_number,
      oemNumber: product.oem_number,
      category: product.categories?.slug || '',
      brand: product.brand,
      price: Number(product.price),
      description: product.description,
      inStock: product.in_stock,
      featured: product.featured,
      images: product.product_images
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .map((img: any) => img.url) || [],
      specifications: product.product_specifications
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .reduce((acc: any, spec: any) => {
          acc[spec.spec_key] = spec.spec_value
          return acc
        }, {}) || {},
      compatibility: product.product_compatibility?.map((comp: any) => ({
        make: comp.make,
        model: comp.model,
        yearStart: comp.year_start,
        yearEnd: comp.year_end,
        engineType: comp.engine_type,
      })) || [],
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    // Fallback to static data if database fails
    const { products } = await import('./products')
    return products
  }
}

// Fetch single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          slug,
          name
        ),
        product_images (
          id,
          url,
          alt_text,
          display_order
        ),
        product_specifications (
          id,
          spec_key,
          spec_value,
          display_order
        ),
        product_compatibility (
          id,
          make,
          model,
          year_start,
          year_end,
          engine_type
        )
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    // Type assertion for product data with relations
    const productData = data as any & {
      product_images?: Array<{
        id: string
        url: string
        alt_text: string | null
        display_order: number
      }>
      product_specifications?: Array<{
        id: string
        spec_key: string
        spec_value: string
        display_order: number
      }>
      product_compatibility?: Array<{
        id: string
        make: string
        model: string
        year_start: number
        year_end: number
        engine_type: string | null
      }>
      categories?: {
        id: string
        slug: string
        name: string
      }
    }

    // Transform to match Product type
    return {
      id: productData.id,
      name: productData.name,
      partNumber: productData.part_number,
      oemNumber: productData.oem_number,
      category: productData.categories?.slug || '',
      brand: productData.brand,
      price: Number(productData.price),
      description: productData.description,
      inStock: productData.in_stock,
      featured: productData.featured,
      images: productData.product_images
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .map((img: any) => img.url) || [],
      specifications: productData.product_specifications
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .reduce((acc: any, spec: any) => {
          acc[spec.spec_key] = spec.spec_value
          return acc
        }, {}) || {},
      compatibility: productData.product_compatibility?.map((comp: any) => ({
        make: comp.make,
        model: comp.model,
        yearStart: comp.year_start,
        yearEnd: comp.year_end,
        engineType: comp.engine_type,
      })) || [],
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    // Fallback to static data
    const { products } = await import('./products')
    return products.find(p => p.id === id) || null
  }
}

// Fetch all categories from database
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      throw error
    }

    // Transform to match Category type
    return (data || []).map((category: any) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      image: category.image,
      productCount: category.product_count,
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Fallback to static data
    const { categories } = await import('./products')
    return categories
  }
}

