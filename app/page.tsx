import Image from 'next/image'

export default function Home() {
  return (
  
 <main className="h-screen overflow-hidden bg-white">
    <div className="bg-gradient-to-l from-[#cfefff] via-white to-white">
        <Image
          src="/logo.png"
          alt="ÖVSV Lernkurs Logo"
          width={800}
          height={240}
          className="w-[97%]"
          priority
        />
      </div>
<section className="flex flex-col items-center text-center px-10 pt-[15vh]">
       <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-500">
          Willkommen
          <br />
          zur
          <br />
          Lernapp
          <br />
          des ÖVSV
        </h1>

        <p className="mb-12 text-sm font-semibold text-gray-400">
          Bereite dich hier auf die Prüfung vor
        </p>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <button className="rounded-full bg-[#008CEA] px-6 py-4 font-bold text-white">
            Als Mitglied anmelden
          </button>

          <button className="rounded-full bg-[#008CEA] px-6 py-4 font-bold text-white">
            Als Gast fortfahren →
          </button>
        </div>
      </section>
    </main>
  )
}
