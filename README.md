# Portfolio

同志社大学 理工学部 機械システム工学科のポートフォリオ。1ページ構成（Home / About / Activities / Posts）。

## 技術スタック

- React 18 / TypeScript / Vite 5
- Tailwind CSS 3
- react-router-dom 7
- lucide-react（アイコン）
- GSAP + ScrollTrigger（動き。`prefers-reduced-motion` では無効）
- 背景はドットグリッド（`GridBackground`）。3D は廃止

## 開発

```bash
npm install
npm run dev        # http://localhost:4444
npm run build      # dist/ に出力
npm run preview    # ビルド結果の確認
npm run lint
npm run typecheck
```

環境変数は不要。

## ビルド・デプロイ

- 本番: Cloudflare Pages（ビルドコマンド `npm run build`、出力 `dist`）
- `public/_redirects` で SPA フォールバック、`public/_headers` でキャッシュ・セキュリティヘッダーを設定
- Docker（任意）
  - 開発: `docker compose up portfolio-dev`（`localhost:4444`）
  - 本番相当: `docker compose up portfolio`（nginx、`localhost:3000`）

## ディレクトリ構成

```
src/
  main.tsx, App.tsx      エントリ・ルーティング
  index.css              グローバル CSS
  components/
    sections/            HomeSection / AboutSection / ActivitiesSection / PostsSection
    GridBackground.tsx   ドットグリッド背景
    BottomNav.tsx, ThemeToggle.tsx, Reveal.tsx, NotFound.tsx
  hooks/                 useReducedMotion など
  lib/                   works.ts / activities.ts / posts.ts ほか
public/                  _headers, _redirects, og.png, favicon, sitemap.xml など
scripts/                 画像・動画フレーム処理用シェルスクリプト
```

## 内容の更新方法

- Works: `src/lib/works.ts` の `WORKS` 配列に追加（`group` でカテゴリ分け。表示は Activities セクション）
- 受賞・ロボコン年表: `src/lib/activities.ts` の `AWARDS` / `ROBOCON`
- 外部記事リンク: `src/lib/posts.ts` の `POSTS`（Zenn プロフィールは `ZENN_PROFILE`）
- About の経歴・所属・技術・リンク: `src/components/sections/AboutSection.tsx` 冒頭の定数
  `CAPABILITIES` / `STACKS` / `AFFILIATIONS` / `TIMELINE` / `LINKS`

## ライセンス

未設定。無断転載・再利用は不可。

連絡先: GitHub [@Pens-1](https://github.com/Pens-1) / me@yamataku.dev
