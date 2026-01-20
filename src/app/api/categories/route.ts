import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform to match frontend Category type
    const categories = data?.map((category: any) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      image: category.image,
      productCount: category.product_count,
    })) || []

    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error('Error in categories API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

