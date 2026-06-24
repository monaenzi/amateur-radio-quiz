'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('E-Mail oder Passwort falsch.')
    } else {
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()

      if (session?.user?.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }

  return { email, setEmail, password, setPassword, error, loading, handleLogin }
}