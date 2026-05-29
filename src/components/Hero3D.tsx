import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_MODELS, readAccent, type SceneModel } from '../lib/scene3d';

/** prefers-reduced-motion を購読 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/** glb をロードし、バウンディングボックスで正規化＋ワイヤーフレーム化して浮遊・自転させる */
function WireModel({
  model,
  color,
  reduced,
}: {
  model: SceneModel;
  color: string;
  reduced: boolean;
}) {
  const { scene } = useGLTF(model.path);

  // モデル固有のサイズ差を吸収し、線画マテリアルへ差し替え
  const normalized = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const norm = (model.scale * 2.2) / maxDim;

    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) mesh.material = mat;
    });

    // 原点中心に置いてから正規化スケール
    root.position.set(-center.x * norm, -center.y * norm, -center.z * norm);
    root.scale.setScalar(norm);
    return root;
  }, [scene, color, model.scale]);

  const spinRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!reduced && spinRef.current) spinRef.current.rotation.y += model.spin * dt;
  });

  return (
    <group position={model.position}>
      <Float
        speed={reduced ? 0 : model.floatSpeed}
        rotationIntensity={reduced ? 0 : 0.25}
        floatIntensity={reduced ? 0 : model.floatRange}
      >
        <group ref={spinRef}>
          <primitive object={normalized} />
        </group>
      </Float>
    </group>
  );
}

/** マウス位置でシーン全体をゆっくり傾ける（視差） */
function Rig({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  useFrame(() => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target.current.x * 0.35, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, target.current.y * 0.2, 0.04);
  });

  return <group ref={ref}>{children}</group>;
}

function Scene({ reduced }: { reduced: boolean }) {
  const [color, setColor] = useState('#7cf7d6');

  // テーマ切替（html.light クラスの付け外し）に追従してアクセント色を更新
  useEffect(() => {
    setColor(readAccent());
    const obs = new MutationObserver(() => setColor(readAccent()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <Rig reduced={reduced}>
      {HERO_MODELS.map((m) => (
        <WireModel key={m.name} model={m} color={color} reduced={reduced} />
      ))}
    </Rig>
  );
}

export default function Hero3D() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // 画面外なら描画を止めて負荷を抑える
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = reduced ? 'demand' : visible ? 'always' : 'never';

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ヒーロー表示時にすぐ出るよう先読み
HERO_MODELS.forEach((m) => useGLTF.preload(m.path));
