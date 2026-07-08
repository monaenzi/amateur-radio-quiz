'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import AppButton from '@/components/AppButton'

export default function DashboardActionButtons() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentClass = searchParams.get('class') ?? ''

  const handleNavigate = (path: string) => {
    if (!currentClass) {
      alert('Bitte wähle zuerst eine Klasse aus.')
      return
    }

    router.push(`${path}?class=${currentClass}`)
  }

  return (
    <div className="mt-auto mb-24 flex w-full max-w-xs flex-col gap-3 md:mb-20 md:max-w-sm md:flex-row md:justify-center">
      <AppButton onClick={() => handleNavigate('/learn')}>Lernen</AppButton>
      <AppButton onClick={() => handleNavigate('/examSimulation')}>Prüfung simulieren</AppButton>
    </div>
  )
}
