'use client'

import { ApprovalHistoryItem } from '@/types'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, FileUp } from 'lucide-react'

interface ApprovalHistoryProps {
  history: ApprovalHistoryItem[]
}

export function ApprovalHistory({ history }: ApprovalHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">履歴なし</p>
    )
  }

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const getActionConfig = (action: ApprovalHistoryItem['action']) => {
    switch (action) {
      case 'approved':
        return { label: '承認', icon: CheckCircle, color: 'text-primary-500' }
      case 'rejected':
        return { label: '差戻し', icon: XCircle, color: 'text-alert-500' }
      case 'submitted':
        return { label: '提出', icon: FileUp, color: 'text-gray-500' }
      default:
        return { label: action, icon: FileUp, color: 'text-gray-500' }
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-2">
      {sortedHistory.map((item) => {
        const { label, icon: Icon, color } = getActionConfig(item.action)
        return (
          <div key={item.id} className="flex items-start gap-2 text-sm">
            <Icon className={cn("h-4 w-4 flex-shrink-0 mt-0.5", color)} />
            <div className="flex-1 min-w-0">
              <span className="text-gray-600">{item.documentName}</span>
              <span className="text-gray-400"> - </span>
              <span className={cn("font-medium", color)}>{label}</span>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatTime(item.timestamp)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
