import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        slug,
        name
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Products</h1>
          <p className="text-neutral-400">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button size="lg" glow>
            + Add Product
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="glass-dark rounded-2xl border border-red-500/30 p-6">
          <p className="text-red-400">Error loading products: {error.message}</p>
        </div>
      ) : products && products.length > 0 ? (
        <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Part Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Brand</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.featured && (
                          <span className="text-xs bg-accent-500/20 text-accent-300 px-2 py-1 rounded">
                            ⭐
                          </span>
                        )}
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-300 text-sm">{product.part_number}</td>
                    <td className="px-6 py-4 text-neutral-300 text-sm">
                      {product.categories?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-neutral-300 text-sm">{product.brand}</td>
                    <td className="px-6 py-4 text-white font-semibold">
                      {formatCurrency(Number(product.price))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          product.in_stock
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.in_stock ? 'bg-green-400' : 'bg-red-400'
                          }`}
                        />
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/products/${product.id}`} target="_blank">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-dark rounded-2xl border border-white/10 p-12 text-center">
          <p className="text-neutral-400 mb-4">No products found</p>
          <Link href="/admin/products/new">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

