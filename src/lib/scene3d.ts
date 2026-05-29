// ヒーローの3Dシーン定義（データ駆動）
// モデルを差し替えたいときはこの配列を編集するだけ。glb は public/models/ に置く。
// 全モデル CC0（Poly Pizza: iPoly3D / scaranto / Quaternius）＝クレジット表記不要。

export interface SceneModel {
  /** 内部キー */
  name: string;
  /** public からの glb パス */
  path: string;
  /** 何を象徴するか（将来ラベル表示に使える） */
  label: string;
  /** シーン上の配置 [x, y, z] */
  position: [number, number, number];
  /** 正規化後の相対スケール微調整（1 = 標準） */
  scale: number;
  /** Y軸の自転速度 (rad/s) */
  spin: number;
  /** 浮遊スピード（drei Float） */
  floatSpeed: number;
  /** 浮遊の振れ幅（drei Float） */
  floatRange: number;
}

// 各モデルはロード時にバウンディングボックスで正規化されるので、
// glb 固有のサイズ差は気にしなくてよい（scale は相対的な微調整のみ）。
export const HERO_MODELS: SceneModel[] = [
  {
    name: 'pcb',
    path: '/models/pcb.glb',
    label: 'Hardware · PCB',
    position: [0.4, 2.4, 0],
    scale: 0.78,
    spin: 0.35,
    floatSpeed: 1.4,
    floatRange: 0.35,
  },
  {
    name: 'robot',
    path: '/models/robot.glb',
    label: 'Robotics',
    position: [-0.3, 0.1, 0],
    scale: 1.05,
    spin: 0.22,
    floatSpeed: 1.0,
    floatRange: 0.45,
  },
  {
    name: 'car',
    path: '/models/car.glb',
    label: 'Vehicle',
    position: [0.4, -2.3, 0],
    scale: 0.92,
    spin: -0.28,
    floatSpeed: 1.2,
    floatRange: 0.35,
  },
];

/** アクセント色を CSS 変数から読む（テーマ追従）。SSR は無いので window 前提でよい。 */
export const readAccent = (): string => {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim();
  return v || '#7cf7d6';
};
