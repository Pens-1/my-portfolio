import { ArrowRight, Github, Mail } from 'lucide-react';

const SOLO_METRICS = [
  { value: '60K', label: 'searches' },
  { value: '1,200+', label: 'users' },
  { value: '25,670', label: 'records' },
];

const TEAM_METRICS = [
  { value: '22', label: 'people led' },
  { value: '84', label: 'users served' },
  { value: '¥500K', label: 'public grant' },
];

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex items-center pt-28 pb-20"
    >
      <div className="container-prose">
        <p className="eyebrow mb-5 animate-fade-in">
          <span aria-hidden="true" className="mr-1">◆</span>
          Open to entrepreneur internships & engineering roles
        </p>

        <h1
          className="font-display text-display-xl text-fg mb-8 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          I ship products, <br className="hidden sm:block" />
          and I lead teams <span className="text-accent">that do too</span>.
        </h1>

        <p
          className="text-fg-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          I lead a <span className="text-fg">22-person student lab</span> at my university —
          building real software for corporate partners like <span className="text-fg">a major manufacturer</span>.
          <br className="hidden md:block" />
          Solo, I shipped <a href="https://grades.fullweak.com" target="_blank" rel="noopener noreferrer" className="link-accent">GradeS</a>, reaching 1,200 users in a week.
        </p>

        {/* Dual-metric strip — Solo ship × Team lead */}
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border mb-12 animate-fade-up" style={{ animationDelay: '240ms' }}>
          <div className="bg-ink p-5 md:p-6">
            <div className="eyebrow mb-3">Solo — GradeS</div>
            <div className="grid grid-cols-3 gap-4">
              {SOLO_METRICS.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-xl md:text-2xl font-semibold text-fg tabular-nums leading-none">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-faint mt-1.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-fg-faint mt-4">1 week after launch · 2026.03</p>
          </div>

          <div className="bg-ink p-5 md:p-6">
            <div className="eyebrow mb-3">Team — University Lab</div>
            <div className="grid grid-cols-3 gap-4">
              {TEAM_METRICS.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-xl md:text-2xl font-semibold text-accent tabular-nums leading-none">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-faint mt-1.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-fg-faint mt-4">University Lab Project · 23rd term</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-14 animate-fade-up" style={{ animationDelay: '320ms' }}>
          <a
            href="#works"
            className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
          >
            Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#leadership"
            className="inline-flex items-center gap-2 border border-accent/40 text-accent px-5 py-2.5 text-sm hover:bg-accent-dim transition-colors"
          >
            Leadership & Awards
          </a>
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border-strong text-fg px-5 py-2.5 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-fg-muted px-2 py-2.5 text-sm hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </div>

        {/* 4 Domains */}
        <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
          <div className="eyebrow mb-3">What I do</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              { label: 'Full-Stack Web', sub: 'Products that reach users' },
              { label: 'Local LLM & Automation', sub: 'Private AI agents, MCP' },
              { label: 'Hardware & IoT', sub: 'ESP32, PCB-gen, MCP-controllable' },
              { label: 'Infra & DevOps', sub: 'Containers, edge, IaC' },
            ].map((d) => (
              <div key={d.label} className="bg-ink p-4">
                <div className="font-display font-semibold text-fg text-sm">{d.label}</div>
                <div className="font-mono text-[10px] text-fg-faint mt-1 leading-relaxed">
                  {d.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
