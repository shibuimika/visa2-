'use client'

import { Document } from '@/types'

interface DocumentProgressProps {
  documents: Document[]
}

export function DocumentProgress({ documents }: DocumentProgressProps) {
  const total = documents.length
  const uploaded = documents.filter(d => d.uploaded).length
  const approved = documents.filter(d => d.approvalStatus === 'approved').length
  const rejected = documents.filter(d => d.approvalStatus === 'rejected').length
  const pending = uploaded - approved - rejected

  const approvedPercent = (approved / total) * 100
  const rejectedPercent = (rejected / total) * 100
  const pendingPercent = (pending / total) * 100

  return (
    <div className="flex items-center gap-3">
      {/* Progress Bar */}
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[60px]">
        <div className="h-full flex">
          {/* Approved - Blue */}
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${approvedPercent}%` }}
          />
          {/* Rejected - Red */}
          <div
            className="h-full bg-alert-500 transition-all duration-300"
            style={{ width: `${rejectedPercent}%` }}
          />
          {/* Pending - Gray */}
          <div
            className="h-full bg-gray-400 transition-all duration-300"
            style={{ width: `${pendingPercent}%` }}
          />
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center gap-1 text-sm whitespace-nowrap">
        <span className="font-semibold text-gray-700">
          {uploaded}/{total}
        </span>
        {rejected > 0 && (
          <span className="text-xs text-alert-500">
            ({rejected}差戻)
          </span>
        )}
      </div>
    </div>
  )
}
