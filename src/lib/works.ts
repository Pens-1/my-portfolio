import { ComponentType } from 'react';

export interface WorkMetadata {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  size: 'large' | 'medium' | 'small';
  githubUrl?: string;
  demoUrl?: string;
  technologies: string[];
  description: string;
}

export interface Work extends WorkMetadata {
  Content: ComponentType;
}

// MDXファイルを動的にインポート
// eager: true により、ビルド時にすべてのモジュールを読み込む
const imports = import.meta.glob('/src/content/works/*.mdx', { eager: true });

export const getAllWorks = (): Work[] => {
  const works = Object.values(imports).map((module: unknown) => {
    const mod = module as { frontmatter: WorkMetadata; default: ComponentType };
    return {
      ...mod.frontmatter,
      Content: mod.default,
    } as Work;
  });

  return works.sort((a, b) => a.id - b.id);
};

export const getWorkById = (id: number): Work | undefined => {
  return getAllWorks().find((work) => work.id === id);
};
