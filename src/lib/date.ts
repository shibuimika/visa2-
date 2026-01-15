import { RemainingDaysConfig, UrgencyLevel } from '@/types'

// 残り日数から緊急度を判定
function getUrgencyLevel(days: number): UrgencyLevel {
  if (days <= 14) return 'urgent'   // 14日以内: 緊急
  if (days <= 30) return 'warning'  // 30日以内: 警告
  return 'normal'                    // 30日以上: 通常
}

export function calculateRemainingDays(expiryDate: string): RemainingDaysConfig {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return {
    days: diffDays,
    urgency: getUrgencyLevel(diffDays)
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function getEnrollmentYearMonth(enrollmentDate: string): string {
  const date = new Date(enrollmentDate)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function getUniqueEnrollmentYearMonths(students: { enrollmentDate: string }[]): string[] {
  const yearMonths = students.map(student => getEnrollmentYearMonth(student.enrollmentDate))
  return Array.from(new Set(yearMonths)).sort()
}

export function calculateDeadlineRemainingDays(deadlineDate: string): RemainingDaysConfig {
  const today = new Date()
  const deadline = new Date(deadlineDate)
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return {
    days: diffDays,
    urgency: getUrgencyLevel(diffDays)
  }
}

// 在留期限から申請締切日を計算（3ヶ月前）
export function calculateApplicationDeadline(residenceExpiry: string): string {
  const expiryDate = new Date(residenceExpiry)
  const deadlineDate = new Date(expiryDate)
  deadlineDate.setMonth(deadlineDate.getMonth() - 3)
  return deadlineDate.toISOString().split('T')[0]
}
