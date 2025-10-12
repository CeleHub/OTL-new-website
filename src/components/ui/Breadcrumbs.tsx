import Link from 'next/link'
import { Breadcrumb } from '@/types'

interface BreadcrumbsProps {
  items: Breadcrumb[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-neutral-600 hover:text-primary-600">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <span className="text-neutral-400">/</span>
            {index === items.length - 1 ? (
              <span className="text-neutral-900 font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-neutral-600 hover:text-primary-600"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}