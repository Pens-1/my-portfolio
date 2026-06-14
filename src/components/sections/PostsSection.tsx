import { ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';
import { POSTS, ZENN_PROFILE } from '../../lib/posts';

// 白ホリ・アーカイブ（浮かぶ紙片）に重なる最終セクション
const PostsSection = () => (
  <section id="posts" className="relative min-h-[55vh] sm:min-h-[80vh] py-16 sm:py-[14vh] overflow-hidden">
    <span className="watermark-num" aria-hidden="true">
      03
    </span>
    <div className="container-wide relative">
      <div className="max-w-2xl space-y-12">
        <Reveal>
          <header className="heading-rule">
            <h2 className="section-head">
              <span className="num">03</span>Posts
            </h2>
          </header>
        </Reveal>

        {POSTS.length > 0 ? (
          <div className="border-t border-border">
            {POSTS.map((p, i) => (
              <Reveal key={p.url} delay={i * 80}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-4 py-4 border-b border-border hover:bg-elevated/40 px-2 -mx-2 transition-colors"
                >
                  <span className="font-mono text-[11px] text-fg-faint tabular-nums w-20 flex-shrink-0">
                    {p.date}
                  </span>
                  <span className="text-fg-muted group-hover:text-accent transition-colors leading-relaxed">
                    {p.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-fg-faint group-hover:text-accent ml-auto flex-shrink-0 transition-colors" />
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="text-fg-muted leading-relaxed">
              技術記事は準備中。公開したらここに並びます。
            </p>
            <a
              href={ZENN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent font-mono text-sm mt-6 inline-flex"
            >
              Zenn @pockypen
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        )}
      </div>
    </div>
  </section>
);

export default PostsSection;
