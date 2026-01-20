import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Get product with all related data
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
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

  if (error || !product) {
    notFound()
  }

  // Get categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, slug, name')
    .order('name')

  // Transform product data for form
  const productData = {
    ...product,
    images: product.product_images?.sort((a: any, b: any) => a.display_order - b.display_order) || [],
    specifications: product.product_specifications?.sort((a: any, b: any) => a.display_order - b.display_order) || [],
    compatibility: product.product_compatibility || [],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Edit Product</h1>
        <p className="text-neutral-400">Update product information</p>
      </div>

      <ProductForm product={productData} categories={categories || []} />
    </div>
  )
}

