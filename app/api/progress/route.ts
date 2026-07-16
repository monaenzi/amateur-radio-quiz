import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { userRepository } from '@/repositories/user.repository'

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Gastmodus: Fortschritt wird nicht gespeichert.' }, { status: 200 })
  }

  const userId = Number(session.user.id)

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Ungültige User-ID' }, { status: 400 })
  }

  const { questionId, confidence } = await request.json()

  const progress = await userRepository.updateProgress(userId, questionId, confidence)
  return NextResponse.json(progress)
}