import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      part_number,
      oem_number,
      category_id,
      brand,
      price,
      description,
      in_stock,
      featured,
      specifications,
      compatibility,
    } = body

    // Insert product
    // Type assertion needed due to Supabase type inference limitations
    const { data: product, error: productError } = await (supabase
      .from('products') as any)
      .insert({
        name,
        part_number,
        oem_number: oem_number || null,
        category_id: category_id || null,
        brand,
        price,
        description: description || null,
        in_stock: in_stock !== undefined ? in_stock : true,
        featured: featured || false,
      })
      .select()
      .single()

    if (productError) {
      console.error('Error creating product:', productError)
      return NextResponse.json({ error: productError.message }, { status: 500 })
    }

    // Insert specifications
    if (specifications && specifications.length > 0) {
      const specs = specifications
        .filter((s: any) => s.key && s.value)
        .map((spec: any, index: number) => ({
          product_id: product.id,
          spec_key: spec.key,
          spec_value: spec.value,
          display_order: index,
        }))

      if (specs.length > 0) {
        const { error: specError } = await (supabase
          .from('product_specifications') as any)
          .insert(specs)

        if (specError) {
          console.error('Error creating specifications:', specError)
        }
      }
    }

    // Insert compatibility
    if (compatibility && compatibility.length > 0) {
      const compat = compatibility
        .filter((c: any) => c.make && c.model)
        .map((comp: any) => ({
          product_id: product.id,
          make: comp.make,
          model: comp.model,
          year_start: comp.year_start,
          year_end: comp.year_end,
          engine_type: comp.engine_type || null,
        }))

      if (compat.length > 0) {
        const { error: compatError } = await (supabase
          .from('product_compatibility') as any)
          .insert(compat)

        if (compatError) {
          console.error('Error creating compatibility:', compatError)
        }
      }
    }

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error('Error in create product API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

