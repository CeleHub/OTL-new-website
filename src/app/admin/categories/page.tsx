import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Categories</h1>
          <p className="text-neutral-400">Manage product categories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button size="lg" glow>
            + Add Category
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="glass-dark rounded-2xl border border-red-500/30 p-6">
          <p className="text-red-400">Error loading categories: {error.message}</p>
        </div>
      ) : categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="glass-dark rounded-2xl border border-white/10 p-6 hover:border-primary-500/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{category.slug}</p>
                </div>
              </div>

              {category.description && (
                <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">
                  {category.product_count} product{category.product_count !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/categories/${category.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/categories/${category.slug}`} target="_blank">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-dark rounded-2xl border border-white/10 p-12 text-center">
          <p className="text-neutral-400 mb-4">No categories found</p>
          <Link href="/admin/categories/new">
            <Button>Add Your First Category</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

