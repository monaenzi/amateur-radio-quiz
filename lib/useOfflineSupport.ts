'use client'
import { useEffect, useState } from 'react'
import { setupSyncListener } from '@/lib/sync'

export const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    setupSyncListener()

    const handleOnline = () => {
      setIsOnline(true)
      console.log('✅ Connected!')
    }

    const handleOffline = () => {
      setIsOnline(false)
      console.log('⚠️ Disconnected!')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline }
}
