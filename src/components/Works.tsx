import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { getAllWorks, GROUP_META, type Work } from '../lib/works';

const FeaturedCard = ({ work, accent = false }: { work: Work; accent?: boolean }) => {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/work/${work.id}`)}
      className={`group relative border ${
        accent ? 'border-accent/30' : 'border-border'
      } bg-elevated/60 p-6 md:p-7 cursor-pointer transition-all hover:border-accent/60 hover:-translate-y-0.5`}
    >
      <div className="mb-3">
        <span className="eyebrow">{GROUP_META[work.group].label}</span>
        <h3 className="font-display text-xl md:text-2xl font-semibold text-fg mt-2 group-hover:text-accent transition-colors">
          {work.title}
          <ArrowUpRight className="inline-block w-4 h-4 ml-1 -mt-1 text-fg-faint group-hover:text-accent transition-colors" />
        </h3>
        {work.subtitle && (
          <p className="text-fg-muted mt-1.5 text-sm leading-relaxed">{work.subtitle}</p>
        )}
      </div>

      {work.metrics && (
        <div className="grid grid-cols-3 gap-px bg-border border border-border my-4">
          {work.metrics.map((m) => (
            <div key={m.label} className="bg-ink px-3 py-2.5">
              <div className="font-display text-lg md:text-xl font-semibold text-accent tabular-nums leading-none">
                {m.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-fg-faint mt-1 leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-fg-muted text-sm leading-relaxed mb-4 line-clamp-3">
        {work.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {work.technologies.slice(0, 6).map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] text-fg-muted border border-border px-1.5 py-0.5"
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

      <div className="flex items-center gap-3 text-[11px] font-mono">
        {work.demoUrl && (
          <a
            href={work.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4"
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
            className="inline-flex items-center gap-1 text-fg-muted hover:text-accent"
          >
            <Github className="w-3 h-3" />
            Source
          </a>
        )}
        <span className="text-fg-faint ml-auto">{work.year}</span>
      </div>
    </article>
  );
};

const HighlightRow = ({ work }: { work: Work }) => {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/work/${work.id}`)}
      className="group grid grid-cols-12 gap-4 py-6 border-b border-border cursor-pointer transition-colors hover:bg-elevated/40 px-3 -mx-3"
    >
      <div className="col-span-12 md:col-span-3">
        <div className="eyebrow text-fg-faint mb-1.5">{GROUP_META[work.group].label}</div>
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-base font-semibold text-fg group-hover:text-accent transition-colors">
            {work.title}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-fg-faint group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <div className="font-mono text-[10px] text-fg-faint mt-1">
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
          <p className="text-fg text-sm mb-1.5 leading-relaxed">{work.subtitle}</p>
        )}
        <p className="text-fg-muted text-[13px] leading-relaxed line-clamp-2">
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

const OtherRow = ({ work }: { work: Work }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/work/${work.id}`)}
      className="group w-full flex items-baseline gap-4 py-2.5 border-b border-border/60 text-left hover:bg-elevated/30 px-2 -mx-2 transition-colors"
    >
      <span className="font-display font-medium text-fg group-hover:text-accent transition-colors whitespace-nowrap">
        {work.title}
      </span>
      <span className="text-fg-muted text-[13px] truncate flex-1">
        {work.subtitle || work.description}
      </span>
      <span className="font-mono text-[10px] text-fg-faint whitespace-nowrap">
        {GROUP_META[work.group].label.split(' ')[0]} · {work.year}
      </span>
      <ArrowUpRight className="w-3 h-3 text-fg-faint group-hover:text-accent transition-colors" />
    </button>
  );
};

const Works = () => {
  const works = getAllWorks();
  const featured = works.filter((w) => w.featured);
  const highlighted = works.filter((w) => w.highlight && !w.featured);
  const others = works.filter((w) => !w.highlight && !w.featured);

  return (
    <section id="works" className="py-28 md:py-36 border-t border-border">
      <div className="container-prose">
        <header className="mb-12">
          <div className="eyebrow mb-3">02. Works</div>
          <h2 className="font-display text-display-lg text-fg mb-4">
            Things I've built.
          </h2>
          <p className="text-fg-muted max-w-xl">
            5 selected projects — 2 products in active use, 3 technical deep-dives.
            A further {others.length} experiments are listed below.
          </p>
        </header>

        {/* Featured 2 side-by-side */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {featured.map((w) => (
            <FeaturedCard key={w.id} work={w} accent />
          ))}
        </div>

        {/* Selected (highlighted) */}
        {highlighted.length > 0 && (
          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border-strong">
              <h3 className="font-display text-lg font-semibold text-fg">
                Selected technical work
              </h3>
              <span className="font-mono text-[11px] text-fg-faint">
                Deep-dives by domain
              </span>
            </div>
            <div>
              {highlighted.map((w) => (
                <HighlightRow key={w.id} work={w} />
              ))}
            </div>
          </div>
        )}

        {/* Other projects */}
        {others.length > 0 && (
          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border-strong">
              <h3 className="font-display text-lg font-semibold text-fg">
                More projects
              </h3>
              <span className="font-mono text-[11px] text-fg-faint">
                {others.length} experiments & prototypes
              </span>
            </div>
            <div>
              {others.map((w) => (
                <OtherRow key={w.id} work={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;
