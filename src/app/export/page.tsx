'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useStudents } from '@/contexts/StudentsContext'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, FileSpreadsheet, Upload, Download } from 'lucide-react'
import { formatDate } from '@/lib/date'

export default function ExportPage() {
  const { students } = useStudents()
  const [csvGenerated, setCsvGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submittedStudents = students.filter(student => student.status === 'Submitted')
  
  const generateCSV = async () => {
    setIsGenerating(true)
    
    // CSVデータの生成をシミュレート
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const csvData = [
      ['FamilyName', 'GivenName', 'Nationality', 'BirthDate', 'Gender', 'PassportNo', 'ResidenceStatus', 'ResidenceExpiry', 'SchoolName', 'ApplicationType', 'Status'],
      ...submittedStudents.map(student => [
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
    
    const csvContent = csvData.map(row => row.join(',')).join('\\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `visa_applications_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsGenerating(false)
    setCsvGenerated(true)
  }
  
  const submitToImmigration = async () => {
    setIsSubmitting(true)
    
    // 入管システムへの提出をシミュレート
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    alert('入管オンラインシステムにアップロードしました')
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white shadow-soft border-b border-gray-100">
        <div className="admin-container py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover:bg-gray-100">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  一覧に戻る
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <FileSpreadsheet className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    CSV出力・申請
                  </h1>
                  <p className="text-sm text-gray-500">
                    承認済み学生のCSV出力と入管システムへの申請
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-sm font-medium text-primary-700">
                対象学生: {submittedStudents.length}名
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="admin-container py-6 space-y-6">
        {/* アクションパネル */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">出力・申請操作</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={generateCSV}
              disabled={isGenerating || submittedStudents.length === 0}
              className="min-w-[140px]"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  生成中...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  CSVを生成
                </>
              )}
            </Button>
            
            {csvGenerated && (
              <Button 
                onClick={submitToImmigration}
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    申請中...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    申請する
                  </>
                )}
              </Button>
            )}
          </div>
          
          {csvGenerated && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <FileSpreadsheet className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-800 font-medium">
                  CSVファイルが正常に生成されました
                </p>
              </div>
              <p className="text-green-700 text-sm mt-1">
                {submittedStudents.length}名の学生データをエクスポートしました
              </p>
            </div>
          )}
          
          {submittedStudents.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">
                承認済みの学生がいません
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                CSV出力を行うには、まず学生の申請を承認してください
              </p>
            </div>
          )}
        </div>
        
        {/* 対象学生一覧 */}
        {submittedStudents.length > 0 && (
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                出力対象学生一覧 ({submittedStudents.length}名)
              </h2>
            </div>
            <div className="overflow-hidden">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>氏名</th>
                    <th>国籍</th>
                    <th>パスポート番号</th>
                    <th>在留期限</th>
                    <th>ステータス</th>
                    <th>申請日</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="font-medium">
                        {student.familyName} {student.givenName}
                      </td>
                      <td>{student.nationality}</td>
                      <td className="font-mono text-sm">
                        {student.passportNo}
                      </td>
                      <td>{formatDate(student.residenceExpiry)}</td>
                      <td>
                        <StatusBadge status={student.status} />
                      </td>
                      <td>
                        {student.applicationDate ? formatDate(student.applicationDate) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
