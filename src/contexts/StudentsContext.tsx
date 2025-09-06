'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Student, StudentStatus } from '@/types'
import { studentsData } from '@/data/students'

interface StudentsContextType {
  students: Student[]
  updateStudentStatus: (studentId: string, newStatus: StudentStatus) => void
  updateDocumentApproval: (studentId: string, documentId: string, approvalStatus: 'approved' | 'rejected') => void
  calculateStudentStatus: (student: Student) => StudentStatus
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

export function StudentsProvider({ children }: { children: ReactNode }) {
  // 初期化時に全学生のステータスを正しく計算
  const initializeStudents = (data: Student[]): Student[] => {
    return data.map(student => {
      // 未提出書類がある場合
      const hasUnsubmittedDocuments = student.documents.some(doc => !doc.uploaded)
      if (hasUnsubmittedDocuments) {
        return { ...student, status: 'Unsubmitted' }
      }

      // 全ての提出済み書類が承認されている場合
      const uploadedDocs = student.documents.filter(doc => doc.uploaded)
      const allApproved = uploadedDocs.every(doc => doc.approvalStatus === 'approved')
      
      if (allApproved && uploadedDocs.length > 0) {
        return { ...student, status: student.status === 'Applying' ? 'Applying' : 'Submitted' }
      }

      // 差戻しされた書類がある場合
      const hasRejectedDocs = uploadedDocs.some(doc => doc.approvalStatus === 'rejected')
      if (hasRejectedDocs) {
        return { ...student, status: 'Need Fix' }
      }

      // その他の場合は確認中
      return { ...student, status: 'Check' }
    })
  }

  const [students, setStudents] = useState<Student[]>(initializeStudents(studentsData))

  const updateStudentStatus = (studentId: string, newStatus: StudentStatus) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, status: newStatus }
          : student
      )
    )
  }

  const calculateStudentStatus = (student: Student): StudentStatus => {
    // 未提出の書類がある場合
    const hasUnsubmittedDocuments = student.documents.some(doc => !doc.uploaded)
    if (hasUnsubmittedDocuments) {
      return 'Unsubmitted'
    }

    // 全ての提出済み書類が承認されている場合
    const uploadedDocs = student.documents.filter(doc => doc.uploaded)
    const allApproved = uploadedDocs.every(doc => doc.approvalStatus === 'approved')
    
    if (allApproved && uploadedDocs.length > 0) {
      return student.status === 'Applying' ? 'Applying' : 'Submitted'
    }

    // 差戻しされた書類がある場合
    const hasRejectedDocs = uploadedDocs.some(doc => doc.approvalStatus === 'rejected')
    if (hasRejectedDocs) {
      return 'Need Fix'
    }

    // その他の場合は確認中
    return 'Check'
  }

  const updateDocumentApproval = (studentId: string, documentId: string, approvalStatus: 'approved' | 'rejected') => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = {
            ...student,
            documents: student.documents.map(doc =>
              doc.id === documentId
                ? { ...doc, approvalStatus }
                : doc
            )
          }
          // ステータスを自動計算（強制的に再計算）
          const newStatus = calculateStudentStatus(updatedStudent)
          console.log(`Student ${studentId} status updated from ${student.status} to ${newStatus}`)
          return { ...updatedStudent, status: newStatus }
        }
        return student
      })
    )
  }

  return (
    <StudentsContext.Provider value={{ students, updateStudentStatus, updateDocumentApproval, calculateStudentStatus }}>
      {children}
    </StudentsContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentsContext)
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentsProvider')
  }
  return context
}
