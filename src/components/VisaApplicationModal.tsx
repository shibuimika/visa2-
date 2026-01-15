'use client'

import { Student } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Send, CheckCircle, AlertTriangle } from 'lucide-react'
import { formatDate } from '@/lib/date'

interface VisaApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  student: Student
  isLoading: boolean
}

export function VisaApplicationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  student,
  isLoading 
}: VisaApplicationModalProps) {
  const approvedDocs = student.documents.filter(d => d.approvalStatus === 'approved')
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Send className="h-5 w-5 text-primary-500" />
            ビザ申請の確認
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            以下の内容でビザ申請を行います。
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 space-y-4">
          {/* 学生情報 */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              {student.familyName} {student.givenName}
            </h4>
            <dl className="text-sm space-y-1.5">
              <div className="flex justify-between">
                <dt className="text-gray-500">国籍</dt>
                <dd className="text-gray-900">{student.nationality}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">パスポート</dt>
                <dd className="font-mono text-gray-900">{student.passportNo}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">申請種別</dt>
                <dd className="text-gray-900">{student.applicationType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">在留期限</dt>
                <dd className="text-gray-900">{formatDate(student.residenceExpiry)}</dd>
              </div>
            </dl>
          </div>
          
          {/* 承認済み書類 */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-primary-500" />
              承認済み書類 ({approvedDocs.length}件)
            </h5>
            <ul className="text-sm text-gray-600 space-y-1 pl-1">
              {approvedDocs.map(doc => (
                <li key={doc.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0" />
                  {doc.name}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 警告 */}
          <div className="flex items-start gap-2.5 text-sm text-alert-600 bg-alert-50 rounded-lg p-3 border border-alert-100">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>申請後はステータスが「申請中」に変更され、書類の編集ができなくなります。</p>
          </div>
        </div>
        
        <DialogFooter className="px-6 py-4 mt-2 bg-gray-50 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isLoading}
            className="border-gray-300"
          >
            キャンセル
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isLoading}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                処理中...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                申請する
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
