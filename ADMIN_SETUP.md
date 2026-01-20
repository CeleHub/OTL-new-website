# Admin Panel Setup Guide

## Overview
This guide will help you set up a database-backed admin panel for managing products and categories.

## Recommended Solution: Supabase

### Why Supabase?
- ✅ Built-in authentication (admin login)
- ✅ PostgreSQL database (powerful & flexible)
- ✅ Free tier (500MB database, 2GB bandwidth)
- ✅ Real-time capabilities
- ✅ Easy Next.js integration
- ✅ Row Level Security for admin-only access
- ✅ Built-in admin UI (optional, we'll build custom)

### Alternative: Neon DB + Custom Auth
If you prefer Neon DB:
- ✅ Serverless PostgreSQL
- ✅ Great for Vercel deployments
- ❌ Need to build auth from scratch
- ❌ More setup required

## Setup Steps

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up/login
3. Create new project
4. Note your project URL and anon key

### 2. Database Schema
Run the SQL migrations in `supabase/migrations/` to create:
- `categories` table
- `products` table
- `product_compatibility` table (for vehicle compatibility)
- `product_specifications` table (for key-value specs)
- `admins` table (for admin users)

### 3. Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Admin Access
- Admin login at `/admin/login`
- Protected routes with middleware
- Role-based access control

## Features

### Admin Dashboard (`/admin`)
- 📊 Overview statistics
- 📦 Product management (CRUD)
- 🗂️ Category management
- 🔍 Search & filter products
- 📸 Image upload
- 📈 Analytics (optional)

### Product Management
- Add/Edit/Delete products
- Update prices & availability
- Manage specifications
- Add vehicle compatibility
- Upload product images
- Mark as featured

### Category Management
- Add/Edit/Delete categories
- Update descriptions
- Manage category images

## Security
- Row Level Security (RLS) enabled
- Admin-only access to mutations
- Public read access for products
- Secure authentication with Supabase Auth

