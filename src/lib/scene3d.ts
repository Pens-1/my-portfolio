// ヒーロー3Dのアクセント色をテーマ（CSS変数）から読む。
// ジオメトリ自体は Hero3D.tsx で手続き生成（ESP32 ボード）。外部モデル(glb)は不使用。

/** アクセント色を CSS 変数から読む（テーマ追従）。SSR は無いので window 前提でよい。 */
export const readAccent = (): string => {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim();
  return v || '#7cf7d6';
};
