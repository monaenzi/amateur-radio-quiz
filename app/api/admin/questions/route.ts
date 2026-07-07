import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { questionService } from '@/services/question.service'

export async function GET(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const questions = await questionService.getAll({
    search: searchParams.get('search') ?? undefined,
    classFilter: searchParams.get('class') ?? undefined,
    subjectFilter: searchParams.get('subject') ?? undefined,
  })

  return NextResponse.json(questions)
}

export async function DELETE(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID fehlt' }, { status: 400 })
  }

  try {
    await questionService.delete(parseInt(id))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Frage nicht gefunden' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const question = await questionService.create(body)
  return NextResponse.json(question)
}