import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

interface RevealProps {
  children: ReactNode;
  /** stagger 用の遅延 (ms) */
  delay?: number;
  className?: string;
}

// スクロール出現（one-shot）。reduced-motion 時は即表示
const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(24px)',
        transition: `opacity 0.65s ${EASE} ${delay}ms, transform 0.65s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
