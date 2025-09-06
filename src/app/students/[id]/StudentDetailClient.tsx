'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Student } from '@/types'
import { StatusBadge } from '@/components/StatusBadge'
import { RemainingDays } from '@/components/RemainingDays'
import { DocumentPreview } from '@/components/DocumentPreview'
import { useStudents } from '@/contexts/StudentsContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle, FileText } from 'lucide-react'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'

interface StudentDetailClientProps {
  student: Student
}

export function StudentDetailClient({ student }: StudentDetailClientProps) {
  const router = useRouter()
  const { students, updateDocumentApproval, updateStudentStatus } = useStudents()
  const [isUpdating, setIsUpdating] = useState(false)
  
  // 最新の学生データを取得
  const currentStudent = students.find(s => s.id === student.id) || student
  
  const handleDocumentApprove = async (documentId: string) => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateDocumentApproval(student.id, documentId, 'approved')
    setIsUpdating(false)
  }
  
  const handleDocumentReject = async (documentId: string) => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateDocumentApproval(student.id, documentId, 'rejected')
    setIsUpdating(false)
  }
  
  const handleSubmitApplication = async () => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // ステータスを「申請中」に更新
    updateStudentStatus(student.id, 'Applying')
    
    alert(`${currentStudent.familyName} ${currentStudent.givenName}さんの申請を提出しました`)
    
    setIsUpdating(false)
    router.push('/')
  }
  
  // 全ての提出済み書類が承認されているかチェック
  const allDocumentsApproved = currentStudent.documents
    .filter(doc => doc.uploaded)
    .every(doc => doc.approvalStatus === 'approved')
  
  const hasUploadedDocuments = currentStudent.documents.some(doc => doc.uploaded)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white shadow-soft border-b border-gray-100">
        <div className="admin-container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover:bg-gray-100">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  一覧に戻る
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    学生詳細情報
                  </h1>
                  <p className="text-sm text-gray-500">
                    {currentStudent.familyName} {currentStudent.givenName}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <StatusBadge status={currentStudent.status} />
              <Button
                onClick={handleSubmitApplication}
                disabled={isUpdating || !allDocumentsApproved || !hasUploadedDocuments}
                className={cn(
                  "transition-all duration-200",
                  allDocumentsApproved && hasUploadedDocuments
                    ? "bg-primary-600 hover:bg-primary-700 text-white border-primary-600"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                )}
              >
                {isUpdating ? '処理中...' : '申請'}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="admin-container py-4 space-y-6">
        {/* 基本情報 */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">氏名</label>
                <p className="text-lg font-medium text-gray-900">
                  {currentStudent.familyName} {currentStudent.givenName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">国籍</label>
                <p className="text-gray-900">{currentStudent.nationality}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">生年月日</label>
                <p className="text-gray-900">{formatDate(currentStudent.birthDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">性別</label>
                <p className="text-gray-900">{currentStudent.gender === 'M' ? '男性' : '女性'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">パスポート番号</label>
                <p className="text-gray-900 font-mono">{currentStudent.passportNo}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">在留資格</label>
                <p className="text-gray-900">{currentStudent.residenceStatus}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">在留期限</label>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-900">{formatDate(currentStudent.residenceExpiry)}</p>
                  <RemainingDays expiryDate={currentStudent.residenceExpiry} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">ステータス</label>
                <div className="mt-1">
                  <StatusBadge status={currentStudent.status} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 提出書類 */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">提出書類</h2>
          </div>
          <div className="space-y-3">
            {currentStudent.documents.map((doc) => (
              <DocumentPreview 
                key={doc.id} 
                document={doc}
                onApprove={handleDocumentApprove}
                onReject={handleDocumentReject}
              />
            ))}
          </div>
        </div>
        
        {/* 申請情報 */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">申請情報</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">学校名</label>
              <p className="text-gray-900">{currentStudent.schoolName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">申請種別</label>
              <p className="text-gray-900">{currentStudent.applicationType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">入学年月</label>
              <p className="text-gray-900">{formatDate(currentStudent.enrollmentDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">申請日</label>
              <p className="text-gray-900">
                {currentStudent.applicationDate ? formatDate(currentStudent.applicationDate) : '未申請'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
