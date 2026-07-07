'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AppButton from '@/components/AppButton'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import { useSession } from 'next-auth/react'

type Answer = {
    id: number
    text: string
    isCorrect: boolean
}

type Question = {
    id: number
    text: string
    answers: Answer[]
}

export default function KarteikartenPage() {
    const { data: session } = useSession()
    const isLoggedIn = !!session?.user
    const searchParams = useSearchParams()
    const classId = searchParams.get('class') ?? '1'
    const subject = searchParams.get('subject') ?? undefined

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(function () {
        const url = subject && subject !== 'all'
            ? `/api/questions?class=${classId}&subject=${subject}`
            : `/api/questions?class=${classId}`

        fetch(url)
            .then(function (res) { return res.json() })
            .then(function (data) {
                setQuestions(data)
                setLoading(false)
            })
    }, [classId, subject])

    function handleNext() {
        setShowAnswer(false)
        setCurrentIndex(function (prev) { return prev + 1 })
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-white md:p-8">
                <div className="w-full bg-white md:mx-auto md:max-w-7xl">
                    <Header variant={isLoggedIn ? 'welcome' : 'default'} />
                    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
                        <p className="text-gray-500">Fragen werden geladen...</p>
                    </div>
                </div>
            </main>
        )
    }

    if (questions.length === 0) {
        return (
            <main className="min-h-screen bg-white md:p-8">
                <div className="w-full bg-white md:mx-auto md:max-w-7xl">
                    <Header variant={isLoggedIn ? 'welcome' : 'default'} />
                    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
                        <p className="text-gray-500">Keine Fragen gefunden.</p>
                    </div>
                </div>
            </main>
        )
    }

    const card = questions[currentIndex]
    const progress = Math.round(((currentIndex + 1) / questions.length) * 100)

    return (
        <main className="min-h-screen bg-white md:p-8">
            <div className="w-full bg-white md:mx-auto md:max-w-7xl">
                <Header variant={isLoggedIn ? 'welcome' : 'default'} />

                <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-sm flex-col px-6 py-4 md:max-w-2xl md:px-8">
                    <p className="mb-4 text-sm font-bold text-gray-500">
                        Karte {currentIndex + 1} von {questions.length}
                    </p>

                    <div className="mb-8 h-2 rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-[#008CEA] transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-[#d7efff] p-8 text-center md:min-h-[35vh] md:p-12">
                        <p className="mb-8 text-sm font-bold text-[#008CEA] md:text-base">
                            {showAnswer ? 'Antwort' : 'Frage'}
                        </p>
                        <h1 className="text-xl font-bold leading-relaxed text-gray-700 md:text-2xl">
                            {showAnswer ? card.answers.find(function (a) { return a.isCorrect })?.text : card.text}
                        </h1>
                    </section>

                    <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
                        {!showAnswer ? (
                            <AppButton onClick={function () { setShowAnswer(true) }}>
                                Antwort anzeigen
                            </AppButton>
                        ) : (
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={handleNext}
                                    className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                                >
                                    ✓
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                                >
                                    ~
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                <FooterNav />
            </div>
        </main>
    )
}