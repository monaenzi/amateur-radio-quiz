'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import AppButton from '@/components/AppButton'

export default function ExamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white md:p-8">
      <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
        <Header variant="default" />

        <section className="mx-auto w-full max-w-md flex-1 px-6 py-6 pb-32 md:max-w-lg md:px-0 md:py-4 md:pb-8">
          <div className="mb-15 md:mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 md:text-lg">
              Prüfungssimulation
            </h1>

            <span className="text-gray-400 md:text-base">
              1/9
            </span>
          </div>

          <p className="mb-6 mt-4 text-left text-xl text-[#008CEA] md:text-base">
            Welche gesetzlichen Bestimmungen sind für den Amateurfunk maßgeblich?
          </p>

          <div className="flex flex-col gap-3">
            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080] md:p-2 md:text-xs">
              <span className="mr-3 font-bold text-[#008CEA]">A</span>
              Das Rundfunkgesetz (RFG) und die EU-Datenschutzverordnung
            </button>

            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080] md:p-2 md:text-xs">
              <span className="mr-3 font-bold text-[#008CEA]">B</span>
              Das Telekommunikationsgesetz (TKG) und die Amateurfunkverordnung (AFV)
            </button>

            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080] md:p-2 md:text-xs">
              <span className="mr-3 font-bold text-[#008CEA]">C</span>
              Die Gewerbeordnung und das Elektrotechnikgesetz
            </button>

            <button className="w-full rounded-xl border border-gray-700 p-4 text-center text-[#808080] md:p-2 md:text-xs">
              <span className="mr-3 font-bold text-[#008CEA]">D</span>
              Ausschließlich internationale ITU-Regelungen ohne nationales Gesetz
            </button>
          </div>

          <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
            <AppButton>Prüfen</AppButton></div>
      
        </section>

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