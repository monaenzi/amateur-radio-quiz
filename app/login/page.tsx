import AppButton from '@/components/AppButton'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white md:p-8">
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

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-bold text-gray-600">Anmelden</h1>

          <p className="mt-3 text-sm text-gray-400">Melde dich mit deinem Konto an.</p>
        </div>

        <form className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-4 px-4">
          <input
            type="email"
            placeholder="E-Mail"
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
          />

          <input
            type="password"
            placeholder="Passwort"
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
          />

          <AppButton>Einloggen</AppButton>
        </form>
      </div>
    </main>
  )
}