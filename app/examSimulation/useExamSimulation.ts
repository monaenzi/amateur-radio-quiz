'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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
  attachments: { id: number; url: string; type: string }[]
}

type ExamResult = {
  classId: string
  percentage: number
  correctAnswers: number
  totalQuestions: number
  subjectStats: {
    label: string
    correct: number
    total: number
  }[]
}

export function useExamSimulation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classId = searchParams.get('class') ?? '1'
  const subject = searchParams.get('subject') ?? undefined

  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [subjectStats, setSubjectStats] = useState<Record<string, { correct: number; total: number }>>({})

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
    const currentQuestion = questions[currentIndex]
    if (!currentQuestion) return

    const correctIds = currentQuestion.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => String(answer.id))

    const selectedSet = new Set(selected)
    const isCorrect =
      correctIds.length === selected.length &&
      correctIds.every((id) => selectedSet.has(id))

    const currentSubject = currentQuestion.subject ?? 'Allgemein'
    setSubjectStats((prev) => {
      const prevStats = prev[currentSubject] ?? { correct: 0, total: 0 }
      return {
        ...prev,
        [currentSubject]: {
          correct: prevStats.correct + (isCorrect ? 1 : 0),
          total: prevStats.total + 1,
        },
      }
    })

    if (isCorrect) {
      setCorrectAnswerCount((prev) => prev + 1)
    }

    if (currentIndex + 1 >= questions.length) {
      const totalQuestions = questions.length
      const correctAnswers = isCorrect ? correctAnswerCount + 1 : correctAnswerCount
      const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
      const subjectStatsList = Object.entries({
        ...subjectStats,
        [currentSubject]: {
          correct: (subjectStats[currentSubject]?.correct ?? 0) + (isCorrect ? 1 : 0),
          total: (subjectStats[currentSubject]?.total ?? 0) + 1,
        },
      }).map(([label, stats]) => ({
        label,
        correct: stats.correct,
        total: stats.total,
      }))

      const result: ExamResult = {
        classId,
        percentage,
        correctAnswers,
        totalQuestions,
        subjectStats: subjectStatsList,
      }

      localStorage.setItem('examSimulationResult', JSON.stringify(result))
      router.push(`/examResults?class=${classId}`)
      return
    }

    setCurrentIndex((prev) => prev + 1)
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
