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
    id: product.id,
    name: product.name,
    part_number: product.part_number,
    oem_number: product.oem_number,
    category_id: product.category_id,
    brand: product.brand,
    price: product.price,
    description: product.description,
    in_stock: product.in_stock,
    featured: product.featured,
    images: (product.product_images as any[])?.sort((a: any, b: any) => a.display_order - b.display_order) || [],
    specifications: (product.product_specifications as any[])?.sort((a: any, b: any) => a.display_order - b.display_order) || [],
    compatibility: (product.product_compatibility as any[]) || [],
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

