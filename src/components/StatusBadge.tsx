import { getStatusConfig } from '@/lib/status'
import { StudentStatus } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: StudentStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = getStatusConfig(status)
  
  const statusStyles = {
    'Draft': 'bg-gray-100 text-gray-700 border-gray-200',
    'Check': 'bg-warning-50 text-warning-700 border-warning-200',
    'Need Fix': 'bg-danger-50 text-danger-700 border-danger-200',
    'Submitted': 'bg-success-50 text-success-700 border-success-200',
    'Unsubmitted': 'bg-gray-100 text-gray-700 border-gray-200',
    'Applying': 'bg-primary-50 text-primary-700 border-primary-200'
  }
  
  return (
    <span className={cn(
      'status-badge border',
      statusStyles[status],
      className
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full mr-2',
        status === 'Draft' && 'bg-gray-400',
        status === 'Check' && 'bg-warning-500',
        status === 'Need Fix' && 'bg-danger-500',
        status === 'Submitted' && 'bg-success-500',
        status === 'Unsubmitted' && 'bg-gray-400',
        status === 'Applying' && 'bg-primary-500'
      )}></span>
      {config.label}
    </span>
  )
}
