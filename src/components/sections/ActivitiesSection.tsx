import { ArrowUpRight, Github } from 'lucide-react';
import Reveal from '../Reveal';
import { getAllWorks, GROUP_META, GROUP_ORDER, type Work } from '../../lib/works';
import { AWARDS, ROBOCON } from '../../lib/activities';

const Links = ({ work }: { work: Work }) => (
  <div className="flex items-center gap-3 flex-shrink-0">
    {work.githubUrl && (
      <a
        href={work.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${work.title} GitHub`}
        className="text-fg-faint hover:text-accent transition-colors"
      >
        <Github className="w-4 h-4" />
      </a>
    )}
    {work.demoUrl && (
      <a
        href={work.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline"
      >
        Live
        <ArrowUpRight className="w-3 h-3" />
      </a>
    )}
  </div>
);

// 主役: 実績付きプロダクトを数字主役で大きく
const FeaturedWork = ({ work, delay }: { work: Work; delay: number }) => (
  <Reveal delay={delay}>
    <article className="border-t-2 border-border-strong pt-6">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h4 className="font-display font-black text-fg text-2xl leading-snug">{work.title}</h4>
        <span className="font-mono text-[11px] text-fg-faint tabular-nums flex-shrink-0">{work.year}</span>
      </div>
      {work.subtitle && <p className="text-sm text-fg-muted mb-5 leading-relaxed">{work.subtitle}</p>}

      {work.metrics && (
        <dl className="flex flex-wrap gap-x-6 gap-y-1.5 mb-5">
          {work.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5">
              <dd className="font-display font-bold text-accent text-base leading-none tabular-nums">
                {m.value}
              </dd>
              <dt className="font-mono text-[11px] text-fg-faint">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-fg-faint leading-relaxed">
          {work.technologies.slice(0, 6).join(' · ')}
        </p>
        <Links work={work} />
      </div>
    </article>
  </Reveal>
);

// 脇役: 罫線区切りのコンパクト行
const WorkRow = ({ work, delay }: { work: Work; delay: number }) => (
  <Reveal delay={delay}>
    <article className="border-t border-border py-5">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h4 className="font-display font-bold text-fg leading-snug">{work.title}</h4>
        <span className="font-mono text-[11px] text-fg-faint tabular-nums flex-shrink-0">{work.year}</span>
      </div>
      {work.subtitle && <p className="text-[13px] text-fg-muted mb-3 leading-relaxed">{work.subtitle}</p>}
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-fg-faint leading-relaxed">
          {work.technologies.slice(0, 5).join(' · ')}
        </p>
        <Links work={work} />
      </div>
    </article>
  </Reveal>
);

const ActivitiesSection = () => {
  const works = getAllWorks();
  const featured = works.filter((w) => w.featured);
  const rest = works.filter((w) => !w.featured);
  const groups = GROUP_ORDER.map((g) => ({
    meta: GROUP_META[g],
    works: rest.filter((w) => w.group === g),
  })).filter((g) => g.works.length > 0);

  return (
    <section id="activities" className="relative py-16 sm:py-[14vh] overflow-hidden">
      <span className="watermark-num" aria-hidden="true">
        02
      </span>
      <div className="container-wide relative">
        <div className="max-w-2xl space-y-12 sm:space-y-16">
          <Reveal>
            <header className="heading-rule">
              <h2 className="section-head">
                <span className="num">02</span>Activities
              </h2>
            </header>
          </Reveal>

          {/* 主役: 実運用で数字が出ているプロダクト */}
          {featured.length > 0 && (
            <div>
              <Reveal>
                <div className="eyebrow mb-6">実運用プロダクト</div>
              </Reveal>
              <div className="space-y-10">
                {featured.map((w, i) => (
                  <FeaturedWork key={w.slug} work={w} delay={i * 100} />
                ))}
              </div>
            </div>
          )}

          {/* 脇役: グループ別（ML・最適化を先頭に） */}
          {groups.map(({ meta, works: groupWorks }) => (
            <div key={meta.label}>
              <Reveal>
                <div className="eyebrow mb-1">{meta.label}</div>
                <p className="text-[12px] text-fg-faint mb-3 leading-relaxed">{meta.description}</p>
              </Reveal>
              <div className="border-b border-border">
                {groupWorks.map((w, i) => (
                  <WorkRow key={w.slug} work={w} delay={i * 80} />
                ))}
              </div>
            </div>
          ))}

          <Reveal>
            <div className="eyebrow mb-5">コンテスト・受賞</div>
            <ul className="space-y-2">
              {AWARDS.map((a) => (
                <li key={a.text} className="flex items-baseline gap-3 text-fg-muted text-sm leading-relaxed">
                  <span className="font-mono text-[11px] text-fg-faint tabular-nums w-16 flex-shrink-0">
                    {a.period}
                  </span>
                  <span>{a.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="eyebrow mb-5">ロボコン</div>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
