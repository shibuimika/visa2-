'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Student } from '@/types'
import { StatusBadge } from './StatusBadge'
import { DeadlineRemainingDays } from './DeadlineRemainingDays'
import { SubmissionCount } from './SubmissionCount'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/date'
import { Search, Eye } from 'lucide-react'

interface StudentTableProps {
  students: Student[]
}

export function StudentTable({ students }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      student.familyName.toLowerCase().includes(searchLower) ||
      student.givenName.toLowerCase().includes(searchLower) ||
      student.passportNo.toLowerCase().includes(searchLower)
    )
  })
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">学生一覧</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredStudents.length}名の学生が表示されています
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="氏名・パスポート番号で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-80 border-gray-200 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      
      {/* Modern Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                        <th className="min-w-[140px]">氏名</th>
                        <th className="hidden md:table-cell">国籍</th>
                        <th className="hidden sm:table-cell">申請締切日</th>
                        <th className="hidden sm:table-cell">残り日数</th>
                        <th className="hidden lg:table-cell">提出数／必要数</th>
                        <th>ステータス</th>
                        <th className="w-20">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="min-w-[140px]">
                        <Link 
                          href={`/students/${student.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          {student.familyName} {student.givenName}
                        </Link>
                      </td>
                      <td className="hidden md:table-cell text-gray-600">
                        {student.nationality}
                      </td>
                      <td className="hidden sm:table-cell text-gray-600">
                        {formatDate(student.applicationDeadline)}
                      </td>
                        <td className="hidden sm:table-cell">
                          <DeadlineRemainingDays deadlineDate={student.applicationDeadline} />
                        </td>
                        <td className="hidden lg:table-cell">
                          <SubmissionCount documents={student.documents} />
                        </td>
                        <td>
                          <StatusBadge status={student.status} />
                        </td>
                      <td>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                        >
                          <Link href={`/students/${student.id}`}>
                            <Eye className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">詳細</span>
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              検索結果が見つかりません
            </h3>
            <p className="text-gray-500">
              検索条件を変更してもう一度お試しください
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
