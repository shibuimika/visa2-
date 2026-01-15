'use client'

import { useState } from 'react'
import { Student } from '@/types'
import { Button } from '@/components/ui/button'
import { X, Download, FileSpreadsheet, Bell, CheckCircle } from 'lucide-react'

interface BulkActionBarProps {
  selectedStudents: Student[]
  onClearSelection: () => void
}

export function BulkActionBar({ selectedStudents, onClearSelection }: BulkActionBarProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isSendingReminder, setIsSendingReminder] = useState(false)
  const [reminderSent, setReminderSent] = useState(false)
  
  const handleExportCSV = async () => {
    setIsExporting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const csvData = [
      ['FamilyName', 'GivenName', 'Nationality', 'BirthDate', 'Gender', 'PassportNo', 'ResidenceStatus', 'ResidenceExpiry', 'SchoolName', 'ApplicationType', 'Status'],
      ...selectedStudents.map(student => [
        student.familyName,
        student.givenName,
        student.nationality,
        student.birthDate,
        student.gender,
        student.passportNo,
        student.residenceStatus,
        student.residenceExpiry,
        student.schoolName,
        student.applicationType,
        student.status
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `selected_students_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsExporting(false)
  }

  const handleSendReminder = async () => {
    setIsSendingReminder(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSendingReminder(false)
    setReminderSent(true)
    setTimeout(() => setReminderSent(false), 3000)
  }

  const submittedCount = selectedStudents.filter(s => s.status === 'Submitted').length
  const unsubmittedCount = selectedStudents.filter(s => 
    s.documents.some(d => !d.uploaded)
  ).length

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onClearSelection}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          title="選択を解除"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            {selectedStudents.length}名選択中
          </p>
          <p className="text-xs text-gray-500">
            {submittedCount > 0 && `承認完了: ${submittedCount}名`}
            {submittedCount > 0 && unsubmittedCount > 0 && ' / '}
            {unsubmittedCount > 0 && `未提出書類あり: ${unsubmittedCount}名`}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {unsubmittedCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSendReminder}
            disabled={isSendingReminder || reminderSent}
            className="text-sm border-gray-300"
          >
            {reminderSent ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1.5 text-primary-500" />
                <span className="text-primary-600">送信完了</span>
              </>
            ) : isSendingReminder ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-500 mr-2" />
                送信中...
              </>
            ) : (
              <>
                <Bell className="h-3 w-3 mr-1.5" />
                リマインダー ({unsubmittedCount}名)
              </>
            )}
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={isExporting}
          className="text-sm border-gray-300"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500 mr-2" />
              出力中...
            </>
          ) : (
            <>
              <Download className="h-3 w-3 mr-1.5" />
              CSV出力
            </>
          )}
        </Button>
        
        {submittedCount > 0 && (
          <Button
            size="sm"
            onClick={() => window.location.href = '/export'}
            className="text-sm bg-primary-500 hover:bg-primary-600 text-white"
          >
            <FileSpreadsheet className="h-3 w-3 mr-1.5" />
            申請ページへ
          </Button>
        )}
      </div>
    </div>
  )
}
