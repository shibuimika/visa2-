'use client'

import { StudentStatus } from '@/types'
import { cn } from '@/lib/utils'
import { Clock, AlertTriangle, CheckCircle, FileX, Send, FileEdit } from 'lucide-react'

interface StatusBadgeProps {
  status: StudentStatus
  className?: string
}

const statusConfig: Record<StudentStatus, { 
  label: string
  icon: typeof Clock
  bgColor: string
  textColor: string
}> = {
  'Draft': {
    label: '下書き',
    icon: FileEdit,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
  },
  'Check': {
    label: '確認待ち',
    icon: Clock,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
  'Need Fix': {
    label: '要修正',
    icon: AlertTriangle,
    bgColor: 'bg-alert-100',
    textColor: 'text-alert-600',
  },
  'Submitted': {
    label: '承認完了',
    icon: CheckCircle,
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  'Unsubmitted': {
    label: '書類不足',
    icon: FileX,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
  },
  'Applying': {
    label: '申請中',
    icon: Send,
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-600',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold',
      config.bgColor,
      config.textColor,
      className
    )}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
