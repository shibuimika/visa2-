'use client'

import { Student } from '@/types'
import { calculateDeadlineRemainingDays } from '@/lib/date'
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react'

interface ActionSummaryProps {
  students: Student[]
  onFilterUrgent: () => void
  onFilterCheck: () => void
}

export function ActionSummary({ students, onFilterUrgent, onFilterCheck }: ActionSummaryProps) {
  const activeStudents = students.filter(s => s.status !== 'Draft')

  const urgentCount = activeStudents.filter(s => {
    const remaining = calculateDeadlineRemainingDays(s.applicationDeadline)
    return remaining.urgency === 'urgent'
  }).length

  const checkCount = activeStudents.filter(s => s.status === 'Check').length
  const needFixCount = activeStudents.filter(s => s.status === 'Need Fix').length
  const totalActionRequired = urgentCount + checkCount + needFixCount

  if (totalActionRequired === 0) {
    return (
      <div className="flex items-center gap-2 py-3 px-4 bg-primary-50 rounded-lg border border-primary-100">
        <CheckCircle className="h-5 w-5 text-primary-500" />
        <span className="text-primary-700 font-medium">
          対応が必要な学生はいません
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 py-3 px-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-alert-500" />
        <span className="font-semibold text-gray-900">
          要対応: {totalActionRequired}件
        </span>
      </div>
      
      <div className="flex items-center gap-3 text-sm">
        {urgentCount > 0 && (
          <button 
            onClick={onFilterUrgent}
            className="flex items-center gap-1 text-alert-500 hover:text-alert-600 font-medium transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
            期限間近 {urgentCount}件
          </button>
        )}
        
        {checkCount > 0 && (
          <button 
            onClick={onFilterCheck}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <Clock className="h-4 w-4" />
            確認待ち {checkCount}件
          </button>
        )}
        
        {needFixCount > 0 && (
          <span className="flex items-center gap-1 text-alert-500 font-medium">
            要修正 {needFixCount}件
          </span>
        )}
      </div>
    </div>
  )
}
