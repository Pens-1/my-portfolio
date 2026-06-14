import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { readThemeTokens } from '../../../lib/scene3d';

/**
 * W3: データの流れ（グループごと y=-240 に配置）。
 * 闇の中をオーロラのような光の帯が流れる — 信号そのものの世界。
 * AD 正解: docs/ad-ref/zoneD-datastream.jpg
 * 帯は細いチューブを束ねて加算合成（重なるほど明るく＝絹の質感の近似）。
 */

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// 帯の芯となる経路（左下奥 → 右上手前へ流れる S 字）
const BASE_PTS: [number, number, number][] = [
  [-6, -0.5, -12],
  [-1.5, 1.2, -8.5],
  [2.5, 2.8, -5.5],
  [5.5, 5.2, -3.5],
  [8.5, 8.2, -1.5],
];

const DataStreamZone = () => {
  const group = useMemo(() => {
    const rand = mulberry32(41);
    const g = new THREE.Group();
    const accent = new THREE.Color(readThemeTokens().accent);

    const basePts = BASE_PTS.map((v) => new THREE.Vector3(...v));
    const baseCurve = new THREE.CatmullRomCurve3(basePts);

    // 細いチューブ22本を束ねて1メッシュに（加算合成で重なりが発光）
    const strandGeos: THREE.BufferGeometry[] = [];
    for (let s = 0; s < 22; s++) {
      const off = new THREE.Vector3(
        (rand() - 0.5) * 0.9,
        (rand() - 0.5) * 0.7,
        (rand() - 0.5) * 0.7,
      );
      const wobble = 0.2 + rand() * 0.5;
      const pts = basePts.map(
        (p, i) =>
          new THREE.Vector3(
            p.x + off.x + Math.sin(i * 1.7 + s) * wobble * 0.4,
            p.y + off.y + Math.cos(i * 1.3 + s * 2) * wobble * 0.3,
            p.z + off.z + Math.sin(i * 0.9 + s * 3) * wobble * 0.3,
          ),
      );
      const curve = new THREE.CatmullRomCurve3(pts);
      strandGeos.push(new THREE.TubeGeometry(curve, 80, 0.012 + rand() * 0.03, 5));
    }
    const strandsGeo = mergeGeometries(strandGeos);
    strandGeos.forEach((geo) => geo.dispose());
    const strandMat = new THREE.MeshBasicMaterial({
      color: accent.clone().multiplyScalar(0.55),
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const strands = new THREE.Mesh(strandsGeo, strandMat);
    strands.frustumCulled = false;
    g.add(strands);

    // 明るい芯
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#bffcec').multiplyScalar(1.25),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const core = new THREE.Mesh(new THREE.TubeGeometry(baseCurve, 90, 0.06, 6), coreMat);
    core.frustumCulled = false;
    g.add(core);

    // 粒子: 帯の周りに濃く、空間に薄く
    const COUNT = 700;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      if (i < COUNT * 0.62) {
        const p = baseCurve.getPointAt(rand());
        const r = 0.25 + Math.pow(rand(), 2) * 1.8;
        const th = rand() * Math.PI * 2;
        pos[i * 3] = p.x + Math.cos(th) * r;
        pos[i * 3 + 1] = p.y + Math.sin(th) * r * 0.8;
        pos[i * 3 + 2] = p.z + (rand() - 0.5) * r;
      } else {
        pos[i * 3] = -8 + rand() * 22;
        pos[i * 3 + 1] = -3 + rand() * 13;
        pos[i * 3 + 2] = -14 + rand() * 18;
      }
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: accent.clone().multiplyScalar(0.9),
        size: 0.055,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    dust.frustumCulled = false;
    g.add(dust);

    // 闇に溶けるワイヤーフレーム構造（うっすら）
    const wireMat = new THREE.LineBasicMaterial({
      color: '#0f3b33',
      transparent: true,
      opacity: 0.45,
    });
    const wireSpec: [number, number, number, number][] = [
      [4, 6.5, 0.5, -9],
      [2.5, 1.5, 4.5, -7],
      [3, 9, 3, -11],
      [1.8, 4, 6.5, -4],
    ];
    for (const [size, x, y, z] of wireSpec) {
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)),
        wireMat,
      );
      wire.position.set(x, y, z);
      wire.rotation.set(rand() * 0.4, rand() * Math.PI, 0);
      g.add(wire);
    }

    return g;
  }, []);

  return <primitive object={group} />;
};

export default DataStreamZone;
