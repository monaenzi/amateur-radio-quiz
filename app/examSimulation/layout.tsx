import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function ExamSimulationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session?.user) {
    redirect('/exam_locked')
  }

  return children
}
