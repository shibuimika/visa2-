'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Document } from '@/types'
import { X, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocumentPreviewModalProps {
  document: Document
  onClose: () => void
}

export function DocumentPreviewModal({ document, onClose }: DocumentPreviewModalProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // クライアントサイドでのみ document.body を取得
    setPortalContainer(window.document.body)
  }, [])

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* モーダル本体 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary-500" />
            <h3 className="text-lg font-medium text-gray-900">
              {document.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* プレビューエリア */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-gray-100 rounded-lg p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">
              書類プレビュー
            </p>
            <p className="text-sm text-gray-400">
              実際の運用では、ここに書類のプレビューが表示されます
            </p>
            {document.url && (
              <p className="text-xs text-gray-400 mt-4 font-mono">
                URL: {document.url}
              </p>
            )}
          </div>
        </div>
        
        {/* フッター */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          {document.url && (
            <Button variant="outline" size="sm" className="border-gray-300">
              <Download className="h-4 w-4 mr-2" />
              ダウンロード
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onClose} className="border-gray-300">
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )

  // portalContainerが準備できるまでレンダリングしない
  if (!portalContainer) return null
  
  return createPortal(modalContent, portalContainer)
}
