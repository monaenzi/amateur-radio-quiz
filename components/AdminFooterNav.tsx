'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CircleHelp } from "lucide-react";

export default function AdminFooterNav() {
  const pathname = usePathname()

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/questions', label: 'Fragen', icon: CircleHelp },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#008CEA] bg-white md:hidden">
      <div className="grid grid-cols-2">
        {links.map((link, i) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 py-3 text-[#008CEA] ${
                isActive ? 'bg-blue-100' : ''
              } ${i === 0 ? 'border-r border-[#008CEA]' : ''}`}
            >
              <Icon size={20} />
              <span className="text-xs">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}