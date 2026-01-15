'use client'

import { cn } from '@/lib/utils'
import { getUniqueEnrollmentYearMonths } from '@/lib/date'
import { Student } from '@/types'

interface SidebarProps {
  students: Student[]
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export function Sidebar({ students, selectedFilter, onFilterChange }: SidebarProps) {
  const yearMonths = getUniqueEnrollmentYearMonths(students)
  
  const filters = [
    { value: 'all', label: '全て', count: students.length },
    ...yearMonths.map(ym => ({
      value: ym,
      label: `${ym.substring(0, 4)}年${ym.substring(5)}月入学`,
      count: students.filter(s => s.enrollmentDate.startsWith(ym)).length
    }))
  ]
  
  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      {/* Mobile Filter Buttons */}
      <div className="lg:hidden mb-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "filter-button",
                selectedFilter === filter.value
                  ? "filter-button-active"
                  : "filter-button-inactive"
              )}
            >
              {filter.label}
              <span className="ml-2 text-xs">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          <h2 className="text-lg font-semibold text-gray-900">フィルタ</h2>
        </div>
        <nav className="space-y-1">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                "hover:bg-gray-50",
                selectedFilter === filter.value
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <div className="flex justify-between items-center">
                <span>{filter.label}</span>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  selectedFilter === filter.value
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-500"
                )}>
                  {filter.count}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
