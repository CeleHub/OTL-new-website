'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rfqFormSchema, RFQFormInput } from '@/lib/validations'
import { Product } from '@/types'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

interface RFQFormProps {
  product: Product
}

export default function RFQForm({ product }: RFQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RFQFormInput>({
    resolver: zodResolver(rfqFormSchema),
    defaultValues: {
      productId: product.id,
      productName: product.name,
      quantity: 1,
    },
  })

  const onSubmit = async (data: RFQFormInput) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset({
          productId: product.id,
          productName: product.name,
          quantity: 1,
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('productId')} />
      <input type="hidden" {...register('productName')} />

      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-neutral-600">Requesting quote for:</p>
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-neutral-600">Part #: {product.partNumber}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Name *"
          {...register('name')}
          error={errors.name?.message}
          placeholder="John Doe"
        />
        <Input
          label="Phone *"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email *"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="john@example.com"
        />
        <Input
          label="Company (Optional)"
          {...register('company')}
          error={errors.company?.message}
          placeholder="ABC Auto Repair"
        />
      </div>

      <Input
        label="Quantity *"
        type="number"
        min="1"
        {...register('quantity', { valueAsNumber: true })}
        error={errors.quantity?.message}
      />

      <Textarea
        label="Additional Information (Optional)"
        {...register('message')}
        error={errors.message?.message}
        placeholder="Any specific requirements or questions..."
        rows={4}
      />

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Quote request sent successfully!</p>
          <p className="text-sm">We'll send you a detailed quote within 24 hours.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Failed to send quote request</p>
          <p className="text-sm">Please try again or call us directly.</p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Request Quote'}
      </Button>
    </form>
  )
}