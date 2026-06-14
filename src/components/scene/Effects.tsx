import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

/**
 * PostFX（high tier のみ）。
 * ToneMapping(NEUTRAL) は必ずチェーン最後 — これを忘れると眠い画になる。
 * ACES は白がグレーに沈むので使わない。Bloom は threshold 1.0（emissive >1.0 の面しか光らない）。
 */
const Effects = () => (
  <EffectComposer multisampling={4}>
    <Bloom mipmapBlur intensity={0.15} luminanceThreshold={1.0} luminanceSmoothing={0.08} />
    <Vignette offset={0.28} darkness={0.22} />
    <ToneMapping mode={ToneMappingMode.NEUTRAL} />
  </EffectComposer>
);

export default Effects;
