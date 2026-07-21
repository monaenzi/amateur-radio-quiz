import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { questionService } from '@/services/question.service'
import { handleApiError } from '@/lib/api-error-handler'

export async function GET(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get('class') ?? undefined
    const stats = await questionService.getStats(classFilter)
    return NextResponse.json(stats)
  } catch (error) {
    return handleApiError(error)
  }
}