# Quick Start: Admin Panel Setup

## 🎯 Goal
Set up an admin panel at `/admin` to manage products without code changes.

## ✅ Recommendation: Use Supabase

**Why?** Built-in auth, faster setup, free tier, perfect for your needs.

## 📋 Step-by-Step Setup

### 1. Create Supabase Account (5 min)
1. Go to https://supabase.com
2. Sign up (free)
3. Click "New Project"
4. Fill in:
   - Name: `otl-website`
   - Database Password: (save this!)
   - Region: Choose closest to you
5. Wait 2 minutes for setup

### 2. Get Your Keys (2 min)
1. In Supabase dashboard, go to **Settings** > **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 3. Set Environment Variables (2 min)
1. Copy `.env.example` to `.env.local`
2. Paste your Supabase keys:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 4. Run Database Migration (5 min)
1. In Supabase dashboard, go to **SQL Editor**
2. Open `supabase/migrations/001_initial_schema.sql`
3. Copy all SQL code
4. Paste into SQL Editor
5. Click **Run**

### 5. Create Admin User (2 min)
1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Enter:
   - Email: `admin@otlmotorparts.com` (or your email)
   - Password: (choose a strong password)
4. Click **Create user**

### 6. Test Login (2 min)
1. Start dev server: `npm run dev`
2. Go to http://localhost:3000/admin/login
3. Login with your admin credentials
4. You should see the dashboard!

### 7. Migrate Existing Products (5 min)
1. Install tsx: `npm install -D tsx`
2. Run migration: `npx tsx scripts/migrate-products.ts`
3. Check Supabase dashboard > **Table Editor** > **products** to verify

## 🎉 You're Done!

Now you can:
- ✅ Access admin at `/admin`
- ✅ Manage products (after building the UI)
- ✅ Update prices, availability, etc.
- ✅ Add/remove categories

## 🚧 Next Steps (To Build)

The foundation is ready! You still need to build:
1. Product management UI (`/admin/products`)
2. Category management UI (`/admin/categories`)
3. Update frontend to fetch from database

**Want me to build these?** Just ask!

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists
- Restart dev server after adding variables

### "Cannot connect to Supabase"
- Check your project URL is correct
- Verify internet connection
- Check Supabase project is active

### "Unauthorized" errors
- Make sure you created an admin user
- Check email/password are correct
- Verify RLS policies are set up

### Migration script fails
- Check environment variables are set
- Verify database tables exist
- Check Supabase project is active

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Admin Setup Guide](./ADMIN_SETUP.md)

