'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import Footer from '@/components/Footer'
import AppButton from '@/components/AppButton'
import { getExamResultStorageKey } from '../examSimulation/useExamSimulation'

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

export default function PruefungErgebnis() {
  return (
    <Suspense fallback={null}>
      <PruefungErgebnisContent />
    </Suspense>
  )
}

function PruefungErgebnisContent() {
  const [result, setResult] = useState<ExamResult | null>(null)
  const searchParams = useSearchParams()
  const classId = searchParams.get('class') ?? '1'
  const subject = searchParams.get('subject') ?? undefined

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? window.localStorage.getItem(getExamResultStorageKey(classId, subject)) : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ExamResult
        setResult(parsed)
      } catch {
        setResult(null)
      }
    }
  }, [classId, subject])

  const categories = result?.subjectStats ?? []
  const percentage = result?.percentage ?? 0
  const correctAnswers = result?.correctAnswers ?? 0
  const totalQuestions = result?.totalQuestions ?? 0
  const retryClass = result?.classId ?? classId
  const passed = categories.length > 0 && categories.every((cat) => cat.correct / cat.total >= 2 / 3)

  return (
    <main className="flex min-h-screen w-full flex-col bg-white md:p-8">
      <div className="flex w-full flex-1 flex-col bg-white md:mx-auto md:max-w-7xl">
        <Header variant="welcome" />

        <div className="flex flex-1 flex-col px-6 pb-24 pt-6 md:px-12 md:pt-10">
          {/* Warning */}
          <p className="mb-4 text-center text-sm text-gray-500 md:mb-2">
            <span className="font-bold text-red-600">ACHTUNG!</span> Diese Ergebnisse sind keine
            Garantie
          </p>

          {/* Title */}
          <h1 className="mb-20 text-center text-2xl font-bold leading-tight text-gray-900 md:mb-8">
            Prüfungssimulation Ergebnis
          </h1>

          {/* Mobile: Score row */}
          <div className="mb-6 flex items-center gap-4 md:hidden">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xl font-bold text-[#008CEA]">{percentage}%</span>
            </div>
            <div>
              <p className={`text-lg font-bold ${passed ? 'text-[#008CEA]' : 'text-red-600'}`}>
                {passed ? 'Gratuliere!' : 'Leider nicht bestanden'}
              </p>
              <p className="text-sm text-gray-500">
                {passed
                  ? `${correctAnswers} Fragen richtig beantwortet`
                  : 'In jedem Fachgebiet sind mindestens 2 von 3 Fragen nötig'}
              </p>
            </div>
          </div>

          {/* Desktop: two column layout */}
          <div className="md:flex md:items-start md:gap-12">
            {/* LEFT: Score card (desktop only) */}
            <div className="hidden md:flex md:w-56 md:shrink-0 md:flex-col md:items-center md:self-start md:rounded-2xl md:border md:border-gray-200 md:bg-gray-50 md:p-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-[#008CEA]">{percentage}%</span>
              </div>
              <p className={`mt-2 text-sm font-bold ${passed ? 'text-[#008CEA]' : 'text-red-600'}`}>
                {passed ? 'Gratuliere!' : 'Leider nicht bestanden'}
              </p>
              <p className="mt-1 mb-4 text-center text-xs text-gray-500">
                {passed
                  ? `${correctAnswers} Fragen richtig beantwortet`
                  : 'In jedem Fachgebiet sind mindestens 2 von 3 Fragen nötig'}
              </p>

              <div className="mb-3 w-full border-t border-gray-200" />

              <div className="flex w-full justify-around">
                {categories.map((cat) => {
                  const pct = Math.round((cat.correct / cat.total) * 100)
                  const categoryPassed = cat.correct / cat.total >= 2 / 3
                  return (
                    <div key={cat.label} className="flex flex-col items-center gap-1">
                      <p className="text-xs text-gray-500">{cat.label}</p>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          categoryPassed ? 'bg-blue-100' : 'bg-red-100'
                        }`}
                      >
                        <span className={`text-xs font-bold ${categoryPassed ? 'text-[#008CEA]' : 'text-red-600'}`}>
                          {pct}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {cat.correct}/{cat.total}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT: Kategorien + Button */}
            <div className="flex-1">
              <p className="mt-2 text-sm font-semibold text-gray-800">Ergebnis pro Fachgebiet</p>

              <div className="mb-2 w-full overflow-hidden rounded-xl border border-gray-200">
                {categories.map((cat, i) => {
                  const categoryPassed = cat.correct / cat.total >= 2 / 3
                  return (
                    <div
                      key={cat.label}
                      className={`flex w-full items-center gap-3 px-4 py-3 ${
                        i < categories.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          categoryPassed ? 'bg-blue-50' : 'bg-red-50'
                        }`}
                      >
                        <span className="text-base">📋</span>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${categoryPassed ? 'text-gray-900' : 'text-red-600'}`}>
                          {cat.label}
                        </p>
                        <p className="text-xs text-gray-400">
                          {cat.correct} von {cat.total} Fragen richtig
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <AppButton href={`/examSimulation?class=${retryClass}${subject ? `&subject=${subject}` : ''}`} className="md:mt-4 mt-16">
                Wiederholen
              </AppButton>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <FooterNav />
        </div>

        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </main>
  )
}
