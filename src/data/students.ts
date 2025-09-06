import { Student } from '@/types'

export const studentsData: Student[] = [
  {
    id: '1',
    familyName: '田中',
    givenName: '太郎',
    nationality: '中国',
    birthDate: '1998-05-15',
    gender: 'M',
    passportNo: 'C12345678',
    residenceStatus: '留学',
    residenceExpiry: '2026-03-15',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Check',
    enrollmentDate: '2023-04-01',
    applicationDate: '2024-08-15',
    applicationDeadline: '2025-12-15',
    documents: [
      { id: 'd1', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application1.pdf', approvalStatus: 'pending' },
      { id: 'd2', name: 'パスポート写し', uploaded: true, url: '/docs/passport1.pdf', approvalStatus: 'pending' },
      { id: 'd3', name: '在学証明書', uploaded: true, url: '/docs/certificate1.pdf', approvalStatus: 'pending' },
      { id: 'd4', name: '成績証明書', uploaded: false, approvalStatus: 'pending' }
    ]
  },
  {
    id: '2',
    familyName: '佐藤',
    givenName: '花子',
    nationality: 'ベトナム',
    birthDate: '1999-12-03',
    gender: 'F',
    passportNo: 'V87654321',
    residenceStatus: '留学',
    residenceExpiry: '2026-01-15',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Unsubmitted',
    enrollmentDate: '2023-04-01',
    applicationDate: '2024-08-10',
    applicationDeadline: '2025-10-15',
    documents: [
      { id: 'd5', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application2.pdf', approvalStatus: 'pending' },
      { id: 'd6', name: 'パスポート写し', uploaded: false, approvalStatus: 'pending' },
      { id: 'd7', name: '在学証明書', uploaded: true, url: '/docs/certificate2.pdf', approvalStatus: 'pending' },
      { id: 'd8', name: '成績証明書', uploaded: true, url: '/docs/grade2.pdf', approvalStatus: 'pending' }
    ]
  },
  {
    id: '3',
    familyName: '李',
    givenName: '明',
    nationality: '韓国',
    birthDate: '1997-08-22',
    gender: 'M',
    passportNo: 'K11223344',
    residenceStatus: '留学',
    residenceExpiry: '2026-09-30',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Submitted',
    enrollmentDate: '2022-10-01',
    applicationDate: '2024-07-25',
    applicationDeadline: '2026-06-30',
    documents: [
      { id: 'd9', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application3.pdf', approvalStatus: 'approved' },
      { id: 'd10', name: 'パスポート写し', uploaded: true, url: '/docs/passport3.pdf', approvalStatus: 'approved' },
      { id: 'd11', name: '在学証明書', uploaded: true, url: '/docs/certificate3.pdf', approvalStatus: 'approved' },
      { id: 'd12', name: '成績証明書', uploaded: true, url: '/docs/grade3.pdf', approvalStatus: 'approved' }
    ]
  },
  {
    id: '4',
    familyName: 'スミス',
    givenName: 'ジョン',
    nationality: 'アメリカ',
    birthDate: '1996-11-10',
    gender: 'M',
    passportNo: 'US9876543',
    residenceStatus: '留学',
    residenceExpiry: '2026-06-15',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Submitted',
    enrollmentDate: '2023-01-15',
    applicationDate: '2024-08-20',
    applicationDeadline: '2026-03-15',
    documents: [
      { id: 'd13', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application4.pdf', approvalStatus: 'approved' },
      { id: 'd14', name: 'パスポート写し', uploaded: true, url: '/docs/passport4.pdf', approvalStatus: 'approved' },
      { id: 'd15', name: '在学証明書', uploaded: true, url: '/docs/certificate4.pdf', approvalStatus: 'approved' },
      { id: 'd16', name: '成績証明書', uploaded: true, url: '/docs/grade4.pdf', approvalStatus: 'approved' }
    ]
  },
  {
    id: '5',
    familyName: 'ガルシア',
    givenName: 'マリア',
    nationality: 'ブラジル',
    birthDate: '2000-02-28',
    gender: 'F',
    passportNo: 'BR5555666',
    residenceStatus: '留学',
    residenceExpiry: '2026-02-20',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Unsubmitted',
    enrollmentDate: '2023-07-01',
    applicationDate: '2024-09-01',
    applicationDeadline: '2025-11-20',
    documents: [
      { id: 'd17', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application5.pdf', approvalStatus: 'pending' },
      { id: 'd18', name: 'パスポート写し', uploaded: true, url: '/docs/passport5.pdf', approvalStatus: 'rejected' },
      { id: 'd19', name: '在学証明書', uploaded: false, approvalStatus: 'pending' },
      { id: 'd20', name: '成績証明書', uploaded: true, url: '/docs/grade5.pdf', approvalStatus: 'pending' }
    ]
  },
  {
    id: '6',
    familyName: '陳',
    givenName: '美麗',
    nationality: '台湾',
    birthDate: '1998-07-14',
    gender: 'F',
    passportNo: 'TW7777888',
    residenceStatus: '留学',
    residenceExpiry: '2026-07-20',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Unsubmitted',
    enrollmentDate: '2023-10-01',
    applicationDeadline: '2026-04-20',
    documents: [
      { id: 'd21', name: '在留期間更新許可申請書', uploaded: false, approvalStatus: 'pending' },
      { id: 'd22', name: 'パスポート写し', uploaded: true, url: '/docs/passport6.pdf', approvalStatus: 'pending' },
      { id: 'd23', name: '在学証明書', uploaded: false, approvalStatus: 'pending' },
      { id: 'd24', name: '成績証明書', uploaded: false, approvalStatus: 'pending' }
    ]
  },
  {
    id: '7',
    familyName: 'ムラー',
    givenName: 'ハンス',
    nationality: 'ドイツ',
    birthDate: '1995-04-05',
    gender: 'M',
    passportNo: 'DE1234567',
    residenceStatus: '留学',
    residenceExpiry: '2026-04-06',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Check',
    enrollmentDate: '2022-04-01',
    applicationDate: '2024-08-05',
    applicationDeadline: '2026-01-06',
    documents: [
      { id: 'd25', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application7.pdf', approvalStatus: 'pending' },
      { id: 'd26', name: 'パスポート写し', uploaded: true, url: '/docs/passport7.pdf', approvalStatus: 'pending' },
      { id: 'd27', name: '在学証明書', uploaded: true, url: '/docs/certificate7.pdf', approvalStatus: 'pending' },
      { id: 'd28', name: '成績証明書', uploaded: true, url: '/docs/grade7.pdf', approvalStatus: 'pending' }
    ]
  },
  {
    id: '8',
    familyName: 'ロッシ',
    givenName: 'アンナ',
    nationality: 'イタリア',
    birthDate: '1999-09-18',
    gender: 'F',
    passportNo: 'IT9999000',
    residenceStatus: '留学',
    residenceExpiry: '2026-08-28',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Submitted',
    enrollmentDate: '2023-04-01',
    applicationDate: '2024-08-30',
    applicationDeadline: '2026-05-28',
    documents: [
      { id: 'd29', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application8.pdf', approvalStatus: 'approved' },
      { id: 'd30', name: 'パスポート写し', uploaded: true, url: '/docs/passport8.pdf', approvalStatus: 'approved' },
      { id: 'd31', name: '在学証明書', uploaded: true, url: '/docs/certificate8.pdf', approvalStatus: 'approved' },
      { id: 'd32', name: '成績証明書', uploaded: true, url: '/docs/grade8.pdf', approvalStatus: 'approved' }
    ]
  }
]
