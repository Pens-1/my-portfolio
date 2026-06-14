#!/usr/bin/env bash
# 生成した静止画1枚を ?seq=1 の背景としてページにはめて確認する（動画化する前の構図判定用）
# 使い方: bash scripts/use-still.sh corridor ~/Downloads/corridor-v1.png
set -euo pipefail

NAME="${1:?usage: use-still.sh <name> <image>}"
INPUT="${2:?usage: use-still.sh <name> <image>}"

OUT="public/seq/${NAME}"
rm -rf "$OUT"
mkdir -p "$OUT"

ffmpeg -hide_banner -loglevel error -i "$INPUT" \
  -vf "scale=1920:-2:flags=lanczos" -quality 85 "${OUT}/0001.webp"

echo '{"count": 1}' > "${OUT}/manifest.json"
echo "OK: still -> ${OUT}/0001.webp  （http://localhost:4444/?seq=1 で本文と重ねて確認）"
