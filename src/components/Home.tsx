import { lazy, Suspense } from 'react';
import { ArrowRight, Github, Mail } from 'lucide-react';

// 3D ヒーローは重いので遅延ロード（初期表示はテキスト先行）
const Hero3D = lazy(() => import('./Hero3D'));

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 背景全面 3D */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      {/* 可読性ビネット: 左を沈めてコピーを読ませる（--ink はテーマ追従で黒/白） */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-ink via-ink/85 to-ink/30 md:to-transparent"
        aria-hidden="true"
      />
      {/* 上下を軽く締める（nav とセクション境界） */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-ink/50 via-transparent to-ink/60"
        aria-hidden="true"
      />

      {/* コピー（左・上層・必要な情報だけ） */}
      <div className="container-prose relative z-10 w-full">
        <div className="max-w-2xl">
          {/* 設計図のマージン罫（装飾） */}
          <div className="h-px w-12 bg-accent mb-6 animate-fade-in" aria-hidden="true" />

          <p className="eyebrow mb-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <span aria-hidden="true" className="mr-1">◆</span>
            受託 &amp; プロダクト開発
          </p>

          <h1
            className="font-display text-display-xl font-black text-fg mb-7 animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            回路基板から<br className="hidden sm:block" />
            本番 Web まで、<br className="hidden sm:block" />
            <span className="text-accent">一人で通す</span>。
          </h1>

          {/* 垂直統合の信号フロー（設計図のタイトルブロック風・装飾） */}
          <p
            className="font-mono text-[11px] text-fg-faint tracking-wide mb-9 animate-fade-up"
            style={{ animationDelay: '260ms' }}
          >
            <span className="text-fg-muted">PCB</span> → ファーム → API → <span className="text-fg-muted">Web</span>
            <span className="mx-2 text-border-strong">/</span>垂直統合
          </p>

          {/* CTA は2つに絞る（GitHub はナビにある） */}
          <div
            className="flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '380ms' }}
          >
            <a
              href="#works"
              className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
            >
              作品を見る
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border-strong text-fg px-5 py-2.5 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              連絡する
            </a>
            <a
              href="https://github.com/Pens-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-2 text-fg-muted px-2 py-2.5 text-sm hover:text-accent transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
