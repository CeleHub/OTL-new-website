import CategoryForm from '@/components/admin/CategoryForm'

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Add New Category</h1>
        <p className="text-neutral-400">Create a new product category</p>
      </div>

      <CategoryForm />
    </div>
  )
}

