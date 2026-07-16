import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { examService } from '@/services/exam.service'
import { handleApiError } from '@/lib/api-error-handler'

export async function GET(request: Request) {
  const session = await auth()

  try {
    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get('class')
    const subject = searchParams.get('subject') ?? undefined

    if (!classFilter) {
      return NextResponse.json({ error: 'class fehlt' }, { status: 400 })
    }

    const userId = session?.user?.id ? parseInt(session.user.id) : null

    const questions = await examService.getLearningQuestions(
      userId ?? 0,
      parseInt(classFilter),
      subject
    )

    return NextResponse.json(questions)
  } catch (error) {
    return handleApiError(error)
  }
}