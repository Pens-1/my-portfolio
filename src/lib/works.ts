export type WorkGroup = 'live' | 'automation' | 'hardware' | 'ml' | 'web';

export interface Work {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  group: WorkGroup;
  year: string;
  featured?: boolean;
  highlight?: boolean;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  repoVisibility?: 'public' | 'private';
  metrics?: { label: string; value: string }[];
}

// 詳細ページ廃止に伴い MDX frontmatter をプレーンデータ化（本文は捨て、メタデータのみ保持）
const WORKS: Work[] = [
  {
    id: 1,
    slug: 'grades',
    title: 'GradeS',
    subtitle: '大学生のための成績データベース',
    group: 'live',
    year: '2026.03',
    featured: true,
    highlight: true,
    description:
      '同志社大学の成績分布・GPA・F率・難易度分類を検索できる公開サービス。2020〜2025年の講義データ25,670件を格納。リリース1週間で検索60,000回・1,200人超が利用。',
    technologies: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Cloudflare Workers', 'Nginx', 'Docker', 'Playwright'],
    repoVisibility: 'private',
    metrics: [
      { label: '検索数 (1週間)', value: '60,000' },
      { label: 'ユーザー (1週間)', value: '1,200+' },
      { label: '講義データ', value: '25,670' },
    ],
  },
  {
    id: 12,
    slug: 'nou-system',
    title: '能楽部シフト表生成システム',
    subtitle: '部員84名に導入、運用負担を90%削減した実運用スケジューラー',
    group: 'live',
    year: '2026.04',
    featured: true,
    highlight: true,
    description:
      '能楽部の練習時間割を自動生成する Web アプリ。出席確認とシフト作成を週2回繰り返す運用を置き換え、管理者の負担を90%削減した。登録ユーザー84名、2026年4月から本格運用。',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Kubernetes', 'Nginx', 'Docker'],
    repoVisibility: 'private',
    metrics: [
      { label: '登録ユーザー', value: '84' },
      { label: '管理工数 削減', value: '-90%' },
    ],
  },
  {
    id: 2,
    slug: 'bt-light',
    title: 'bt-light',
    subtitle: 'claude.aiからMCP経由で操作するESP32ランプ',
    group: 'hardware',
    year: '2026.04',
    description:
      'ESP32 + BLE + WiFi で動くランプのファームウェアと、そのランプを AI エージェントから操作できる MCP サーバーをセットで開発。stdio / HTTP(SSE)両モード対応、Cloudflare Tunnel 経由で claude.ai からもリモート操作できる。',
    technologies: ['C++', 'ESP32', 'PlatformIO', 'BLE', 'WiFi', 'MCP Protocol', 'FastMCP', 'Cloudflare Tunnel', 'Docker'],
    githubUrl: 'https://github.com/Pens-1/bt-light',
    repoVisibility: 'public',
  },
  {
    id: 3,
    slug: 'my-keyboll',
    title: 'my-keyboll × mcp-kicad-sch-api',
    subtitle: 'Python で基板を自動生成する自作無線キーボード',
    group: 'hardware',
    year: '2026.03',
    highlight: true,
    description:
      'nRF52840 + 光学センサー PMW3610 でワイヤレス・トラックボール付きキーボードを設計。KiCad の回路図と基板を Python スクリプトで自動生成し、さらに AI エージェントから KiCad を操作できる MCP サーバーまで自作した。',
    technologies: ['KiCad', 'Python', 'nRF52840', 'PMW3610', 'SPI', 'MCP Protocol', 'PCB Design'],
    githubUrl: 'https://github.com/Pens-1/my-keyboll',
    repoVisibility: 'public',
  },
  {
    id: 7,
    slug: 'hight-agent',
    title: 'hight-agent-ai',
    subtitle: '単位取得計画に特化したローカル AI エージェント',
    group: 'automation',
    year: '2025.11',
    description:
      'ローカルで動作する単位取得特化 AI エージェント。OCR サービス、n8n ワークフロー、バックエンド、フロントを統合した Docker Compose 一式。',
    technologies: ['Python', 'Local LLM', 'n8n', 'OCR', 'Docker', 'Next.js'],
    githubUrl: 'https://github.com/Pens-1/hight-agent-ai',
    repoVisibility: 'public',
  },
  {
    id: 8,
    slug: 'luma',
    title: 'luma',
    subtitle: 'Gemini × n8n で毎朝の予定を組むエージェント',
    group: 'automation',
    year: '2026.02',
    description:
      'n8n + Gemini 1.5 Flash で Google Calendar の予定を毎朝自動解析し、空き時間にタスクを詰め直して Discord に通知する個人用エージェント。',
    technologies: ['n8n', 'Gemini API', 'Google Calendar API', 'Notion API', 'Discord Webhook', 'Docker'],
    githubUrl: 'https://github.com/Pens-1/luma',
    repoVisibility: 'public',
  },
  {
    id: 9,
    slug: 'nou-ai',
    title: '能の練習スケジュール生成 AI',
    subtitle: '強化学習PPOで学習する場面ベースのスケジュール生成',
    group: 'ml',
    year: '2025.09',
    description:
      '能の練習表作成を強化学習(PPO)で解く。従来の「人を割り当てる」設計を「場面を割り当てる」設計に置き換え、動的に変わる部屋数・人数・時間帯へ対応させた。',
    technologies: ['Python', 'PyTorch', 'Stable-Baselines3', 'PPO', 'Gymnasium', 'Reinforcement Learning'],
    repoVisibility: 'private',
  },
  {
    id: 10,
    slug: 'synckyoto',
    title: 'SyncKyoto',
    subtitle: 'Gale-Shapley で挑む京都オーバーツーリズム',
    group: 'ml',
    year: '2026.02',
    description:
      '京都のオーバーツーリズム問題に対し、Gale-Shapley マッチングと行動経済的インセンティブを組み合わせた観光客/観光地マッチング Web アプリ。',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Nginx', 'Docker', 'Gemini API'],
    repoVisibility: 'private',
  },
  {
    id: 11,
    slug: 'ortools-scheduling',
    title: 'OR-Tools Schedule Optimizer',
    subtitle: '制約ベースのスケジュール検証モジュール',
    group: 'ml',
    year: '2025.11',
    description:
      'Google OR-Tools を使って複雑な制約(優先順位・人員・時間帯)を満たすスケジュールを生成するモジュール。制約充足問題としての定式化と検証がスコープ。',
    technologies: ['Python', 'OR-Tools', 'Constraint Programming'],
    githubUrl: 'https://github.com/Pens-1/ortools-scheduling-verify',
    repoVisibility: 'public',
  },
  {
    id: 13,
    slug: 'black-ram',
    title: 'BLACK RAM 公式サイト',
    subtitle: '友人のバンドのために作った公式サイト（試聴・ライブ・SNS）',
    group: 'web',
    year: '2026.10',
    description:
      '京都のバンド BLACK RAM の公式サイト。EP を Spotify 埋め込みでその場で試聴でき、白黒のストロボ演出ヒーロー、ライブ情報、SNS 導線を備える。企画から実装・公開まで一人で担当。',
    technologies: ['Astro', 'TypeScript', 'Cloudflare'],
    githubUrl: 'https://github.com/Pens-1/black-ram-hp',
    demoUrl: 'https://blackram-music.com/',
    repoVisibility: 'public',
  },
  {
    id: 14,
    slug: 'tomosigoto-site',
    title: 'トモシゴト Design & Code lab. 公式サイト',
    subtitle: '同志社大学ローム記念館プロジェクトの公式サイトを一人で制作',
    group: 'web',
    year: '2026.08',
    description:
      'リーダーを務めるプロジェクト「トモシゴト Design & Code lab.」の公式サイト。AI活用を前提とするプログラミング教育基盤を展開するチームの活動を紹介する。設計から実装・公開まで一人で担当。',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
    demoUrl: 'https://tomosigoto.pages.dev/',
    repoVisibility: 'private',
  },
  {
    id: 15,
    slug: 'portfolio',
    title: 'このポートフォリオ',
    subtitle: 'taste-skill 等で設計し Claude Code で実装した本サイト',
    group: 'web',
    year: '2026.10',
    description:
      'ESP32 基板を手続き生成した 3D ヒーローと、グリッド背景・名前主役のレイアウトで構成した1ページのポートフォリオ。デザイン系スキル（taste-skill ほか）で方針を詰め、Claude Code で実装した。',
    technologies: ['React', 'TypeScript', 'Vite', 'Three.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Pens-1/my-portfolio',
    repoVisibility: 'public',
  },
];

export const getAllWorks = (): Work[] =>
  [...WORKS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.year.localeCompare(a.year);
  });

export const GROUP_META: Record<WorkGroup, { label: string; description: string }> = {
  live: {
    label: '実運用プロダクト',
    description: 'Shipped to real users.',
  },
  automation: {
    label: 'ローカルLLM・自動化',
    description: 'AI agents, MCP servers, scraping pipelines.',
  },
  hardware: {
    label: 'ハードウェア・組込み',
    description: 'ESP32, nRF52840, PCB design.',
  },
  ml: {
    label: '機械学習・最適化',
    description: '強化学習・マッチング・制約最適化でスケジューリング問題を解く。',
  },
  web: {
    label: 'フルスタックWeb',
    description: 'Databases, APIs, interfaces.',
  },
};

// ML・最適化をハード/自動化より前に（アルゴリズム力を技術的差別化として前面に出す）
export const GROUP_ORDER: WorkGroup[] = ['live', 'ml', 'hardware', 'automation', 'web'];
