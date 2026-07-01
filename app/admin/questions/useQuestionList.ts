'use client'

import { useState, useEffect } from 'react'

export type Question = {
  id: number
  text: string
  subject: string
  class: number
  code: string | null
  answers: { id: number; text: string; isCorrect: boolean }[]
}

export function useQuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')

  async function fetchQuestions() {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (classFilter) params.set('class', classFilter)
    if (subjectFilter) params.set('subject', subjectFilter)

    const res = await fetch(`/api/admin/questions?${params.toString()}`)
    const data = await res.json()
    setQuestions(data)
  }

  useEffect(() => {
    fetchQuestions()
  }, [classFilter, subjectFilter])

  async function deleteQuestion(id: number) {
    await fetch(`/api/admin/questions?id=${id}`, { method: 'DELETE' })
    fetchQuestions()
  }

  return {
    questions,
    search,
    setSearch,
    classFilter,
    setClassFilter,
    subjectFilter,
    setSubjectFilter,
    fetchQuestions,
    deleteQuestion,
  }
}