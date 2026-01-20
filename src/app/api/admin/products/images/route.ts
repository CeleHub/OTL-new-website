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
    const { images, productId } = body

    if (!images || !Array.isArray(images) || !productId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Delete existing images for this product
    await supabase
      .from('product_images')
      .delete()
      .eq('product_id', productId)

    // Insert new images
    // Type assertion needed due to Supabase type inference limitations
    const { error } = await (supabase
      .from('product_images') as any)
      .insert(images)

    if (error) {
      console.error('Error saving images:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in images API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

