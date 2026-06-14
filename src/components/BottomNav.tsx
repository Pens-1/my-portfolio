import { useEffect, useState } from 'react';
import { scrollManager, SECTION_IDS, type SectionId } from '../lib/scroll';

const LABELS: Record<SectionId, string> = {
  home: 'home',
  about: 'about',
  activities: 'activities',
  posts: 'posts',
};

// kotek7 型の下固定ナビ。アンカー移動と現在地表示は scrollManager に集約
const BottomNav = () => {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => scrollManager.onActiveChange(setActive), []);

  const go = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    scrollManager.scrollTo(id);
    window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 pt-14 bg-gradient-to-t from-ink via-ink/80 to-transparent"
    >
      <ul className="container-wide flex items-center justify-between sm:justify-center sm:gap-10 md:gap-20 pb-6 md:pb-8">
        {SECTION_IDS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              aria-current={active === id ? 'true' : undefined}
              className={[
                'relative inline-block py-1 font-mono text-[11px] sm:text-sm tracking-[0.22em] uppercase transition-colors duration-200',
                'after:absolute after:-top-2 after:left-0 after:right-0 after:h-px after:bg-accent after:origin-center after:transition-transform after:duration-300',
                active === id
                  ? 'text-accent after:scale-x-100'
                  : 'text-fg-muted hover:text-fg after:scale-x-0',
              ].join(' ')}
            >
              {LABELS[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
