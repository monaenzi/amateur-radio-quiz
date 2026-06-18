'use client'

import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import AppButton from '@/components/AppButton'

export default function ExamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white md:p-8">
      <div className="w-full overflow-x-hidden bg-white md:mx-auto md:max-w-7xl">
        <Header variant="default" />

        <section className="mx-auto w-full max-w-md px-6 py-6 pb-32 md:max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h1 className="break-words text-2xl font-bold text-gray-800 sm:text-3xl">
              Prüfungssimulation
            </h1>

            <span className="shrink-0 text-gray-400">1/9</span>
          </div>

          <p className="mb-15 mt-8 text-left text-xl text-[#008CEA] break-words">
            Welche gesetzlichen Bestimmungen sind für den Amateurfunk maßgeblich?
          </p>

          <div className="flex w-full flex-col gap-3">
            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080]">
              <span className="mr-3 font-bold text-[#008CEA]">A</span>
              <span className="break-words">
                Das Rundfunkgesetz (RFG) und die EU-Datenschutzverordnung
              </span>
            </button>

            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080]">
              <span className="mr-3 font-bold text-[#008CEA]">B</span>
              <span className="break-words">
                Das Telekommunikationsgesetz (TKG) und die Amateurfunkverordnung (AFV)
              </span>
            </button>

            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080]">
              <span className="mr-3 font-bold text-[#008CEA]">C</span>
              <span className="break-words">
                Die Gewerbeordnung und das Elektrotechnikgesetz
              </span>
            </button>

            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080]">
              <span className="mr-3 font-bold text-[#008CEA]">D</span>
              <span className="break-words">
                Ausschließlich internationale ITU-Regelungen ohne nationales Gesetz
              </span>
            </button>
          </div>

          <div className="mt-10">
            <AppButton>Prüfen</AppButton>
          </div>
        </section>

        <FooterNav />
      </div>
    </main>
  )
}