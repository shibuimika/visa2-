import { Document } from '@/types'
import { cn } from '@/lib/utils'

interface SubmissionCountProps {
  documents: Document[]
  className?: string
}

export function SubmissionCount({ documents, className }: SubmissionCountProps) {
  const totalDocuments = documents.length
  const submittedDocuments = documents.filter(doc => doc.uploaded).length
  
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700',
      className
    )}>
      {submittedDocuments}/{totalDocuments}
    </span>
  )
}
