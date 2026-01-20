import { getCategories } from '@/lib/data/database'
import CategoryCard from '@/components/products/CategoryCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default async function CategoriesPage() {
  const categories = await getCategories()
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs items={[{ label: 'Categories', href: '/categories' }]} />

        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-200 text-sm font-semibold">
            🗂️ Catalog Matrix
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Product Categories</h1>
          <p className="text-neutral-400">
            Navigate the entire automotive stack—from bushings to electrical systems—through curated clusters.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}