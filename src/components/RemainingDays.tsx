import { calculateRemainingDays } from '@/lib/date'
import { cn } from '@/lib/utils'
import { AlertTriangle, Clock } from 'lucide-react'

interface RemainingDaysProps {
  expiryDate: string
  className?: string
}

export function RemainingDays({ expiryDate, className }: RemainingDaysProps) {
  const { days, urgency } = calculateRemainingDays(expiryDate)
  
  const urgencyClasses = {
    urgent: 'text-danger-600 bg-danger-50 border-danger-200',
    warning: 'text-warning-600 bg-warning-50 border-warning-200',
    normal: 'text-success-600 bg-success-50 border-success-200'
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
      urgencyClasses[urgency],
      className
    )}>
      {urgency === 'urgent' && <Clock className="w-3 h-3 mr-1" />}
      {days}日
    </span>
  )
}
