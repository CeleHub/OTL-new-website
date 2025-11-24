import Link from 'next/link'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import Card from '@/components/ui/Card'

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  if (view === 'list') {
    return (
      <Card hover className="flex flex-col sm:flex-row group">
        <div className="sm:w-48 h-48 bg-gradient-to-br from-primary-900/50 to-purple-900/50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-primary-500/20 transition-all duration-300"></div>
          <div className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">🔧</div>
          <div className="absolute inset-0 shimmer"></div>
        </div>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-white hover:text-primary-400 transition-colors mb-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-neutral-400">
                Part #: {product.partNumber} | Brand: <span className="text-primary-400">{product.brand}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gradient-text">
                {formatCurrency(product.price)}
              </p>
              <p className={`text-sm font-medium flex items-center gap-1 ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
          <p className="text-neutral-300 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30">
              {product.category}
            </span>
            {product.compatibility.length > 0 && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                Fits {product.compatibility.length} vehicle(s)
              </span>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card hover className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-primary-900/50 via-purple-900/50 to-neutral-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/20 group-hover:via-purple-500/20 group-hover:to-primary-500/20 transition-all duration-500"></div>
          <div className="text-6xl relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🔧</div>
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {product.featured && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-accent-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg shadow-accent-500/50 animate-pulse-slow">
                ⭐ FEATURED
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-primary-400 mb-2 font-medium">
            {product.brand}
          </p>
          <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold gradient-text">
              {formatCurrency(product.price)}
            </p>
            <p className={`text-sm font-medium flex items-center gap-1.5 ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  )
}