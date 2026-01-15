export type StudentStatus = 'Draft' | 'Check' | 'Need Fix' | 'Submitted' | 'Unsubmitted' | 'Applying'

export interface Document {
  id: string
  name: string
  uploaded: boolean
  url?: string
  approvalStatus?: 'pending' | 'approved' | 'rejected'
}

// 承認履歴
export interface ApprovalHistoryItem {
  id: string
  documentName: string
  action: 'approved' | 'rejected' | 'submitted'
  timestamp: string
  actor: string
}

export interface Student {
  id: string
  familyName: string
  givenName: string
  nationality: string
  birthDate: string
  gender: 'M' | 'F'
  passportNo: string
  residenceStatus: string
  residenceExpiry: string
  schoolName: string
  applicationType: string
  status: StudentStatus
  enrollmentDate: string
  applicationDate?: string
  applicationDeadline: string
  documents: Document[]
  approvalHistory?: ApprovalHistoryItem[]
}

// シンプル化されたステータス設定
export interface StatusConfig {
  label: string
  icon: 'clock' | 'alert' | 'check' | 'file' | 'send' | 'edit'
  isUrgent?: boolean
}

// 残り日数の設定（期限切れは想定しない）
export type UrgencyLevel = 'urgent' | 'warning' | 'normal'

export interface RemainingDaysConfig {
  days: number
  urgency: UrgencyLevel // 'urgent': 14日以内, 'warning': 30日以内, 'normal': 30日以上
}
