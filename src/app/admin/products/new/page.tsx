import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const supabase = await createClient()

  // Get categories for dropdown
  const { data: categories } = await supabase
    .from('categories')
    .select('id, slug, name')
    .order('name')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Add New Product</h1>
        <p className="text-neutral-400">Create a new product in your catalog</p>
      </div>

      <ProductForm categories={categories || []} />
    </div>
  )
}

