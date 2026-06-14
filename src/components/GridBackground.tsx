import { useEffect, useRef } from 'react';

/**
 * 背景: 極薄のドット方眼（基板設計図感）＋ カーソル周辺だけアクセント色が滲む光追従。
 * Linear/Vercel 系のミニマルなインタラクション。画像も3Dも使わず Canvas 2D のみで軽量。
 * テーマ（--accent / --ink）に追従。reduced-motion / タッチでは光追従を切り静的グリッドに。
 */

const GAP = 34; // ドット間隔(px)
const DOT = 1.7; // ドット半径(px)
const GLOW_R = 280; // 光の半径(px)

const readVar = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const hexToRgb = (hex: string): [number, number, number] => {
  const m = hex.replace('#', '');
  const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const int = parseInt(n, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
};

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let disposed = false;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interactive = !coarse && !reduced;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let dotRgb: [number, number, number] = [120, 120, 120];
    let accentRgb: [number, number, number] = [13, 148, 136];

    const readTheme = () => {
      dotRgb = hexToRgb(readVar('--fg', '#0a0a0a'));
      accentRgb = hexToRgb(readVar('--accent', '#0d9488'));
    };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // 光の中心（lerp で柔らかく追従）。初期は画面外
    const target = { x: -9999, y: -9999 };
    const glow = { x: -9999, y: -9999 };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const [dr, dg, db] = dotRgb;
      const [ar, ag, ab] = accentRgb;
      const glowActive = interactive && glow.x > -9000;

      // 淡い径方向グロー（「緑が滲む」感。ドットの色変化と二重で効かせる）
      if (glowActive) {
        const grad = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, GLOW_R);
        grad.addColorStop(0, `rgba(${ar},${ag},${ab},0.2)`);
        grad.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.08)`);
        grad.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(glow.x - GLOW_R, glow.y - GLOW_R, GLOW_R * 2, GLOW_R * 2);
      }

      for (let i = 0; i < cols; i++) {
        const x = i * GAP;
        for (let j = 0; j < rows; j++) {
          const y = j * GAP;
          let r = dr;
          let g = dg;
          let b = db;
          let a = 0.1; // 基本のドット濃度

          if (glowActive) {
            const dist = Math.hypot(x - glow.x, y - glow.y);
            if (dist < GLOW_R) {
              const t = 1 - dist / GLOW_R; // 中心ほど1
              const e = t * t;
              // アクセント色へ寄せて、明るく
              r = dr + (ar - dr) * e;
              g = dg + (ag - dg) * e;
              b = db + (ab - db) * e;
              a = 0.1 + e * 0.62;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, DOT, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a})`;
          ctx.fill();
        }
      }
    };

    let rafId = 0;
    let needsDraw = true;
    const tick = () => {
      if (disposed) return;
      rafId = requestAnimationFrame(tick);
      if (interactive) {
        glow.x += (target.x - glow.x) * 0.12;
        glow.y += (target.y - glow.y) * 0.12;
        // 動いている間だけ描画（収束したら止める＝省電力）
        const moving = Math.abs(target.x - glow.x) > 0.5 || Math.abs(target.y - glow.y) > 0.5;
        if (moving || needsDraw) {
          draw();
          needsDraw = false;
        }
      } else if (needsDraw) {
        draw();
        needsDraw = false;
      }
    };

    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };

    const onResize = () => {
      resize();
      needsDraw = true;
    };

    // テーマ切替（html.dark のトグル）に追従
    const observer = new MutationObserver(() => {
      readTheme();
      needsDraw = true;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    readTheme();
    resize();
    window.addEventListener('resize', onResize);
    if (interactive) {
      window.addEventListener('mousemove', onMouse, { passive: true });
      window.addEventListener('mouseleave', onLeave);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full" />
  );
};

export default GridBackground;
