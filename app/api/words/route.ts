import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const categoryId = searchParams.get('categoryId')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      )
    }

    const whereClause: any = { userId }
    if (categoryId) {
      whereClause.categoryId = categoryId
    }

    const words = await prisma.word.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    return NextResponse.json({
      success: true,
      words,
    })
  } catch (error) {
    console.error('Fetch words error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const wordId = searchParams.get('wordId')

    if (!wordId) {
      return NextResponse.json(
        { error: 'Missing wordId' },
        { status: 400 }
      )
    }

    await prisma.word.delete({
      where: { id: wordId },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Delete word error:', error)
    return NextResponse.json(
      { error: 'Failed to delete word' },
      { status: 500 }
    )
  }
}

