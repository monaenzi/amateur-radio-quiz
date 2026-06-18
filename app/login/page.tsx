'use client'

import Image from 'next/image'
import { useLogin } from './useLogin'

export default function LoginPage() {
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useLogin()

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
          <p className="mt-3 text-sm text-gray-400">
            Melde dich mit deinem Konto an.
          </p>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-4 px-4">
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="rounded-md bg-[#008CEA] px-6 py-3 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Laden...' : 'Einloggen'}
          </button>
        </div>
      </div>
    </main>
  )
}