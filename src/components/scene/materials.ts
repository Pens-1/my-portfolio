import * as THREE from 'three';

/**
 * 明度ヒエラルキー（白飛び防止の核心。純白マテリアル禁止）:
 *   発光パネル(>1.0) > 壁 #f4f4f2 > 背景/フォグ = CSS --ink #fafaf9 > 床 #ececea > 目地 #c9ccc9 > 暗部 #15201c
 */
export const COLORS = {
  bg: '#fafaf9',
  wall: '#f4f4f2',
  floor: '#ececea',
  floorJoint: '#d8dad7',
  recess: '#c9ccc9',
  dark: '#15201c',
} as const;

export const matWall = new THREE.MeshStandardMaterial({
  color: COLORS.wall,
  roughness: 0.92,
  metalness: 0,
});

// 下向き面は環境光が届きにくいので、間接バウンス相当を emissive で補う（白天井の沈み込み防止）
export const matCeiling = new THREE.MeshStandardMaterial({
  color: '#f2f3f1',
  roughness: 0.95,
  metalness: 0,
  emissive: '#eef0ee',
  emissiveIntensity: 0.32,
});

export const matRack = new THREE.MeshStandardMaterial({
  color: '#f1f2f0',
  roughness: 0.5,
  metalness: 0.08,
});

export const matRecess = new THREE.MeshStandardMaterial({
  color: COLORS.recess,
  roughness: 0.9,
  metalness: 0,
});

// 各構図に必ず1つ置く「暗部アンカー」（ラック内部・チップなど）
export const matDark = new THREE.MeshStandardMaterial({
  color: COLORS.dark,
  roughness: 0.6,
  metalness: 0.2,
});

export const matSlat = new THREE.MeshStandardMaterial({
  color: '#3a4044',
  roughness: 0.45,
  metalness: 0.55,
});

// transmission は使わないフェイクガラス（軽い）
export const matGlass = new THREE.MeshPhysicalMaterial({
  color: '#e8f0ec',
  transparent: true,
  opacity: 0.15,
  roughness: 0.12,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  depthWrite: false,
});

export const matMetal = new THREE.MeshStandardMaterial({
  color: '#cfd3d0',
  roughness: 0.35,
  metalness: 0.9,
});

// 天井の発光パネル。1.15 ≒ Bloom threshold 1.0 をわずかに超える（強発光禁止）
export const matEmissivePanel = new THREE.MeshBasicMaterial({
  color: new THREE.Color(1.15, 1.15, 1.12),
  toneMapped: false,
});

// LED 用（instanceColor 側で >1.0 の値を与えて発光させる）
export const matLed = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  toneMapped: false,
});

/** 床の目地グリッド（0.6m）を map で焼く — 追加ドローコールなしで実在感を出す */
export const makeFloorTexture = (): THREE.Texture => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = COLORS.floor;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = COLORS.floorJoint;
  ctx.fillRect(0, 0, size, 3);
  ctx.fillRect(0, 0, 3, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

/** 壁パネルの縦目地（1.2m）テクスチャ */
export const makeWallTexture = (): THREE.Texture => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = COLORS.wall;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#dee0dd';
  ctx.fillRect(0, 0, 3, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};
