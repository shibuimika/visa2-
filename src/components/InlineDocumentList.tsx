'use client'

import { Document } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, X, Minus, Eye } from 'lucide-react'

interface InlineDocumentListProps {
  documents: Document[]
  onApprove: (documentId: string) => void
  onReject: (documentId: string) => void
  onApproveAll: () => void
  onDocumentClick: (document: Document) => void
  isUpdating: boolean
}

export function InlineDocumentList({
  documents,
  onApprove,
  onReject,
  onApproveAll,
  onDocumentClick,
  isUpdating,
}: InlineDocumentListProps) {
  const uploadedDocs = documents.filter(d => d.uploaded)
  const pendingDocs = uploadedDocs.filter(d => d.approvalStatus === 'pending' || !d.approvalStatus)
  const canApproveAll = pendingDocs.length > 0

  return (
    <div className="space-y-1">
      {documents.map(doc => (
        <div
          key={doc.id}
          className="flex items-center justify-between py-2 group"
        >
          <div className="flex items-center gap-2">
            {/* ステータスアイコン */}
            <span className={cn(
              "w-5 h-5 flex items-center justify-center rounded-full text-white text-xs",
              doc.uploaded
                ? doc.approvalStatus === 'approved'
                  ? "bg-primary-500"
                  : doc.approvalStatus === 'rejected'
                  ? "bg-alert-500"
                  : "bg-gray-400"
                : "bg-gray-300"
            )}>
              {doc.uploaded ? (
                doc.approvalStatus === 'approved' ? (
                  <Check className="h-3 w-3" />
                ) : doc.approvalStatus === 'rejected' ? (
                  <X className="h-3 w-3" />
                ) : (
                  <Minus className="h-3 w-3" />
                )
              ) : (
                <Minus className="h-3 w-3" />
              )}
            </span>

            <span
              className={cn(
                "text-sm",
                !doc.uploaded && "text-gray-400",
                doc.approvalStatus === 'rejected' && "text-alert-500 font-medium",
                doc.uploaded && doc.approvalStatus !== 'rejected' && "text-gray-800"
              )}
            >
              {doc.name}
              {!doc.uploaded && <span className="text-xs text-gray-400 ml-1">（未提出）</span>}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* プレビューアイコン */}
            {doc.url && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDocumentClick(doc)
                }}
                className="p-1.5 text-primary-500 hover:text-primary-700 hover:bg-gray-100 rounded transition-colors"
                title="書類を確認"
              >
                <Eye className="h-4 w-4" />
              </button>
            )}

            {/* 承認/差戻しボタン */}
            {doc.uploaded && (doc.approvalStatus === 'pending' || !doc.approvalStatus) && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onApprove(doc.id)
                  }}
                  disabled={isUpdating}
                  className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors disabled:opacity-50"
                  title="承認"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onReject(doc.id)
                  }}
                  disabled={isUpdating}
                  className="p-1.5 text-gray-400 hover:text-alert-500 hover:bg-alert-50 rounded transition-colors disabled:opacity-50"
                  title="差戻し"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {canApproveAll && (
        <div className="pt-3 mt-2 border-t border-gray-200">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onApproveAll()
            }}
            disabled={isUpdating}
            className="text-sm border-gray-300 text-primary-600 hover:bg-primary-50"
          >
            <Check className="h-4 w-4 mr-1" />
            すべて承認
          </Button>
        </div>
      )}
    </div>
  )
}
