import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { calculateStreak } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get practice logs for streak calculation
    const practiceLogs = await prisma.practiceLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 30,
    })

    const practiceDates = practiceLogs.map(log => log.createdAt)
    const streak = calculateStreak(practiceDates)

    // Get weekly activity
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    const weeklyLogs = await prisma.practiceLog.findMany({
      where: {
        userId,
        createdAt: {
          gte: weekAgo,
        },
      },
    })

    const weeklyStats = {
      totalSessions: weeklyLogs.length,
      totalWords: weeklyLogs.reduce((sum, log) => sum + log.wordsCount, 0),
      totalMinutes: weeklyLogs.reduce((sum, log) => sum + (log.durationMinutes || 0), 0),
    }

    // Get mastery breakdown
    const masteryBreakdown = await prisma.word.groupBy({
      by: ['masteryLevel'],
      where: { userId },
      _count: true,
    })

    return NextResponse.json({
      success: true,
      stats: {
        totalWords: user.totalWords,
        masteredWords: user.masteredWords,
        streak,
        weeklyStats,
        masteryBreakdown: masteryBreakdown.map(m => ({
          level: m.masteryLevel,
          count: m._count,
        })),
      },
    })
  } catch (error) {
    console.error('Fetch stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

