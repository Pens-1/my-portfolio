import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { getAllWorks, type Work } from '../lib/works';

const WorkRow = ({ work }: { work: Work }) => {
  const navigate = useNavigate();
  const metric = work.metrics?.[0];
  return (
    <li
      onClick={() => navigate(`/work/${work.id}`)}
      className="group grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-7 border-b border-border cursor-pointer transition-colors hover:border-accent/50"
    >
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="font-display text-lg md:text-xl font-semibold text-fg group-hover:text-accent transition-colors">
            {work.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-fg-faint group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          {work.featured && metric && (
            <span className="font-mono text-[11px] text-accent">
              {metric.value} {metric.label}
            </span>
          )}
        </div>
        {work.subtitle && (
          <p className="text-fg-muted text-sm mt-1.5 leading-relaxed max-w-xl">{work.subtitle}</p>
        )}
      </div>

      <div className="flex md:flex-col md:items-end items-center gap-x-4 gap-y-1 md:text-right">
        <span className="font-mono text-[11px] text-fg-faint">{work.year}</span>
        <div className="flex items-center gap-3">
          {work.demoUrl && (
            <a
              href={work.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline underline-offset-4"
            >
              <ExternalLink className="w-3 h-3" /> Live
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
              <Github className="w-3 h-3" /> Code
            </a>
          )}
          {work.repoVisibility === 'private' && !work.githubUrl && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-faint">
              <Lock className="w-2.5 h-2.5" /> private
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

const Works = () => {
  const works = getAllWorks();

  return (
    <section id="works" className="py-32 md:py-44 border-t border-border">
      <div className="container-prose">
        <header className="mb-14">
          <div className="eyebrow mb-3">02 / Works</div>
          <h2 className="font-display text-display-lg text-fg">つくったもの。</h2>
        </header>

        <ul className="border-t border-border">
          {works.map((w) => (
            <WorkRow key={w.id} work={w} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Works;
