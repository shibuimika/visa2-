import { calculateDeadlineRemainingDays } from '@/lib/date'
import { cn } from '@/lib/utils'
import { AlertTriangle, Clock } from 'lucide-react'

interface DeadlineRemainingDaysProps {
  deadlineDate: string
  className?: string
}

export function DeadlineRemainingDays({ deadlineDate, className }: DeadlineRemainingDaysProps) {
  const { days, color, urgent } = calculateDeadlineRemainingDays(deadlineDate)
  
  const colorClasses = {
    red: 'text-danger-600 bg-danger-50 border-danger-200',
    yellow: 'text-warning-600 bg-warning-50 border-warning-200',
    green: 'text-success-600 bg-success-50 border-success-200'
  }
  
  if (days <= 0) {
    return (
      <span className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
        'text-danger-700 bg-danger-100 border-danger-300',
        className
      )}>
        <AlertTriangle className="w-3 h-3 mr-1" />
        期限切れ
      </span>
    )
  }
  
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
      colorClasses[color],
      className
    )}>
      {urgent && <Clock className="w-3 h-3 mr-1" />}
      {days}日
    </span>
  )
}

