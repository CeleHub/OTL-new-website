'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import ImageUpload from './ImageUpload'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  part_number: z.string().min(1, 'Part number is required'),
  oem_number: z.string().optional(),
  category_id: z.string().optional(),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().optional(),
  in_stock: z.boolean().default(true),
  featured: z.boolean().default(false),
  specifications: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ).optional(),
  compatibility: z.array(
    z.object({
      make: z.string(),
      model: z.string(),
      year_start: z.number(),
      year_end: z.number(),
      engine_type: z.string().optional(),
    })
  ).optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: any
  categories: Array<{ id: string; slug: string; name: string }>
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          part_number: product.part_number,
          oem_number: product.oem_number || '',
          category_id: product.category_id || '',
          brand: product.brand,
          price: Number(product.price),
          description: product.description || '',
          in_stock: product.in_stock,
          featured: product.featured,
          specifications: product.specifications?.map((s: any) => ({
            key: s.spec_key,
            value: s.spec_value,
          })) || [{ key: '', value: '' }],
          compatibility: product.compatibility || [],
        }
      : {
          in_stock: true,
          featured: false,
          specifications: [{ key: '', value: '' }],
          compatibility: [],
        },
  })

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: 'specifications',
  })

  const {
    fields: compatFields,
    append: appendCompat,
    remove: removeCompat,
  } = useFieldArray({
    control,
    name: 'compatibility',
  })

  const [productImages, setProductImages] = useState<string[]>(
    product?.images || []
  )

  const handleImageUpload = (url: string) => {
    setProductImages([...productImages, url])
  }

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const url = product
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save product')
      }

      const result = await response.json()
      const productId = result.product?.id || product?.id

      // Save product images if any
      if (productImages.length > 0 && productId) {
        const imageInserts = productImages.map((url, index) => ({
          product_id: productId,
          url,
          alt_text: data.name,
          display_order: index,
        }))

        const imageResponse = await fetch('/api/admin/products/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: imageInserts, productId }),
        })

        if (!imageResponse.ok) {
          console.error('Error saving images, but product was saved')
        }
      }

      router.push('/admin/products')
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
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product Name *"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Part Number *"
            {...register('part_number')}
            error={errors.part_number?.message}
          />

          <Input
            label="OEM Number"
            {...register('oem_number')}
            error={errors.oem_number?.message}
          />

          <div>
            <label className="block text-sm font-semibold text-neutral-200 mb-2">
              Category
            </label>
            <select
              {...register('category_id')}
              className="input w-full"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Brand *"
            {...register('brand')}
            error={errors.brand?.message}
          />

          <Input
            label="Price (NGN) *"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />
        </div>

        <Textarea
          label="Description"
          {...register('description')}
          error={errors.description?.message}
          rows={4}
        />

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('in_stock')}
              className="w-4 h-4 text-primary-500 rounded border-neutral-600 bg-neutral-900/40"
            />
            <span className="text-neutral-200">In Stock</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('featured')}
              className="w-4 h-4 text-primary-500 rounded border-neutral-600 bg-neutral-900/40"
            />
            <span className="text-neutral-200">Featured</span>
          </label>
        </div>
      </div>

      {/* Product Images */}
      <div className="glass-dark rounded-2xl border border-white/10 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Product Images</h2>
        
        <ImageUpload
          onUploadComplete={handleImageUpload}
          folder="products"
          label="Upload Product Image"
        />

        {productImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {productImages.map((url, index) => (
              <div key={index} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-white/10"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="glass-dark rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Specifications</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => appendSpec({ key: '', value: '' })}
          >
            + Add Spec
          </Button>
        </div>

        {specFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Spec key (e.g., Material)"
              {...register(`specifications.${index}.key`)}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Spec value"
                {...register(`specifications.${index}.value`)}
              />
              {specFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpec(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Compatibility */}
      <div className="glass-dark rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Vehicle Compatibility</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              appendCompat({
                make: '',
                model: '',
                year_start: new Date().getFullYear(),
                year_end: new Date().getFullYear(),
                engine_type: '',
              })
            }
          >
            + Add Vehicle
          </Button>
        </div>

        {compatFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-white/5 rounded-lg">
            <Input
              placeholder="Make"
              {...register(`compatibility.${index}.make`)}
            />
            <Input
              placeholder="Model"
              {...register(`compatibility.${index}.model`)}
            />
            <Input
              placeholder="Year Start"
              type="number"
              {...register(`compatibility.${index}.year_start`, { valueAsNumber: true })}
            />
            <Input
              placeholder="Year End"
              type="number"
              {...register(`compatibility.${index}.year_end`, { valueAsNumber: true })}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Engine (optional)"
                {...register(`compatibility.${index}.engine_type`)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCompat(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" loading={isSubmitting}>
          {product ? 'Update Product' : 'Create Product'}
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

