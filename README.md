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

```
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
CONTACT_EMAIL=contact@yourcompany.com
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

## License

Private - All rights reserved