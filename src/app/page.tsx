import Link from 'next/link'
import { products, categories } from '@/lib/data/products'
import ProductCard from '@/components/products/ProductCard'
import CategoryCard from '@/components/products/CategoryCard'
import Button from '@/components/ui/Button'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6)

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-purple-900/80 to-neutral-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMCA0djJoLTJ2LTJoMnptLTQtNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 glass border border-primary-500/30 rounded-full">
              <span className="text-primary-300 text-sm font-semibold">🚀 Next-Gen Automotive Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block gradient-text mb-2">Quality Automotive Parts</span>
              <span className="block text-white">For Every Vehicle</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Discover premium OEM and aftermarket parts with <span className="text-primary-400 font-semibold">expert support</span>, competitive pricing, and <span className="text-primary-400 font-semibold">lightning-fast shipping</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/products">
                <Button size="lg" className="group">
                  <span className="flex items-center gap-2">
                    Browse All Parts
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="group">
                  <span className="flex items-center gap-2">
                    Request a Quote
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 glass rounded-full float-animation hidden lg:block"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 glass rounded-full float-animation hidden lg:block" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Why Choose Us</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Experience the future of automotive parts shopping</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: 'Quality Guaranteed',
                description: 'All parts come with manufacturer warranties and quality guarantees',
                delay: '0s',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Fast Shipping',
                description: 'Most orders ship same day with tracking included',
                delay: '0.1s',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Expert Support',
                description: 'Our team helps you find the right parts for your vehicle',
                delay: '0.2s',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-dark p-8 rounded-2xl group hover:border-primary-500/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">{feature.title}</h3>
                <p className="text-neutral-400 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Shop by Category</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Browse our extensive selection of automotive parts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 animate-fade-in-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Products</h2>
              <p className="text-xl text-neutral-400">Top-rated parts for your vehicle</p>
            </div>
            <Link href="/products" className="mt-4 md:mt-0">
              <Button variant="outline" className="group">
                <span className="flex items-center gap-2">
                  View All Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-purple-900/80 to-neutral-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMCA0djJoLTJ2LTJoMnptLTQtNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative z-10 text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-10 text-neutral-300 max-w-2xl mx-auto">
            Our team is ready to help you find the perfect part for your vehicle
          </p>
          <Link href="/contact">
            <Button size="lg" className="group">
              <span className="flex items-center gap-2">
                Contact Us Today
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton 
          message="Hello! I'm interested in your automotive parts. Can you help me find what I need?"
          variant="icon"
          className="shadow-lg hover:shadow-xl"
        />
      </div>
    </div>
  )
}