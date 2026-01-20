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
    const { name, slug, description, image } = body

    // Type assertion needed due to Supabase type inference limitations
    const { data: category, error } = await (supabase
      .from('categories') as any)
      .insert({
        name,
        slug,
        description: description || null,
        image: image || null,
        product_count: 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating category:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ category })
  } catch (error: any) {
    console.error('Error in create category API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

