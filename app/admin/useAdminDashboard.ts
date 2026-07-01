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
  const { data: session } = useSession()
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const url = selectedClass
      ? `/api/admin/stats?class=${selectedClass}`
      : '/api/admin/stats'

    fetch(url)
      .then((res) => res.json())
      .then(setStats)
  }, [selectedClass])

  return { session, selectedClass, setSelectedClass, stats }
}