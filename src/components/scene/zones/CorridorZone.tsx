import { useMemo } from 'react';
import * as THREE from 'three';
import { ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import { HERO_Z } from '../../../lib/path';
import {
  makeFloorTexture,
  makeWallTexture,
  matCeiling,
  matDark,
  matEmissivePanel,
  matGlass,
  matLed,
  matMetal,
  matRack,
  matRecess,
  matSlat,
  matWall,
} from '../materials';

// 廊下: 幅6.4m（壁 x=±3.2）× 高さ3.2m × z +4〜-40
const Z_START = -1.0;
const Z_END = -35.0;
const PITCH = 0.84; // ラック幅0.78 + 隙間0.06
const BODY_DEPTH = 1.0;
const BODY_FRONT = 2.16; // 筐体前面。ガラスはこれより手前 → 奥から 内部2.15 / スラット2.12 / LED2.10 / ガラス2.06
const RACK_X = BODY_FRONT + BODY_DEPTH / 2; // 中心 2.66（背面 3.16 < 壁 3.2）
// about 読書区間（カメラ z≈-21 から奥を見る）の左側はラックを置かず白壁に — 文字裏の余白を構造で確保
const LEFT_ROW_END = -18.2;

// LED 配色の再現性のためシード付き乱数
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildCorridor = (): THREE.Group => {
  const g = new THREE.Group();
  const rand = mulberry32(7);
  const dummy = new THREE.Object3D();

  const perSide = Math.floor((Z_START - Z_END) / PITCH);
  const total = perSide * 2;
  const SLATS = 14;

  // --- ラック筐体（ベベルがエッジハイライトを生む） ---
  const bodyGeo = new RoundedBoxGeometry(BODY_DEPTH, 2.1, 0.78, 3, 0.025);
  const bodies = new THREE.InstancedMesh(bodyGeo, matRack, total);

  // --- 前面レイヤー（奥→手前: 内部暗色 2.15 / スラット 2.12 / LED 2.10 / ガラス 2.06）---
  const doorGeo = new THREE.PlaneGeometry(0.6, 1.86);
  const doors = new THREE.InstancedMesh(doorGeo, matGlass, total);
  const interiorGeo = new THREE.PlaneGeometry(0.64, 1.92);
  const interiors = new THREE.InstancedMesh(interiorGeo, matDark, total);
  const slatGeo = new THREE.BoxGeometry(0.035, 0.03, 0.58);
  const slats = new THREE.InstancedMesh(slatGeo, matSlat, total * SLATS);
  const handleGeo = new THREE.BoxGeometry(0.02, 0.5, 0.03);
  const handles = new THREE.InstancedMesh(handleGeo, matMetal, total);

  // ガラスと筐体の隙間を閉じるドア枠（縦レール×2、横レール×2）
  const railVGeo = new THREE.BoxGeometry(0.12, 2.1, 0.08);
  const railsV = new THREE.InstancedMesh(railVGeo, matRack, total * 2);
  const railHGeo = new THREE.BoxGeometry(0.12, 0.12, 0.78);
  const railsH = new THREE.InstancedMesh(railHGeo, matRack, total * 2);

  const ledGeo = new THREE.BoxGeometry(0.014, 0.014, 0.014);
  const ledMax = total * SLATS;
  const leds = new THREE.InstancedMesh(ledGeo, matLed, ledMax);
  const cGreen = new THREE.Color('#0d9488').multiplyScalar(2.2);
  const cAmber = new THREE.Color('#ffb347').multiplyScalar(1.6);
  const cOff = new THREE.Color('#2a2f33');

  let rack = 0;
  let slatIdx = 0;
  let ledIdx = 0;
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < perSide; i++) {
      const z = Z_START - PITCH / 2 - i * PITCH;
      if (side === -1 && z < LEFT_ROW_END) continue;
      // ヒーローサーバーのスロットは空ける（ServerZone が扉の開く詳細版を置く）
      if (side === 1 && Math.abs(z - HERO_Z) < PITCH / 2) continue;
      const rotY = side === 1 ? -Math.PI / 2 : Math.PI / 2; // 通路側を向く

      dummy.position.set(side * RACK_X, 1.05, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      bodies.setMatrixAt(rack, dummy.matrix);

      dummy.position.set(side * 2.06, 1.07, z);
      dummy.rotation.set(0, rotY, 0);
      dummy.updateMatrix();
      doors.setMatrixAt(rack, dummy.matrix);

      dummy.position.set(side * 2.15, 1.07, z);
      dummy.updateMatrix();
      interiors.setMatrixAt(rack, dummy.matrix);

      dummy.rotation.set(0, 0, 0);
      dummy.position.set(side * 2.11, 1.05, z - 0.355);
      dummy.updateMatrix();
      railsV.setMatrixAt(rack * 2, dummy.matrix);
      dummy.position.set(side * 2.11, 1.05, z + 0.355);
      dummy.updateMatrix();
      railsV.setMatrixAt(rack * 2 + 1, dummy.matrix);

      dummy.position.set(side * 2.11, 2.05, z);
      dummy.updateMatrix();
      railsH.setMatrixAt(rack * 2, dummy.matrix);
      dummy.position.set(side * 2.11, 0.06, z);
      dummy.updateMatrix();
      railsH.setMatrixAt(rack * 2 + 1, dummy.matrix);

      dummy.position.set(side * 2.045, 1.0, z + 0.26);
      dummy.updateMatrix();
      handles.setMatrixAt(rack, dummy.matrix);

      for (let s = 0; s < SLATS; s++) {
        const y = 0.18 + s * 0.128;
        dummy.position.set(side * 2.12, y, z);
        dummy.updateMatrix();
        slats.setMatrixAt(slatIdx++, dummy.matrix);

        if (rand() < 0.86) {
          dummy.position.set(side * 2.1, y + 0.012, z - 0.22 + rand() * 0.05);
          dummy.updateMatrix();
          leds.setMatrixAt(ledIdx, dummy.matrix);
          const r = rand();
          leds.setColorAt(ledIdx, r < 0.7 ? cGreen : r < 0.84 ? cAmber : cOff);
          ledIdx++;
        }
      }
      rack++;
    }
  }
  bodies.count = rack;
  doors.count = rack;
  interiors.count = rack;
  handles.count = rack;
  railsV.count = rack * 2;
  railsH.count = rack * 2;
  slats.count = slatIdx;
  leds.count = ledIdx;

  for (const mesh of [bodies, doors, interiors, slats, railsV, railsH, handles, leds]) {
    mesh.frustumCulled = false; // インスタンスは z 方向に長く分布（バウンディング計算が合わない）
    g.add(mesh);
  }

  // --- 左側 about 区間の間仕切り壁（ラック前面と面一）+ ドア ---
  const partTex = makeWallTexture();
  partTex.repeat.set(18 / 1.2, 1);
  const matPart = matWall.clone();
  matPart.map = partTex;
  const partition = new THREE.Mesh(new THREE.PlaneGeometry(18, 3.2), matPart);
  partition.position.set(-2.1, 1.6, LEFT_ROW_END - 9);
  partition.rotation.y = Math.PI / 2;
  g.add(partition);

  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.2), matRecess);
  door.position.set(-2.09, 1.1, -26);
  door.rotation.y = Math.PI / 2;
  g.add(door);

  // --- 壁（縦目地テクスチャ）と突き当たり ---
  const wallTex = makeWallTexture();
  wallTex.repeat.set(44 / 1.2, 1);
  const matWallTex = matWall.clone();
  matWallTex.map = wallTex;
  const wallGeo = new THREE.PlaneGeometry(44, 3.2);
  const wallL = new THREE.Mesh(wallGeo, matWallTex);
  wallL.position.set(-3.2, 1.6, -18);
  wallL.rotation.y = Math.PI / 2;
  const wallR = new THREE.Mesh(wallGeo, matWallTex);
  wallR.position.set(3.2, 1.6, -18);
  wallR.rotation.y = -Math.PI / 2;
  const wallEnd = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.2), matWall);
  wallEnd.position.set(0, 1.6, -40);
  g.add(wallL, wallR, wallEnd);

  // --- 天井 + 発光パネル + ケーブルトレイ ---
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 44), matCeiling);
  ceiling.position.set(0, 3.2, -18);
  ceiling.rotation.x = Math.PI / 2;
  g.add(ceiling);

  const panelGeo = new THREE.BoxGeometry(1.8, 0.02, 0.7);
  const panelZ = [-2, -6, -10, -14, -18, -22, -26, -30, -34];
  const panels = new THREE.InstancedMesh(panelGeo, matEmissivePanel, panelZ.length);
  panelZ.forEach((z, i) => {
    dummy.position.set(0, 3.19, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    panels.setMatrixAt(i, dummy.matrix);
  });
  panels.frustumCulled = false;
  g.add(panels);

  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.07, 44), matMetal);
  tray.position.set(1.5, 3.05, -18);
  g.add(tray);

  return g;
};

// Zone A: 白い廊下（home）。文字は左55vw、消失点は右寄せ
const CorridorZone = () => {
  const group = useMemo(buildCorridor, []);
  const floorMap = useMemo(() => {
    const tex = makeFloorTexture();
    tex.repeat.set(6.4 / 0.6, 44 / 0.6);
    return tex;
  }, []);

  return (
    <group>
      <primitive object={group} />

      {/* 反射床（弱い反射のマット白。鏡にしない） */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -18]}>
        <planeGeometry args={[6.4, 44]} />
        <MeshReflectorMaterial
          color="#ffffff"
          map={floorMap}
          resolution={512}
          mirror={0}
          mixStrength={1.5}
          roughness={0.85}
          blur={[400, 100]}
          mixBlur={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
        />
      </mesh>

      <ContactShadows
        position={[0, 0.01, -18]}
        scale={[6.6, 44]}
        far={2.4}
        blur={2.5}
        opacity={0.35}
        color="#38403a"
        resolution={512}
        frames={1}
      />
    </group>
  );
};

export default CorridorZone;
