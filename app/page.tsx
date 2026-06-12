import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-white md:p-8">
      <div className="mx-auto h-full bg-white md:max-w-7xl">
        <div className="bg-gradient-to-l from-[#cfefff] via-white to-white">
          <Image
            src="/logo.png"
            alt="ÖVSV Lernkurs Logo"
            width={800}
            height={240}
            className="w-[97%] md:w-[430px]"
            priority
          />
        </div>

        <section className="flex flex-col items-center px-10 pt-[12vh] text-center md:pt-[13vh]">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-500 md:text-5xl">
            <span className="md:hidden">
              Willkommen
              <br />
              zur
              <br />
              Lernapp
              <br />
              des ÖVSV
            </span>

            <span className="hidden md:block">
              Willkommen zur Lernapp
              <br />
              des ÖVSV
            </span>
          </h1>

          <p className="mb-10 text-sm font-semibold text-gray-400 md:text-lg">
            Bereite dich hier auf die Prüfung vor
          </p>

          <div className="flex w-full max-w-xs flex-col gap-3 md:max-w-none md:flex-row md:justify-center">
            <Link href="/login" className="rounded-md bg-[#008CEA] px-10 py-4 font-medium text-white transition hover:opacity-90">
              Mitglied anmelden
            </Link>

            <Link href="/dashboard" className="rounded-md border border-[#008CEA] px-10 py-4 font-medium text-[#008CEA] transition hover:bg-[#008CEA]/10">
              Als Gast fortfahren →
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}