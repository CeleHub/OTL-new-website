import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { formatCurrency } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'
import RFQForm from '@/components/forms/RFQForm'

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-bg opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />

      <div className="container py-10 space-y-10 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name, href: `/products/${product.id}` },
          ]}
        />

        <section className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-10">
          <div className="glass-dark rounded-3xl border border-white/10 p-6">
            <div className="aspect-square bg-gradient-to-br from-primary-900/40 via-neutral-900/60 to-neutral-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="text-[5rem] md:text-[8rem]">🔧</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-dark rounded-3xl border border-white/10 p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {product.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-accent-500 to-pink-500 text-white shadow-neon">
                    ⭐ Featured
                  </span>
                )}
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">Part #{product.partNumber}</span>
              </div>
              <h1 className="text-4xl font-bold text-white">{product.name}</h1>
              <p className="text-neutral-300">{product.description}</p>
              <div className="flex flex-wrap items-end gap-4">
                <p className="text-4xl font-bold gradient-text">{formatCurrency(product.price)}</p>
                <p className={`text-sm font-semibold flex items-center gap-2 ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-neutral-300">
                <div className="glass border border-white/5 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Brand</p>
                  <p className="text-white font-semibold">{product.brand}</p>
                </div>
                <div className="glass border border-white/5 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Category</p>
                  <Link href={`/categories/${product.category}`} className="text-primary-300 font-semibold hover:text-primary-200">
                    {product.category}
                  </Link>
                </div>
                {product.oemNumber && (
                  <div className="glass border border-white/5 rounded-2xl p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-neutral-500">OEM Number</p>
                    <p className="text-white font-semibold">{product.oemNumber}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#rfq" className="flex-1">
                  <Button size="lg" glow className="w-full">
                    Request Quote
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-dark rounded-3xl border border-white/10 p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Specifications</h2>
              <p className="text-neutral-400 text-sm">Engineering data to validate fitment.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 p-4 bg-white/5">
                <p className="text-xs uppercase tracking-wide text-neutral-500">{key}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-dark rounded-3xl border border-white/10 p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Vehicle Compatibility</h2>
              <p className="text-neutral-400 text-sm">Validated chassis and trims for this component.</p>
            </div>
            <p className="text-sm text-neutral-500">
              {product.compatibility.length} fitment {product.compatibility.length === 1 ? 'record' : 'records'}
            </p>
          </div>
          {product.compatibility.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="text-xs uppercase tracking-wide text-neutral-500">
                  <tr>
                    <th className="py-3 pr-4 font-normal">Make</th>
                    <th className="py-3 pr-4 font-normal">Model</th>
                    <th className="py-3 pr-4 font-normal">Years</th>
                    {product.compatibility.some((c) => c.engineType) && <th className="py-3 pr-4 font-normal">Engine</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {product.compatibility.map((compat, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4 text-white">{compat.make}</td>
                      <td className="py-3 pr-4">{compat.model}</td>
                      <td className="py-3 pr-4">
                        {compat.yearStart} - {compat.yearEnd}
                      </td>
                      {compat.engineType && <td className="py-3 pr-4">{compat.engineType}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-neutral-400">Please contact us for compatibility information.</p>
          )}
        </section>

        <section id="rfq" className="glass-dark rounded-3xl border border-white/10 p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Request a Quote</h2>
            <p className="text-neutral-400 text-sm">Share your quantity and destination for a tailored offer.</p>
          </div>
          <RFQForm product={product} />
        </section>
      </div>
    </div>
  )
}