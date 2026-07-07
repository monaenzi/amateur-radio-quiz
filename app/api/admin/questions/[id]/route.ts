import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { questionService } from '@/services/question.service'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: idParam } = await params
  const id = parseInt(idParam)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 })
  }

  try {
    const question = await questionService.getById(id)
    return NextResponse.json(question)
  } catch {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
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

  const { id: idParam } = await params
  const id = parseInt(idParam)
  const body = await request.json()

  try {
    await questionService.update(id, body)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }
}