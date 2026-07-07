'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-black hover:opacity-70 transition-opacity md:text-white"
    >
      <LogOut size={24} />
    </button>
  )
}