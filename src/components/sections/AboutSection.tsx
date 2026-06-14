import { ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';

// 「何ができるか」を端的に（詳細な道具は使用技術で見せる）
const CAPABILITIES = [
  'Web 開発',
  'ローカル LLM・自動化',
  '組み込み・基板設計',
  '機械学習・最適化',
  'インフラ・DevOps',
];

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
  { period: '2024.07', text: 'カナダ留学（高校3年）' },
  { period: '2025.04', text: '同志社大学 理工学部 機械システム工学科 入学' },
  { period: '2026.04', text: 'トモシゴト Design & Code lab. リーダーに就任' },
];

const LINKS = [
  { label: 'GitHub', handle: '@Pens-1', href: 'https://github.com/Pens-1' },
  { label: 'Zenn', handle: '@pockypen', href: 'https://zenn.dev/pockypen' },
  { label: 'Email', handle: 'me@yamataku.dev', href: 'mailto:me@yamataku.dev' },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="eyebrow mb-5">{children}</div>
);

const AboutSection = () => (
  <section id="about" className="relative py-16 sm:py-[14vh] overflow-hidden">
    <span className="watermark-num" aria-hidden="true">
      01
    </span>
    <div className="container-wide relative">
      <div className="max-w-2xl space-y-12 sm:space-y-16">
        <Reveal>
          <header className="mb-2 heading-rule">
            <h2 className="section-head">
              <span className="num">01</span>About
            </h2>
          </header>
          <p className="text-fg text-lg leading-relaxed mt-8">
            単調な作業を自動化し、<span className="text-accent">人が創造に集中できる</span>状態を作るエンジニア。
          </p>
        </Reveal>

        <Reveal>
          <SectionLabel>領域</SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {CAPABILITIES.map((c) => (
              <li
                key={c}
                className="border border-border px-3 py-1.5 text-[13px] text-fg-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <SectionLabel>使用技術</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {STACKS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="border-t border-border-strong pt-4">
                  <div className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] mb-3">
                    {s.label}
                  </div>
                  <p className="font-mono text-[13px] text-fg-muted leading-loose">
                    {s.items.join('  ·  ')}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <SectionLabel>所属</SectionLabel>
          <ul className="space-y-2">
            {AFFILIATIONS.map((a) => (
              <li key={a} className="flex items-baseline gap-2.5 text-fg-muted leading-relaxed">
                <span className="text-accent text-[10px] mt-1.5 flex-shrink-0">◦</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
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
        </Reveal>

        <Reveal>
          <SectionLabel>リンク</SectionLabel>
          <div className="border-t border-border">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-baseline gap-4 py-3 border-b border-border hover:bg-elevated/40 px-2 -mx-2 transition-colors"
              >
                <span className="font-mono text-[11px] text-fg-faint w-20 flex-shrink-0">{l.label}</span>
                <span className="font-mono text-sm text-fg-muted group-hover:text-accent transition-colors">
                  {l.handle}
                </span>
                <ArrowUpRight className="w-3 h-3 text-fg-faint group-hover:text-accent ml-auto transition-colors" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
