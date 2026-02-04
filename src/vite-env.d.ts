/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.mdx' {
  import type { ComponentProps, ComponentType } from 'react';
  const component: ComponentType<ComponentProps<'div'> & { components?: Record<string, ComponentType<unknown>> }>;
  export default component;
  export const frontmatter: Record<string, unknown>;
}

