'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type SubjectStat = {
  subject: string
  _count: { id: number }
}

export type Stats = {
  total: number
  bySubject: SubjectStat[]
}

export function useAdminDashboard() {
  const { data: session, status } = useSession()
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const url = selectedClass
      ? `/api/admin/stats?class=${selectedClass}`
      : '/api/admin/stats'

    setError(null) 

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.error ?? 'Fehler beim Laden der Statistiken')
        }
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setStats(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [selectedClass])

  return { session, status, selectedClass, setSelectedClass, stats, error }
}