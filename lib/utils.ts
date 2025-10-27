import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0
  
  const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime())
  let streak = 1
  
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const diff = Math.floor((sortedDates[i].getTime() - sortedDates[i + 1].getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 1) {
      streak++
    } else if (diff > 1) {
      break
    }
  }
  
  return streak
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

