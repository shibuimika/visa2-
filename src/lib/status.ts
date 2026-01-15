import { StudentStatus, StatusConfig } from '@/types'

export const statusConfig: Record<StudentStatus, StatusConfig> = {
  'Draft': {
    label: '下書き',
    icon: 'edit',
  },
  'Check': {
    label: '確認待ち',
    icon: 'clock',
  },
  'Need Fix': {
    label: '要修正',
    icon: 'alert',
    isUrgent: true,
  },
  'Submitted': {
    label: '承認完了',
    icon: 'check',
  },
  'Unsubmitted': {
    label: '書類不足',
    icon: 'file',
  },
  'Applying': {
    label: '申請中',
    icon: 'send',
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
