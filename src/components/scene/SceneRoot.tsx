import { lazy, Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { usePerfTier } from '../../hooks/usePerfTier';
import { readThemeTokens } from '../../lib/scene3d';
import { W2_Y, W3_Y, WB_Y, zoneVisibleFor } from '../../lib/path';
import { scrollManager } from '../../lib/scroll';
import LightRig from './LightRig';
import CameraRig from './CameraRig';
import CorridorZone from './zones/CorridorZone';
import ServerZone from './zones/ServerZone';
import ServerInteriorZone from './zones/ServerInteriorZone';
import ChipCityZone from './zones/ChipCityZone';
import DataStreamZone from './zones/DataStreamZone';

// postprocessing は重いので postfx チャンクに分離（high tier のみロード）
const Effects = lazy(() => import('./Effects'));

const DEBUG_GRAY =
  import.meta.env.DEV && new URLSearchParams(window.location.search).has('graycard');

// 4ワールドを y 分離で同居させ、進捗に応じて可視切替（切替は暗転/フラッシュが隠す）
const Worlds = () => {
  const w1 = useRef<THREE.Group>(null);
  const wb = useRef<THREE.Group>(null);
  const w2 = useRef<THREE.Group>(null);
  const w3 = useRef<THREE.Group>(null);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);

  // 起動時に全ワールド可視のまま1回コンパイル（ワールド切替時のシェーダーヒッチ防止）
  useEffect(() => {
    gl.compile(scene, camera);
  }, [gl, scene, camera]);

  useFrame(() => {
    const v = zoneVisibleFor(scrollManager.progress);
    if (w1.current) w1.current.visible = v.w1;
    if (wb.current) wb.current.visible = v.wb;
    if (w2.current) w2.current.visible = v.w2;
    if (w3.current) w3.current.visible = v.w3;
  });

  return (
    <>
      <group ref={w1}>
        <CorridorZone />
        <ServerZone />
      </group>
      <group ref={wb} position={[0, WB_Y, 0]}>
        <ServerInteriorZone />
      </group>
      <group ref={w2} position={[0, W2_Y, 0]}>
        <ChipCityZone />
      </group>
      <group ref={w3} position={[0, W3_Y, 0]}>
        <DataStreamZone />
      </group>
    </>
  );
};

const SceneRoot = () => {
  const tier = usePerfTier();

  if (tier === 'static') return null;

  const { ink } = readThemeTokens();

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        frameloop="demand" // 静止中は描画しない（スクロール中だけ CameraRig が invalidate）
        dpr={tier === 'high' ? [1, 1.5] : [1, 1.25]}
        gl={{
          antialias: tier !== 'high', // high は composer の MSAA に任せる
          powerPreference: 'high-performance',
          stencil: false,
          preserveDrawingBuffer: DEBUG_GRAY, // グレーカード校正時のみ（ピクセル読み出し用）
          // composer 使用時はチェーン末尾の ToneMapping(NEUTRAL) が担当
          toneMapping: tier === 'high' ? THREE.NoToneMapping : THREE.NeutralToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ fov: 50, near: 0.1, far: 120, position: [-1.2, 1.55, 2] }}
      >
        {/* フォグ＝背景＝CSS --ink の3点一致（Canvas と DOM を地続きに見せる核心） */}
        <color attach="background" args={[ink]} />
        <fog attach="fog" args={[ink, 7, 26]} />

        <CameraRig />
        <LightRig />
        <Worlds />

        {DEBUG_GRAY && (
          <mesh position={[0.3, 1.4, -2.5]}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial color="#808080" roughness={0.5} />
          </mesh>
        )}

        {tier === 'high' && (
          <Suspense fallback={null}>
            <Effects />
          </Suspense>
        )}
      </Canvas>
    </div>
  );
};

export default SceneRoot;
