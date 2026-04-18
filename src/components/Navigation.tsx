import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'works', label: 'Works', num: '02' },
  { id: 'leadership', label: 'Leadership', num: '03' },
  { id: 'about', label: 'About', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
];

const Navigation = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-ink/70 border-b border-border' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between py-5">
        <button
          onClick={() => go('home')}
          className="font-mono text-xs tracking-[0.2em] text-fg hover:text-accent transition-colors"
        >
          YAMAMOTO<span className="text-accent">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label, num }) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`group flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                  active === id ? 'text-accent' : 'text-fg-muted hover:text-fg'
                }`}
              >
                <span className="text-accent/60">{num}.</span>
                {label}
              </button>
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
