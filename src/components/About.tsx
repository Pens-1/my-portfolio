import { Award, Banknote, Github, Trophy, Users } from 'lucide-react';

const DOMAINS = [
  {
    name: 'Full-Stack Web & Product',
    summary: 'Ship real products with real users.',
    stack: ['TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Local LLM & Automation',
    summary: 'Private AI agents, MCP servers, scraping pipelines.',
    stack: ['Python', 'Ollama', 'Qwen', 'faster-whisper', 'MCP Protocol', 'Playwright', 'n8n', 'Function Calling'],
  },
  {
    name: 'Hardware, IoT & Embedded',
    summary: 'PCB, firmware, and MCP servers that let AI touch the physical world.',
    stack: ['C/C++', 'ESP32', 'nRF52840', 'Arduino / PlatformIO', 'KiCad', 'BLE / WiFi', 'ZMK firmware', 'FastMCP', 'Cloudflare Tunnel'],
  },
  {
    name: 'Infra & DevOps',
    summary: 'Containers, edge, on-prem. IaC when the scale calls for it.',
    stack: ['Docker', 'Kubernetes', 'Terraform', 'Cloudflare Workers', 'Cloudflare Tunnel', 'Nginx', 'OpenMediaVault'],
  },
];

const TIMELINE = [
  {
    year: 'Now',
    title: 'Project Lead · Tomosigoto Lab(ローム記念館プロジェクト第23期)',
    description:
      '15名の学生ラボをリード。ダイキン工業様との連携でコードレビュー → TDD+スキーマ駆動へ移行。並行して grades.fullweak.com を個人で運用(1週間で1,200ユーザー/60K検索)。',
  },
  {
    year: '2025',
    title: 'Awards · ハッカソン優勝 / DVC ストライク賞',
    description:
      '同志社ハッカソン(98名28チーム)で運営チーム優勝、自チームはデータサイエンス賞。同志社ベンチャーコンテストで M&A ストライク賞と京都中央信用金庫賞。',
  },
  {
    year: '2025',
    title: 'Funding · KOIN ビジネス実践ラボ 採択',
    description:
      '京都経済センター KOIN 主催、ちえ森 × 日本政策金融公庫共催のビジネス実践ラボに採択され、事業資金 50 万円を獲得。',
  },
  {
    year: '2024',
    title: 'Global Experience · Vancouver',
    description:
      '語学留学。異文化環境での突破力と、英語での技術ドキュメント読解を獲得。',
  },
];

const AWARDS = [
  {
    label: '同志社ハッカソン(98名28チーム)',
    detail: 'チーム優勝🏆 + 自チーム データサイエンス賞',
  },
  {
    label: 'DVC 同志社ベンチャーコンテスト',
    detail: 'ストライク賞(M&A) + 京都中央信用金庫賞',
  },
];

const FUNDING = {
  label: 'KOIN ビジネス実践ラボ 採択',
  detail: '¥500,000 交付 · ちえ森 × 日本政策金融公庫 共催 · 京都経済センター',
};

const PARTNERSHIPS = [
  {
    label: 'ダイキン工業',
    detail: 'プロエンジニアによるコードレビュー、TDD/スキーマ駆動開発への移行支援',
  },
];

const AFFILIATIONS = [
  { label: 'DUFP', detail: 'Doshisha University Formula Project(機械研究会)· 全日本学生フォーミュラ大会' },
  { label: 'DRC', detail: 'Doshisha Robot Club · 関西春ロボコン 2026 チーム所属' },
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
          <div className="eyebrow mb-3">04. About</div>
          <h2 className="font-display text-display-lg text-fg mb-4">
            Background.
          </h2>
        </header>

        {/* Intro */}
        <div className="max-w-3xl mb-16">
          <p className="text-fg text-lg leading-relaxed mb-5">
            回路基板から本番 Web サービスまで、<span className="text-accent">全部一人で通せる</span>エンジニアを目指し、
            <span className="text-accent">チームで通す</span>ための運営も並行して学んでいる。
          </p>
          <p className="text-fg-muted leading-relaxed mb-5">
            「単調な作業をプログラムに任せ、人間が創造的な活動に集中できる状態」を作ることに
            一番興味がある。だから成果物は手元の時間を取り戻すツールか、他人の時間を取り戻すプロダクトになりがち。
          </p>
          <p className="text-fg-muted leading-relaxed">
            学生ラボのリーダーをやる中で、**プロエンジニアのコードレビューを受けて TDD・スキーマ駆動へ移行した経験** が、自分の技術観の芯を作った。
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

        {/* Stack by Domain */}
        <div className="mb-20">
          <div className="eyebrow mb-4">Stack · by domain</div>
          <div className="grid md:grid-cols-2 gap-4">
            {DOMAINS.map((d) => (
              <div key={d.name} className="border border-border p-5 bg-elevated/40">
                <div className="font-display font-semibold text-fg">{d.name}</div>
                <p className="font-mono text-[11px] text-fg-faint mt-1 mb-3 leading-relaxed">
                  {d.summary}
                </p>
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
            Qualification: Python 3 Engineering Certification (Basic)
          </div>
        </div>

        {/* Client Work */}
        <div className="mb-20">
          <div className="eyebrow mb-4">Client work · CrowdWorks</div>
          <p className="text-fg-muted text-sm mb-5 max-w-2xl">
            自動化・Web アプリ・AI 統合を軸に継続受託。以下は納品済みの案件の一部。
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
        </div>

        {/* Timeline */}
        <div>
          <div className="eyebrow mb-4">Journey</div>
          <ol className="border-l border-border-strong pl-6 space-y-7">
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
      </div>
    </section>
  );
};

// Separate Leadership section — exported for App.tsx
export const Leadership = () => {
  return (
    <section id="leadership" className="py-28 md:py-36 border-t border-border bg-elevated/20">
      <div className="container-prose">
        <header className="mb-12">
          <div className="eyebrow mb-3">Leadership & Recognition</div>
          <h2 className="font-display text-display-lg text-fg mb-4">
            What I've been trusted with.
          </h2>
          <p className="text-fg-muted max-w-xl">
            人と会社と公的機関に託されてきた役割・実績。技術だけでは達成できない成果。
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Leadership */}
          <div className="md:col-span-2 border border-accent/30 bg-ink p-6">
            <div className="flex items-start gap-3 mb-3">
              <Users className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <div className="eyebrow mb-1">Project Lead</div>
                <h3 className="font-display text-xl font-semibold text-fg">
                  Tomosigoto Lab(第23期ローム記念館プロジェクト)
                </h3>
                <p className="text-fg-muted text-sm mt-2 leading-relaxed">
                  「ゼロからの AI 活用型プログラミング人材育成プロジェクト」を掲げた学生ラボ。
                  <span className="text-fg">15名・3チーム体制</span>でリード。
                  要件定義 → 設計 → テスト駆動実装 → 本番運用までを学生のみで回す文化を作り、
                  企業連携・コンテスト受賞・公的採択の三方向で成果を出している。
                </p>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="border border-border p-6 bg-ink">
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <div className="eyebrow mb-3">Awards</div>
                <ul className="space-y-3">
                  {AWARDS.map((a) => (
                    <li key={a.label}>
                      <div className="font-display font-semibold text-fg text-sm">
                        {a.label}
                      </div>
                      <div className="text-fg-muted text-[13px] mt-0.5 leading-relaxed">
                        {a.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Funding */}
          <div className="border border-border p-6 bg-ink">
            <div className="flex items-start gap-3">
              <Banknote className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <div className="eyebrow mb-3">Public Funding</div>
                <div className="font-display font-semibold text-fg text-sm">
                  {FUNDING.label}
                </div>
                <div className="text-fg-muted text-[13px] mt-1 leading-relaxed">
                  {FUNDING.detail}
                </div>
              </div>
            </div>
          </div>

          {/* Partnerships */}
          <div className="border border-border p-6 bg-ink">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <div className="eyebrow mb-3">Corporate Partnerships</div>
                <ul className="space-y-3">
                  {PARTNERSHIPS.map((p) => (
                    <li key={p.label}>
                      <div className="font-display font-semibold text-fg text-sm">
                        {p.label}
                      </div>
                      <div className="text-fg-muted text-[13px] mt-0.5 leading-relaxed">
                        {p.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Affiliations */}
          <div className="border border-border p-6 bg-ink">
            <div className="eyebrow mb-3">Affiliations</div>
            <ul className="space-y-2.5">
              {AFFILIATIONS.map((a) => (
                <li key={a.label}>
                  <div className="font-display font-semibold text-fg text-sm">
                    {a.label}
                  </div>
                  <div className="text-fg-muted text-[12px] mt-0.5 leading-relaxed">
                    {a.detail}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
