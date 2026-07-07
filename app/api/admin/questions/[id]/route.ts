import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { questionService } from '@/services/question.service'
import { handleApiError } from '@/lib/api-error-handler'
import { ValidationError } from '@/lib/errors'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)

    if (isNaN(id)) throw new ValidationError('Ungültige ID')

    const question = await questionService.getById(id)
    return NextResponse.json(question)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)

    if (isNaN(id)) throw new ValidationError('Ungültige ID')

    const body = await request.json()
    await questionService.update(id, body)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}