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
    const { name, slug, description, image } = body

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    // First, check if the category exists
    const { data: existingCategory, error: checkError } = await supabase
      .from('categories')
      .select('id')
      .eq('id', params.id)
      .single()

    if (checkError || !existingCategory) {
      console.error('Category check error:', checkError)
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Check if slug is already taken by another category
    const { data: slugConflict } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .neq('id', params.id)
      .single()

    if (slugConflict) {
      return NextResponse.json(
        { error: 'Slug is already taken by another category' },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: {
      name: string
      slug: string
      description: string | null
      image: string | null
    } = {
      name,
      slug,
      description: description || null,
      image: image || null,
    }

    // Perform the update with type assertion to bypass Supabase type inference issues
    const updateResult = await (supabase
      .from('categories') as any)
      .update(updateData)
      .eq('id', params.id)
      .select()

    // Check for errors in the update result
    if (updateResult.error) {
      console.error('Error updating category:', updateResult.error)
      console.error('Update data:', updateData)
      console.error('Category ID:', params.id)
      
      // Provide more specific error messages
      if (updateResult.error.code === '23505') {
        return NextResponse.json(
          { error: 'Slug is already taken by another category' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { 
          error: updateResult.error.message || 'Failed to update category',
          code: updateResult.error.code,
          details: updateResult.error
        },
        { status: 500 }
      )
    }

    // Check if we got data back
    const category = updateResult.data?.[0] || updateResult.data

    if (!category) {
      console.error('Update succeeded but no data returned')
      // Try to fetch the category again to verify the update
      const { data: updatedCategory, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', params.id)
        .maybeSingle()

      if (fetchError) {
        console.error('Error fetching updated category:', fetchError)
        return NextResponse.json(
          { error: 'Update may have succeeded but could not verify. Please refresh the page.' },
          { status: 500 }
        )
      }

      if (!updatedCategory) {
        return NextResponse.json(
          { error: 'Category was not found after update attempt' },
          { status: 404 }
        )
      }

      // If we can fetch it, the update likely worked, return it
      return NextResponse.json({ category: updatedCategory })
    }

    return NextResponse.json({ category })
  } catch (error: any) {
    console.error('Error in update category API:', error)
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

    // Check if category has products
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('category_id', params.id)
      .limit(1)

    if (products && products.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with existing products' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting category:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in delete category API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

