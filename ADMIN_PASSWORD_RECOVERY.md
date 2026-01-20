# Admin Password Recovery Guide

## Option 1: Reset Password via Supabase Dashboard (Recommended)

### Steps:
1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Authentication** > **Users** in the sidebar
3. Find your admin user (by email)
4. Click on the user's email or the **three dots** menu
5. Select **Reset Password** or **Send Password Reset Email**
6. Check your email for the password reset link
7. Click the link and set a new password

## Option 2: Manually Update Password in Supabase

### Steps:
1. Go to **Authentication** > **Users** in Supabase dashboard
2. Find your admin user
3. Click on the user to open details
4. Click **Reset Password** button
5. A new password will be generated (copy it!)
6. Or use the **Send Password Reset Email** option

## Option 3: Create a New Admin User

If you can't recover the existing account:

### Steps:
1. Go to **Authentication** > **Users** in Supabase dashboard
2. Click **Add User** > **Create new user**
3. Enter:
   - **Email**: Your admin email (e.g., `admin@otlmotorparts.com`)
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✅ Check this (so you can login immediately)
4. Click **Create user**
5. Now you can login at `/admin/login` with these credentials

## Option 4: Check Existing Users

To see all existing admin users:

1. Go to **Authentication** > **Users**
2. You'll see a list of all users
3. Note the email addresses
4. If you see your email, you can reset the password (Option 1)

## Option 5: Use Supabase SQL Editor (Advanced)

If you have database access, you can check users directly:

```sql
-- View all users
SELECT id, email, created_at, last_sign_in_at 
FROM auth.users;

-- To reset a user's password (requires Supabase admin access)
-- This is usually done through the dashboard, not SQL
```

## Troubleshooting

### "User not found"
- The user might not exist yet
- Create a new admin user (Option 3)

### "Can't access Supabase dashboard"
- Make sure you're logged into the correct Supabase account
- Check that you have access to the project

### "Password reset email not received"
- Check spam folder
- Verify email address is correct
- Try resending from Supabase dashboard

### "Still can't login after reset"
- Clear browser cookies for localhost
- Try incognito/private browsing mode
- Make sure you're using the correct email (case-sensitive)

## Quick Reference

**Login URL**: `http://localhost:3000/admin/login` (or your deployed URL)

**Supabase Dashboard**: https://supabase.com/dashboard

**Authentication Section**: Dashboard > Authentication > Users

## Security Note

- Never share your admin credentials
- Use strong passwords (12+ characters, mix of letters, numbers, symbols)
- Consider enabling 2FA in Supabase for extra security

