import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, startIcon, endIcon, hint, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-neutral-200 tracking-wide">
              {label}
            </label>
            {hint && <span className="text-xs text-neutral-500">{hint}</span>}
          </div>
        )}
        <div className="relative group">
          {startIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 group-focus-within:text-primary-400 transition-colors">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'input',
              startIcon ? "pl-10" : undefined,
              endIcon ? "pr-10" : undefined,
              error ? "border-red-500 focus:ring-red-500" : undefined,
              className
            )}
            {...props}
          />
          {endIcon && (
            <span className="absolute inset-y-0 right-3 flex items-center text-neutral-500 group-hover:text-primary-400 transition-colors">
              {endIcon}
            </span>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs text-neutral-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input