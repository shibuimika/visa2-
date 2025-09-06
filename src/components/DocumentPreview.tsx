'use client'

import { useState } from 'react'
import { Document } from '@/types'
import { Button } from '@/components/ui/button'
import { FileText, Eye, X, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DocumentPreviewProps {
  document: Document
  onApprove?: (documentId: string) => void
  onReject?: (documentId: string) => void
}

export function DocumentPreview({ document, onApprove, onReject }: DocumentPreviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const getApprovalStatusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'rejected':
        return 'text-danger-600 bg-danger-50 border-danger-200'
      default:
        return 'text-warning-600 bg-warning-50 border-warning-200'
    }
  }

  const getApprovalStatusText = (status?: string) => {
    switch (status) {
      case 'approved':
        return '承認済み'
      case 'rejected':
        return '差戻し'
      default:
        return '確認中'
    }
  }

  if (!document.uploaded) {
    return (
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{document.name}</p>
            <p className="text-sm text-gray-500">未提出</p>
          </div>
        </div>
        <span className="text-red-600 text-sm font-medium">未提出</span>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">{document.name}</p>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-success-600">提出済み</p>
              {document.approvalStatus && document.approvalStatus !== 'pending' && (
                <span className={cn(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
                  getApprovalStatusColor(document.approvalStatus)
                )}>
                  {getApprovalStatusText(document.approvalStatus)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPreviewOpen(true)}
            className="border-primary-200 text-primary-700 hover:bg-primary-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            詳細を見る
          </Button>
          {document.approvalStatus !== 'approved' && onApprove && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onApprove(document.id)}
              className="border-success-200 text-success-700 hover:bg-success-50"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              承認
            </Button>
          )}
          {document.approvalStatus !== 'rejected' && onReject && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(document.id)}
              className="border-danger-200 text-danger-700 hover:bg-danger-50"
            >
              <XCircle className="h-4 w-4 mr-1" />
              差戻し
            </Button>
          )}
        </div>
      </div>

      {/* プレビューモーダル */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* プレビューコンテンツ */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {document.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  デモ環境のため、実際の書類内容は表示されません
                </p>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                  <div className="space-y-2 text-left">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  実際の環境では、PDFビューアーまたは画像プレビューが表示されます
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
