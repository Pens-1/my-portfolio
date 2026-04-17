import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { getAllWorks, GROUP_META, GROUP_ORDER, type Work, type WorkGroup } from '../lib/works';

const WorkRow = ({ work }: { work: Work }) => {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/work/${work.id}`)}
      className="group grid grid-cols-12 gap-4 py-6 border-b border-border cursor-pointer transition-colors hover:bg-elevated/40 px-3 -mx-3"
    >
      <div className="col-span-12 md:col-span-3">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold text-fg group-hover:text-accent transition-colors">
            {work.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-fg-faint group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint mt-1">
          {work.year}
          {work.repoVisibility === 'private' && (
            <span className="ml-2 inline-flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> private
            </span>
          )}
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        {work.subtitle && (
          <p className="text-fg text-sm mb-1.5">{work.subtitle}</p>
        )}
        <p className="text-fg-muted text-sm leading-relaxed line-clamp-2">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2.5">
          {work.technologies.slice(0, 6).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] text-fg-muted bg-elevated border border-border px-1.5 py-0.5"
            >
              {t}
            </span>
          ))}
          {work.technologies.length > 6 && (
            <span className="font-mono text-[10px] text-fg-faint px-1.5 py-0.5">
              +{work.technologies.length - 6}
            </span>
          )}
        </div>
      </div>

      <div className="col-span-12 md:col-span-3 flex md:justify-end items-start gap-3 pt-1">
        {work.demoUrl && (
          <a
            href={work.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline underline-offset-4"
          >
            <ExternalLink className="w-3 h-3" />
            Live
          </a>
        )}
        {work.githubUrl && (
          <a
            href={work.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-muted hover:text-accent"
          >
            <Github className="w-3 h-3" />
            Code
          </a>
        )}
      </div>
    </article>
  );
};

const FeaturedCard = ({ work }: { work: Work }) => {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/work/${work.id}`)}
      className="group relative border border-border bg-elevated/60 p-6 md:p-8 mb-8 cursor-pointer transition-all hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="eyebrow">Featured · Live Product</span>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-fg mt-2 group-hover:text-accent transition-colors">
            {work.title}
            <ArrowUpRight className="inline-block w-5 h-5 ml-1 -mt-1 text-fg-faint group-hover:text-accent transition-colors" />
          </h3>
          {work.subtitle && (
            <p className="text-fg-muted mt-1.5">{work.subtitle}</p>
          )}
        </div>
      </div>

      {work.metrics && (
        <div className="grid grid-cols-3 gap-px bg-border border border-border my-5">
          {work.metrics.map((m) => (
            <div key={m.label} className="bg-ink px-4 py-3">
              <div className="font-display text-xl md:text-2xl font-semibold text-accent tabular-nums">
                {m.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-fg-muted text-sm leading-relaxed mb-4 max-w-3xl">
        {work.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {work.technologies.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] text-fg-muted border border-border px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-[11px] font-mono">
        {work.demoUrl && (
          <a
            href={work.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4"
          >
            <ExternalLink className="w-3 h-3" />
            grades.fullweak.com
          </a>
        )}
        <span className="text-fg-faint">·</span>
        <span className="text-fg-muted">{work.year}</span>
      </div>
    </article>
  );
};

const Works = () => {
  const works = getAllWorks();
  const grouped = GROUP_ORDER.reduce<Record<WorkGroup, Work[]>>((acc, g) => {
    acc[g] = works.filter((w) => w.group === g && !w.featured);
    return acc;
  }, {} as Record<WorkGroup, Work[]>);

  const featured = works.find((w) => w.featured);

  return (
    <section id="works" className="py-28 md:py-36 border-t border-border">
      <div className="container-prose">
        <header className="mb-14">
          <div className="eyebrow mb-3">02. Works</div>
          <h2 className="font-display text-display-lg text-fg mb-4">
            Things I've built.
          </h2>
          <p className="text-fg-muted max-w-xl">
            11 selected projects across live products, hardware, local LLM automation, ML, and web.
          </p>
        </header>

        {featured && <FeaturedCard work={featured} />}

        {GROUP_ORDER.map((group) => {
          const items = grouped[group];
          if (items.length === 0) return null;
          const meta = GROUP_META[group];
          return (
            <section key={group} className="mt-14">
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border-strong">
                <h3 className="font-display text-xl font-semibold text-fg">
                  {meta.label}
                </h3>
                <span className="font-mono text-[11px] text-fg-faint">
                  {meta.description}
                </span>
              </div>
              <div>
                {items.map((w) => (
                  <WorkRow key={w.id} work={w} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default Works;
