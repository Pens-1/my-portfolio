import { ComponentProps } from 'react';
import { ExternalLink } from 'lucide-react';

const MDXComponents = {
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-3xl md:text-4xl font-light mb-8 mt-12 text-white first:mt-0" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl md:text-3xl font-light mb-6 mt-16 text-white border-b border-white/10 pb-4" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-medium mb-4 mt-10 text-gold" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="text-white/80 leading-loose mb-6 tracking-wide text-[15px]" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="space-y-3 mb-8 text-white/80 leading-relaxed" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="flex gap-3" {...props}>
      <span className="text-gold mt-1.5 text-xs">●</span>
      <span>{props.children}</span>
    </li>
  ),
  a: (props: ComponentProps<'a'>) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        className="inline-flex items-center gap-1 text-gold hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-gold/50"
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
    <blockquote className="border-l-2 border-gold/50 pl-6 py-4 my-8 bg-white/5 rounded-r italic text-white/70" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-gold-200 border border-white/10" {...props} />
  ),
  img: (props: ComponentProps<'img'>) => (
    <img className="rounded-lg shadow-lg shadow-black/50 my-8 w-full border border-white/10 hover:border-gold/30 transition-colors duration-500" {...props} alt={props.alt || ''} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-gold font-medium" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr className="border-white/10 my-12" {...props} />
  ),
};

export default MDXComponents;
