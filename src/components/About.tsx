import { ArrowUpRight } from 'lucide-react';

// 領域（できること） — kotek7 の「領域」に相当
const CAPABILITIES = [
  'Web フロントエンド・バックエンド開発',
  'ローカル LLM・AI エージェント / MCP サーバー',
  '自動化・スクレイピングパイプライン',
  '組み込みファームウェア（ESP32 / nRF52840）',
  '電子回路・基板設計（KiCad・Python 自動生成）',
  'インフラ・DevOps（Docker / Kubernetes / IaC）',
];

// 使用技術（分野別ボックス） — kotek7 の Application Dev / Robotics … と同形式
const STACKS = [
  { label: 'Web・アプリ', items: ['TypeScript', 'React / Next.js', 'Python / FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'] },
  { label: 'AI・自動化', items: ['Python', 'MCP / FastMCP', 'Ollama・ローカル LLM', 'n8n', 'Playwright'] },
  { label: 'ハードウェア・ロボティクス', items: ['C / C++', 'ESP32 / nRF52840', 'KiCad', 'PlatformIO', 'ROS2'] },
  { label: 'インフラ・DevOps', items: ['Kubernetes', 'Terraform', 'Cloudflare Workers', 'Nginx', 'Go'] },
];

const AFFILIATIONS = [
  'トモシゴト Design & Code lab.（同志社大学ローム記念館プロジェクト・リーダー）',
  '同志社大学ロボット研究会 DRC',
  '同志社大学フォーミュラプロジェクト DUFP',
  '同志社大学 理工学部 機械システム工学科',
];

const TIMELINE = [
  { period: '2023.夏', text: 'カナダ留学（高校3年）' },
  { period: '2024.04', text: '同志社大学 理工学部 機械システム工学科 入学' },
  { period: '2025.04', text: 'トモシゴト Design & Code lab. リーダーに就任' },
];

// 活動・受賞 — kotek7 の Activities に相当（実績は About 本体でなくここに集約）
const AWARDS = [
  { period: '2026.02', text: '同志社ハッカソン（DDASH Hacks）— データサイエンス賞' },
  { period: '', text: '同志社ベンチャーコンテスト — ストライク賞・京都中央信用金庫賞' },
  { period: '', text: 'スタートアップ支援 — 事業資金 ¥500,000 採択（日本政策金融公庫 共催）' },
];
const ROBOCON = [
  { period: '2026.03', text: '関西春ロボコン2026 — DRC「輪投げの達人」/ 制御系リーダー' },
];

const LINKS = [
  { label: 'GitHub', handle: '@Pens-1', href: 'https://github.com/Pens-1' },
  { label: 'Zenn', handle: '@pockypen', href: 'https://zenn.dev/pockypen' },
  { label: 'Email', handle: 'me@yamataku.dev', href: 'mailto:me@yamataku.dev' },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="eyebrow mb-5">{children}</div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((it) => (
      <li key={it} className="flex items-baseline gap-2.5 text-fg-muted leading-relaxed">
        <span className="text-accent text-[10px] mt-1.5 flex-shrink-0">◦</span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const About = () => {
  return (
    <section id="about" className="py-32 md:py-44 border-t border-border">
      <div className="container-prose">
        <header className="mb-14">
          <div className="eyebrow mb-3">03 / About</div>
          <h2 className="font-display text-display-lg text-fg">私について。</h2>
        </header>

        {/* Intro — 人柄＋できること＋学生は「在学しながら」で1点 */}
        <p className="max-w-2xl text-fg text-lg leading-relaxed mb-20">
          単調な作業を自動化し、<span className="text-accent">人が創造に集中できる</span>状態を作るエンジニア。
          同志社大学 機械システム工学科に在学しながら、プロダクト開発・受託・22名チームのリードを並行している。
        </p>

        <div className="space-y-16">
          {/* 領域 */}
          <div>
            <SectionLabel>領域</SectionLabel>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-2.5">
              {CAPABILITIES.map((c) => (
                <li key={c} className="flex items-baseline gap-2.5 text-fg-muted leading-relaxed">
                  <span className="text-accent text-[10px] mt-1.5 flex-shrink-0">◦</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 使用技術（分野別ボックス） */}
          <div>
            <SectionLabel>使用技術</SectionLabel>
            <div className="grid md:grid-cols-2 gap-4">
              {STACKS.map((s) => (
                <div key={s.label} className="border border-border p-5 bg-elevated/40">
                  <div className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] mb-3">
                    {s.label}
                  </div>
                  <ul className="space-y-1.5">
                    {s.items.map((i) => (
                      <li key={i} className="flex items-baseline gap-2 font-mono text-[13px] text-fg-muted">
                        <span className="text-fg-faint flex-shrink-0">·</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 所属 */}
          <div>
            <SectionLabel>所属</SectionLabel>
            <BulletList items={AFFILIATIONS} />
          </div>

          {/* 経歴 */}
          <div>
            <SectionLabel>経歴</SectionLabel>
            <div className="border-t border-border">
              {TIMELINE.map((t) => (
                <div key={t.text} className="flex items-baseline gap-5 py-3 border-b border-border">
                  <span className="font-mono text-[11px] text-fg-faint w-20 flex-shrink-0 tabular-nums">
                    {t.period}
                  </span>
                  <span className="text-fg-muted text-sm leading-relaxed">{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 活動・受賞 */}
          <div>
            <SectionLabel>活動・受賞</SectionLabel>
            <div className="space-y-6">
              <div>
                <div className="font-mono text-[11px] text-fg-faint mb-2.5">コンテスト・受賞</div>
                <ul className="space-y-2">
                  {AWARDS.map((a) => (
                    <li key={a.text} className="flex items-baseline gap-3 text-fg-muted text-sm leading-relaxed">
                      <span className="font-mono text-[11px] text-fg-faint tabular-nums w-16 flex-shrink-0">
                        {a.period || '—'}
                      </span>
                      <span>{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[11px] text-fg-faint mb-2.5">ロボコン</div>
                <ul className="space-y-2">
                  {ROBOCON.map((r) => (
                    <li key={r.text} className="flex items-baseline gap-3 text-fg-muted text-sm leading-relaxed">
                      <span className="font-mono text-[11px] text-fg-faint tabular-nums w-16 flex-shrink-0">
                        {r.period}
                      </span>
                      <span>{r.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* リンク */}
          <div>
            <SectionLabel>リンク</SectionLabel>
            <div className="border-t border-border">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-baseline gap-4 py-3 border-b border-border hover:bg-elevated/30 px-2 -mx-2 transition-colors"
                >
                  <span className="font-mono text-[11px] text-fg-faint w-20 flex-shrink-0">{l.label}</span>
                  <span className="font-mono text-sm text-fg-muted group-hover:text-accent transition-colors">
                    {l.handle}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-fg-faint group-hover:text-accent ml-auto transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
