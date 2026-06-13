'use client'

import { useState } from 'react'
import AppButton from '@/components/AppButton'

export default function KarteikartenPage() {
  const [showAnswer, setShowAnswer] = useState(false)

  const card = {
    question: 'Was bedeutet QTH im Amateurfunk?',
    answer: 'QTH bedeutet Standort.',
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-sm flex-col">
        <p className="mb-4 text-sm font-bold text-gray-500">Karte 1 von 10</p>

        <div className="mb-8 h-2 rounded-full bg-gray-200">
          <div className="h-2 w-[10%] rounded-full bg-[#008CEA]" />
        </div>

        <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl bg-[#d7efff] p-8 text-center">
          <p className="mb-8 text-sm font-bold text-[#008CEA]">
            {showAnswer ? 'Antwort' : 'Frage'}
          </p>

          <h1 className="text-2xl font-bold leading-relaxed text-gray-700">
            {showAnswer ? card.answer : card.question}
          </h1>
        </section>

        <div className="mt-8">
          {!showAnswer ? (
            <AppButton onClick={() => setShowAnswer(true)}>
              Antwort anzeigen
            </AppButton>
          ) : (
            <div className="flex flex-col gap-3">
              <AppButton>Ja</AppButton>
              <AppButton>Noch nicht ganz</AppButton>
              <AppButton>Gar nicht</AppButton>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}