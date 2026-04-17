import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { Github, ExternalLink, ArrowLeft, Lock } from 'lucide-react';
import { getWorkById, GROUP_META } from '../lib/works';
import MDXComponents from './MDXComponents';

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const work = id ? getWorkById(parseInt(id)) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-fg mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/')}
            className="font-mono text-[11px] text-accent uppercase tracking-[0.15em] hover:underline underline-offset-4"
          >
            ← Back home
          </button>
        </div>
      </div>
    );
  }

  const groupLabel = GROUP_META[work.group].label;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container-prose py-5">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        </div>
      </header>

      <div className="container-prose py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">
          {/* Main */}
          <article className="min-w-0">
            <div className="mb-10">
              <div className="eyebrow mb-3">{groupLabel}</div>
              <h1 className="font-display text-display-lg text-fg mb-3">
                {work.title}
              </h1>
              {work.subtitle && (
                <p className="text-fg-muted text-lg leading-relaxed max-w-2xl">
                  {work.subtitle}
                </p>
              )}
            </div>

            <div className="mdx-content">
              <MDXProvider components={MDXComponents}>
                <work.Content />
              </MDXProvider>
            </div>

            <div className="mt-20 pt-8 border-t border-border">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 font-mono text-[11px] text-accent uppercase tracking-[0.15em] hover:underline underline-offset-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All works
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            <div className="border border-border p-5">
              <div className="eyebrow mb-4">Details</div>
              <dl className="space-y-3 text-[13px]">
                <div>
                  <dt className="font-mono text-fg-faint text-[10px] uppercase tracking-[0.15em] mb-1">Year</dt>
                  <dd className="text-fg">{work.year}</dd>
                </div>
                <div>
                  <dt className="font-mono text-fg-faint text-[10px] uppercase tracking-[0.15em] mb-1">Category</dt>
                  <dd className="text-fg">{groupLabel}</dd>
                </div>
                {work.repoVisibility && (
                  <div>
                    <dt className="font-mono text-fg-faint text-[10px] uppercase tracking-[0.15em] mb-1">Repo</dt>
                    <dd className="inline-flex items-center gap-1 text-fg">
                      {work.repoVisibility === 'private' && <Lock className="w-3 h-3" />}
                      {work.repoVisibility}
                    </dd>
                  </div>
                )}
              </dl>

              {(work.githubUrl || work.demoUrl) && (
                <div className="mt-5 pt-5 border-t border-border space-y-2">
                  {work.demoUrl && (
                    <a
                      href={work.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[13px] text-accent hover:underline underline-offset-4"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                  {work.githubUrl && (
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[13px] text-fg-muted hover:text-accent"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="border border-border p-5">
              <div className="eyebrow mb-3">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {work.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-fg-muted border border-border px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {work.metrics && (
              <div className="border border-border p-5">
                <div className="eyebrow mb-3">Traction</div>
                <dl className="space-y-2.5">
                  {work.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint">{m.label}</dt>
                      <dd className="font-display text-xl font-semibold text-accent tabular-nums">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
