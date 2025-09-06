import { studentsData } from '@/data/students'

export async function generateStaticParams() {
  return studentsData.map((student) => ({
    id: student.id,
  }))
}
