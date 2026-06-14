import { useMemo } from 'react';
import * as THREE from 'three';
import { readThemeTokens } from '../../../lib/scene3d';

/**
 * WB: 巨大サーバー内部（グループごと y=-60 に配置）。
 * 「扉から入って小さくなった」— 低い金属天板の下、ヒートシンクの壁とケーブルの間を
 * LED の光だまりに向かって漂う。AD 正解: docs/ad-ref/zoneB-server.jpg
 * ほの暗い中で LED が一番明るい点。グローバル照明は lightLevelFor で 0.18 に落ちている。
 */

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const matLid = new THREE.MeshStandardMaterial({
  color: '#161a1c',
  metalness: 0.75,
  roughness: 0.4,
});
const matBoard = new THREE.MeshStandardMaterial({
  color: '#0c1311',
  metalness: 0.15,
  roughness: 0.5,
});
const matFin = new THREE.MeshStandardMaterial({
  color: '#aeb6b3',
  metalness: 0.95,
  roughness: 0.3,
});
const matDarkPart = new THREE.MeshStandardMaterial({
  color: '#14201c',
  metalness: 0.3,
  roughness: 0.55,
});
const matCable = new THREE.MeshStandardMaterial({
  color: '#0a0c0d',
  metalness: 0.1,
  roughness: 0.6,
});

const ServerInteriorZone = () => {
  const { group, accent } = useMemo(() => {
    const rand = mulberry32(31);
    const g = new THREE.Group();
    const dummy = new THREE.Object3D();
    const accentColor = new THREE.Color(readThemeTokens().accent);

    // 天板（低く圧し掛かる）と基板の床
    const lid = new THREE.Mesh(new THREE.PlaneGeometry(26, 16), matLid);
    lid.rotation.x = Math.PI / 2;
    lid.position.set(2, 2.3, 0);
    g.add(lid);
    const board = new THREE.Mesh(new THREE.PlaneGeometry(26, 16), matBoard);
    board.rotation.x = -Math.PI / 2;
    board.position.set(2, 0, 0);
    g.add(board);

    // 巨大ヒートシンク（フィンの壁）— 右奥
    const finGeo = new THREE.BoxGeometry(2.4, 1.5, 0.025);
    const fins = new THREE.InstancedMesh(finGeo, matFin, 30);
    for (let i = 0; i < 30; i++) {
      dummy.position.set(5.6, 0.78, -3.2 + i * 0.095);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      fins.setMatrixAt(i, dummy.matrix);
    }
    g.add(fins);
    const finBase = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 3.1), matFin);
    finBase.position.set(5.6, 0.06, -1.83);
    g.add(finBase);

    // RAM スロット列 — ヒートシンクの奥
    const ramGeo = new THREE.BoxGeometry(0.09, 1.35, 1.0);
    const rams = new THREE.InstancedMesh(ramGeo, matDarkPart, 8);
    for (let i = 0; i < 8; i++) {
      dummy.position.set(7.4 + i * 0.32, 0.68, -3.6);
      dummy.updateMatrix();
      rams.setMatrixAt(i, dummy.matrix);
    }
    g.add(rams);

    // 奥のファン壁（2基・シルエット）
    for (const fz of [-1.6, 1.8]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.1, 10, 30), matDarkPart);
      ring.position.set(11, 1.15, fz);
      ring.rotation.y = Math.PI / 2;
      g.add(ring);
      const blades = new THREE.InstancedMesh(
        new THREE.BoxGeometry(0.06, 0.78, 0.26),
        matDarkPart,
        7,
      );
      for (let k = 0; k < 7; k++) {
        const ang = (k / 7) * Math.PI * 2;
        dummy.position.set(11, 1.15 + Math.sin(ang) * 0.55, fz + Math.cos(ang) * 0.55);
        dummy.rotation.set(ang, 0, 0);
        dummy.updateMatrix();
        blades.setMatrixAt(k, dummy.matrix);
      }
      g.add(blades);
    }

    // コンデンサ群（タンクのように立つ）
    const capGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.85, 16);
    const caps = new THREE.InstancedMesh(capGeo, matFin, 7);
    const capPos: [number, number][] = [
      [2.6, 2.0],
      [3.3, 2.4],
      [3.0, 1.4],
      [-1.5, -2.2],
      [-0.7, -2.7],
      [8.6, 1.2],
      [9.4, 0.6],
    ];
    capPos.forEach(([x, z], i) => {
      dummy.position.set(x, 0.42, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      caps.setMatrixAt(i, dummy.matrix);
    });
    g.add(caps);

    // 低いチップ群
    const chipGeo = new THREE.BoxGeometry(1.4, 0.22, 1.4);
    const chips = new THREE.InstancedMesh(chipGeo, matDarkPart, 6);
    const chipPos: [number, number][] = [
      [0.5, -1.8],
      [-2.8, 0.8],
      [1.8, 3.2],
      [-4.5, -1.2],
      [7.8, 2.6],
      [4.2, 3.6],
    ];
    chipPos.forEach(([x, z], i) => {
      dummy.position.set(x, 0.11, z);
      dummy.rotation.set(0, rand() * Math.PI * 0.5, 0);
      dummy.updateMatrix();
      chips.setMatrixAt(i, dummy.matrix);
    });
    g.add(chips);

    // 天板から垂れ下がる太いケーブル（視界を横切る）
    const cable = (pts: [number, number, number][], r: number, mat: THREE.Material) => {
      const curve = new THREE.CatmullRomCurve3(pts.map((v) => new THREE.Vector3(...v)));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, r, 7), mat));
    };
    cable(
      [
        [-5, 2.3, -2.5],
        [-3.5, 1.4, -1.5],
        [-2, 1.1, 0.5],
        [-1, 1.6, 2.5],
        [0, 2.3, 3.5],
      ],
      0.16,
      matCable,
    );
    cable(
      [
        [-2, 2.3, -3.5],
        [0, 1.5, -2.8],
        [2, 1.2, -2.2],
        [4, 1.7, -3.0],
        [5.5, 2.3, -3.4],
      ],
      0.13,
      matCable,
    );
    cable(
      [
        [1, 2.3, 3.8],
        [2.5, 1.6, 3.0],
        [4.5, 1.3, 2.6],
        [6.5, 1.8, 3.2],
        [8, 2.3, 3.6],
      ],
      0.14,
      matCable,
    );
    // アクセント緑のスリーブケーブル（1本だけ）
    const accentCableMat = new THREE.MeshBasicMaterial({
      color: accentColor.clone().multiplyScalar(0.85),
      toneMapped: false,
    });
    cable(
      [
        [-4, 2.3, 1.5],
        [-2.5, 1.5, 1.8],
        [-0.5, 1.0, 1.2],
        [1.5, 0.6, 0.8],
        [2.2, 0.25, 0.4],
      ],
      0.07,
      accentCableMat,
    );

    // LED クラスタ（画の主役・光だまりの根元）
    const ledMat = new THREE.MeshBasicMaterial({
      color: accentColor.clone().multiplyScalar(2.4),
      toneMapped: false,
    });
    const ledGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const leds = new THREE.InstancedMesh(ledGeo, ledMat, 5);
    const ledPos: [number, number, number][] = [
      [2.2, 0.12, 0.4],
      [2.5, 0.12, 0.15],
      [2.0, 0.3, 0.0],
      [2.7, 0.12, 0.65],
      [1.9, 0.12, 0.7],
    ];
    ledPos.forEach((v, i) => {
      dummy.position.set(...v);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      leds.setMatrixAt(i, dummy.matrix);
    });
    g.add(leds);

    // 光だまりに漂う塵
    const dustPos = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) {
      dustPos[i * 3] = 0.5 + rand() * 5;
      dustPos[i * 3 + 1] = 0.2 + rand() * 1.8;
      dustPos[i * 3 + 2] = -1.5 + rand() * 3.5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: '#9adcc8',
        size: 0.035,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    );
    dust.frustumCulled = false;
    g.add(dust);

    return { group: g, accent: accentColor };
  }, []);

  return (
    <group>
      <primitive object={group} />
      {/* LED の光だまり（このゾーンの唯一の主光源） */}
      <pointLight
        position={[2.3, 0.9, 0.3]}
        intensity={9}
        distance={11}
        decay={1.8}
        color={accent.clone().multiplyScalar(0.9)}
      />
      {/* 天板のエッジを起こす極弱の冷光 */}
      <pointLight position={[-2, 2.0, 0]} intensity={1.1} distance={9} color="#8fb8ac" />
    </group>
  );
};

export default ServerInteriorZone;
