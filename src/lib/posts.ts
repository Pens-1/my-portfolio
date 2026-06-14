// 外部記事リンク（posts セクション）。公開したらここに追加する
export interface PostLink {
  title: string;
  url: string;
  date: string;
  source: 'zenn';
}

export const POSTS: PostLink[] = [];

export const ZENN_PROFILE = 'https://zenn.dev/pockypen';
