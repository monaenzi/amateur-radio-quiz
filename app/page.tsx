import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from 'next/link'
import AppButton from '@/components/AppButton'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-white md:p-8">
      <div className="mx-auto h-full bg-white md:max-w-7xl">
        {/* <div className="bg-gradient-to-l from-[#cfefff] via-white to-white">
          <Image
            src="/Logo.png"
            alt="ÖVSV Lernkurs Logo"
            width={800}
            height={240}
            className="w-[97%] md:w-[430px]"
            priority
          />
        </div> */}
        <Header variant="home" />

        <section className="flex flex-col items-center px-10 pt-[22vh] text-center md:pt-[13vh]">
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

          <div className="mt-auto mb-24 flex w-full max-w-xs flex-col gap-3 md:mb-20 md:max-w-sm md:flex-row md:justify-center">
            <Link href="/login" className="w-full">
              <AppButton>Mitglied anmelden</AppButton>
            </Link>

            <Link href="/dashboard" className="w-full">
              <AppButton>Als Gast fortfahren →</AppButton>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
