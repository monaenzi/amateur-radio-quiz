'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export type ExamAnswer = {
  id: number
  text: string
  isCorrect: boolean
}

export type ExamQuestion = {
  id: number
  text: string
  explanation?: string | null
  subject?: string
  answers: ExamAnswer[]
}

export function useExamSimulation() {
  const searchParams = useSearchParams()
  const classId = searchParams.get('class') ?? '1'
  const subject = searchParams.get('subject') ?? undefined

  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setQuestions([])
    setCurrentIndex(0)
    setSelected([])
    setSubmitted(false)
    setShowExplanation(false)

    const url = `/api/questions?class=${classId}${subject ? `&subject=${subject}` : ''}&randomizeBySubject=true`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setQuestions([])
        setLoading(false)
      })
  }, [classId, subject])

  const toggleSelect = (id: string) => {
    if (submitted) return
    setSelected((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setCurrentIndex(questions.length)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }

    setSelected([])
    setSubmitted(false)
    setShowExplanation(false)
  }

  const currentQuestion = questions[currentIndex]
  const progressLabel = questions.length > 0 ? `${currentIndex + 1}/${questions.length}` : '0/0'

  return {
    questions,
    currentQuestion,
    currentIndex,
    selected,
    submitted,
    showExplanation,
    loading,
    progressLabel,
    toggleSelect,
    handleSubmit,
    handleNext,
    setShowExplanation,
    setCurrentIndex,
  }
}
