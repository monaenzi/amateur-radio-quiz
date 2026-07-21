import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-400 px-6 pt-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight size={14} />}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#008CEA] transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}