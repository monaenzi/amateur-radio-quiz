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

  const where = classFilter ? { class: parseInt(classFilter) } : {}

  const total = await prisma.question.count({ where })

  const bySubject = await prisma.question.groupBy({
    by: ['subject'],
    where,
    _count: { id: true },
  })

  return NextResponse.json({ total, bySubject })
}