# My Portfolio

モダンで洗練されたポートフォリオサイト。React、TypeScript、Tailwind CSSを使用して構築されています。

A modern and sophisticated portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 特徴 / Features

- **レスポンシブデザイン** - あらゆるデバイスに対応
- **モダンなUI/UX** - 洗練されたアニメーションとトランジション
- **高速パフォーマンス** - Viteによる最適化されたビルド
- **型安全** - TypeScriptによる完全な型サポート
- **Docker対応** - 簡単なデプロイメント

## 🛠️ 技術スタック / Tech Stack

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSS
- **Lucide React** - アイコンライブラリ
- **Supabase** - バックエンドサービス（必要に応じて）
- **Docker** - コンテナ化

## 📦 インストール / Installation

```bash
# 依存関係のインストール
npm install
```

## 🏃 開発サーバー起動 / Run Development Server

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## 🏗️ ビルド / Build

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに生成されます。

## 🐳 Dockerで実行 / Run with Docker

### Docker Composeを使用

```bash
docker-compose up
```

### Dockerfileを使用

```bash
# イメージをビルド
docker build -t my-portfolio .

# コンテナを実行
docker run -p 3000:80 my-portfolio
```

ブラウザで `http://localhost:3000` を開いてください。

## 📁 プロジェクト構成 / Project Structure

```
my-portfolio/
├── src/
│   ├── components/       # Reactコンポーネント
│   │   ├── Navigation.tsx
│   │   ├── Home.tsx
│   │   ├── Works.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── hooks/           # カスタムフック
│   ├── App.tsx          # メインアプリケーション
│   ├── main.tsx         # エントリーポイント
│   └── index.css        # グローバルスタイル
├── public/              # 静的ファイル
├── dist/                # ビルド出力
├── Dockerfile           # Docker設定
├── docker-compose.yml   # Docker Compose設定
├── vite.config.ts       # Vite設定
├── tailwind.config.js   # Tailwind設定
└── package.json         # 依存関係
```

## 📝 利用可能なスクリプト / Available Scripts

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクション用ビルド
- `npm run preview` - ビルドされたアプリのプレビュー
- `npm run lint` - ESLintでコードチェック
- `npm run typecheck` - TypeScriptの型チェック

## 🌐 デプロイ / Deployment

このプロジェクトは以下のプラットフォームにデプロイできます：

- **Vercel** - 推奨（ゼロ設定でReactアプリをデプロイ）
- **Netlify** - 静的サイトホスティング
- **GitHub Pages** - 無料ホスティング
- **Docker** - 任意のコンテナホスティングサービス

## 📄 ライセンス / License

MIT License

## 👤 作者 / Author

Your Name

---

## 💡 カスタマイズ / Customization

ポートフォリオを自分のものにカスタマイズするには：

1. `src/components/Home.tsx` - ヒーローセクションのテキストを編集
2. `src/components/Works.tsx` - プロジェクト一覧を更新
3. `src/components/About.tsx` - 自己紹介セクションを編集
4. `src/components/Contact.tsx` - 連絡先情報を更新
5. `tailwind.config.js` - カラーテーマをカスタマイズ

## 🤝 コントリビューション / Contributing

プルリクエストを歓迎します！大きな変更の場合は、まずイシューを開いて変更内容を議論してください。

## 📧 連絡先 / Contact

ご質問やご提案がございましたら、お気軽にお問い合わせください。

