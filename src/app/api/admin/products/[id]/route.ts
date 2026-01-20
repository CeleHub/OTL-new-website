import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Update product
    // Type assertion needed due to Supabase type inference limitations
    const { data: product, error: productError } = await (supabase
      .from('products') as any)
      .update({
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
      .eq('id', params.id)
      .select()
      .single()

    if (productError) {
      console.error('Error updating product:', productError)
      return NextResponse.json({ error: productError.message }, { status: 500 })
    }

    // Delete existing specifications and compatibility
    await Promise.all([
      supabase.from('product_specifications').delete().eq('product_id', params.id),
      supabase.from('product_compatibility').delete().eq('product_id', params.id),
    ])

    // Insert new specifications
    if (specifications && specifications.length > 0) {
      const specs = specifications
        .filter((s: any) => s.key && s.value)
        .map((spec: any, index: number) => ({
          product_id: params.id,
          spec_key: spec.key,
          spec_value: spec.value,
          display_order: index,
        }))

      if (specs.length > 0) {
        const { error: specError } = await (supabase
          .from('product_specifications') as any)
          .insert(specs)

        if (specError) {
          console.error('Error updating specifications:', specError)
        }
      }
    }

    // Insert new compatibility
    if (compatibility && compatibility.length > 0) {
      const compat = compatibility
        .filter((c: any) => c.make && c.model)
        .map((comp: any) => ({
          product_id: params.id,
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
          console.error('Error updating compatibility:', compatError)
        }
      }
    }

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error('Error in update product API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in delete product API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

