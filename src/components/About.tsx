import { Github } from 'lucide-react';

const LAYERS = [
  {
    name: 'Hardware',
    items: ['ESP32', 'nRF52840', 'PMW3610 (SPI)', 'PlatformIO', 'KiCad (Python-gen)'],
  },
  {
    name: 'Embedded',
    items: ['C/C++', 'Arduino framework', 'BLE', 'WiFi / raw HTTP'],
  },
  {
    name: 'Backend',
    items: ['Python', 'FastAPI', 'Flask', 'PostgreSQL', 'Alembic', 'Docker'],
  },
  {
    name: 'ML / Automation',
    items: ['PyTorch', 'Stable-Baselines3 (PPO)', 'OR-Tools', 'Playwright', 'Ollama / local LLM', 'MCP Protocol'],
  },
  {
    name: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Infra',
    items: ['Cloudflare Workers', 'Cloudflare Tunnel', 'Nginx', 'OpenMediaVault (SMB)', 'n8n', 'Self-hosted GPU'],
  },
];

const TIMELINE = [
  {
    year: 'Now',
    title: 'Freelance · Running GradeS',
    description:
      'CrowdWorks で継続受託。並行して grades.fullweak.com を運用(リリース1週間で 1,200+ ユーザー / 60K 検索)。',
  },
  {
    year: '2025',
    title: 'Track Job Hackathon — Team Lead',
    description:
      'ハッカソンに参加しチームを牽引。短期プロトタイプとプレゼンの両輪を回す役割。',
  },
  {
    year: '2025',
    title: 'Joined Student Dev Ecosystem',
    description: '学生エンジニアコミュニティに参加。モダンな開発フローとチーム開発のベストプラクティスを実戦投入。',
  },
  {
    year: '2024',
    title: 'Vancouver — Global Experience',
    description: '語学留学。異文化環境での突破力と、英語での技術ドキュメント読解を獲得。',
  },
];

const CLIENT_WORK = [
  'Google 検索結果の自動収集システム(継続依頼)',
  'Gemini API による自動リスト生成システム',
  'メールアドレス存在確認ツール(SMTP 検証、1,000件一括)',
  'ワンクリック・スクリーンショット → クラウド自動保存(Go)',
  '生成 AI を用いた時系列データ分析環境',
  'Microsoft Graph API × GAS でデバイスデータ取得',
  'LLM アプリケーション開発支援',
];

const About = () => {
  return (
    <section id="about" className="py-28 md:py-36 border-t border-border">
      <div className="container-prose">
        <header className="mb-14">
          <div className="eyebrow mb-3">03. About</div>
          <h2 className="font-display text-display-lg text-fg mb-4">
            Background.
          </h2>
        </header>

        {/* Intro */}
        <div className="prose-readable max-w-3xl mb-16">
          <p className="text-fg text-lg leading-relaxed mb-5">
            回路基板から本番 Web サービスまで、<span className="text-accent">全部一人で通せる</span>エンジニアを目指している。
          </p>
          <p className="text-fg-muted leading-relaxed mb-5">
            Python 中心の自動化・AI 駆動開発が主戦場。
            最近は ESP32 ファームウェアと自作ワイヤレスキーボードの PCB 自動生成、
            ローカル LLM を使ったブラウザエージェントなど、
            レイヤーを跨いだ実装を続けている。
          </p>
          <p className="text-fg-muted leading-relaxed">
            「単調な作業をプログラムに任せ、人間が創造的な活動に集中できる状態」を作ることに
            一番興味がある。だから成果物は手元の時間を取り戻すツールか、他人の時間を取り戻すプロダクトになりがち。
          </p>
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-border-strong text-fg px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub / Pens-1
          </a>
        </div>

        {/* Skills as Layers */}
        <div className="mb-20">
          <div className="eyebrow mb-4">Stack, by layer</div>
          <div className="border border-border">
            {LAYERS.map((l, i) => (
              <div
                key={l.name}
                className={`grid grid-cols-12 gap-4 px-5 py-4 ${
                  i !== LAYERS.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="col-span-12 md:col-span-3">
                  <div className="font-display font-semibold text-fg">{l.name}</div>
                </div>
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-2 gap-y-1">
                  {l.items.map((it, j) => (
                    <span key={it} className="font-mono text-[12px] text-fg-muted">
                      {it}
                      {j < l.items.length - 1 && <span className="text-fg-faint ml-2">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="eyebrow mb-4">Journey</div>
          <ol className="border-l border-border-strong pl-6 space-y-8">
            {TIMELINE.map((t, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                <div className="font-mono text-[11px] text-fg-faint uppercase tracking-[0.15em] mb-1">
                  {t.year}
                </div>
                <h3 className="font-display font-semibold text-fg mb-1.5">{t.title}</h3>
                <p className="text-fg-muted text-sm leading-relaxed max-w-2xl">
                  {t.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Client Work */}
        <div>
          <div className="eyebrow mb-4">Client work · CrowdWorks</div>
          <h3 className="font-display text-xl font-semibold text-fg mb-3">
            受託実績の抜粋
          </h3>
          <p className="text-fg-muted text-sm mb-5 max-w-2xl">
            自動化・Web アプリ・AI 統合を軸に継続受託しています。以下は納品済みの案件の一部。
          </p>
          <ul className="space-y-2">
            {CLIENT_WORK.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-mono text-sm text-fg-muted"
              >
                <span className="text-accent mt-0.5">◦</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 font-mono text-[11px] text-fg-faint">
            Qualification: Python 3 Engineering Certification (Basic)
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
