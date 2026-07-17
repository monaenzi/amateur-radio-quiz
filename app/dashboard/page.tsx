import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import LogoutButton from '@/components/LogoutButton'
import { auth } from '@/auth'
import ClassSelector from '@/components/ClassSelector'
import DashboardActionButtons from '@/components/DashboardActionButtons'
import { statisticsService } from '@/services/statistics.service'

type Props = {
  searchParams: Promise<{ class?: string }>
}

export default async function Home({ searchParams }: Props) {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const name = session?.user?.name ?? session?.user?.email ?? 'Nutzer'

  const resolvedParams = await searchParams
  const currentClass = resolvedParams.class

  let stats = null
  if (isLoggedIn && session.user.id && currentClass) {
    try {
      stats = await statisticsService.getUserStats(
        parseInt(session.user.id, 10),
        parseInt(currentClass, 10)
      )
    } catch {
      stats = null
    }
  }

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
            <h2 className="text-3xl font-bold text-[#0A8BE8] hidden md:block">HALLO, {name}</h2>
          )}

          {/* HALLO für Gast */}
          {!isLoggedIn && <h2 className="text-3xl font-bold text-[#0A8BE8]">HALLO, Gast</h2>}

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-700">PRÜFUNGSKLASSE</label>

            <ClassSelector />
          </div>

          <div className="mt-8">
            <h3 className="mb-3 font-semibold text-gray-700">GESAMTFORTSCHRITT</h3>

            <div className="rounded-xl bg-blue-100 p-4">
              <p className="mb-2 text-3xl font-bold text-[#0A8BE8]">
                {stats ? `${stats.percentage}%` : '0%'}
              </p>

              <div className="h-2 w-full rounded-full bg-gray-300">
                <div
                  className="h-2 rounded-full bg-[#0A8BE8]"
                  style={{ width: `${stats?.percentage ?? 0}%` }}
                  role="progressbar"
                  aria-valuenow={stats?.percentage ?? 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>

          <div className="mt-28 flex justify-center">
            <DashboardActionButtons />
          </div>
        </div>

        <FooterNav />
      </div>
    </main>
  )
}
