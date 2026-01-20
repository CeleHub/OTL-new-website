import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Transform to match frontend Product type
    const product = {
      id: data.id,
      name: data.name,
      partNumber: data.part_number,
      oemNumber: data.oem_number,
      category: data.categories?.slug || '',
      brand: data.brand,
      price: Number(data.price),
      description: data.description,
      inStock: data.in_stock,
      featured: data.featured,
      images: data.product_images
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .map((img: any) => img.url) || [],
      specifications: data.product_specifications
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .reduce((acc: any, spec: any) => {
          acc[spec.spec_key] = spec.spec_value
          return acc
        }, {}) || {},
      compatibility: data.product_compatibility?.map((comp: any) => ({
        make: comp.make,
        model: comp.model,
        yearStart: comp.year_start,
        yearEnd: comp.year_end,
        engineType: comp.engine_type,
      })) || [],
    }

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error('Error in product API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

