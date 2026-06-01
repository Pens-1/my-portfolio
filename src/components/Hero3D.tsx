import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { readAccent } from '../lib/scene3d';

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

/**
 * ESP32 開発ボードを手続き生成（全てワイヤーフレーム / ライン）。
 * 基板アウトライン・ESP32モジュール・メアンダアンテナ・ヘッダピン・配線トレース・SMD部品。
 * テーマのアクセント色を受けて再構築。テキストの「回路基板から」に直結する象徴。
 */
function EspBoard({ color, reduced }: { color: string; reduced: boolean }) {
  const { obj, pulse, pulsePath } = useMemo(() => {
    const group = new THREE.Group();
    const c = new THREE.Color(color);
    const lineMat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.85 });
    const dimMat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.32 });
    const top = 0.05;

    const line = (pts: number[][], mat: THREE.Material = lineMat) => {
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      );
      group.add(new THREE.Line(g, mat as THREE.LineBasicMaterial));
    };
    const edges = (geo: THREE.BufferGeometry, x: number, y: number, z: number) => {
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat);
      e.position.set(x, y, z);
      group.add(e);
      geo.dispose();
    };

    // 基板アウトライン（薄い箱のエッジ）
    edges(new THREE.BoxGeometry(3.6, 0.08, 2.4), 0, 0, 0);
    // シルク枠（天面の内側矩形）
    line(
      [[-1.68, top, -1.08], [1.68, top, -1.08], [1.68, top, 1.08], [-1.68, top, 1.08], [-1.68, top, -1.08]],
      dimMat,
    );

    // ESP32 モジュール（左寄りの小箱・天面に浮かせる）
    edges(new THREE.BoxGeometry(1.0, 0.16, 1.35), -0.95, 0.12, 0);

    // メアンダアンテナ（基板左端のジグザグ = ESP の象徴）
    const ax = -1.55;
    const amp = 0.22;
    let z = -0.62;
    const dz = 0.18;
    const ant: number[][] = [[ax, top, z]];
    for (let i = 0; i < 7; i++) {
      const x = i % 2 === 0 ? ax + amp : ax;
      ant.push([x, top, z]);
      z += dz;
      ant.push([x, top, z]);
    }
    line(ant);

    // 配線トレース（直角ルーティング）
    const traces: number[][][] = [
      [[-0.45, top, -0.35], [0.7, top, -0.35], [0.7, top, 0.5], [1.55, top, 0.5]],
      [[-0.45, top, 0.25], [0.35, top, 0.25], [0.35, top, 0.9], [1.55, top, 0.9]],
      [[-0.45, top, -0.7], [1.3, top, -0.7], [1.3, top, -0.95]],
      [[-0.45, top, 0.0], [1.55, top, 0.0]],
    ];
    traces.forEach((t) => line(t));

    // SMD 部品（小さな箱）
    edges(new THREE.BoxGeometry(0.5, 0.1, 0.5), 0.95, top + 0.05, -0.55);
    edges(new THREE.BoxGeometry(0.18, 0.08, 0.34), 0.45, top + 0.04, 0.62);
    edges(new THREE.BoxGeometry(0.18, 0.08, 0.34), 0.72, top + 0.04, 0.62);

    // ヘッダピン（長辺2列の点）
    const pin: THREE.Vector3[] = [];
    for (let i = 0; i < 15; i++) {
      const x = -1.55 + (i * 3.1) / 14;
      pin.push(new THREE.Vector3(x, top, -1.0), new THREE.Vector3(x, top, 1.0));
    }
    group.add(
      new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(pin),
        new THREE.PointsMaterial({ color: c, size: 0.07, transparent: true, opacity: 0.9, sizeAttenuation: true }),
      ),
    );

    // ビア / パッド（トレース端の点）
    const via = [[1.55, top, 0.5], [1.55, top, 0.9], [1.3, top, -0.95], [1.55, top, 0.0]].map(
      (p) => new THREE.Vector3(p[0], p[1], p[2]),
    );
    group.add(
      new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(via),
        new THREE.PointsMaterial({ color: c, size: 0.11, transparent: true, opacity: 0.95, sizeAttenuation: true }),
      ),
    );

    // 電流パルス（最長トレースを流れる発光点）
    const pulsePath = new THREE.CatmullRomCurve3(
      traces[0].map((p) => new THREE.Vector3(p[0], top, p[2])),
      false,
      'catmullrom',
      0,
    );
    const pulse = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]),
      new THREE.PointsMaterial({ color: c, size: 0.18, transparent: true, opacity: 1, sizeAttenuation: true }),
    );
    group.add(pulse);

    // 斜めに傾けて天面を見せる
    group.rotation.set(-0.52, 0, 0.08);
    return { obj: group, pulse, pulsePath };
  }, [color]);

  const spinRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (reduced) return;
    if (spinRef.current) spinRef.current.rotation.y += 0.16 * dt;
    // パルスをトレース上で周回させる
    t.current = (t.current + dt * 0.22) % 1;
    const p = pulsePath.getPoint(t.current);
    const attr = pulse.geometry.getAttribute('position') as THREE.BufferAttribute;
    attr.setXYZ(0, p.x, p.y, p.z);
    attr.needsUpdate = true;
    (pulse.material as THREE.PointsMaterial).opacity = 0.4 + 0.6 * Math.sin(t.current * Math.PI);
  });

  return (
    <group position={[2.0, 0, 0]}>
      <Float
        speed={reduced ? 0 : 1.1}
        rotationIntensity={reduced ? 0 : 0.18}
        floatIntensity={reduced ? 0 : 0.4}
      >
        <group ref={spinRef}>
          <primitive object={obj} />
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
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target.current.x * 0.32, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, target.current.y * 0.18, 0.04);
  });

  return <group ref={ref}>{children}</group>;
}

function Scene({ reduced }: { reduced: boolean }) {
  const [color, setColor] = useState('#7cf7d6');
  const width = useThree((s) => s.size.width);
  const mobile = width < 768;

  // テーマ切替（html.light クラスの付け外し）に追従してアクセント色を更新
  useEffect(() => {
    setColor(readAccent());
    const obs = new MutationObserver(() => setColor(readAccent()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <Rig reduced={reduced}>
      {/* 右寄り配置。狭い画面では中央寄せ＋縮小して収める */}
      <group position-x={mobile ? -1.9 : 0} scale={mobile ? 0.72 : 1}>
        <EspBoard color={color} reduced={reduced} />
      </group>
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
