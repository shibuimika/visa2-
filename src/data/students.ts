import { Student } from '@/types'

// 現在日付: 2026年1月13日を基準にデータを設定
// 全ての申請締切日は未来の日付

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
    residenceExpiry: '2026-04-20',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Check',
    enrollmentDate: '2023-04-01',
    applicationDate: '2026-01-10',
    applicationDeadline: '2026-01-20', // 7日後 - 緊急
    documents: [
      { id: 'd1', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application1.pdf', approvalStatus: 'pending' },
      { id: 'd2', name: 'パスポート写し', uploaded: true, url: '/docs/passport1.pdf', approvalStatus: 'pending' },
      { id: 'd3', name: '在学証明書', uploaded: true, url: '/docs/certificate1.pdf', approvalStatus: 'pending' },
      { id: 'd4', name: '成績証明書', uploaded: true, url: '/docs/grade1.pdf', approvalStatus: 'pending' }
    ],
    approvalHistory: [
      { id: 'h1', documentName: '全書類', action: 'submitted', timestamp: '2026-01-10T09:00:00', actor: '田中 太郎' },
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
    residenceExpiry: '2026-05-15',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Unsubmitted',
    enrollmentDate: '2023-04-01',
    applicationDeadline: '2026-02-15', // 約1ヶ月後 - 通常
    documents: [
      { id: 'd5', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application2.pdf', approvalStatus: 'pending' },
      { id: 'd6', name: 'パスポート写し', uploaded: false },
      { id: 'd7', name: '在学証明書', uploaded: true, url: '/docs/certificate2.pdf', approvalStatus: 'pending' },
      { id: 'd8', name: '成績証明書', uploaded: true, url: '/docs/grade2.pdf', approvalStatus: 'pending' }
    ],
    approvalHistory: [
      { id: 'h4', documentName: '在留期間更新許可申請書', action: 'submitted', timestamp: '2026-01-05T14:30:00', actor: '佐藤 花子' },
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
    status: 'Check', // Submittedから変更 - 承認フローをデモするため
    enrollmentDate: '2022-10-01',
    applicationDate: '2025-12-20',
    applicationDeadline: '2026-06-30', // 約5.5ヶ月後 - 通常
    documents: [
      { id: 'd9', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application3.pdf', approvalStatus: 'pending' },
      { id: 'd10', name: 'パスポート写し', uploaded: true, url: '/docs/passport3.pdf', approvalStatus: 'pending' },
      { id: 'd11', name: '在学証明書', uploaded: true, url: '/docs/certificate3.pdf', approvalStatus: 'pending' },
      { id: 'd12', name: '成績証明書', uploaded: true, url: '/docs/grade3.pdf', approvalStatus: 'pending' }
    ],
    approvalHistory: [
      { id: 'h7', documentName: '全書類', action: 'submitted', timestamp: '2025-12-20T10:00:00', actor: '李 明' },
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
    status: 'Check', // Submittedから変更 - 承認フローをデモするため
    enrollmentDate: '2023-01-15',
    applicationDate: '2026-01-02',
    applicationDeadline: '2026-03-15', // 約2ヶ月後 - 通常
    documents: [
      { id: 'd13', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application4.pdf', approvalStatus: 'pending' },
      { id: 'd14', name: 'パスポート写し', uploaded: true, url: '/docs/passport4.pdf', approvalStatus: 'pending' },
      { id: 'd15', name: '在学証明書', uploaded: true, url: '/docs/certificate4.pdf', approvalStatus: 'pending' },
      { id: 'd16', name: '成績証明書', uploaded: true, url: '/docs/grade4.pdf', approvalStatus: 'pending' }
    ],
    approvalHistory: [
      { id: 'h15', documentName: '全書類', action: 'submitted', timestamp: '2026-01-02T11:00:00', actor: 'スミス ジョン' },
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
    residenceExpiry: '2026-05-20',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Need Fix',
    enrollmentDate: '2023-07-01',
    applicationDate: '2026-01-09',
    applicationDeadline: '2026-02-20', // 約1ヶ月後 - 通常
    documents: [
      { id: 'd17', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application5.pdf', approvalStatus: 'approved' },
      { id: 'd18', name: 'パスポート写し', uploaded: true, url: '/docs/passport5.pdf', approvalStatus: 'rejected' },
      { id: 'd19', name: '在学証明書', uploaded: true, url: '/docs/certificate5.pdf', approvalStatus: 'approved' },
      { id: 'd20', name: '成績証明書', uploaded: true, url: '/docs/grade5.pdf', approvalStatus: 'pending' }
    ],
    approvalHistory: [
      { id: 'h17', documentName: '全書類', action: 'submitted', timestamp: '2026-01-09T10:15:00', actor: 'ガルシア マリア' },
      { id: 'h18', documentName: 'パスポート写し', action: 'rejected', timestamp: '2026-01-10T14:30:00', actor: '管理者' },
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
    applicationDeadline: '2026-04-20', // 約3ヶ月後 - 通常
    documents: [
      { id: 'd21', name: '在留期間更新許可申請書', uploaded: false },
      { id: 'd22', name: 'パスポート写し', uploaded: true, url: '/docs/passport6.pdf', approvalStatus: 'pending' },
      { id: 'd23', name: '在学証明書', uploaded: false },
      { id: 'd24', name: '成績証明書', uploaded: false }
    ],
    approvalHistory: [
      { id: 'h21', documentName: 'パスポート写し', action: 'submitted', timestamp: '2026-01-11T16:00:00', actor: '陳 美麗' },
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
    residenceExpiry: '2026-04-20',
    schoolName: '東京日本語学校',
    applicationType: '在留期間更新',
    status: 'Check',
    enrollmentDate: '2022-04-01',
    applicationDate: '2026-01-12',
    applicationDeadline: '2026-01-25', // 12日後 - 緊急
    documents: [
      { id: 'd25', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application7.pdf', approvalStatus: 'pending' },
      { id: 'd26', name: 'パスポート写し', uploaded: true, url: '/docs/passport7.pdf', approvalStatus: 'pending' },
      { id: 'd27', name: '在学証明書', uploaded: true, url: '/docs/certificate7.pdf', approvalStatus: 'pending' },
      { id: 'd28', name: '成績証明書', uploaded: true, url: '/docs/grade7.pdf', approvalStatus: 'pending' }
    ],
    approvalHistory: [
      { id: 'h22', documentName: '全書類', action: 'submitted', timestamp: '2026-01-12T09:00:00', actor: 'ムラー ハンス' },
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
    status: 'Applying',
    enrollmentDate: '2023-04-01',
    applicationDate: '2025-12-28',
    applicationDeadline: '2026-05-28', // 約4.5ヶ月後 - 通常
    documents: [
      { id: 'd29', name: '在留期間更新許可申請書', uploaded: true, url: '/docs/application8.pdf', approvalStatus: 'approved' },
      { id: 'd30', name: 'パスポート写し', uploaded: true, url: '/docs/passport8.pdf', approvalStatus: 'approved' },
      { id: 'd31', name: '在学証明書', uploaded: true, url: '/docs/certificate8.pdf', approvalStatus: 'approved' },
      { id: 'd32', name: '成績証明書', uploaded: true, url: '/docs/grade8.pdf', approvalStatus: 'approved' }
    ],
    approvalHistory: [
      { id: 'h26', documentName: '全書類', action: 'submitted', timestamp: '2025-12-28T15:00:00', actor: 'ロッシ アンナ' },
      { id: 'h27', documentName: '全書類', action: 'approved', timestamp: '2026-01-03T10:00:00', actor: '管理者' },
    ]
  }
]
