import { lazy, Suspense } from 'react';
import { ArrowRight, Github, Mail } from 'lucide-react';

// 3D ヒーローは重いので遅延ロード（初期表示はテキスト先行）
const Hero3D = lazy(() => import('./Hero3D'));

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex items-center pt-28 pb-20 overflow-hidden"
    >
      <div className="container-prose relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左: コピー（必要な情報だけ） */}
          <div>
            <p className="eyebrow mb-5 animate-fade-in">
              <span aria-hidden="true" className="mr-1">◆</span>
              Open to entrepreneur internships & engineering roles
            </p>

            <h1
              className="font-display text-display-xl text-fg mb-6 animate-fade-up"
              style={{ animationDelay: '80ms' }}
            >
              I ship products, <br className="hidden sm:block" />
              and I lead teams <span className="text-accent">that do too</span>.
            </h1>

            <p
              className="text-fg-muted text-lg max-w-md leading-relaxed mb-9 animate-fade-up"
              style={{ animationDelay: '160ms' }}
            >
              回路基板から本番 Web まで<span className="text-fg">一人で通す</span>エンジニア。
              個人開発の{' '}
              <a
                href="https://grades.fullweak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                GradeS
              </a>
              {' '}は公開1週間で1,200ユーザー、学内では22名のラボをリード。
            </p>

            {/* CTA は2つに絞る（GitHub はナビにある） */}
            <div
              className="flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href="#works"
                className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
              >
                View work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border-strong text-fg px-5 py-2.5 text-sm hover:border-accent hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
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

          {/* 右: 3D（モバイルは下に控えめ表示） */}
          <div className="relative h-[40vh] lg:h-[64vh] -mx-6 md:mx-0 order-last">
            <Suspense fallback={null}>
              <Hero3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
