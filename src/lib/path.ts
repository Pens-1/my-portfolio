import * as THREE from 'three';
import { scrollManager } from './scroll';

/**
 * スクロール進捗 → カメラ姿勢・フォグ・扉開閉・ホワイトアウトのキーフレーム。
 * - キーの at はセクション開始位置（DOM実測）から毎回導出 — 文章量が変わってもズレない
 * - 同一姿勢のキーを2つ置くと完全な滞留（読書中はカメラ静止）
 * - セグメント内は smootherstep（両端で速度ゼロ → どのキーでも加速度の段差なし）
 * - ワールド切替（W1→W2→W3）はホワイトアウト＋フォグ収縮で隠す
 */

// ワールド y 分離（W1=廊下+サーバー y=0 / WB=巨大サーバー内部 / W2=チップ回路都市 / W3=データの流れ）
export const WB_Y = -60;
export const W2_Y = -120;
export const W3_Y = -240;

// ヒーローサーバー（扉が開いて中に入る1台）: 右列 z=-30
export const HERO_Z = -30;

export interface PathKey {
  at: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

interface Anchors {
  a: number; // about 開始
  c: number; // activities 開始
  p: number; // posts 開始
}

const anchors = (): Anchors => {
  const ts = scrollManager.sectionTs;
  const a = Math.max(0.05, ts.about);
  const c = Math.max(a + 0.05, ts.activities);
  const p = Math.max(c + 0.05, ts.posts);
  return { a, c, p };
};

let cached: PathKey[] | null = null;
let cachedTs = { a: -1, c: -1, p: -1 };

const buildKeys = ({ a, c, p }: Anchors): PathKey[] => {
  const w1 = c - a;

  const w2 = p - c;

  return [
    // Zone A: 廊下入口 → 早めに右のヒーローサーバーへ寄っていく
    { at: 0, pos: [-1.2, 1.55, 2], look: [0.8, 1.45, -16], fov: 50 },
    { at: a * 0.55, pos: [-0.7, 1.5, -9], look: [1.6, 1.35, -24], fov: 50 },
    { at: a, pos: [-1.2, 1.5, -23.5], look: [2.0, 1.25, -30.2], fov: 48 },

    // about 読書中はヒーローサーバーを右1/3に見て滞留（左は白い間仕切り壁）
    { at: a + 0.12 * w1, pos: [-1.2, 1.5, -23.5], look: [2.0, 1.25, -30.2], fov: 48 },
    { at: a + 0.68 * w1, pos: [-1.2, 1.5, -23.5], look: [2.0, 1.25, -30.2], fov: 48 },

    // 扉が開ききった後に正面へ回り込み、扉口へ（→ T2a 暗転）
    { at: a + 0.82 * w1, pos: [1.0, 1.38, -28.3], look: [2.3, 1.3, HERO_Z], fov: 44 },
    { at: a + 0.87 * w1, pos: [1.9, 1.34, -29.7], look: [3.2, 1.3, HERO_Z], fov: 44 },

    // WB: 巨大サーバー内部（入って小さくなった）— 暗がりを LED の光だまりへ漂う
    { at: a + 0.91 * w1, pos: [-6, 1.5 + WB_Y, 2.6], look: [4, 1.1 + WB_Y, -0.6], fov: 48 },
    { at: c + 0.04, pos: [0.4, 1.35 + WB_Y, 0.8], look: [7.5, 1.4 + WB_Y, -1.6], fov: 48 },

    // T2b 暗転 → W2（チップ回路都市）。低空で道路沿いに入る（金の配線が視界に入り続ける）
    { at: c + 0.09, pos: [-5.5, 1.6 + W2_Y, 6.5], look: [3, 0.3 + W2_Y, -2], fov: 50 },

    // Zone C: 回路都市の低空ドリー → 滞留 → 上昇して離脱
    { at: c + 0.4 * w2, pos: [3, 1.6 + W2_Y, 5], look: [0.4, 0.3 + W2_Y, 0], fov: 50 },
    { at: c + 0.82 * w2, pos: [3, 1.6 + W2_Y, 5], look: [0.4, 0.3 + W2_Y, 0], fov: 50 },
    { at: p - 0.004, pos: [2.4, 3.6 + W2_Y, 6.5], look: [0.4, 0.6 + W2_Y, 0], fov: 50 },

    // T3 緑フラッシュ → W3（データの流れ）
    { at: p + 0.01, pos: [0, 1.5 + W3_Y, 10], look: [2.5, 2.5 + W3_Y, -4], fov: 50 },

    // Zone D: 光の帯に沿ってゆっくり漂い上がる
    { at: 1, pos: [0.6, 2.4 + W3_Y, 6], look: [2.8, 3.6 + W3_Y, -6], fov: 50 },
  ];
};

const getKeys = (): PathKey[] => {
  const an = anchors();
  if (!cached || cachedTs.a !== an.a || cachedTs.c !== an.c || cachedTs.p !== an.p) {
    cached = buildKeys(an);
    cachedTs = an;
  }
  return cached;
};

export interface PathSample {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
}

/** p ∈ [0,1] のカメラ目標姿勢を out に書き込む（毎フレーム呼ばれるためアロケーションなし） */
export const samplePath = (p: number, out: PathSample): void => {
  const keys = getKeys();
  const t = clamp01(p);

  let i = 0;
  while (i < keys.length - 2 && keys[i + 1].at <= t) i++;
  const k0 = keys[i];
  const k1 = keys[i + 1];
  const span = Math.max(1e-5, k1.at - k0.at);
  const local = smootherstep(clamp01((t - k0.at) / span));

  out.pos.set(
    k0.pos[0] + (k1.pos[0] - k0.pos[0]) * local,
    k0.pos[1] + (k1.pos[1] - k0.pos[1]) * local,
    k0.pos[2] + (k1.pos[2] - k0.pos[2]) * local,
  );
  out.look.set(
    k0.look[0] + (k1.look[0] - k0.look[0]) * local,
    k0.look[1] + (k1.look[1] - k0.look[1]) * local,
    k0.look[2] + (k1.look[2] - k0.look[2]) * local,
  );
  out.fov = k0.fov + (k1.fov - k0.fov) * local;
};

/** ヒーローサーバーの扉開度 [0,1]。about 読了の頃に開き始め、暗転（進入）までに全開 */
export const doorOpenFor = (p: number): number => {
  const { a, c } = anchors();
  const w1 = c - a;
  const start = a + 0.55 * w1;
  const end = a + 0.8 * w1;
  return smootherstep(clamp01((p - start) / Math.max(1e-5, end - start)));
};

const ramp = (x: number, a0: number, a1: number, b0: number, b1: number) => {
  // a0→a1 で 0→1、b0→b1 で 1→0
  if (x <= a0 || x >= b1) return 0;
  if (x < a1) return smootherstep((x - a0) / (a1 - a0));
  if (x <= b0) return 1;
  return 1 - smootherstep((x - b0) / (b1 - b0));
};

export interface TransitionState {
  opacity: number;
  color: string;
}

/**
 * ワールド切替を隠す遷移オーバーレイ。
 * T2a（廊下→巨大サーバー内部）/ T2b（内部→回路都市）= 暗転（機械の中に潜る）
 * T3（回路都市→データの流れ）= アクセント緑のフラッシュ（信号に飲まれる）
 * カメラのワールド間テレポートは各遷移の不透明度1.0の間に終わるようキーを揃えてある
 */
export const transitionFor = (p: number, out: TransitionState): void => {
  const { a, c, p: p3 } = anchors();
  const w1 = c - a;
  const t2a = ramp(p, a + 0.84 * w1, a + 0.868 * w1, a + 0.912 * w1, a + 0.96 * w1);
  const t2b = ramp(p, c + 0.035, c + 0.05, c + 0.085, c + 0.12);
  const t3 = ramp(p, p3 - 0.012, p3 - 0.003, p3 + 0.011, p3 + 0.04);
  const dark = Math.max(t2a, t2b);
  if (t3 > dark) {
    out.opacity = t3;
    out.color = '#39d4b4';
  } else {
    out.opacity = dark;
    out.color = '#070b0c';
  }
};

/** UI（文字・ナビ）のダーク反転。廊下→サーバー内部クロスフェードの中点で切り替える */
export const uiDarkFor = (p: number): boolean => {
  const { a, c } = anchors();
  return p >= a + 0.89 * (c - a) - 0.006;
};

/** グローバル照明の減衰係数。白い廊下=1.0 → 機械の中=0.18 → データ=0.12 */
export const lightLevelFor = (p: number): number => {
  const { a, c, p: p3 } = anchors();
  const w1 = c - a;
  const keys: [number, number][] = [
    [0, 1],
    [a + 0.84 * w1, 1],
    [a + 0.91 * w1, 0.18],
    [p3 - 0.005, 0.18],
    [p3 + 0.02, 0.12],
    [1, 0.12],
  ];
  const t = clamp01(p);
  let i = 0;
  while (i < keys.length - 2 && keys[i + 1][0] <= t) i++;
  const span = Math.max(1e-5, keys[i + 1][0] - keys[i][0]);
  const local = smootherstep(clamp01((t - keys[i][0]) / span));
  return keys[i][1] + (keys[i + 1][1] - keys[i][1]) * local;
};

/** シーン背景＝フォグ色。ゾーンごとに暗転していく */
const tmpColor = new THREE.Color();

export const bgColorFor = (p: number, out: THREE.Color): void => {
  const { a, c, p: p3 } = anchors();
  const w1 = c - a;
  // [at, hex] — 廊下=白 / サーバー内部=暗 / 回路都市=ほぼ黒 / データ=深い青緑黒
  const keys: [number, string][] = [
    [0, '#fafaf9'],
    [a + 0.84 * w1, '#fafaf9'],
    [a + 0.9 * w1, '#0b1112'],
    [c + 0.04, '#0b1112'],
    [c + 0.09, '#07090a'],
    [p3 - 0.012, '#07090a'],
    [p3 + 0.02, '#061013'],
    [1, '#061013'],
  ];
  const t = clamp01(p);
  let i = 0;
  while (i < keys.length - 2 && keys[i + 1][0] <= t) i++;
  const span = Math.max(1e-5, keys[i + 1][0] - keys[i][0]);
  const local = smootherstep(clamp01((t - keys[i][0]) / span));
  out.set(keys[i][1]).lerp(tmpColor.set(keys[i + 1][1]), local);
};

export interface FogRange {
  near: number;
  far: number;
}

/** ゾーンごとのフォグ距離 */
export const fogFor = (p: number, out: FogRange): void => {
  const { a, c, p: p3 } = anchors();
  const w1 = c - a;
  // キー: [at, near, far] — 廊下=長 / サーバー内部=短く濃い / 回路都市=中 / データ=長
  const keys: [number, number, number][] = [
    [0, 7, 26],
    [a + 0.84 * w1, 7, 26],
    [a + 0.91 * w1, 2, 13],
    [c + 0.04, 2, 13],
    [c + 0.09, 6, 22],
    [p3 - 0.012, 6, 22],
    [p3 + 0.02, 12, 38],
    [1, 12, 38],
  ];
  const t = clamp01(p);
  let i = 0;
  while (i < keys.length - 2 && keys[i + 1][0] <= t) i++;
  const k0 = keys[i];
  const k1 = keys[i + 1];
  const span = Math.max(1e-5, k1[0] - k0[0]);
  const local = smootherstep(clamp01((t - k0[0]) / span));
  out.near = k0[1] + (k1[1] - k0[1]) * local;
  out.far = k0[2] + (k1[2] - k0[2]) * local;
};

/** ゾーン可視判定（カリング）: W1 / WB / W2 / W3 */
export const zoneVisibleFor = (
  p: number,
): { w1: boolean; wb: boolean; w2: boolean; w3: boolean } => {
  const { a, c, p: p3 } = anchors();
  const w1 = c - a;
  return {
    w1: p < a + 0.9 * w1,
    wb: p > a + 0.85 * w1 && p < c + 0.085,
    w2: p > c + 0.05 && p < p3 + 0.01,
    w3: p > p3 - 0.005,
  };
};
