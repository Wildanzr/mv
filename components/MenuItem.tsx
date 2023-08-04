'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuItem = ({ href, icon, label, className }: MenuItemProps) => {
  const pathname = usePathname()
  const isActive = (pathname.startsWith(href) && href !== '/') || pathname === href
  return (
    <Link
      href={href}
      className={`menu_item ${className} ${isActive ? 'font-bold bg-gray-700' : ''}`}
    >
      {icon} {label}
    </Link>
  )
}

export default MenuItem
