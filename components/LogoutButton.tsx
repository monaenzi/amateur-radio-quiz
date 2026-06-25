'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="text-white hover:opacity-80"
    >
        <LogOut size={20} />
    </button>
    )
}