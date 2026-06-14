import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { bgColorFor, fogFor, samplePath, type FogRange, type PathSample } from '../../lib/path';
import { scrollManager } from '../../lib/scroll';

/**
 * スクロール進捗 → カメラ。
 * lenis がスクロール自体を平滑化（一段目）するので、ここでの damp は
 * framerate 非依存化のための微弱な二段目（強くすると「遅延感」が出る）。
 * frameloop="demand" と整合: スクロールで invalidate → 目標に収束するまで自前で invalidate 連鎖。
 */
const CameraRig = () => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const scene = useThree((s) => s.scene);
  const invalidate = useThree((s) => s.invalidate);

  const sample = useMemo<PathSample>(
    () => ({ pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 50 }),
    [],
  );
  const fogRange = useMemo<FogRange>(() => ({ near: 7, far: 26 }), []);
  const curLook = useRef(new THREE.Vector3());

  // モバイル（touch）は lenis の syncTouch を切っている分、カメラ側を強めに減衰
  const lambda = useMemo(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return 100; // ほぼスナップ
    return coarse ? 4.5 : 8;
  }, []);

  // 初期姿勢は現在の進捗に即セット（ハッシュ直リンクで先頭からの高速フライスルーをしない）
  useEffect(() => {
    samplePath(scrollManager.progress, sample);
    camera.position.copy(sample.pos);
    curLook.current.copy(sample.look);
    camera.lookAt(curLook.current);
    camera.fov = sample.fov;
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, sample, invalidate]);

  // スクロール中は描画を要求（lenis のアニメーションも native scroll を発火する）
  useEffect(() => {
    const onScroll = () => invalidate();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [invalidate]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20); // タブ復帰などの巨大 delta で飛ばない
    samplePath(scrollManager.progress, sample);

    // ゾーンごとのフォグ距離と色（潜るほど暗くなる。背景＝フォグ色の一致を維持）
    if (scene.fog instanceof THREE.Fog) {
      fogFor(scrollManager.progress, fogRange);
      scene.fog.near = fogRange.near;
      scene.fog.far = fogRange.far;
      bgColorFor(scrollManager.progress, scene.fog.color);
      if (scene.background instanceof THREE.Color) {
        scene.background.copy(scene.fog.color);
      }
    }

    const d = THREE.MathUtils.damp;
    camera.position.set(
      d(camera.position.x, sample.pos.x, lambda, delta),
      d(camera.position.y, sample.pos.y, lambda, delta),
      d(camera.position.z, sample.pos.z, lambda, delta),
    );
    const look = curLook.current;
    const lookLambda = Math.max(1, lambda - 1);
    look.set(
      d(look.x, sample.look.x, lookLambda, delta),
      d(look.y, sample.look.y, lookLambda, delta),
      d(look.z, sample.look.z, lookLambda, delta),
    );
    camera.lookAt(look);

    if (Math.abs(camera.fov - sample.fov) > 0.01) {
      camera.fov = d(camera.fov, sample.fov, lambda, delta);
      camera.updateProjectionMatrix();
    }

    // 収束連鎖: 目標に達するまで demand でも描画を続ける
    const converged =
      camera.position.distanceToSquared(sample.pos) < 1e-6 &&
      look.distanceToSquared(sample.look) < 1e-6 &&
      Math.abs(camera.fov - sample.fov) <= 0.01;
    if (!converged) invalidate();
  });

  return null;
};

export default CameraRig;
