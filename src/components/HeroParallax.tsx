import { useEffect, useRef } from 'react';
import { scrollManager } from '../lib/scroll';

/**
 * ヒーロー背景: 廊下静止画1枚の「偽3D」（WebGL）。
 * 一点透視の廊下なので深度＝消失点からの距離で近似でき、
 * - イントロ: ズーム状態から引くプルバック・リビール（プロシージャルなので完全に滑らか）
 * - アイドル: ごく遅い呼吸ズーム + マウス視差（深度に応じて手前ほど動く）
 * - スクロール: 奥へ押し込まれながら白（--ink）に溶ける
 * AI動画のモーションブレ・コマ汚れを排除しつつ、動きと奥行きは残す。
 */

const SRC = '/hero.webp';
// 画像内の消失点（uv座標）。廊下の突き当たりの白い靄
const VP = { x: 0.56, y: 0.44 };

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uVp;
uniform vec2 uScale;   // cover フィット時に画像のどの範囲を見せるか
uniform float uK;      // ドリー量（+で奥へ寄る）
uniform vec2 uShift;   // マウス視差
void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 tex = (uv - 0.5) * uScale + 0.5;
  vec2 d = tex - uVp;
  float near = length(d) * 1.6; // 消失点から離れるほど手前
  tex = uVp + d / (1.0 + uK * near);
  tex += uShift * near;
  tex = clamp(tex, vec2(0.002), vec2(0.998));
  gl_FragColor = texture2D(uTex, tex);
}`;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

const HeroParallax = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) {
      // WebGL不可 → 静的背景画像にフォールバック
      canvas.style.background = `url(${SRC}) center / cover no-repeat`;
      return;
    }

    let disposed = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uVp = gl.getUniformLocation(prog, 'uVp');
    const uScale = gl.getUniformLocation(prog, 'uScale');
    const uK = gl.getUniformLocation(prog, 'uK');
    const uShift = gl.getUniformLocation(prog, 'uShift');
    gl.uniform2f(uVp, VP.x, VP.y);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imageReady = false;
    const img = new Image();
    imgRef.current = img;
    img.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      imageReady = true;
      introStart = performance.now();
    };
    img.src = SRC;

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // マウス視差（lerp で柔らかく）
    const mouse = { x: 0, y: 0 };
    const shift = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    let introStart = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(tick);
      if (!imageReady) return;

      const p = scrollManager.progress;
      const a = Math.max(0.06, scrollManager.sectionTs.about);

      // ヒーローを過ぎたら白に溶ける（描画も止める）
      const fadeStart = a * 0.45;
      const alpha = 1 - smoothstep(Math.min(1, Math.max(0, (p - fadeStart) / (a - fadeStart))));
      canvas.style.opacity = alpha.toFixed(3);
      if (alpha <= 0.001) return;

      // イントロ: 奥(k=0.55)から引いて k=0 へ（2.4s）
      const intro = reduced ? 1 : Math.min(1, (now - introStart) / 2400);
      let k = (1 - easeOutCubic(intro)) * 0.55;
      // アイドル: ごく遅い呼吸（往復 ~14s）
      if (!reduced) k += (Math.sin(now / 4500) + 1) * 0.012;
      // スクロール: 奥へ押し込まれる
      k += smoothstep(Math.min(1, p / fadeStart || 0)) * 0.3;

      // 視差
      const m = reduced ? 0 : 0.018;
      shift.x += (mouse.x * m - shift.x) * 0.06;
      shift.y += (mouse.y * m * 0.6 - shift.y) * 0.06;

      // cover フィット
      const ia = img.naturalWidth / img.naturalHeight;
      const ca = canvas.width / canvas.height;
      const sx = ca > ia ? 1 : ca / ia;
      const sy = ca > ia ? ia / ca : 1;

      gl.uniform2f(uScale, sx, sy);
      gl.uniform1f(uK, k);
      gl.uniform2f(uShift, shift.x, shift.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full" />
  );
};

export default HeroParallax;
