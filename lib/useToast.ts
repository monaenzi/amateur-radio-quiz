'use client'

import { useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
  }

  function hideToast() {
    setToast(null)
  }

  return { toast, showToast, hideToast }
}