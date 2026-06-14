import Lenis from 'lenis';

export type SectionId = 'home' | 'about' | 'activities' | 'posts';
export const SECTION_IDS: readonly SectionId[] = ['home', 'about', 'activities', 'posts'];

type ActiveListener = (id: SectionId) => void;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const maxScroll = () =>
  Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

/**
 * スクロールの単一管理点。
 * - lenis でホイールを平滑化（reduced-motion 時はネイティブスクロールに自動降格）
 * - progress [0,1] と各セクション開始位置の進捗値（DOM実測）を保持 — 3Dカメラは毎フレームこれを読む
 * - scrollspy（ヒステリシス付き）と、アンカー移動中の navLock
 */
class ScrollManager {
  /** スクロール進捗 [0,1] */
  progress = 0;
  /** セクション開始位置の進捗値（DOM実測。3Dキーフレームの正規化に使う） */
  sectionTs: Record<SectionId, number> = { home: 0, about: 0.27, activities: 0.53, posts: 0.84 };
  active: SectionId = 'home';

  private lenis: Lenis | null = null;
  private rafId = 0;
  private listeners = new Set<ActiveListener>();
  private scrollListeners = new Set<() => void>();
  private navLock: SectionId | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private measureTimer: ReturnType<typeof setTimeout> | null = null;
  private cleanups: Array<() => void> = [];

  init(reduced: boolean) {
    this.destroy();

    if (!reduced) {
      this.lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoResize: true,
      });
      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);
    }

    const onScroll = () => this.handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanups.push(() => window.removeEventListener('scroll', onScroll));

    // ユーザー操作が入ったら navLock を解除（プログラムスクロール中断時の active 凍結を防ぐ）
    const unlock = () => {
      this.navLock = null;
    };
    window.addEventListener('wheel', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    this.cleanups.push(() => {
      window.removeEventListener('wheel', unlock);
      window.removeEventListener('touchstart', unlock);
    });

    // セクション位置はDOM実測。レイアウト変化（画像ロード・リサイズ）で再計測
    this.resizeObserver = new ResizeObserver(() => {
      if (this.measureTimer) clearTimeout(this.measureTimer);
      this.measureTimer = setTimeout(() => this.measure(), 150);
    });
    this.resizeObserver.observe(document.body);

    this.measure();
    this.handleScroll();

    // ハッシュ直リンク（/#about 等）への着地
    const hash = window.location.hash.replace('#', '') as SectionId;
    if (SECTION_IDS.includes(hash)) {
      requestAnimationFrame(() => this.scrollTo(hash, { immediate: true }));
    }

    if (import.meta.env.DEV) {
      (window as unknown as Record<string, unknown>).__scroll = this;
      (window as unknown as Record<string, unknown>).__lenis = this.lenis;
    }
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.lenis = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.measureTimer) clearTimeout(this.measureTimer);
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
    this.navLock = null;
  }

  onActiveChange(fn: ActiveListener): () => void {
    this.listeners.add(fn);
    fn(this.active);
    return () => this.listeners.delete(fn);
  }

  /** スクロール進捗の変化を購読（UI側は window ではなくこちらに集約する） */
  onScroll(fn: () => void): () => void {
    this.scrollListeners.add(fn);
    fn();
    return () => this.scrollListeners.delete(fn);
  }

  scrollTo(id: SectionId, opts: { immediate?: boolean } = {}) {
    const el = document.getElementById(id);
    if (!el) return;
    const target = id === 'home' ? 0 : el.offsetTop;

    // 移動先を即 active にし、通過するセクションで nav が暴れないようロック
    this.navLock = id;
    this.setActive(id);

    if (opts.immediate || !this.lenis) {
      window.scrollTo({ top: target, behavior: 'auto' });
      this.navLock = null;
      return;
    }

    const distance = Math.abs(target - window.scrollY);
    const duration = Math.min(1.5, Math.max(0.8, 0.6 + distance / 3000));
    this.lenis.scrollTo(target, {
      duration,
      easing: easeInOutCubic,
      onComplete: () => {
        this.navLock = null;
      },
    });
  }

  /** セクション開始位置（progress 値）を DOM から実測。
   *  基準は「上端が viewport の6割位置に来た時」= 文字が読め始めるタイミング
   *  （offsetTop そのままだと最後のセクションほど遅すぎる） */
  measure() {
    const max = maxScroll();
    const lead = window.innerHeight * 0.6;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        this.sectionTs[id] = Math.min(1, Math.max(0, (el.offsetTop - lead) / max));
      }
    }
  }

  private handleScroll() {
    this.progress = Math.min(1, Math.max(0, window.scrollY / maxScroll()));
    this.updateActive();
    this.scrollListeners.forEach((fn) => fn());
  }

  private updateActive() {
    if (this.navLock) return;
    const centerY = window.scrollY + window.innerHeight / 2;
    const hysteresis = window.innerHeight * 0.05;

    let candidate: SectionId = 'home';
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= centerY) candidate = id;
    }
    if (candidate === this.active) return;

    // ヒステリシス: 境界を5%vh以上越えてから切り替える（境界上での点滅防止）
    const candidateEl = document.getElementById(candidate);
    const activeEl = document.getElementById(this.active);
    if (!candidateEl || !activeEl) return;
    const goingDown = candidateEl.offsetTop > activeEl.offsetTop;
    const boundary = goingDown ? candidateEl.offsetTop : activeEl.offsetTop;
    if (goingDown ? centerY < boundary + hysteresis : centerY > boundary - hysteresis) return;

    this.setActive(candidate);
  }

  private setActive(id: SectionId) {
    if (this.active === id) return;
    this.active = id;
    this.listeners.forEach((fn) => fn(id));
  }
}

export const scrollManager = new ScrollManager();
