import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET(request: Request) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const classFilter = searchParams.get('class')
  const subjectFilter = searchParams.get('subject')
  const search = searchParams.get('search')

  const where = {
    ...(classFilter && { class: parseInt(classFilter) }),
    ...(subjectFilter && { subject: subjectFilter }),
    ...(search && { text: { contains: search } }),
  }

  const questions = await prisma.question.findMany({
    where,
    include: { answers: true },
    orderBy: { createdAt: 'desc' },
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

  await prisma.question.delete({ where: { id: parseInt(id) } })

  return NextResponse.json({ success: true })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const question = await prisma.question.create({
    data: {
      text: body.text,
      explanation: body.explanation,
      class: body.class,
      subject: body.subject,
      code: body.code,
      answers: {
        create: body.answers,
      },
    },
  })

  return NextResponse.json(question)
}