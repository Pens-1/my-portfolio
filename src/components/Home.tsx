import { ArrowRight, Github, Mail } from 'lucide-react';

const METRICS = [
  { value: '60K', label: 'searches' },
  { value: '1,200+', label: 'users' },
  { value: '25,670', label: 'records' },
];

const STACK = [
  'Hardware (ESP32, nRF52840, KiCad)',
  'Embedded C/C++',
  'Python · FastAPI · PostgreSQL',
  'TypeScript · React · Next.js',
  'Local LLM · Playwright · Docker',
  'ML (PPO, 数理最適化)',
];

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-32 pb-24"
    >
      <div className="container-prose">
        <p className="eyebrow mb-6 animate-fade-in">
          <span aria-hidden="true" className="mr-1">◆</span>
          Available for select freelance work
        </p>

        <h1
          className="font-display text-display-xl text-fg mb-8 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          Engineer who ships <br className="hidden sm:block" />
          products people <span className="text-accent">actually use</span>.
        </h1>

        <p
          className="text-fg-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-8 animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          I build across the stack — from{' '}
          <span className="text-fg">ESP32 firmware</span> to{' '}
          <span className="text-fg">production web services</span>.
          Currently running <a href="https://grades.fullweak.com" target="_blank" rel="noopener noreferrer" className="link-accent">GradeS</a>,
          a grade database for Doshisha University students,
          and taking on freelance work on CrowdWorks.
        </p>

        {/* Metric strip */}
        <div
          className="grid grid-cols-3 gap-px bg-border border border-border mb-10 animate-fade-up"
          style={{ animationDelay: '240ms' }}
          aria-label="GradeS early traction metrics"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="bg-ink px-5 py-5 md:px-7 md:py-6">
              <div className="font-display text-2xl md:text-3xl font-semibold text-fg tabular-nums">
                {m.value}
              </div>
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-fg-faint mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-[11px] text-fg-faint -mt-8 mb-10">
          GradeS — first week after launch (2026.03)
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '320ms' }}>
          <a
            href="#works"
            className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-6 py-3 text-sm transition-transform hover:-translate-y-0.5"
          >
            View work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border-strong text-fg px-6 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-fg-muted px-2 py-3 text-sm hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </div>

        {/* Stack list */}
        <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
          <div className="eyebrow mb-3">Stack</div>
          <ul className="space-y-1.5 font-mono text-[13px] text-fg-muted">
            {STACK.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span className="text-accent/70 mt-0.5">—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
