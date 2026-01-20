import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Check if Supabase environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // If env vars are missing, allow all requests (for graceful degradation)
      console.warn('Supabase environment variables not set in middleware')
      return NextResponse.next()
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
          if (user) {
            return NextResponse.redirect(new URL('/admin', request.url))
          }
          return response
        }

        // Redirect to login if not authenticated
        if (!user) {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }
      } catch (authError) {
        // If auth check fails, redirect to login for safety
        console.error('Auth check failed in middleware:', authError)
        if (request.nextUrl.pathname !== '/admin/login') {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }
        return response
      }
    }

    return response
  } catch (error) {
    // If middleware fails completely, log and allow request through
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

