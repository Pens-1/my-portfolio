import { useGSAP } from '@gsap/react';
import { EASE_OUT, gsap, MOTION_QUERY, ScrollTrigger } from '../lib/gsap';

// セクション見出しの演出（罫線が伸び、透かし数字が横から入る）。画面に入ったとき1回だけ
const SectionMotion = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('.heading-rule').forEach((head) => {
        const num = head.closest('section')?.querySelector<HTMLElement>('.watermark-num');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: head, start: 'top 85%', once: true },
        });
        // 罫線は ::before なので CSS 変数（scaleX）を動かす
        tl.fromTo(head, { '--rule': 0 }, { '--rule': 1, duration: 0.6, ease: EASE_OUT }, 0);
        if (num) tl.from(num, { x: 80, opacity: 0, duration: 0.8, ease: EASE_OUT }, 0.1);
      });
      // フォント読込でレイアウトが動くので位置を再計算
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });
    return () => mm.revert();
  });

  return null;
};

export default SectionMotion;
