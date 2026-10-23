import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { EASE_OUT, gsap, MOTION_QUERY } from '../lib/gsap';

interface RevealProps {
  children: ReactNode;
  /** stagger 用の遅延 (ms) */
  delay?: number;
  className?: string;
}

// スクロール出現（one-shot）。短く速いスライドイン。動きを減らす設定では何もしない（最初から表示）
const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        gsap.from(ref.current, {
          y: 20,
          opacity: 0,
          duration: 0.45,
          delay: delay / 1000,
          ease: EASE_OUT,
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
