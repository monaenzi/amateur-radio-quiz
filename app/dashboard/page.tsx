import AppButton from '@/components/AppButton'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import LogoutButton from '@/components/LogoutButton'
import { auth } from '@/auth'
import ClassSelector from '@/components/ClassSelector'

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const name = session?.user?.name ?? session?.user?.email ?? 'Gast'

  return (
    <main className="min-h-screen bg-white md:p-8">
      <div className="w-full bg-white md:mx-auto md:max-w-7xl">
        <Header variant={isLoggedIn ? 'welcome' : 'default'} />

        {/* Content */}
        <div className="p-6">
          {!isLoggedIn && (
            <p className="mb-6 text-center text-sm text-gray-500">
              Fortschritt wird <span className="text-red-500">NICHT</span> gespeichert
            </p>
          )}

          {/* HALLO mit Logout Button - nur bei welcome und nur auf mobil */}
          {isLoggedIn && (
            <div className="flex items-center justify-between md:hidden">
              <h2 className="text-3xl font-bold text-[#0A8BE8]">HALLO, {name}</h2>
              <LogoutButton />
            </div>
          )}

          {/* HALLO ohne Logout Button - auf desktop */}
          {isLoggedIn && (
            <h2 className="text-3xl font-bold text-[#0A8BE8] hidden md:block">
              HALLO, {name}
            </h2>
          )}

          {/* HALLO für Gast */}
          {!isLoggedIn && (
            <h2 className="text-3xl font-bold text-[#0A8BE8]">HALLO, Gast</h2>
          )}

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-700">PRÜFUNGSKATEGORIE</label>

            <ClassSelector />
          </div>

          <div className="mt-8">
            <h3 className="mb-3 font-semibold text-gray-700">GESAMTFORTSCHRITT</h3>

            <div className="rounded-xl bg-blue-100 p-4">
              <p className="mb-2 text-3xl font-bold text-[#0A8BE8]">63%</p>

              <div className="h-2 w-full rounded-full bg-gray-300">
                <div className="h-2 w-[63%] rounded-full bg-[#0A8BE8]" />
              </div>
            </div>
          </div>

          <div className="mt-50 flex justify-center">
            <div className="mt-auto mb-24 flex w-full max-w-xs flex-col gap-3 md:mb-20 md:max-w-sm md:flex-row md:justify-center md:hidden">
              <AppButton href="/quiz">Lernen</AppButton>
              <AppButton href="/exam_locked">Prüfung simulieren</AppButton>
            </div>
          </div>
        </div>

        <FooterNav />
      </div>
    </main>
  )
}