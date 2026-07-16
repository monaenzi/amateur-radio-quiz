'use client'

import { useEffect } from 'react'

type ToastProps = {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all md:bottom-8 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
    </div>
  )
}