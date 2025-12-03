import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OBIJONS TRADE LINK LIMITED - Quality Automotive Parts & Accessories',
  description: 'Find quality automotive parts and accessories for all makes and models. Expert service, competitive prices, and fast shipping.',
  keywords: 'automotive parts, motor parts, car parts, auto accessories, OEM parts',
  authors: [{ name: 'OBIJONS TRADE LINK LIMITED' }],
  openGraph: {
    title: 'OBIJONS TRADE LINK LIMITED - Quality Automotive Parts',
    description: 'Find quality automotive parts and accessories for all makes and models.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}