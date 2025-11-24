import Link from 'next/link'
import { Category } from '@/types'
import Card from '@/components/ui/Card'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card hover className="h-full group relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-primary-400/30 group-hover:via-purple-400/30 group-hover:to-pink-400/30 transition-all duration-500"></div>
          <div className="text-6xl relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">📦</div>
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 right-4 z-20">
            <div className="w-3 h-3 bg-white/30 rounded-full group-hover:bg-white/60 transition-all duration-300 group-hover:scale-150"></div>
          </div>
        </div>
        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {category.name}
          </h3>
          <p className="text-neutral-400 mb-4 leading-relaxed">{category.description}</p>
          <div className="flex items-center gap-2 text-primary-400 font-semibold group-hover:text-primary-300 transition-colors">
            <span>{category.productCount} products</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </Link>
  )
}