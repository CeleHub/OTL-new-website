# OBIJONS TRADE LINK LIMITED - Automotive Parts Catalog

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

Create a `.env.local` file in the root directory and configure your Resend credentials:

```bash
# Contact email notifications
RESEND_API_KEY=your_resend_api_key
RESEND_FROM="OBIJONS TRADE LINK LIMITED <notifications@yourdomain.com>"
CONTACT_EMAIL=you@yourdomain.com
```

### Email Setup (Resend)

1. [Create a Resend account](https://resend.com) and add/verify a sending domain.
2. Generate an API key and assign it to `RESEND_API_KEY`.
3. Set `RESEND_FROM` to the verified sender (e.g. `"OBIJONS TRADE LINK LIMITED <hello@yourdomain.com>"`).
4. Set `CONTACT_EMAIL` to the inbox that should receive contact/RFQ submissions.
5. Deploy your environment variables on Vercel (Project → Settings → Environment Variables) so the `/api/contact` and `/api/inquiry` routes can send emails in production.
6. Start the dev server (`npm run dev`) and submit the contact/RFQ forms to verify that emails arrive via Resend.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

## License

Private - All rights reserved