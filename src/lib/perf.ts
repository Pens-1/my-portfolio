export type PerfTier = 'high' | 'low' | 'static';

/**
 * 描画ティア判定。
 * - high: デスクトップ + 十分な性能 → PostFX・反射床あり
 * - low: モバイル/低性能 → composer なし・DPR制限・反射オフ
 * - static: WebGL 不可 → 3D 無効（CSS背景のみ）
 * DEV では ?tier=low 等で強制上書きできる。
 */
export const detectPerfTier = (): PerfTier => {
  if (typeof window === 'undefined') return 'static';

  const override = new URLSearchParams(window.location.search).get('tier');
  if (override === 'high' || override === 'low' || override === 'static') return override;

  try {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) return 'static';
  } catch {
    return 'static';
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = window.innerWidth < 768;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (coarse || small || (memory !== undefined && memory <= 4) || cores <= 4) return 'low';

  return 'high';
};
