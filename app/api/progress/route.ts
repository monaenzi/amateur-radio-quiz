import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { handleApiError } from '@/lib/api-error-handler'
import { progressService } from '@/services/progress.service'
import { ValidationError } from '@/lib/errors'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { questionId, confidence } = body

    if (!questionId || !confidence) throw new ValidationError('questionId und confidence sind pflicht')
    if (!['UNKNOWN', 'MEDIUM', 'KNOWN'].includes(confidence)) {
      throw new ValidationError('Ungültiger confidence Wert')
    }

    const userId = parseInt(session.user.id as string)
    await progressService.updateProgress(userId, questionId, confidence)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}