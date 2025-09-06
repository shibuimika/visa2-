import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StudentsProvider } from '@/contexts/StudentsContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ビザ申請サポートデモ',
  description: '日本語学校向けビザ申請サポート（在留期間更新）デモ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <StudentsProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </StudentsProvider>
      </body>
    </html>
  )
}

