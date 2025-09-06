import Link from 'next/link'
import { studentsData } from '@/data/students'
import { StudentDetailClient } from './StudentDetailClient'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface StudentDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return studentsData.map((student) => ({
    id: student.id,
  }))
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = await params
  const student = studentsData.find(s => s.id === id)
  
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">学生が見つかりません</h1>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return <StudentDetailClient student={student} />
}
