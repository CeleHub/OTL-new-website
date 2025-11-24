import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
  glow?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  startIcon,
  endIcon,
  loading = false,
  glow = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'btn relative overflow-hidden'
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'text-primary-400 hover:text-white bg-white/5 border border-primary-500/30 hover:border-primary-500/60',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3.5 text-lg',
    xl: 'px-10 py-4 text-xl',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        glow && 'shadow-neon-lg hover:shadow-glow-lg',
        'disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 bg-primary-500/10 animate-pulse rounded-xl" aria-hidden />
      )}
      <span className={cn('flex items-center justify-center gap-2 relative z-10', loading && 'opacity-70')}>
        {(startIcon || loading) && (
          <span className={cn('transition-transform', loading && 'animate-spin')}>
            {loading ? (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            ) : startIcon}
          </span>
        )}
        <span className="font-semibold tracking-tight">{children}</span>
        {endIcon && !loading && (
          <span className="transition-transform group-hover:translate-x-1">
            {endIcon}
          </span>
        )}
      </span>
    </button>
  )
}