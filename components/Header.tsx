'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { LogIn } from 'lucide-react'
import BackButton from './BackButton'
import LogoutButton from './LogoutButton'

type HeaderProps = {
  variant?: 'home' | 'welcome' | 'default' | 'auth' | 'admin' | 'authAdmin'
}

export default function Header(props: HeaderProps) {
  return (
    <Suspense fallback={null}>
      <HeaderContent {...props} />
    </Suspense>
  )
}

function HeaderContent({ variant = 'home' }: HeaderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentClass = searchParams.get('class')
  const dashboardHref = currentClass ? `/dashboard?class=${currentClass}` : '/dashboard'
  const statisticsHref = currentClass ? `/statistics?class=${currentClass}` : '/statistics'

  // Seiten wo der BackButton NICHT angezeigt werden soll
  const hideBackButton = pathname === '/dashboard' || pathname === '/'

  if (variant === 'authAdmin') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/LogoWhite.png" alt="ÖVSV Lernkurs Logo" width={30} height={30} priority />
          </Link>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex items-center justify-end gap-6">
            <nav className="hidden md:flex items-center gap-6 text-white">
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/questions">Fragen</Link>
              <LogoutButton />
            </nav>
          </div>
        </div>
      </header>
    )
  }
  if (variant === 'admin') {
    return (
      <header className="relative md:relative sticky md:static top-0 z-50 bg-[#008CEA] px-6 py-4">
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between">
          <div className="w-8">{!hideBackButton && <BackButton />}</div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <Link href="/">
            <Image src="/LogoWhite.png" alt="ÖVSV Lernkurs Logo" width={30} height={30} priority />
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-1 flex items-center gap-3">
            <Link href="/">
              <Image
                src="/LogoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="flex items-center gap-6 text-white">
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/questions">Fragen</Link>
              <LogoutButton />
            </nav>
          </div>
        </div>
      </header>
    )
  }

  if (variant === 'auth') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        {/* Mobile: BackButton links, Logo rechts */}
        <div className="flex md:hidden items-center justify-between">
          <div className="w-8">{!hideBackButton && <BackButton />}</div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Willkommen zurück</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <Link href="/">
            <Image src="/LogoWhite.png" alt="ÖVSV Lernkurs Logo" width={30} height={30} priority />
          </Link>
        </div>

        {/* Desktop: Logo links, wie bisher */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-1 flex items-center gap-3">
            <Link href="/">
              <Image
                src="/LogoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Willkommen zurück</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex-1" />
        </div>
      </header>
    )
  }
  if (variant === 'home') {
    return (
      <header className="bg-[#008CEA]">
        <Link href="/">
          <div className="bg-gradient-to-l from-[#cfefff] via-white to-white">
            <Image
              src="/Logo.png"
              alt="ÖVSV Lernkurs Logo"
              width={800}
              height={240}
              className="w-[97%] md:w-[430px]"
              priority
            />
          </div>
        </Link>
      </header>
    )
  }
if (variant === 'default') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between">
          <div className="w-8">
            {pathname === '/dashboard' ? (
              <Link href="/login" className="text-white">
                <LogIn size={24} />
              </Link>
            ) : (
              !hideBackButton && <BackButton />
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <Link href="/dashboard">
            <Image
              src="/LogoWhite.png"
              alt="ÖVSV Lernkurs Logo"
              width={30}
              height={30}
              priority
            />
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-1 flex items-center gap-3">
            <Link href="/dashboard">
              <Image
                src="/LogoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <nav className="flex items-center gap-6 text-white">
              <Link href={dashboardHref}>Home</Link>
              <Link href={statisticsHref}>Statistik</Link>
            </nav>
            {pathname === '/dashboard' && (
              <Link href="/login" className="flex flex-col items-center text-white">
                <LogIn size={24} />
                <span className="text-[10px] uppercase tracking-[0.15em]">Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    )
  }
  if (variant === 'welcome') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between">
          <div className="w-8">
            {!hideBackButton && <BackButton />}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <Link href="/dashboard">
            <Image
              src="/LogoWhite.png"
              alt="ÖVSV Lernkurs Logo"
              width={30}
              height={30}
              priority
            />
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-1 flex items-center gap-3">
            <Link href="/dashboard">
              <Image
                src="/LogoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="flex items-center gap-6 text-white">
              <Link href={dashboardHref}>Home</Link>
              <Link href={statisticsHref}>Statistik</Link>
              <LogoutButton />
            </nav>
          </div>
        </div>
      </header>
    )
  }

  return null
}
