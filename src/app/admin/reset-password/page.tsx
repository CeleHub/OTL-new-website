'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Check if we have the necessary tokens in the URL
    const checkSession = async () => {
      try {
        // Check if there's a valid session from the password reset callback
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          setError('Invalid or expired reset link. Please request a new password reset.')
          setValidating(false)
          return
        }

        setValidating(false)
      } catch (err) {
        setError('Failed to validate reset link. Please request a new password reset.')
        setValidating(false)
      }
    }

    checkSession()
  }, [supabase])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validate passwords
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setSuccess(true)
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/admin/login')
        router.refresh()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
        <div className="glass-dark rounded-3xl border border-primary-500/30 p-8 md:p-12 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-neutral-400">Validating reset link...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
      <div className="glass-dark rounded-3xl border border-primary-500/30 p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Set New Password</h1>
          <p className="text-neutral-400">Enter your new password below</p>
        </div>

        {error && !success && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
            {error.includes('Invalid') && (
              <div className="mt-3">
                <Link
                  href="/admin/forgot-password"
                  className="underline hover:text-red-300"
                >
                  Request a new password reset link
                </Link>
              </div>
            )}
          </div>
        )}

        {success ? (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm">
              <p className="font-semibold mb-1">Password reset successful!</p>
              <p>Redirecting you to the login page...</p>
            </div>
            <Link href="/admin/login">
              <Button variant="outline" size="lg" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              required
              autoFocus
              minLength={6}
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
            />

            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Reset Password
            </Button>

            <div className="text-center">
              <Link
                href="/admin/login"
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
          <div className="glass-dark rounded-3xl border border-primary-500/30 p-8 md:p-12 w-full max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}

