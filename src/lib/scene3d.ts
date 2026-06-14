export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  accent: string;
  ink: string;
  mode: ThemeMode;
}

/** CSS 変数からテーマトークンを一括読み出し（3D はこれで DOM と色同期する） */
export const readThemeTokens = (): ThemeTokens => {
  const style = getComputedStyle(document.documentElement);
  return {
    accent: style.getPropertyValue('--accent').trim() || '#0d9488',
    ink: style.getPropertyValue('--ink').trim() || '#fafaf9',
    mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  };
};

export const readAccent = (): string => readThemeTokens().accent;
