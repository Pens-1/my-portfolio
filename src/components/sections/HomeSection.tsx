import { ArrowRight, Github, Mail } from 'lucide-react';
import { scrollManager } from '../../lib/scroll';

// ヒーロー。文字は左55vw、右は3D（白い廊下の消失点）用の余白
const HomeSection = () => (
  <section id="home" className="relative">
    <div className="min-h-[88vh] sm:min-h-screen flex items-center">
      <div className="container-wide w-full">
        <div className="max-w-[54rem]">
          <h1
            className="font-display font-black text-fg leading-none opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', letterSpacing: '-0.02em', animationDelay: '120ms' }}
          >
            Yamataku
          </h1>

          <div
            className="h-px w-16 bg-accent mt-7 mb-5 opacity-0 animate-fade-up"
            style={{ animationDelay: '260ms' }}
            aria-hidden="true"
          />

          <p
            className="font-mono text-sm sm:text-base text-fg tracking-wide opacity-0 animate-fade-up"
            style={{ animationDelay: '340ms' }}
          >
            Full-stack <span className="text-fg-faint">/</span> ML{' '}
            <span className="text-fg-faint">/</span> Hardware Engineer
          </p>
          <p
            className="text-fg-muted mt-3 mb-9 leading-relaxed opacity-0 animate-fade-up"
            style={{ animationDelay: '440ms' }}
          >
            実運用プロダクトを、<span className="text-accent">一人で本番まで</span>。
          </p>

          <div
            className="flex flex-wrap items-center gap-3 opacity-0 animate-fade-up"
            style={{ animationDelay: '540ms' }}
          >
            <a
              href="#activities"
              onClick={(e) => {
                e.preventDefault();
                scrollManager.scrollTo('activities');
              }}
              className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
            >
              作品を見る
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:me@yamataku.dev"
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
    </div>
  </section>
);

export default HomeSection;
