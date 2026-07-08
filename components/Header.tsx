'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn } from 'lucide-react'
import BackButton from './BackButton'
import LogoutButton from './LogoutButton'

type HeaderProps = {
  variant?: 'home' | 'welcome' | 'default' | 'auth' | 'admin' | 'authAdmin'
}

export default function Header({ variant = 'home' }: HeaderProps) {
  const pathname = usePathname()

  // Seiten wo der BackButton NICHT angezeigt werden soll
  const hideBackButton = pathname === '/dashboard' || pathname === '/'

  if (variant === 'authAdmin') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1" />

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="hidden md:flex items-center gap-6 text-white">
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/questions">Fragen</Link>
              <LogoutButton />
            </nav>
            <Link href="/">
              <Image
                src="/logoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  if (variant === 'admin') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center">{!hideBackButton && <BackButton />}</div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="hidden md:flex items-center gap-6 text-white">
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/questions">Fragen</Link>
              <LogoutButton />
            </nav>
            <Link href="/">
              <Image
                src="/logoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  if (variant === 'auth') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center">
            {!hideBackButton && (
              <div className="md:hidden">
                <BackButton />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Willkommen zurück</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <Link href="/">
              <Image
                src="/logoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>
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
              src="/logo.png"
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
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center">
            {!hideBackButton && (
              <div className="md:hidden">
                <BackButton />
              </div>
            )}
            {pathname === '/dashboard' && (
              <div className="ml-2">
                <Link href="/login" className="flex flex-col items-center text-white">
                  <LogIn size={24} />
                  <span className="text-[10px] uppercase tracking-[0.15em]">Login</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Lernkurs</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <nav className="hidden md:flex items-center gap-6 text-white">
              <Link href="/dashboard">Home</Link>
              <Link href="/quiz">Lernen</Link>
              <Link href="/exam_locked">Prüfung</Link>
              <Link href="/statistics">Statistik</Link>
            </nav>
            <Link href="/dashboard">
              <Image
                src="/logoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  if (variant === 'welcome') {
    return (
      <header className="relative bg-[#008CEA] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center">
            {!hideBackButton && (
              <div className="md:hidden">
                <BackButton />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Willkommen zurück</h1>
            <p className="text-sm text-white/80">ÖVSV Lernkurs</p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="hidden md:flex items-center gap-6 text-white">
              <Link href="/dashboard">Home</Link>
              <Link href="/quiz">Lernen</Link>
              <Link href="/examSimulation">Prüfung</Link>
              <Link href="/statistics">Statistik</Link>
              <LogoutButton />
            </nav>
            <Link href="/dashboard">
              <Image
                src="/logoWhite.png"
                alt="ÖVSV Lernkurs Logo"
                width={30}
                height={30}
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return null
}
