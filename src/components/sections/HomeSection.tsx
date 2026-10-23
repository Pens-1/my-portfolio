import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Github, Mail } from 'lucide-react';
import { scrollManager } from '../../lib/scroll';
import { gsap, MOTION_QUERY } from '../../lib/gsap';

// ヒーロー。文字は左55vw、右は3D（白い廊下の消失点）用の余白
const HomeSection = () => {
  const root = useRef<HTMLElement>(null);

  // 入場: 名前が下から立ち上がり → 下線が伸び → 肩書き・一言・ボタン。合計1.1秒。動きを減らす設定では何もしない
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-hero="name"]', { yPercent: 105, duration: 0.7 }, 0)
          .from('[data-hero="rule"]', { scaleX: 0, duration: 0.4 }, 0.4)
          .from('[data-hero="role"]', { y: 12, opacity: 0, duration: 0.4 }, 0.5)
          .from('[data-hero="lead"]', { y: 12, opacity: 0, duration: 0.4 }, 0.6)
          .from('[data-hero="cta"]', { y: 12, opacity: 0, duration: 0.4 }, 0.7);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="relative">
    <div className="min-h-[88vh] sm:min-h-screen flex items-center">
      <div className="container-wide w-full">
        <div className="max-w-[54rem]">
          <div className="overflow-hidden">
            <h1
              data-hero="name"
              className="font-display font-black text-fg leading-none"
              style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', letterSpacing: '-0.02em' }}
            >
              Yamataku
            </h1>
          </div>

          <div
            data-hero="rule"
            className="h-px w-16 bg-accent mt-7 mb-5 origin-left"
            aria-hidden="true"
          />

          <p
            data-hero="role"
            className="font-mono text-sm sm:text-base text-fg tracking-wide"
          >
            Full-stack <span className="text-fg-faint">/</span> ML{' '}
            <span className="text-fg-faint">/</span> Hardware Engineer
          </p>
          <p
            data-hero="lead"
            className="text-fg-muted mt-3 mb-9 leading-relaxed"
          >
            実運用プロダクトを、<span className="text-accent">一人で本番まで</span>。
          </p>

          <div
            data-hero="cta"
            className="flex flex-wrap items-center gap-3"
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
};

export default HomeSection;
