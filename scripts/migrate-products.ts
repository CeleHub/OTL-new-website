/**
 * Migration script to move products from static data to Supabase
 * 
 * Usage:
 * 1. Set up Supabase project
 * 2. Add environment variables
 * 3. Run: npx tsx scripts/migrate-products.ts
 */

import { createClient } from '@supabase/supabase-js'
import { products, categories } from '../src/lib/data/products'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrateCategories() {
  console.log('📦 Migrating categories...')
  
  for (const category of categories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({
        slug: category.slug,
        name: category.name,
        description: category.description,
        image: category.image,
        product_count: category.productCount,
      }, {
        onConflict: 'slug',
      })
      .select()
      .single()

    if (error) {
      console.error(`❌ Error migrating category ${category.name}:`, error)
    } else {
      console.log(`✅ Migrated category: ${category.name}`)
    }
  }
}

async function migrateProducts() {
  console.log('🔧 Migrating products...')
  
  // First, get category IDs
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id, slug')

  const categoryMap = new Map(
    categoryData?.map(cat => [cat.slug, cat.id]) || []
  )

  for (const product of products) {
    // Get category ID
    const categoryId = categoryMap.get(product.category)

    // Insert product
    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert({
        name: product.name,
        part_number: product.partNumber,
        oem_number: product.oemNumber || null,
        category_id: categoryId || null,
        brand: product.brand,
        price: product.price,
        description: product.description,
        in_stock: product.inStock,
        featured: product.featured || false,
      })
      .select()
      .single()

    if (productError) {
      console.error(`❌ Error migrating product ${product.name}:`, productError)
      continue
    }

    console.log(`✅ Migrated product: ${product.name}`)

    const productId = productData.id

    // Insert product images
    if (product.images && product.images.length > 0) {
      const imageInserts = product.images.map((url, index) => ({
        product_id: productId,
        url,
        alt_text: product.name,
        display_order: index,
      }))

      const { error: imageError } = await supabase
        .from('product_images')
        .insert(imageInserts)

      if (imageError) {
        console.error(`⚠️ Error migrating images for ${product.name}:`, imageError)
      }
    }

    // Insert specifications
    if (product.specifications) {
      const specInserts = Object.entries(product.specifications).map(
        ([key, value], index) => ({
          product_id: productId,
          spec_key: key,
          spec_value: value,
          display_order: index,
        })
      )

      const { error: specError } = await supabase
        .from('product_specifications')
        .insert(specInserts)

      if (specError) {
        console.error(`⚠️ Error migrating specs for ${product.name}:`, specError)
      }
    }

    // Insert compatibility
    if (product.compatibility && product.compatibility.length > 0) {
      const compatInserts = product.compatibility.map(compat => ({
        product_id: productId,
        make: compat.make,
        model: compat.model,
        year_start: compat.yearStart,
        year_end: compat.yearEnd,
        engine_type: compat.engineType || null,
      }))

      const { error: compatError } = await supabase
        .from('product_compatibility')
        .insert(compatInserts)

      if (compatError) {
        console.error(`⚠️ Error migrating compatibility for ${product.name}:`, compatError)
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting migration...\n')

  try {
    await migrateCategories()
    console.log('')
    await migrateProducts()
    console.log('\n✅ Migration complete!')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()

