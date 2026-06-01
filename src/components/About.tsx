import { ArrowUpRight } from 'lucide-react';

// 実績（厳選・数字 or 第三者評価つき。「やってる」止まりは載せない）
const ACHIEVEMENTS = [
  { tag: 'リード', text: 'トモシゴト Design & Code lab. で22名・3チームを本番運用までリード' },
  { tag: '成果', text: '部内シフト生成を数理最適化し、運用負担を90%削減' },
  { tag: '採択', text: '公的スタートアップ支援 ¥500,000 採択（日本政策金融公庫 共催）' },
  { tag: '受賞', text: '学内ベンチャーコンテスト M&A企業賞・地域信用金庫賞' },
  { tag: '受賞', text: '学内ハッカソン データサイエンス賞' },
];

// 使用技術（2段：書いて出荷した / 触った・補助的に使う）
const STACK_PRO = [
  'TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL',
  'C/C++', 'ESP32', 'nRF52840', 'KiCad', 'MCP', 'Docker', 'n8n',
];
const STACK_TOUCHED = ['Go', 'Kubernetes', 'Terraform', 'Playwright', 'Ollama', 'ROS2'];

const AFFILIATIONS = [
  { label: 'DUFP', detail: '同志社大学公認フォーミュラチーム · 全日本学生フォーミュラ大会' },
  { label: 'トモシゴト', detail: '同志社大学ローム記念館プロジェクト（Design & Code lab.）· リーダー' },
  { label: 'DRC', detail: '同志社大学公認ロボット研究会 · 関西春ロボコン 2026' },
];

// 経歴（確実な年のみ）
const TIMELINE = [
  { period: '2024.04', text: '同志社大学 機械システム工学科 入学' },
  { period: '2025.04', text: 'トモシゴト Design & Code lab. のリーダーに就任' },
];

const LINKS = [
  { label: 'GitHub', handle: 'Pens-1', href: 'https://github.com/Pens-1' },
  { label: 'Zenn', handle: 'pockypen', href: 'https://zenn.dev/pockypen' },
  { label: 'Email', handle: 'me@yamataku.dev', href: 'mailto:me@yamataku.dev' },
];

const StackGroup = ({ label, items }: { label: string; items: string[] }) => (
  <div>
    <div className="font-mono text-[11px] text-fg-faint mb-2.5">{label}</div>
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span
          key={s}
          className="font-mono text-[11px] text-fg-muted border border-border px-2 py-0.5"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-32 md:py-44 border-t border-border">
      <div className="container-prose">
        <header className="mb-14">
          <div className="eyebrow mb-3">03 / About</div>
          <h2 className="font-display text-display-lg text-fg">私について。</h2>
        </header>

        {/* Intro — 1〜2文。学生であることは「在学中に」で1点だけ滲ませる */}
        <p className="max-w-2xl text-fg text-lg leading-relaxed mb-20">
          単調な作業を自動化し、<span className="text-accent">人が創造に集中できる</span>状態を作るエンジニア。
          同志社大学 機械システム工学科に在学しながら、プロダクト開発・受託・22名チームのリードを並行している。
        </p>

        <div className="space-y-16">
          {/* 実績 */}
          <div>
            <div className="eyebrow mb-5">実績</div>
            <ul className="border-t border-border">
              {ACHIEVEMENTS.map((a) => (
                <li
                  key={a.text}
                  className="grid md:grid-cols-[6rem_1fr] gap-1 md:gap-6 py-4 border-b border-border"
                >
                  <span className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] md:pt-0.5">
                    {a.tag}
                  </span>
                  <span className="text-fg leading-relaxed">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 使用技術 */}
          <div>
            <div className="eyebrow mb-5">使用技術</div>
            <div className="space-y-5">
              <StackGroup label="書いて出荷した" items={STACK_PRO} />
              <StackGroup label="触った・補助的に使う" items={STACK_TOUCHED} />
            </div>
          </div>

          {/* 所属 */}
          <div>
            <div className="eyebrow mb-5">所属</div>
            <div className="space-y-2.5">
              {AFFILIATIONS.map((a) => (
                <div key={a.label} className="flex items-baseline gap-4 text-sm">
                  <span className="font-mono text-[11px] text-fg-faint w-24 flex-shrink-0">{a.label}</span>
                  <span className="text-fg-muted leading-relaxed">{a.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 経歴 */}
          <div>
            <div className="eyebrow mb-5">経歴</div>
            <div className="border-t border-border">
              {TIMELINE.map((t) => (
                <div key={t.text} className="flex items-baseline gap-4 py-3 border-b border-border">
                  <span className="font-mono text-[11px] text-fg-faint w-24 flex-shrink-0 tabular-nums">{t.period}</span>
                  <span className="text-fg-muted text-sm leading-relaxed">{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* リンク */}
          <div>
            <div className="eyebrow mb-5">リンク</div>
            <div className="border-t border-border">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-baseline gap-4 py-3 border-b border-border hover:bg-elevated/30 px-2 -mx-2 transition-colors"
                >
                  <span className="font-mono text-[11px] text-fg-faint w-24 flex-shrink-0">{l.label}</span>
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
