# 背景ビジュアル生成パイプライン（段階式）

ポートフォリオ背景を生成ビジュアルに差し替えるためのプロンプト集と手順。
**いきなり動画を作らない。** 静止画で構図を確定 → ページにはめて判定 → 承認した画だけ動画化。

```
STEP 1  静止画生成（各ゾーン2〜4枚ガチャ → 1枚選ぶ）
STEP 2  ページにはめて判定   bash scripts/use-still.sh corridor <画像>  →  /?seq=1
STEP 3  承認した静止画を image-to-video で動画化（カメラ移動だけ指示）
STEP 4  連番化して統合      bash scripts/extract-frames.sh corridor <mp4>  →  /?seq=1
```

## 共通スペック

- 16:9（モバイル用 9:16 は全ゾーン合格後に別途）
- 静止画: できるだけ高解像度 / 動画: 1080p以上・8秒前後・カットなし1ショット
- 人・文字・ロゴ・透かしなし
- **構図の絶対条件: 主役は画面右1/3、左半分は余白（白壁・霧）** — 文字が左に載る

## 共通スタイル接尾辞（全ゾーンのプロンプト末尾に付ける）

> photorealistic architectural visualization, high-key clinical white lighting,
> Apple-commercial cleanliness, subtle teal-green accents, soft diffuse light,
> 8k detail, no people, no text, no logos

---

# STEP 1: 静止画プロンプト

## Zone A — 白いクリーンルーム廊下（ヒーロー〜about）★1枚目・生成済み

**メイン:**

> Pristine white data center corridor. Rows of glossy white server racks with
> glass front doors along the right side, dark server slots with tiny glowing
> teal-green status LEDs behind the glass. Clean white paneled wall on the left
> side. Polished seamless white floor with soft diffuse reflections, white
> ceiling with recessed rectangular light panels. The far end of the corridor
> dissolves into bright white haze. One-point perspective with the vanishing
> point in the right third of the frame; the left half of the frame is calm and
> empty. + 共通スタイル接尾辞

**バリエーション（ガチャ用に語尾に足す）:**
- B: `low camera angle, slightly looking upward, monumental scale`（ローアングルで威圧感）
- C: `one server rack at center-right with its glass door slightly ajar, teal-green light spilling onto the floor`（緑の見せ場）

## Zone B — サーバー内部（about末尾の進入）★2枚目

実物のラックサーバーを開けた中身そのまま。カメラだけ筐体の中の低い位置に置いて、
金属の側板に挟まれた狭さを出す。プロのサーバー分解写真のリアリティで。

※このゾーンだけ共通スタイル接尾辞（ハイキー白照明）を**使わない**。
ほの暗い中で基板のLEDが一番明るく光ってるのが見せ場。真っ暗にはしない。

**メイン:**

> Photorealistic macro shot inside a running rack-mount server: a motherboard
> with small status LEDs glowing teal-green in the dim interior, their glow
> softly illuminating the nearby aluminum heatsink fins, RAM modules and black
> cables. The low metal lid and chassis walls keep the space tight and
> enclosed. Moderately dark ambience — the components remain visible in soft
> shadow while the glowing LEDs are the brightest points in the frame, with
> gentle bokeh. Shallow depth of field, cinematic electronics photography.
> No people, no text, no logos.

**バリエーション（ガチャ用に語尾に足す）:**
- B: `rows of LED points receding into the depth of the chassis`（光の点が奥へ続く）
- C: `one teal-green sleeved cable catching the LED glow`（緑ケーブルの見せ場）

**日本語版:**

> 稼働中のラックマウントサーバーの中のマクロ写真。ほの暗い筐体の中で、基板の小さな
> ステータスLEDが青緑に光り、その光が近くのアルミのヒートシンクフィン・RAMモジュール・
> 黒いケーブルをやわらかく照らしている。低い金属の天板と側板で空間は狭く閉じている。
> 暗さは中くらい — 部品は影の中にちゃんと見えていて、光るLEDが画面で一番明るい点。
> やわらかいボケ、浅い被写界深度、シネマティックな電子機器写真。人物・文字・ロゴなし。

## Zone C — チップの中＝シリコンダイの微細回路（activities）

Zone B（基板＋LED）からもう一段潜って、チップの内部へ。
電子顕微鏡で見たシリコンダイ＝夜の未来都市を空撮したような幾何学回路。

**メイン:**

> Extreme microscopic view of a silicon chip die, like an aerial photograph of
> a vast futuristic city: dense geometric grids of microscopic circuitry,
> fine metallic interconnect lines crossing like streets and highways, blocks
> of repeating structures like buildings. Faint teal-green light pulses
> travel along some of the pathways. Dark silicon surface with silver and
> gold metallic structures catching cool light. Slightly elevated camera angle
> looking across the die toward a hazy bright horizon. Shallow depth of field,
> photorealistic electron-microscope aesthetic, no people, no text, no logos.

**バリエーション（ガチャ用に語尾に足す）:**
- B: `high-key bright version, pale silver surface, clean and clinical`（白め・明るめ版）
- C: `low street-level angle between the circuit structures`（回路の谷間から見上げ）

**日本語版:**

> シリコンチップのダイを電子顕微鏡で見た超拡大写真。広大な未来都市の空撮のように、
> 微細な回路の幾何学グリッドが密集し、金属の配線がストリートやハイウェイのように交差し、
> 繰り返し構造のブロックがビル群のように並ぶ。いくつかの配線を青緑の光のパルスが走る。
> 暗いシリコンの表面に銀と金の金属構造がクールな光を受けて光る。やや高い視点から
> ダイの向こうの霞んだ明るい地平線を望む。浅い被写界深度、フォトリアル。
> 人物・文字・ロゴなし。

## Zone D — デジタル世界＝信号の中（posts）

チップの回路を走っていた光のパルス、その中に入る。**明るくしない** — 潜るほど暗くなる
流れのまま、闇の中をデータの光が流れる世界で終わる。
（このゾーンでは UI を反転: posts セクション滞在中だけ文字・ナビを白にする）

**メイン:**

> Inside the digital world: a vast dark space where wide ribbons of teal-green
> light flow like rivers of data through the right half of the frame, scattered
> luminous particles drifting alongside, faint geometric grid structures fading
> into the darkness. Deep blacks with a soft cyan-green glow, weightless,
> cinematic. Calm dark negative space in the left half. Photorealistic light
> effects, shallow depth of field, no people, no text, no logos.

**バリエーション（ガチャ用に語尾に足す）:**
- B: `the data streams flowing upward like an aurora`（上昇する流れ＝オーロラ感）
- C: `a faint bright glow far on the horizon where the streams converge`（地平線にだけ淡い光＝出口の気配）

**日本語版:**

> デジタル世界の中。広大な暗い空間を、青緑の光の帯がデータの川のように画面右半分を流れ、
> 発光する微細な粒子が漂う。闇の奥にうっすら幾何学的なグリッド構造が消えていく。
> 深い黒とやわらかいシアングリーンの光、無重力でシネマティック。左半分は静かな暗い余白。
> フォトリアルな光の表現、浅い被写界深度。人物・文字・ロゴなし。

---

# STEP 2: ページにはめて判定

```bash
bash scripts/use-still.sh corridor ~/Downloads/corridor-v1.png
# → http://localhost:4444/?seq=1 を開くと本文・文字と重なった状態で見られる
```

判定基準: ①画として「かっこいい」か ②左の文字が読めるか ③4ゾーン並べて世界観が揃うか

---

# STEP 3: image-to-video（承認した静止画を始点に）

**モーション指示は「カメラ移動だけ」を短く。** 被写体を変化させる指示を混ぜると崩れる。

- **Zone A（廊下）:**
  `Slow steady forward dolly through the corridor, constant speed, single continuous shot, no cuts, 8 seconds.`
- **Zone B（サーバー内・暗+LED）:**
  `Very slow push-in between the server components, drifting toward the glowing green status LEDs, gentle parallax, constant speed, single continuous shot, 8 seconds.`
- **Zone C（チップ回路都市）:**
  `Slow low aerial drift across the circuitry toward the hazy horizon, following a faint teal light pulse along a pathway, constant speed, single continuous shot, 8 seconds.`
- **Zone D（データの流れ）:**
  `Slow weightless forward drift along the flowing ribbons of light, luminous particles passing by the camera, constant speed, single continuous shot, 8 seconds.`

ネガティブ（対応ツールのみ）:
> people, text, watermark, camera shake, jump cut, scene change, morphing,
> melting geometry, flickering

クリップ末尾の理想（遷移に使うので合っていればなお良し、無理なら編集側で処理）:
- A末尾: ラックに寄っていく / B末尾: LEDの光に近づく
- C末尾: パルスの光が画面に近づく / D末尾: 流れの中を漂い続ける（変化不要）

**ツール別のコツ:**
- **Kling**: 始点フレーム＋カメラコントロール（Dolly In / Pan）。**始点＋終点フレーム**対応 —
  終点に「同じ静止画の中央クロップを拡大したもの」を渡すと、安定した前進ドリーに補間されやすい
- **Runway Gen-4**: image-to-video + camera control。motion 値は低め（3-5）が崩れない
- **Veo / Sora**: 画像参照 + 上記モーション文。長尺(8s)が安定

---

# STEP 4: 連番化して統合

```bash
mv ~/Downloads/corridor-final.mp4 assets-src/corridor.mp4
bash scripts/extract-frames.sh corridor assets-src/corridor.mp4
# → http://localhost:4444/?seq=1 でスクロールスクラブ確認
```

合格 → 残りゾーンも同じ流れで生成して全面差し替え。
不合格 → 3D版は作業ツリーに無傷で残っている。

## 明るさの設計（ゾーン遷移）

```
① 廊下（明・白）→ ② サーバー内（暗・LED）→ ③ チップ回路都市（夜）→ ④ データの流れ（闇＋光）
```

- 潜るほど暗くなる一方向の流れ。途中で明るさを巻き戻さない
- ①→②: **暗転**（扉の隙間に入る）。②→③: 暗いまま LED の光に寄る。③→④: **青緑の光に飲まれる**フラッシュ
- 旧ホワイトアウト演出は ①→② 以降では使わない（WhiteoutOverlay の色をゾーンごとに切替予定）
- ④滞在中は UI を反転（文字・ナビを白に）— posts セクション active で切替
