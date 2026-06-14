import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { doorOpenFor, HERO_Z } from '../../../lib/path';
import { scrollManager } from '../../../lib/scroll';
import { readThemeTokens } from '../../../lib/scene3d';
import { matDark, matGlass, matLed, matMetal, matRack, matSlat } from '../materials';

/**
 * ヒーローサーバー（右列 z=HERO_Z の1台）。
 * スクロールに連動してガラス扉が開き、カメラが中へ入っていく。
 * 内部はファン壁・ヒートシンク（フィンスタック）・DIMM列・垂れ下がるケーブル。
 */

// 筐体: x 2.16..3.16 / y 0..2.1 / z HERO_Z±0.39
const X0 = 2.16;
const X1 = 3.16;

const buildShell = (): THREE.Group => {
  const g = new THREE.Group();
  const wall = 0.05;
  const W = 0.78;
  const D = X1 - X0;
  const cx = (X0 + X1) / 2;

  const mk = (geo: THREE.BoxGeometry, x: number, y: number, z: number, m = matRack) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    g.add(mesh);
  };

  // 側面・天面・底面・背面（前面は開口）
  const sideGeo = new THREE.BoxGeometry(D, 2.1, wall);
  mk(sideGeo, cx, 1.05, HERO_Z - W / 2);
  mk(sideGeo, cx, 1.05, HERO_Z + W / 2);
  const capGeo = new THREE.BoxGeometry(D, wall, W);
  mk(capGeo, cx, 2.1 - wall / 2, HERO_Z);
  mk(capGeo, cx, wall / 2, HERO_Z);
  mk(new THREE.BoxGeometry(wall, 2.1, W), X1 - wall / 2, 1.05, HERO_Z);

  // 内部背面・床（暗部アンカー）
  const back = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.1, 2.0), matDark);
  back.position.set(X1 - wall - 0.01, 1.05, HERO_Z);
  back.rotation.y = -Math.PI / 2;
  g.add(back);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(D - 0.12, W - 0.1), matDark);
  floor.position.set(cx, wall + 0.005, HERO_Z);
  floor.rotation.x = -Math.PI / 2;
  g.add(floor);

  return g;
};

const buildInterior = (): THREE.Group => {
  const g = new THREE.Group();
  const dummy = new THREE.Object3D();

  // CPU ヒートシンク = 0.006 厚のフィン 26 枚スタック（白シーン最強の高級感要素）
  const finGeo = new THREE.BoxGeometry(0.24, 0.3, 0.006);
  const fins = new THREE.InstancedMesh(finGeo, matMetal, 26);
  for (let i = 0; i < 26; i++) {
    dummy.position.set(2.62, 1.32, HERO_Z - 0.18 + i * 0.0144);
    dummy.updateMatrix();
    fins.setMatrixAt(i, dummy.matrix);
  }
  g.add(fins);
  // ヒートシンクのベースプレート
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.4), matMetal);
  base.position.set(2.62, 1.16, HERO_Z);
  g.add(base);

  // ファン壁（2基）: リング + 7枚ブレード + ハブ
  const blades = new THREE.InstancedMesh(new THREE.BoxGeometry(0.012, 0.1, 0.034), matSlat, 14);
  let b = 0;
  for (const fz of [HERO_Z - 0.18, HERO_Z + 0.18]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 10, 28), matDark);
    ring.position.set(2.34, 0.6, fz);
    ring.rotation.y = Math.PI / 2;
    g.add(ring);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 14), matDark);
    hub.position.set(2.34, 0.6, fz);
    hub.rotation.z = Math.PI / 2;
    g.add(hub);
    for (let k = 0; k < 7; k++) {
      const ang = (k / 7) * Math.PI * 2;
      dummy.position.set(2.34, 0.6 + Math.sin(ang) * 0.085, fz + Math.cos(ang) * 0.085);
      dummy.rotation.set(ang, 0, 0);
      dummy.updateMatrix();
      blades.setMatrixAt(b++, dummy.matrix);
    }
  }
  g.add(blades);

  // DIMM 列（8枚）
  const dimms = new THREE.InstancedMesh(new THREE.BoxGeometry(0.25, 0.34, 0.012), matSlat, 8);
  for (let i = 0; i < 8; i++) {
    dummy.position.set(2.95, 1.0, HERO_Z - 0.14 + i * 0.04);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    dimms.setMatrixAt(i, dummy.matrix);
  }
  g.add(dimms);

  // 垂れ下がる電源ケーブル（黒×2 + アクセント緑×1）
  const cable = (pts: [number, number, number][], mat: THREE.Material, r = 0.016) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, r, 6), mat);
    g.add(mesh);
  };
  cable(
    [
      [2.3, 2.0, HERO_Z - 0.3],
      [2.45, 1.7, HERO_Z - 0.1],
      [2.4, 1.75, HERO_Z + 0.12],
      [2.7, 1.95, HERO_Z + 0.3],
    ],
    matDark,
  );
  cable(
    [
      [3.0, 2.0, HERO_Z - 0.32],
      [2.9, 1.6, HERO_Z - 0.2],
      [3.02, 0.9, HERO_Z - 0.05],
      [3.05, 0.5, HERO_Z + 0.2],
    ],
    matDark,
  );
  const accentMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(readThemeTokens().accent).multiplyScalar(1.1),
    toneMapped: false,
  });
  cable(
    [
      [2.5, 1.95, HERO_Z + 0.3],
      [2.62, 1.55, HERO_Z + 0.18],
      [2.85, 1.1, HERO_Z + 0.25],
      [3.05, 0.6, HERO_Z + 0.3],
    ],
    accentMat,
    0.011,
  );

  // 状態 LED（2連）
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.015, 0.015), matLed);
  led.position.set(2.2, 1.95, HERO_Z - 0.3);
  g.add(led);

  return g;
};

const ServerZone = () => {
  const shell = useMemo(buildShell, []);
  const interior = useMemo(buildInterior, []);
  const doorRef = useRef<THREE.Group>(null);

  // 扉: ヒンジは奥側エッジ（z = HERO_Z-0.36）。開くと通路側（-x）へスイング
  const door = useMemo(() => {
    const g = new THREE.Group();
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 1.88), matGlass);
    glass.rotation.y = -Math.PI / 2;
    glass.position.set(0, 0, 0.33);
    g.add(glass);
    // 白フレーム（縦2 + 横2）
    const railV = new THREE.BoxGeometry(0.03, 1.96, 0.05);
    for (const zOff of [0.03, 0.64]) {
      const r = new THREE.Mesh(railV, matRack);
      r.position.set(0, 0, zOff);
      g.add(r);
    }
    const railH = new THREE.BoxGeometry(0.03, 0.05, 0.66);
    for (const yOff of [0.96, -0.96]) {
      const r = new THREE.Mesh(railH, matRack);
      r.position.set(0, yOff, 0.33);
      g.add(r);
    }
    // ハンドル
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.45, 0.03), matMetal);
    handle.position.set(-0.035, 0, 0.6);
    g.add(handle);
    return g;
  }, []);

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = -doorOpenFor(scrollManager.progress) * 1.92;
    }
  });

  return (
    <group>
      <primitive object={shell} />
      <primitive object={interior} />
      <group ref={doorRef} position={[X0 - 0.06, 1.06, HERO_Z - 0.36]}>
        <primitive object={door} />
      </group>
      {/* 内部の控えめな補助光（ヒートシンクの金属を起こす） */}
      <pointLight position={[2.5, 1.7, HERO_Z]} intensity={1.6} distance={2.8} color="#f2fffa" />
    </group>
  );
};

export default ServerZone;
