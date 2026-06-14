#!/usr/bin/env bash
# 生成動画 → 連番WebPフレームに変換する
# 使い方: bash scripts/extract-frames.sh corridor assets-src/corridor.mp4 [fps] [width] [grade]
#   第5引数に grade を渡すと「AIっぽさ殺し」のグレーディングを適用:
#   - 8%ズームクロップ（生成AIの透かし除去）
#   - 彩度抑制+コントラスト（AI特有の夢っぽい色を脱色）
#   - 時間変化するフィルムグレイン + 軽いビネット
set -euo pipefail

NAME="${1:?usage: extract-frames.sh <name> <input.mp4> [fps] [width] [grade]}"
INPUT="${2:?usage: extract-frames.sh <name> <input.mp4> [fps] [width] [grade]}"
FPS="${3:-10}"
WIDTH="${4:-1600}"
GRADE="${5:-}"

OUT="public/seq/${NAME}"
rm -rf "$OUT"
mkdir -p "$OUT"

FILTERS="scale=${WIDTH}:-2:flags=lanczos,fps=${FPS}"
if [ "$GRADE" = "grade" ]; then
  # クロップは非対称（右下 8% を落とす）— 生成AIの透かしが右下 ~93% 位置にあるため
  FILTERS="crop=iw*0.90:ih*0.90:iw*0.02:ih*0.02,scale=${WIDTH}:-2:flags=lanczos,fps=${FPS},eq=contrast=1.07:brightness=-0.015:saturation=0.78,noise=alls=7:allf=t+u,vignette=PI/4.6"
fi

ffmpeg -hide_banner -loglevel error -i "$INPUT" \
  -vf "$FILTERS" \
  -c:v libwebp -quality 80 -compression_level 6 \
  "${OUT}/%04d.webp"

COUNT=$(ls "$OUT" | grep -c '\.webp$')
SIZE=$(du -sh "$OUT" | cut -f1)
echo "{\"count\": ${COUNT}}" > "${OUT}/manifest.json"
echo "OK: ${COUNT} frames (${SIZE}) -> ${OUT}/"
