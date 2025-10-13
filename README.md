# OTL Motor Parts - Automotive Parts Catalog

A modern, responsive automotive parts catalog website built with Next.js, React, and TypeScript.

## Features

- 🔍 Advanced search and filtering system
- 🚗 Vehicle-specific part compatibility
- 📱 Mobile-first responsive design
- 📧 Contact forms and RFQ (Request for Quote)
- ⚡ Optimized performance with Next.js
- 🎨 Clean, professional automotive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Email**: Nodemailer

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/src
  /app              # Next.js app router pages
  /components       # React components
    /ui             # Reusable UI components
    /layout         # Layout components (Header, Footer)
    /products       # Product-specific components
    /forms          # Form components
  /lib              # Utilities and data
    /data           # Product data
    /utils          # Helper functions
    /validations    # Zod schemas
  /types            # TypeScript types
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=okonzcelestine1@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_EMAIL=okonzcelestine1@gmail.com
SMTP_FROM=okonzcelestine1@gmail.com
```

### Email Setup Instructions

**For Gmail (Recommended):**

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Copy the 16-character password
3. **Update `.env.local`:**
   - Replace `your_app_password_here` with the generated app password
   - Keep `SMTP_USER` as `okonzcelestine1@gmail.com`

**For Other Email Providers:**
- Update `SMTP_HOST` and `SMTP_PORT` accordingly
- Use your email provider's SMTP credentials

**Testing Email:**
- Start the development server: `npm run dev`
- Submit a contact form or RFQ form
- Check your email inbox for notifications

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

## License

Private - All rights reserved