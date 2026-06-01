import { useState } from 'react';
import { Github, ChevronDown } from 'lucide-react';

// 託されてきた役割（先頭3件をデフォルト表示、残りは折りたたみ）
const TRUSTED = [
  { tag: 'リード', title: '学内ラボ 第23期', detail: '22名・3チームを本番運用までリード' },
  { tag: '受賞', title: '学内ハッカソン 優勝', detail: '98名28チーム / データサイエンス賞' },
  { tag: '採択', title: '公的スタートアップ支援', detail: '¥500,000 交付・日本政策金融公庫 共催' },
  { tag: '受賞', title: '学内ベンチャーコンテスト', detail: 'M&A 賞・地域金融機関賞' },
  { tag: '連携', title: '大手製造業', detail: 'TDD / スキーマ駆動への移行支援' },
];

const AFFILIATIONS = [
  { label: 'DUFP', detail: '大学公認フォーミュラチーム · 全日本学生フォーミュラ大会' },
  { label: 'DRC', detail: '大学公認ロボットサークル · 関西春ロボコン 2026' },
];

// デフォルトで見せる代表技術（全スタックは折りたたみの中）
const KEY_STACK = [
  'TypeScript', 'React', 'Python', 'FastAPI',
  'PostgreSQL', 'ESP32', 'KiCad', 'MCP',
];

const DOMAINS = [
  {
    name: 'Web & プロダクト',
    summary: '実ユーザーに届くプロダクト。',
    stack: ['TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'ローカル LLM & 自動化',
    summary: 'AI エージェント・MCP・スクレイピング。',
    stack: ['Python', 'Ollama', 'Qwen', 'faster-whisper', 'MCP', 'Playwright', 'n8n', 'Function Calling'],
  },
  {
    name: 'ハードウェア & 組込み',
    summary: 'PCB・ファーム・物理世界の MCP。',
    stack: ['C/C++', 'ESP32', 'nRF52840', 'PlatformIO', 'KiCad', 'BLE / WiFi', 'ZMK', 'FastMCP'],
  },
  {
    name: 'インフラ & DevOps',
    summary: 'コンテナ・エッジ・オンプレ。',
    stack: ['Docker', 'Kubernetes', 'Terraform', 'Cloudflare Workers', 'Nginx', 'OpenMediaVault'],
  },
];

const CLIENT_WORK = [
  'Google 検索結果の自動収集（継続依頼）',
  'Gemini API でリスト自動生成',
  'メール存在確認ツール（SMTP・1,000件一括）',
  'スクショ → クラウド自動保存（Go）',
  '生成 AI による時系列データ分析環境',
  'Graph API × GAS でデバイスデータ取得',
  'LLM アプリ開発支援',
];

const RoleRow = ({ tag, title, detail }: { tag: string; title: string; detail: string }) => (
  <li className="grid md:grid-cols-[6rem_1fr] gap-1 md:gap-6 py-4 border-b border-border">
    <span className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] md:pt-0.5">{tag}</span>
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
      <span className="font-display font-semibold text-fg">{title}</span>
      <span className="text-fg-muted text-sm">{detail}</span>
    </div>
  </li>
);

const About = () => {
  const [open, setOpen] = useState(false);
  const primary = TRUSTED.slice(0, 3);
  const rest = TRUSTED.slice(3);

  return (
    <section id="about" className="py-32 md:py-44 border-t border-border">
      <div className="container-prose">
        <header className="mb-14">
          <div className="eyebrow mb-3">03 / About</div>
          <h2 className="font-display text-display-lg text-fg mb-4">私について。</h2>
        </header>

        {/* Intro — 1文 */}
        <div className="max-w-2xl mb-16">
          <p className="text-fg text-lg leading-relaxed">
            単調な作業を自動化し、<span className="text-accent">人が創造に集中できる</span>状態を作るエンジニア。
          </p>
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 border border-border-strong text-fg px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub / Pens-1
          </a>
        </div>

        {/* 主要実績（トップ3だけ） */}
        <div className="mb-14">
          <div className="eyebrow mb-5">託されてきた役割</div>
          <ul className="border-t border-border">
            {primary.map((t) => (
              <RoleRow key={t.title} {...t} />
            ))}
          </ul>
        </div>

        {/* 主な技術（代表タグ1行） */}
        <div className="mb-14">
          <div className="eyebrow mb-4">主な技術</div>
          <div className="flex flex-wrap gap-1.5">
            {KEY_STACK.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] text-fg-muted border border-border px-2 py-0.5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* もっと見る — 残りはすべてここに隠す */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group inline-flex items-center gap-2 font-mono text-[11px] text-fg-faint hover:text-accent tracking-[0.12em] uppercase transition-colors"
        >
          {open ? '閉じる' : 'もっと見る'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="animate-fade-in mt-12 space-y-16">
            {/* 残りの役割 + 所属 */}
            <div>
              <div className="eyebrow mb-5">その他の実績・所属</div>
              <ul className="border-t border-border">
                {rest.map((t) => (
                  <RoleRow key={t.title} {...t} />
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                {AFFILIATIONS.map((a) => (
                  <div key={a.label} className="flex items-baseline gap-3 text-sm">
                    <span className="font-mono text-[11px] text-fg-faint w-12 flex-shrink-0">{a.label}</span>
                    <span className="text-fg-muted leading-relaxed">{a.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 技術スタック（分野別・全部） */}
            <div>
              <div className="eyebrow mb-4">技術スタック（分野別）</div>
              <div className="grid md:grid-cols-2 gap-4">
                {DOMAINS.map((d) => (
                  <div key={d.name} className="border border-border p-5 bg-elevated/40">
                    <div className="font-display font-semibold text-fg">{d.name}</div>
                    <p className="font-mono text-[11px] text-fg-faint mt-1 mb-3 leading-relaxed">{d.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] text-fg-muted border border-border px-1.5 py-0.5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-mono text-[11px] text-fg-faint">
                資格: Python 3 エンジニア認定基礎試験
              </div>
            </div>

            {/* 受託実績 */}
            <div>
              <div className="eyebrow mb-4">受託実績 · CrowdWorks</div>
              <p className="text-fg-muted text-sm mb-5 max-w-2xl">
                自動化・Web・AI 統合を軸に継続受託。
              </p>
              <ul className="space-y-2">
                {CLIENT_WORK.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 font-mono text-sm text-fg-muted">
                    <span className="text-accent mt-0.5">◦</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
