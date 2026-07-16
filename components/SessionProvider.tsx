'use client'

import { SessionProvider } from 'next-auth/react'
import { useOfflineSupport } from '@/lib/useOfflineSupport'

function OfflineProvider({ children }: { children: React.ReactNode }) {
  useOfflineSupport()
  return <>{children}</>
}

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <OfflineProvider>{children}</OfflineProvider>
    </SessionProvider>
  )
}