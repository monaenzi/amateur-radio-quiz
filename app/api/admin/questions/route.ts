import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { questionService } from '@/services/question.service'
import { handleApiError } from '@/lib/api-error-handler'
import { ValidationError } from '@/lib/errors'

export async function GET(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const questions = await questionService.getAll({
      search: searchParams.get('search') ?? undefined,
      classFilter: searchParams.get('class') ?? undefined,
      subjectFilter: searchParams.get('subject') ?? undefined,
    })
    return NextResponse.json(questions)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) throw new ValidationError('ID fehlt')

    await questionService.delete(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const question = await questionService.create(body)
    return NextResponse.json(question)
  } catch (error) {
    return handleApiError(error)
  }
}