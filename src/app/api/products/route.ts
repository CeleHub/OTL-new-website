import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const featured = searchParams.get('featured')
    const inStock = searchParams.get('inStock')
    const search = searchParams.get('search')

    // Convert category slug to category ID if provided
    let categoryId = null
    if (category) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single()
      categoryId = categoryData?.id || null
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

    // Apply filters
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (brand) {
      query = query.eq('brand', brand)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (inStock === 'true') {
      query = query.eq('in_stock', true)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,part_number.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data to match frontend Product type
    const products = data?.map((product: any) => ({
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
    })) || []

    return NextResponse.json({ products })
  } catch (error: any) {
    console.error('Error in products API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

