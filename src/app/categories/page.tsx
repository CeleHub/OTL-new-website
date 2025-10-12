import { categories } from '@/lib/data/products'
import CategoryCard from '@/components/products/CategoryCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function CategoriesPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: 'Categories', href: '/categories' }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Categories</h1>
          <p className="text-neutral-600">
            Browse our complete range of automotive parts by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}