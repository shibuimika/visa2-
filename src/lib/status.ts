import { StudentStatus, StatusConfig } from '@/types'

export const statusConfig: Record<StudentStatus, StatusConfig> = {
  'Draft': {
    label: '下書き',
    color: 'secondary'
  },
  'Check': {
    label: '確認待ち',
    color: 'warning'
  },
  'Need Fix': {
    label: '修正必要',
    color: 'danger'
  },
  'Submitted': {
    label: '承認済み',
    color: 'success'
  },
  'Unsubmitted': {
    label: '未提出',
    color: 'secondary'
  },
  'Applying': {
    label: '申請中',
    color: 'primary'
  }
}

export function getStatusConfig(status: StudentStatus): StatusConfig {
  return statusConfig[status]
}

export function updateStudentStatus(students: any[], studentId: string, newStatus: StudentStatus) {
  return students.map(student => 
    student.id === studentId 
      ? { ...student, status: newStatus }
      : student
  )
}

