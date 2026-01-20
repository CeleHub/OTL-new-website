import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get statistics
  const [productsResult, categoriesResult] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('categories').select('id', { count: 'exact', head: true }),
  ])

  const productCount = productsResult.count || 0
  const categoryCount = categoriesResult.count || 0

  // Get recent products
  const { data: recentProducts } = await supabase
    .from('products')
    .select('id, name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400">Welcome to the admin panel</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-dark rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total Products</h3>
            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold gradient-text">{productCount}</p>
          <Link href="/admin/products">
            <Button variant="ghost" size="sm" className="mt-4">
              Manage Products →
            </Button>
          </Link>
        </div>

        <div className="glass-dark rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold gradient-text">{categoryCount}</p>
          <Link href="/admin/categories">
            <Button variant="ghost" size="sm" className="mt-4">
              Manage Categories →
            </Button>
          </Link>
        </div>

        <div className="glass-dark rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <Link href="/admin/products/new">
              <Button variant="outline" size="sm" className="w-full">
                Add Product
              </Button>
            </Link>
            <Link href="/admin/categories/new">
              <Button variant="outline" size="sm" className="w-full">
                Add Category
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      {recentProducts && recentProducts.length > 0 && (
        <div className="glass-dark rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Products</h2>
          <div className="space-y-2">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="text-white">{product.name}</p>
                <p className="text-sm text-neutral-400">
                  {new Date(product.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

