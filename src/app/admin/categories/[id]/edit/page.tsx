import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CategoryForm from '@/components/admin/CategoryForm'

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !category) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Edit Category</h1>
        <p className="text-neutral-400">Update category information</p>
      </div>

      <CategoryForm category={category} />
    </div>
  )
}

