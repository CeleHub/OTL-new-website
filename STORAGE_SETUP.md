# Supabase Storage Setup for Image Uploads

## Quick Setup

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the sidebar
3. Click **New bucket**
4. Configure:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Yes (check this)
   - Click **Create bucket**

5. Go to **Storage** > **Policies** > `product-images`
6. Add these policies:

   **Policy 1: Public Read Access**
   - Policy name: `Public can view product images`
   - Allowed operation: `SELECT`
   - Policy definition:
     ```sql
     bucket_id = 'product-images'
     ```

   **Policy 2: Authenticated Upload**
   - Policy name: `Admins can upload product images`
   - Allowed operation: `INSERT`
   - Policy definition:
     ```sql
     bucket_id = 'product-images' AND auth.role() = 'authenticated'
     ```

   **Policy 3: Authenticated Update**
   - Policy name: `Admins can update product images`
   - Allowed operation: `UPDATE`
   - Policy definition:
     ```sql
     bucket_id = 'product-images' AND auth.role() = 'authenticated'
     ```

   **Policy 4: Authenticated Delete**
   - Policy name: `Admins can delete product images`
   - Allowed operation: `DELETE`
   - Policy definition:
     ```sql
     bucket_id = 'product-images' AND auth.role() = 'authenticated'
     ```

### Option 2: Using SQL (Alternative)

1. Go to **SQL Editor** in Supabase dashboard
2. Copy and paste the contents of `supabase/storage-setup.sql`
3. Click **Run**

## Verify Setup

After setup, you should be able to:
- ✅ Upload images in the admin panel
- ✅ View uploaded images on product pages
- ✅ Delete images (as admin)

## File Size Limits

- Maximum file size: **5MB** (configured in the upload component)
- Supported formats: JPG, PNG, WebP, GIF

## Troubleshooting

### "Bucket not found" error
- Make sure the bucket name is exactly `product-images`
- Check that the bucket is marked as public

### "Permission denied" error
- Verify storage policies are set up correctly
- Make sure you're logged in as an admin

### Images not displaying
- Check that the bucket is public
- Verify the image URLs are correct
- Check browser console for CORS errors

## Next Steps

Once storage is set up:
1. Go to `/admin/products/new` or edit an existing product
2. Click "Choose Image" to upload
3. Images will be automatically saved and linked to the product

