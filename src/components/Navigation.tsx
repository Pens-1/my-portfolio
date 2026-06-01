import { useEffect, useState } from 'react';
import { Menu, X, Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'works', label: 'Works', num: '02' },
  { id: 'about', label: 'About', num: '03' },
  { id: 'contact', label: 'Contact', num: '04' },
];

const Navigation = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + window.innerHeight * 0.35;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    const newHash = id === 'home' ? '' : `#${id}`;
    history.pushState(null, '', newHash || window.location.pathname);
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || open
            ? 'backdrop-blur-md bg-ink/70 border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between py-5">
          <a
            href="#home"
            onClick={(e) => go(e, 'home')}
            className="font-mono text-xs tracking-[0.2em] text-fg hover:text-accent transition-colors"
          >
            YAMATAKU<span className="text-accent">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label, num }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  className={`group flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                    active === id ? 'text-accent' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <span className="text-accent/60">{num}.</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://github.com/Pens-1"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex font-mono text-[11px] tracking-[0.15em] uppercase border border-accent/50 text-accent px-3 py-2 hover:bg-accent-dim transition-colors"
            >
              GitHub ↗
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="md:hidden w-9 h-9 inline-flex items-center justify-center border border-border text-fg-muted hover:text-accent hover:border-accent transition-colors"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-0 z-30 bg-ink/95 backdrop-blur-lg transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="container-wide pt-28 pb-12 h-full flex flex-col">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, num }, i) => (
              <li
                key={id}
                style={{
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  transitionDelay: open ? `${i * 40}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  className={`flex items-baseline gap-4 py-4 border-b border-border font-display transition-colors ${
                    active === id ? 'text-accent' : 'text-fg hover:text-accent'
                  }`}
                >
                  <span className="font-mono text-[11px] text-accent/60 tabular-nums tracking-[0.15em]">
                    {num}
                  </span>
                  <span className="text-2xl font-semibold">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8 flex items-center justify-between border-t border-border">
            <a
              href="https://github.com/Pens-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-fg-muted hover:text-accent"
            >
              <Github className="w-4 h-4" />
              github.com/Pens-1
            </a>
            <a
              href="mailto:hello@yamataku.dev"
              className="font-mono text-[12px] text-accent hover:underline underline-offset-4"
            >
              hello@yamataku.dev
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
