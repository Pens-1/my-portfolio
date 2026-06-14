import { useState } from 'react';
import { detectPerfTier, type PerfTier } from '../lib/perf';

export const usePerfTier = (): PerfTier => {
  // マウント時に1回判定（リサイズ追従はしない — Canvas の作り直しは高コスト）
  const [tier] = useState<PerfTier>(detectPerfTier);
  return tier;
};
