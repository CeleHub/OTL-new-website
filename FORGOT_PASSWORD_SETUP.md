# Forgot Password Feature Setup

## ✅ Feature Overview

The forgot password feature has been successfully implemented! Admin users can now:
1. Click "Forgot your password?" on the login page
2. Enter their email to receive a password reset link
3. Click the link in their email to reset their password
4. Set a new password and login

## 🔧 Supabase Configuration Required

### Step 1: Configure Redirect URL in Supabase

For the password reset to work, you need to add the redirect URL in Supabase:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** > **URL Configuration**
4. Under **Redirect URLs**, add:
   - **Local Development**: `http://localhost:3000/admin/reset-password`
   - **Production**: `https://otl-new-website.vercel.app/admin/reset-password`
   - Or use: `https://YOUR_DOMAIN/admin/reset-password`
5. Click **Save**

### Step 2: Configure Email Templates (Optional)

Customize the password reset email:

1. Go to **Authentication** > **Email Templates**
2. Select **Reset Password** template
3. Customize the email subject and body
4. The reset link will be automatically included as: `{{ .ConfirmationURL }}`

**Default Email Template Variables:**
- `{{ .ConfirmationURL }}` - The password reset link
- `{{ .Token }}` - The reset token (if needed)
- `{{ .TokenHash }}` - The token hash

### Step 3: Configure Site URL (Optional but Recommended)

1. Go to **Authentication** > **URL Configuration**
2. Set **Site URL** to your production domain:
   - `https://otl-new-website.vercel.app`
   - Or your actual domain

This ensures emails always redirect to the correct domain.

## 📧 Email Provider Configuration

If you're using a custom email provider (Resend, SendGrid, etc.):

1. Go to **Authentication** > **Providers**
2. Scroll to **Email** settings
3. Configure your SMTP settings or use Supabase's built-in email

**Note**: Supabase provides free email sending, but for production, consider using a dedicated email service.

## 🧪 Testing the Feature

### Test Locally:

1. Start your dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Click "Forgot your password?"
4. Enter an admin email address
5. Check your email for the reset link
6. Click the link and set a new password

### Test in Production:

1. Deploy to Vercel
2. Navigate to: `https://otl-new-website.vercel.app/admin/login`
3. Follow the same steps as local testing

## 🔐 Security Features

The implementation includes:

- ✅ **Email Verification**: Only verified email addresses can reset passwords
- ✅ **Secure Token Handling**: Supabase handles token generation and validation
- ✅ **Session Validation**: Reset password page validates the session before allowing password change
- ✅ **Password Strength**: Minimum 6 characters required
- ✅ **Password Confirmation**: Users must confirm their new password
- ✅ **Error Handling**: Clear error messages for invalid/expired links

## 📁 Files Created/Modified

### New Files:
- `src/app/admin/forgot-password/page.tsx` - Forgot password form
- `src/app/admin/reset-password/page.tsx` - Password reset form

### Modified Files:
- `src/app/admin/login/page.tsx` - Added "Forgot password?" link
- `src/middleware.ts` - Updated to allow public access to forgot/reset password pages

## 🚀 How It Works

1. **User clicks "Forgot password?"** → Redirected to `/admin/forgot-password`
2. **User enters email** → `supabase.auth.resetPasswordForEmail()` sends reset email
3. **User clicks email link** → Redirected to `/admin/reset-password` with token
4. **Supabase validates token** → Creates a session automatically
5. **User enters new password** → `supabase.auth.updateUser()` updates password
6. **Redirect to login** → User can now login with new password

## ⚠️ Troubleshooting

### "Password reset email not received"
- Check spam folder
- Verify email address is correct
- Check Supabase logs: **Authentication** > **Logs**
- Verify email provider is configured correctly

### "Invalid or expired reset link"
- Reset links expire after 1 hour (default Supabase setting)
- Request a new password reset
- Make sure redirect URL is configured in Supabase

### "Reset link doesn't work"
- Verify redirect URL is added in Supabase settings
- Check that the URL matches exactly (including protocol and path)
- Clear browser cache and cookies
- Try in incognito/private mode

### "Can't access reset password page"
- Check middleware configuration
- Verify the route is public (no authentication required)
- Check browser console for errors

## 📝 Environment Variables

Make sure these are set in Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Optional (for custom site URL):
```
NEXT_PUBLIC_SITE_URL=https://otl-new-website.vercel.app
```

## ✅ Checklist

- [x] Forgot password page created
- [x] Reset password page created
- [x] Login page updated with link
- [x] Middleware updated to allow public access
- [ ] Redirect URL added in Supabase (YOU NEED TO DO THIS)
- [ ] Email provider configured (optional)
- [ ] Tested locally
- [ ] Tested in production

## 🎉 Ready to Use!

Once you've added the redirect URL in Supabase, the forgot password feature is fully functional!

