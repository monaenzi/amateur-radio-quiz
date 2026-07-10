'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export type Question = {
  id: number
  text: string
  subject: string
  classes: {
    id: number
    class: number
  }[]
  code: string | null
  answers: {
    id: number
    text: string
    isCorrect: boolean
  }[]
}
export function useQuestionList() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [questions, setQuestions] = useState<Question[]>([])
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [classFilter, setClassFilter] = useState(searchParams.get('class') ?? '')
  const [subjectFilter, setSubjectFilter] = useState(searchParams.get('subject') ?? '')
  const [page, setPage] = useState(Number(searchParams.get('page') ?? '1'))
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10
  const [isLoading, setIsLoading] = useState(true)

  async function fetchQuestions(nextPage = page) {
    setIsLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (classFilter) params.set('class', classFilter)
    if (subjectFilter) params.set('subject', subjectFilter)
    params.set('page', String(nextPage))
    params.set('pageSize', String(pageSize))

    router.replace(`/admin/questions?${params.toString()}`)

    const res = await fetch(`/api/admin/questions?${params.toString()}`)
    const data = await res.json()

    if (Array.isArray(data)) {
      setQuestions(data)
      setTotal(data.length)
      setTotalPages(1)
      setPage(nextPage)
      setIsLoading(false)
      return
    }

    setQuestions(data.items ?? [])
    setTotal(data.total ?? 0)
    setTotalPages(data.totalPages ?? 1)
    setPage(data.page ?? nextPage)
    setIsLoading(false)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextPage = 1
      setPage(nextPage)
      void fetchQuestions(nextPage)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search, classFilter, subjectFilter])

  const [deleteId, setDeleteId] = useState<number | null>(null)

  async function confirmDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/questions?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    await fetchQuestions(page)
  }

  return {
    questions,
    search,
    setSearch,
    classFilter,
    setClassFilter,
    subjectFilter,
    setSubjectFilter,
    page,
    totalPages,
    total,
    pageSize,
    goToPage: (nextPage: number) => {
      setPage(nextPage)
      void fetchQuestions(nextPage)
    },
    fetchQuestions,
    deleteId,
    setDeleteId,
    confirmDelete,
    isLoading,
  }
}
