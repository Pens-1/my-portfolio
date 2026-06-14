// 活動・受賞・ロボコンの年表データ（activities セクションで表示）
export interface ActivityItem {
  period: string;
  text: string;
}

export const AWARDS: ActivityItem[] = [
  { period: '2025.06', text: '同志社ベンチャーコンテスト — ストライク賞・京都中央信用金庫賞' },
  { period: '2025.08', text: 'スタートアップ支援 — 事業資金 ¥500,000 採択（日本政策金融公庫 共催）' },
  { period: '2026.02', text: '同志社ハッカソン（DDASH Hacks）— データサイエンス賞' },
];

export const ROBOCON: ActivityItem[] = [
  { period: '2026.03', text: '関西春ロボコン2026 — DRC / 制御系リーダー' },
];
