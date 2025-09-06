'use client'

import { useState, useMemo } from 'react'
import { useStudents } from '@/contexts/StudentsContext'
import { Sidebar } from '@/components/Sidebar'
import { StudentTable } from '@/components/StudentTable'
import { getEnrollmentYearMonth } from '@/lib/date'

export default function HomePage() {
  const { students } = useStudents()
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  const filteredStudents = useMemo(() => {
    if (selectedFilter === 'all') {
      return students.filter(student => student.status !== 'Draft')
    }
    
    return students.filter(student => 
      student.status !== 'Draft' && 
      getEnrollmentYearMonth(student.enrollmentDate) === selectedFilter
    )
  }, [students, selectedFilter])
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white shadow-soft border-b border-gray-100">
        <div className="admin-container py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  ビザ申請サポートシステム
                </h1>
                <p className="text-sm text-gray-500">
                  東京日本語学校 - 在留期間更新管理
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* ヘッダーボタンを削除 */}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content with Liquid Layout */}
      <div className="admin-container py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar 
            students={students.filter(s => s.status !== 'Draft')}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
          <div className="flex-1 min-w-0">
            <StudentTable students={filteredStudents} />
          </div>
        </div>
      </div>
    </div>
  )
}
