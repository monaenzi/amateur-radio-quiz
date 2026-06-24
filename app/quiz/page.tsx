'use client'

import { useState } from 'react'
import AppButton from '@/components/AppButton'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import Footer from '@/components/Footer'

export default function KarteikartenPage() {
  const [showAnswer, setShowAnswer] = useState(false)

  const card = {
    question: 'Was bedeutet QTH im Amateurfunk?',
    answer: 'QTH bedeutet Standort.',
  }

  return (
    <main className="min-h-screen bg-white md:p-8">
      <div className="w-full bg-white md:mx-auto md:max-w-7xl">
        <Header variant="default" />

        <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-sm flex-col px-6 py-4 md:max-w-2xl md:px-8">
          <p className="mb-4 text-sm font-bold text-gray-500">Karte 1 von 10</p>

          <div className="mb-8 h-2 rounded-full bg-gray-200">
            <div className="h-2 w-[10%] rounded-full bg-[#008CEA]" />
          </div>

          <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-[#d7efff] p-8 text-center md:min-h-[35vh] md:p-12">
            {' '}
            <p className="mb-8 text-sm font-bold text-[#008CEA] md:text-base">
              {showAnswer ? 'Antwort' : 'Frage'}
            </p>
            <h1 className="text-xl font-bold leading-relaxed text-gray-700 md:text-2xl">
              {showAnswer ? card.answer : card.question}
            </h1>
          </section>

          <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
            {!showAnswer ? (
              <AppButton onClick={() => setShowAnswer(true)}>Antwort anzeigen</AppButton>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <button className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90">
                  ✓
                </button>
                <button className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90">
                  ~
                </button>
                <button className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90">
                  ✕
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      <FooterNav />
    </main>
  )
}
