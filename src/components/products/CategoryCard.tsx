import Link from 'next/link'
import { Category } from '@/types'
import Card from '@/components/ui/Card'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card hover className="h-full">
        <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <div className="text-6xl">📦</div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-neutral-600 mb-3">{category.description}</p>
          <p className="text-sm text-primary-600 font-medium">
            {category.productCount} products →
          </p>
        </div>
      </Card>
    </Link>
  )
}