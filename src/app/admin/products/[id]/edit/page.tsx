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

  // Type assertion for product with relations
  const productWithRelations = product as any & {
    product_images?: Array<{
      id: string
      url: string
      alt_text: string | null
      display_order: number
    }>
    product_specifications?: Array<{
      id: string
      spec_key: string
      spec_value: string
      display_order: number
    }>
    product_compatibility?: Array<{
      id: string
      make: string
      model: string
      year_start: number
      year_end: number
      engine_type: string | null
    }>
  }

  // Transform product data for form
  const productData = {
    id: productWithRelations.id,
    name: productWithRelations.name,
    part_number: productWithRelations.part_number,
    oem_number: productWithRelations.oem_number,
    category_id: productWithRelations.category_id,
    brand: productWithRelations.brand,
    price: productWithRelations.price,
    description: productWithRelations.description,
    in_stock: productWithRelations.in_stock,
    featured: productWithRelations.featured,
    images: productWithRelations.product_images?.sort((a: any, b: any) => a.display_order - b.display_order) || [],
    specifications: productWithRelations.product_specifications?.sort((a: any, b: any) => a.display_order - b.display_order) || [],
    compatibility: productWithRelations.product_compatibility || [],
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

