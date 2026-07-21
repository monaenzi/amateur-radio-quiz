'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="cursor-pointer text-black transition-opacity hover:opacity-70 md:text-white"
    >
      <LogOut size={24} />
    </button>
  )
}