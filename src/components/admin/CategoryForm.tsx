'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { slugify } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image: z.string().optional(),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: any
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          image: category.image || '',
        }
      : {
          name: '',
          slug: '',
          description: '',
          image: '',
        },
  })

  // Auto-generate slug from name
  const name = watch('name')
  if (name && !category) {
    const autoSlug = slugify(name)
    if (autoSlug !== watch('slug')) {
      setValue('slug', autoSlug)
    }
  }

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const url = category
        ? `/api/admin/categories/${category.id}`
        : '/api/admin/categories'
      const method = category ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save category')
      }

      router.push('/admin/categories')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="glass-dark rounded-2xl border border-white/10 p-6 space-y-6">
        <Input
          label="Category Name *"
          {...register('name')}
          error={errors.name?.message}
          placeholder="e.g., Brake Systems"
        />

        <Input
          label="Slug *"
          {...register('slug')}
          error={errors.slug?.message}
          placeholder="e.g., brake-systems"
          helperText="URL-friendly identifier (auto-generated from name)"
        />

        <Textarea
          label="Description"
          {...register('description')}
          error={errors.description?.message}
          rows={4}
          placeholder="Describe this category..."
        />

        <Input
          label="Image URL"
          {...register('image')}
          error={errors.image?.message}
          placeholder="https://example.com/image.jpg"
          helperText="URL to category image (optional)"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" loading={isSubmitting}>
          {category ? 'Update Category' : 'Create Category'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

