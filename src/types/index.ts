export type StudentStatus = 'Draft' | 'Check' | 'Need Fix' | 'Submitted' | 'Unsubmitted' | 'Applying'

export interface Document {
  id: string
  name: string
  uploaded: boolean
  url?: string
  approvalStatus?: 'pending' | 'approved' | 'rejected'
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
}

export interface StatusConfig {
  label: string
  color: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'primary'
}

export interface RemainingDaysConfig {
  days: number
  color: 'green' | 'yellow' | 'red'
  urgent: boolean
}
