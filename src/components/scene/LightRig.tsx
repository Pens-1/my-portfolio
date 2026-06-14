import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { RectAreaLightUniformsLib } from 'three-stdlib';
import { lightLevelFor } from '../../lib/path';
import { scrollManager } from '../../lib/scroll';

// rectAreaLight はこれを呼ばないと光らない（モジュールスコープで1回だけ）
RectAreaLightUniformsLib.init();

// カメラ近傍の天井灯のみ実ライト化（残りは発光パネルの見た目だけ）
const RECT_LIGHT_Z = [-2, -6, -10, -14];

/**
 * 白シーンの骨格ライティング。
 * ambientLight は使わない（陰影が消えて白飛び平坦になる主因）。
 * 環境マップは「上明・横中・下暗」— 均一白envだとベベルのエッジハイライトが出ない。
 */
const LightRig = () => {
  const scene = useThree((s) => s.scene);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const dir = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    scene.environmentIntensity = 0.6;
  }, [scene]);

  // 潜るほどグローバル照明を絞る（暗いゾーンの黒を守る。env は金属用に下限を残す）
  useFrame(() => {
    const level = lightLevelFor(scrollManager.progress);
    if (hemi.current) hemi.current.intensity = 0.45 * level;
    if (dir.current) dir.current.intensity = 0.7 * level;
    scene.environmentIntensity = 0.6 * Math.max(level, 0.3);
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={['#ffffff', '#c2c7c2', 0.45]} />
      <directionalLight ref={dir} position={[4, 8, 6]} intensity={0.7} color="#ffffff" />

      {RECT_LIGHT_Z.map((z) => (
        <rectAreaLight
          key={z}
          position={[0, 3.15, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          args={['#ffffff', 6, 1.8, 0.7]}
        />
      ))}

      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#aab0ac']} />
        {/* 上: 明 */}
        <Lightformer
          intensity={1.2}
          rotation-x={Math.PI / 2}
          position={[0, 5, 0]}
          scale={[12, 12, 1]}
          color="#ffffff"
        />
        {/* 横: 中 */}
        <Lightformer
          intensity={0.55}
          rotation-y={Math.PI / 2}
          position={[-6, 1.5, 0]}
          scale={[12, 4, 1]}
          color="#e2e6e2"
        />
        <Lightformer
          intensity={0.55}
          rotation-y={-Math.PI / 2}
          position={[6, 1.5, 0]}
          scale={[12, 4, 1]}
          color="#e2e6e2"
        />
        {/* 下: やや暗（白天井が沈み込まない程度の照り返し） */}
        <Lightformer
          intensity={0.42}
          rotation-x={-Math.PI / 2}
          position={[0, -5, 0]}
          scale={[12, 12, 1]}
          color="#9aa09b"
        />
      </Environment>
    </>
  );
};

export default LightRig;
