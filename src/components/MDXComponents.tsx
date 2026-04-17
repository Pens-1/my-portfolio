import { ComponentProps } from 'react';
import { ExternalLink } from 'lucide-react';

const MDXComponents = {
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="font-display text-2xl md:text-3xl font-semibold mt-12 mb-6 text-fg first:mt-0" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4 text-fg" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="font-display text-lg font-semibold mt-8 mb-3 text-fg" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="text-fg-muted leading-[1.75] mb-5 text-[15px]" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="space-y-2 mb-6 text-fg-muted text-[15px]" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="space-y-2 mb-6 text-fg-muted text-[15px] list-decimal ml-5" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: ComponentProps<'a'>) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4 decoration-accent/50"
        {...props}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {props.children}
        {isExternal && <ExternalLink className="w-3 h-3" />}
      </a>
    );
  },
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-2 border-accent/50 pl-5 py-2 my-6 text-fg-muted italic" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-elevated px-1.5 py-0.5 text-[13px] font-mono text-accent border border-border" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-elevated border border-border p-4 overflow-x-auto my-5 text-[13px] font-mono" {...props} />
  ),
  img: (props: ComponentProps<'img'>) => (
    <img className="border border-border my-6 w-full" {...props} alt={props.alt || ''} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-fg font-semibold" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr className="border-border my-10" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-[14px] border border-border" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className="text-left font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint border-b border-border px-3 py-2 bg-elevated" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border-b border-border px-3 py-2 text-fg-muted" {...props} />
  ),
};

export default MDXComponents;
