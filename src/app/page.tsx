'use client'

import { useState, useMemo } from 'react'
import { useStudents } from '@/contexts/StudentsContext'
import { FilterTabs, FilterState, applyFilters, SortField, SortOrder } from '@/components/FilterTabs'
import { ActionSummary } from '@/components/ActionSummary'
import { StudentTable } from '@/components/StudentTable'

export default function HomePage() {
  const { students } = useStudents()
  
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    sortField: 'deadline',
    sortOrder: 'asc',
    searchTerm: '',
  })
  
  const filteredStudents = useMemo(() => {
    return applyFilters(students, filters)
  }, [students, filters])

  const handleFilterUrgent = () => {
    setFilters(prev => ({
      ...prev,
      status: 'all',
      sortField: 'deadline',
      sortOrder: 'asc',
      searchTerm: '',
    }))
  }

  const handleFilterCheck = () => {
    setFilters(prev => ({
      ...prev,
      status: 'Check',
      sortField: 'deadline',
      sortOrder: 'asc',
      searchTerm: '',
    }))
  }

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setFilters(prev => ({
      ...prev,
      sortField: field,
      sortOrder: order,
    }))
  }
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="admin-container py-4">
          <h1 className="text-xl font-bold text-gray-900">
            ビザ申請サポートシステム
          </h1>
          <p className="text-sm text-gray-500">
            東京日本語学校 - 在留期間更新管理
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="admin-container py-6">
        <div className="space-y-6">
          {/* Action Summary */}
          <ActionSummary 
            students={students}
            onFilterUrgent={handleFilterUrgent}
            onFilterCheck={handleFilterCheck}
          />
          
          {/* Filter Tabs */}
          <FilterTabs 
            students={students}
            filters={filters}
            onFilterChange={setFilters}
          />
          
          {/* Student Table */}
          <StudentTable 
            students={filteredStudents}
            sortField={filters.sortField}
            sortOrder={filters.sortOrder}
            onSortChange={handleSortChange}
          />
        </div>
      </main>
    </div>
  )
}
