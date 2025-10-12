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
      <Card hover className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-48 bg-neutral-100 flex items-center justify-center flex-shrink-0">
          <div className="text-6xl">🔧</div>
        </div>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-neutral-600">
                Part #: {product.partNumber} | Brand: {product.brand}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600">
                {formatCurrency(product.price)}
              </p>
              <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </p>
            </div>
          </div>
          <p className="text-neutral-700 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
              {product.category}
            </span>
            {product.compatibility.length > 0 && (
              <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                Fits {product.compatibility.length} vehicle(s)
              </span>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card hover>
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-neutral-100 flex items-center justify-center">
          <div className="text-6xl">🔧</div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-600 mb-2">
            {product.brand}
          </p>
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </p>
            <p className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          {product.featured && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded">
                FEATURED
              </span>
            </div>
          )}
        </div>
      </Link>
    </Card>
  )
}