import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { readThemeTokens } from '../../../lib/scene3d';

/**
 * W2: チップ回路都市（グループごと y=-120 に配置）。
 * シリコンダイを空撮した夜の都市 — 暗いブロック群＋金の配線道路＋緑の信号。
 * AD 正解: docs/ad-ref/zoneC-chipcity.jpg
 * フォグ(6/22, ほぼ黒)が遠景を闇に落とす。
 */

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const matGround = new THREE.MeshStandardMaterial({
  color: '#0d1012',
  metalness: 0.55,
  roughness: 0.5,
});
const matBlock = new THREE.MeshStandardMaterial({
  color: '#111518',
  metalness: 0.7,
  roughness: 0.42,
});
const matGold = new THREE.MeshStandardMaterial({
  color: '#c9a13b',
  metalness: 1.0,
  roughness: 0.32,
});

// 街区: 12×12 区画、区画 3.6 + 道路 1.3
const PITCH = 4.9;
const GRID = 12;
const SPAN = GRID * PITCH; // 58.8

const ChipCityZone = () => {
  const accent = useMemo(() => new THREE.Color(readThemeTokens().accent), []);

  const { group, pulses } = useMemo(() => {
    const rand = mulberry32(17);
    const g = new THREE.Group();
    const dummy = new THREE.Object3D();

    // 地面（ダイ表面）
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(SPAN + 30, SPAN + 30), matGround);
    ground.rotation.x = -Math.PI / 2;
    g.add(ground);

    // ブロック群（区画ごとに 3×3 のサブブロック、たまにタワー）
    const blockGeo = new THREE.BoxGeometry(1, 1, 1);
    const maxBlocks = GRID * GRID * 9;
    const blocks = new THREE.InstancedMesh(blockGeo, matBlock, maxBlocks);
    let bi = 0;
    const origin = -SPAN / 2 + PITCH / 2;
    for (let gx = 0; gx < GRID; gx++) {
      for (let gz = 0; gz < GRID; gz++) {
        const cx = origin + gx * PITCH;
        const cz = origin + gz * PITCH;
        for (let sx = -1; sx <= 1; sx++) {
          for (let sz = -1; sz <= 1; sz++) {
            if (rand() < 0.12) continue; // 欠け＝都市の不均質さ
            const w = 0.7 + rand() * 0.45;
            const d = 0.7 + rand() * 0.45;
            const h = rand() < 0.06 ? 0.7 + rand() * 0.5 : 0.1 + rand() * 0.32;
            dummy.position.set(cx + sx * 1.18, h / 2, cz + sz * 1.18);
            dummy.scale.set(w, h, d);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            blocks.setMatrixAt(bi++, dummy.matrix);
          }
        }
      }
    }
    blocks.count = bi;
    blocks.frustumCulled = false;
    g.add(blocks);
    dummy.scale.set(1, 1, 1);

    // 金の配線道路（区画境界に沿って走る）
    const streetGeo = new THREE.BoxGeometry(SPAN + 20, 0.02, 0.16);
    const streets = new THREE.InstancedMesh(streetGeo, matGold, (GRID + 1) * 2);
    let si = 0;
    for (let i = 0; i <= GRID; i++) {
      const o = -SPAN / 2 + i * PITCH;
      dummy.position.set(0, 0.012, o);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      streets.setMatrixAt(si++, dummy.matrix);
      dummy.position.set(o, 0.012, 0);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.updateMatrix();
      streets.setMatrixAt(si++, dummy.matrix);
    }
    streets.frustumCulled = false;
    g.add(streets);

    // 高架の太い配線（ハイウェイ）
    const hwGeo = new THREE.BoxGeometry(SPAN + 20, 0.06, 0.5);
    const highways = new THREE.InstancedMesh(hwGeo, matGold, 3);
    const hwSpec: [number, number, number][] = [
      [0.55, -7.35, 0],
      [0.78, 7.35, 0],
      [0.62, 2.45, Math.PI / 2],
    ];
    hwSpec.forEach(([y, o, rot], i) => {
      dummy.position.set(rot === 0 ? 0 : o, y, rot === 0 ? o : 0);
      dummy.rotation.set(0, rot, 0);
      dummy.updateMatrix();
      highways.setMatrixAt(i, dummy.matrix);
    });
    highways.frustumCulled = false;
    g.add(highways);

    // 緑の信号灯（道路沿いに散らす）
    const glowMat = new THREE.MeshBasicMaterial({
      color: accent.clone().multiplyScalar(1.8),
      toneMapped: false,
    });
    const glowGeo = new THREE.BoxGeometry(0.85, 0.03, 0.1);
    const glows = new THREE.InstancedMesh(glowGeo, glowMat, 130);
    for (let i = 0; i < 130; i++) {
      const along = -SPAN / 2 + rand() * SPAN;
      const line = -SPAN / 2 + Math.floor(rand() * (GRID + 1)) * PITCH;
      const vertical = rand() < 0.5;
      dummy.position.set(vertical ? line : along, 0.03, vertical ? along : line);
      dummy.rotation.set(0, vertical ? Math.PI / 2 : 0, 0);
      dummy.updateMatrix();
      glows.setMatrixAt(i, dummy.matrix);
    }
    glows.frustumCulled = false;
    g.add(glows);

    // 走る信号パルス（道路上）
    const pulseMat = new THREE.MeshBasicMaterial({
      color: accent.clone().multiplyScalar(2.4),
      toneMapped: false,
    });
    const pulseGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const pulseList = Array.from({ length: 8 }, (_, i) => {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      const line = -SPAN / 2 + (i + 2) * PITCH;
      const vertical = i % 2 === 0;
      g.add(mesh);
      return { mesh, line, vertical, t: rand(), speed: 0.05 + rand() * 0.06 };
    });

    return { group: g, pulses: pulseList };
  }, [accent]);

  const tRef = useRef(0);
  useFrame((_, delta) => {
    tRef.current += delta;
    for (const p of pulses) {
      p.t = (p.t + delta * p.speed) % 1;
      const along = -SPAN / 2 + p.t * SPAN;
      p.mesh.position.set(
        p.vertical ? p.line : along,
        0.06,
        p.vertical ? along : p.line,
      );
    }
  });

  return (
    <group>
      <primitive object={group} />
      {/* 都市の鈍い金属光沢を起こす冷たいキーライト（グローバル照明は減衰済み） */}
      <rectAreaLight
        position={[0, 10, 4]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={['#b8c4c0', 3.2, 20, 14]}
      />
    </group>
  );
};

export default ChipCityZone;
