import AppButton from '@/components/AppButton'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const name = session?.user?.name ?? session?.user?.email ?? 'Gast'

  return (
    <main className="min-h-screen bg-white md:p-8">
      <div className="w-full bg-white md:mx-auto md:max-w-7xl">
        <Header variant={isLoggedIn ? "welcome" : "default"} />

        {/* Content */}
        <div className="p-6">
          {!isLoggedIn && (
            <p className="mb-6 text-center text-sm text-gray-500">
              Fortschritt wird <span className="text-red-500">NICHT</span> gespeichert
            </p>
          )}

          <h2 className="text-3xl font-bold text-[#0A8BE8]">
            HALLO, {isLoggedIn ? name : 'Gast'}
            </h2>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-700">PRÜFUNGSKATEGORIE</label>

            <select className="w-full rounded-lg bg-gray-200 p-3 text-gray-800">
              <option>Klasse 1</option>
            </select>
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
            <div className="mt-auto mb-24 flex w-full max-w-xs flex-col gap-3 md:mb-20 md:max-w-sm md:flex-row md:justify-center  md:hidden">
              <AppButton>Lernen</AppButton>
              <AppButton>Prüfung simulieren</AppButton>
            </div>
          </div>
        </div>

        <FooterNav/>
        
      </div>
    </main>
  )
}
