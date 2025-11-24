import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'glass' | 'neon' | 'minimal'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  className,
  hover = false,
  variant = 'default',
  padding = 'none',
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'card',
    glass: 'glass border border-white/10 shadow-neon',
    neon: 'card border border-primary-500/30 shadow-neon-lg relative overflow-hidden group',
    minimal: 'rounded-2xl border border-white/5 bg-white/5',
  }

  const paddingStyles = {
    none: '',
    sm: 'p-4 md:p-5',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  }

  return (
    <div
      className={cn(
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-glow',
        className
      )}
      {...props}
    >
      {variant === 'neon' && (
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl bg-gradient-to-r from-primary-500/40 via-purple-500/40 to-pink-500/40" />
      )}
      {children}
    </div>
  )
}