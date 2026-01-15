'use client'

import { Student, StudentStatus } from '@/types'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

export type SortField = 'deadline' | 'name' | 'status'
export type SortOrder = 'asc' | 'desc'

export interface FilterState {
  status: StudentStatus | 'all'
  sortField: SortField
  sortOrder: SortOrder
  searchTerm: string
}

interface FilterTabsProps {
  students: Student[]
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

interface TabConfig {
  value: StudentStatus | 'all'
  label: string
}

const tabs: TabConfig[] = [
  { value: 'all', label: '全て' },
  { value: 'Check', label: '確認待ち' },
  { value: 'Need Fix', label: '要修正' },
  { value: 'Unsubmitted', label: '書類不足' },
  { value: 'Submitted', label: '承認完了' },
  { value: 'Applying', label: '申請中' },
]

export function FilterTabs({ students, filters, onFilterChange }: FilterTabsProps) {
  const activeStudents = students.filter(s => s.status !== 'Draft')
  
  const getCounts = (status: StudentStatus | 'all'): number => {
    if (status === 'all') return activeStudents.length
    return activeStudents.filter(s => s.status === status).length
  }

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex -mb-px">
          {tabs.map(tab => {
            const count = getCounts(tab.value)
            const isActive = filters.status === tab.value
            
            return (
              <button
                key={tab.value}
                onClick={() => updateFilter('status', tab.value)}
                className={cn(
                  'filter-tab',
                  isActive ? 'filter-tab-active' : 'filter-tab-inactive'
                )}
              >
                {tab.label}
                <span className={cn(
                  'ml-1.5 text-xs',
                  isActive ? 'text-primary-500' : 'text-gray-400'
                )}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>
        
        <div className="flex items-center gap-2 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="検索..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="pl-9 w-48 h-8 text-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            />
            {filters.searchTerm && (
              <button
                onClick={() => updateFilter('searchTerm', '')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function applyFilters(students: Student[], filters: FilterState): Student[] {
  let filtered = [...students]
  filtered = filtered.filter(s => s.status !== 'Draft')

  if (filters.status !== 'all') {
    filtered = filtered.filter(s => s.status === filters.status)
  }

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase()
    filtered = filtered.filter(student => 
      student.familyName.toLowerCase().includes(searchLower) ||
      student.givenName.toLowerCase().includes(searchLower) ||
      student.passportNo.toLowerCase().includes(searchLower) ||
      student.nationality.toLowerCase().includes(searchLower)
    )
  }

  const statusOrder: Record<StudentStatus, number> = {
    'Need Fix': 0,
    'Check': 1,
    'Unsubmitted': 2,
    'Submitted': 3,
    'Applying': 4,
    'Draft': 5,
  }

  filtered.sort((a, b) => {
    let comparison = 0
    switch (filters.sortField) {
      case 'deadline':
        comparison = new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
        break
      case 'name':
        comparison = `${a.familyName}${a.givenName}`.localeCompare(`${b.familyName}${b.givenName}`)
        break
      case 'status':
        comparison = statusOrder[a.status] - statusOrder[b.status]
        break
    }
    return filters.sortOrder === 'asc' ? comparison : -comparison
  })

  return filtered
}
