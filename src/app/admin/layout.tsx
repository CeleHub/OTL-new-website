import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { redirect } from 'next/navigation'

// This layout applies to all /admin routes
// The middleware handles authentication and redirects
// If we reach here without a user, we're on the login page (which doesn't need the admin UI)
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, we're on login page - render without admin UI
  if (!user) {
    return <>{children}</>
  }

  // User is authenticated - show admin UI with header

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
      {/* Admin Header */}
      <header className="border-b border-primary-500/20 bg-neutral-900/80 backdrop-blur-xl">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold gradient-text">
                Admin Dashboard
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/admin"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Overview
                </Link>
                <Link
                  href="/admin/products"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/admin/categories"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                View Site
              </Link>
              <form action={handleSignOut}>
                <Button type="submit" variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  )
}

