'use client'

import { calculateDeadlineRemainingDays } from '@/lib/date'
import { cn } from '@/lib/utils'
import { AlertTriangle, Clock } from 'lucide-react'

interface DeadlineRemainingDaysProps {
  deadlineDate: string
  className?: string
}

export function DeadlineRemainingDays({ deadlineDate, className }: DeadlineRemainingDaysProps) {
  const { days, urgency } = calculateDeadlineRemainingDays(deadlineDate)

  // 緊急（14日以内）
  if (urgency === 'urgent') {
    return (
      <span className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold',
        'bg-alert-100 text-alert-600 border border-alert-200',
        className
      )}>
        <AlertTriangle className="w-3 h-3" />
        {days}日
      </span>
    )
  }

  // 警告（30日以内）
  if (urgency === 'warning') {
    return (
      <span className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold',
        'bg-gray-100 text-gray-700 border border-gray-200',
        className
      )}>
        <Clock className="w-3 h-3" />
        {days}日
      </span>
    )
  }

  // 通常
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
      'bg-gray-100 text-gray-600',
      className
    )}>
      {days}日
    </span>
  )
}
