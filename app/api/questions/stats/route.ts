import { NextRequest, NextResponse } from 'next/server'
import { questionService } from '@/services/question.service'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const classFilter = searchParams.get('class') ?? undefined

    const stats = await questionService.getStats(classFilter)
    return NextResponse.json(stats)
}