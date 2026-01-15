'use client'

import { useState } from 'react'
import { Student, Document } from '@/types'
import { StatusBadge } from './StatusBadge'
import { DeadlineRemainingDays } from './DeadlineRemainingDays'
import { DocumentProgress } from './DocumentProgress'
import { InlineDocumentList } from './InlineDocumentList'
import { ApprovalHistory } from './ApprovalHistory'
import { VisaApplicationModal } from './VisaApplicationModal'
import { DocumentPreviewModal } from './DocumentPreviewModal'
import { useStudents } from '@/contexts/StudentsContext'
import { formatDate, calculateDeadlineRemainingDays } from '@/lib/date'
import { cn } from '@/lib/utils'
import { ChevronRight, ChevronDown, AlertTriangle, Send, History } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExpandableRowProps {
  student: Student
  isSelected: boolean
  onSelectChange: (selected: boolean) => void
  selectionMode: boolean
}

export function ExpandableRow({ student, isSelected, onSelectChange, selectionMode }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showVisaModal, setShowVisaModal] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)
  const { students, updateDocumentApproval, updateStudentStatus } = useStudents()
  
  const currentStudent = students.find(s => s.id === student.id) || student
  const remainingDays = calculateDeadlineRemainingDays(currentStudent.applicationDeadline)
  
  const handleApprove = async (documentId: string) => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    updateDocumentApproval(currentStudent.id, documentId, 'approved')
    setIsUpdating(false)
  }
  
  const handleReject = async (documentId: string) => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    updateDocumentApproval(currentStudent.id, documentId, 'rejected')
    setIsUpdating(false)
  }
  
  const handleApproveAll = async () => {
    setIsUpdating(true)
    const pendingDocs = currentStudent.documents.filter(
      d => d.uploaded && (d.approvalStatus === 'pending' || !d.approvalStatus)
    )
    for (const doc of pendingDocs) {
      await new Promise(resolve => setTimeout(resolve, 200))
      updateDocumentApproval(currentStudent.id, doc.id, 'approved')
    }
    setIsUpdating(false)
  }

  const handleVisaApplication = async () => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateStudentStatus(currentStudent.id, 'Applying')
    setIsUpdating(false)
    setShowVisaModal(false)
  }

  const handleDocumentClick = (document: Document) => {
    setPreviewDocument(document)
  }

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('input[type="checkbox"]')) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  const allDocumentsApproved = currentStudent.documents.every(
    d => d.uploaded && d.approvalStatus === 'approved'
  )

  // 緊急度に応じた行スタイル
  const rowUrgencyClass = 
    remainingDays.urgency === 'urgent' || remainingDays.urgency === 'warning'
      ? 'row-warning' 
      : ''

  return (
    <>
      <tr 
        onClick={handleRowClick}
        className={cn(
          "transition-colors cursor-pointer",
          rowUrgencyClass,
          remainingDays.urgency === 'normal' && "hover:bg-gray-50"
        )}
      >
        {selectionMode && (
          <td className="w-12 px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelectChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
          </td>
        )}
        
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
            {remainingDays.urgency === 'urgent' && (
              <AlertTriangle className="h-4 w-4 text-alert-500 flex-shrink-0" />
            )}
            <span className={cn(
              "font-medium",
              remainingDays.urgency === 'urgent' ? "text-alert-600" : "text-gray-900"
            )}>
              {currentStudent.familyName} {currentStudent.givenName}
            </span>
          </div>
        </td>
        
        <td className="hidden md:table-cell px-4 py-3 text-gray-600">
          {currentStudent.nationality}
        </td>
        
        <td className="hidden sm:table-cell px-4 py-3 text-gray-600">
          {formatDate(currentStudent.applicationDeadline)}
        </td>
        
        <td className="hidden sm:table-cell px-4 py-3">
          <DeadlineRemainingDays deadlineDate={currentStudent.applicationDeadline} />
        </td>
        
        <td className="hidden lg:table-cell px-4 py-3 min-w-[120px]">
          <DocumentProgress documents={currentStudent.documents} />
        </td>
        
        <td className="px-4 py-3">
          <StatusBadge status={currentStudent.status} />
        </td>
      </tr>
      
      {isExpanded && (
        <tr>
          <td colSpan={selectionMode ? 7 : 6} className="px-0 py-0">
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">提出書類</h4>
                  <InlineDocumentList
                    documents={currentStudent.documents}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onApproveAll={handleApproveAll}
                    onDocumentClick={handleDocumentClick}
                    isUpdating={isUpdating}
                  />
                  
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200">
                    {allDocumentsApproved && currentStudent.status !== 'Applying' && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowVisaModal(true)
                        }}
                        disabled={isUpdating}
                        className="bg-primary-500 hover:bg-primary-600 text-white"
                      >
                        <Send className="h-4 w-4 mr-1.5" />
                        ビザ申請
                      </Button>
                    )}
                    
                    {currentStudent.approvalHistory && currentStudent.approvalHistory.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowHistory(!showHistory)
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                      >
                        <History className="h-3 w-3" />
                        {showHistory ? '履歴を隠す' : '履歴を表示'}
                      </button>
                    )}
                  </div>
                  
                  {showHistory && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <ApprovalHistory history={currentStudent.approvalHistory || []} />
                    </div>
                  )}
                </div>
                
                <div className="lg:w-48 lg:border-l lg:border-gray-200 lg:pl-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基本情報</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">パスポート</dt>
                      <dd className="font-mono text-gray-900">{currentStudent.passportNo}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">在留資格</dt>
                      <dd className="text-gray-900">{currentStudent.residenceStatus}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">在留期限</dt>
                      <dd className="text-gray-900">{formatDate(currentStudent.residenceExpiry)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
      
      {/* ビザ申請モーダル */}
      <VisaApplicationModal
        isOpen={showVisaModal}
        onClose={() => setShowVisaModal(false)}
        onConfirm={handleVisaApplication}
        student={currentStudent}
        isLoading={isUpdating}
      />
      
      {/* 書類プレビューモーダル */}
      {previewDocument && (
        <DocumentPreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}
    </>
  )
}
