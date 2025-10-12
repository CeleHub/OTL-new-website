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
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name, href: `/products/${product.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
              <div className="text-9xl">🔧</div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              {product.featured && (
                <span className="inline-block px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded mb-4">
                  FEATURED
                </span>
              )}
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-4xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </p>
                <p className={`text-lg font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
              </div>

              <div className="border-t border-b py-4 mb-6 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Part Number:</span> {product.partNumber}
                </p>
                {product.oemNumber && (
                  <p className="text-sm">
                    <span className="font-medium">OEM Number:</span> {product.oemNumber}
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Category:</span>{' '}
                  <Link href={`/categories/${product.category}`} className="link">
                    {product.category}
                  </Link>
                </p>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-neutral-700">{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#rfq" className="flex-1">
                  <Button size="lg" className="w-full">Request Quote</Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b pb-3">
                <span className="font-medium w-1/2">{key}:</span>
                <span className="text-neutral-700 w-1/2">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Compatibility */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Vehicle Compatibility</h2>
          {product.compatibility.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Make</th>
                    <th className="px-4 py-3 text-left font-medium">Model</th>
                    <th className="px-4 py-3 text-left font-medium">Years</th>
                    {product.compatibility.some(c => c.engineType) && (
                      <th className="px-4 py-3 text-left font-medium">Engine</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {product.compatibility.map((compat, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">{compat.make}</td>
                      <td className="px-4 py-3">{compat.model}</td>
                      <td className="px-4 py-3">
                        {compat.yearStart} - {compat.yearEnd}
                      </td>
                      {compat.engineType && (
                        <td className="px-4 py-3">{compat.engineType}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-neutral-600">
              Please contact us for compatibility information.
            </p>
          )}
        </div>

        {/* RFQ Form */}
        <div id="rfq" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Request a Quote</h2>
          <RFQForm product={product} />
        </div>
      </div>
    </div>
  )
}