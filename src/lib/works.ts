import { ComponentType } from 'react';

export type WorkGroup = 'live' | 'automation' | 'hardware' | 'ml' | 'web';

export interface WorkMetadata {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  group: WorkGroup;
  year: string;
  featured?: boolean;
  highlight?: boolean;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  repoVisibility?: 'public' | 'private';
  metrics?: { label: string; value: string }[];
}

export interface Work extends WorkMetadata {
  Content: ComponentType;
}

const imports = import.meta.glob('/src/content/works/*.mdx', { eager: true });

export const getAllWorks = (): Work[] => {
  const works = Object.values(imports).map((module: unknown) => {
    const mod = module as { frontmatter: WorkMetadata; default: ComponentType };
    return {
      ...mod.frontmatter,
      Content: mod.default,
    } as Work;
  });

  return works.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.year.localeCompare(a.year);
  });
};

export const getWorkById = (id: number): Work | undefined => {
  return getAllWorks().find((work) => work.id === id);
};

export const GROUP_META: Record<WorkGroup, { label: string; description: string }> = {
  live: {
    label: '実運用プロダクト',
    description: 'Shipped to real users.',
  },
  automation: {
    label: 'ローカルLLM・自動化',
    description: 'AI agents, MCP servers, scraping pipelines.',
  },
  hardware: {
    label: 'ハードウェア・組込み',
    description: 'ESP32, nRF52840, PCB design.',
  },
  ml: {
    label: '機械学習・最適化',
    description: 'Reinforcement learning, matching algorithms, constraint solving.',
  },
  web: {
    label: 'フルスタックWeb',
    description: 'Databases, APIs, interfaces.',
  },
};

export const GROUP_ORDER: WorkGroup[] = ['live', 'automation', 'hardware', 'ml', 'web'];
