'use client'

import { useState } from 'react'
import { Student } from '@/types'
import { ExpandableRow } from './ExpandableRow'
import { BulkActionBar } from './BulkActionBar'
import { cn } from '@/lib/utils'
import { Search, ChevronUp, ChevronDown, CheckSquare } from 'lucide-react'
import { SortField, SortOrder } from './FilterTabs'

interface StudentTableProps {
  students: Student[]
  sortField: SortField
  sortOrder: SortOrder
  onSortChange: (field: SortField, order: SortOrder) => void
}

export function StudentTable({ students, sortField, sortOrder, onSortChange }: StudentTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectionMode, setSelectionMode] = useState(false)
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(students.map(s => s.id)))
    } else {
      setSelectedIds(new Set())
    }
  }
  
  const handleSelectOne = (studentId: string, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(studentId)
    } else {
      newSelected.delete(studentId)
    }
    setSelectedIds(newSelected)
  }
  
  const isAllSelected = students.length > 0 && students.every(s => selectedIds.has(s.id))
  const isSomeSelected = selectedIds.size > 0
  const selectedStudents = students.filter(s => selectedIds.has(s.id))

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      onSortChange(field, 'asc')
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' 
      ? <ChevronUp className="h-3 w-3 ml-1" />
      : <ChevronDown className="h-3 w-3 ml-1" />
  }

  const toggleSelectionMode = () => {
    if (selectionMode) {
      setSelectedIds(new Set())
    }
    setSelectionMode(!selectionMode)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {students.length}名の学生
          {selectedIds.size > 0 && (
            <span className="ml-2 text-primary-600 font-semibold">
              （{selectedIds.size}名選択中）
            </span>
          )}
        </div>
        
        <button
          onClick={toggleSelectionMode}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors",
            selectionMode 
              ? "bg-primary-50 text-primary-700" 
              : "text-gray-500 hover:bg-gray-100"
          )}
        >
          <CheckSquare className="h-4 w-4" />
          {selectionMode ? '選択解除' : '選択モード'}
        </button>
      </div>
      
      {isSomeSelected && (
        <BulkActionBar 
          selectedStudents={selectedStudents}
          onClearSelection={() => setSelectedIds(new Set())}
        />
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {selectionMode && (
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
              )}
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('name')}
              >
                <span className="flex items-center">
                  氏名
                  <SortIcon field="name" />
                </span>
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                国籍
              </th>
              <th 
                className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('deadline')}
              >
                <span className="flex items-center">
                  申請締切日
                  <SortIcon field="deadline" />
                </span>
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                残り日数
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                書類
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('status')}
              >
                <span className="flex items-center">
                  ステータス
                  <SortIcon field="status" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <ExpandableRow
                key={student.id}
                student={student}
                isSelected={selectedIds.has(student.id)}
                onSelectChange={(checked) => handleSelectOne(student.id, checked)}
                selectionMode={selectionMode}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {students.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-300 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            該当する学生が見つかりません
          </h3>
          <p className="text-gray-500">
            検索条件やフィルタを変更してください
          </p>
        </div>
      )}
    </div>
  )
}
