'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  folder?: string
  label?: string
}

export default function ImageUpload({
  onUploadComplete,
  folder = 'products',
  label = 'Upload Image',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload image')
      }

      const { url } = await response.json()
      onUploadComplete(url)
      setPreview(null)
    } catch (err: any) {
      console.error('Error uploading image:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-neutral-200 mb-2">
        {label}
      </label>

      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <Button
            type="button"
            variant="outline"
            size="md"
            disabled={uploading}
            as="span"
          >
            {uploading ? 'Uploading...' : 'Choose Image'}
          </Button>
        </label>

        {preview && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <p className="text-xs text-neutral-500">
        Supported formats: JPG, PNG, WebP. Max size: 5MB
      </p>
    </div>
  )
}

