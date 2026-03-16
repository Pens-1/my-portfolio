import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const MARQUEE_ITEMS = [
  'Python', 'React', 'TypeScript', 'Docker', 'FastAPI',
  'PostgreSQL', 'Automation', 'AI Integration', 'Pandas', 'Playwright',
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Status badge */}
      <div
        className={`absolute top-24 right-8 z-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex items-center gap-2 border-2 border-neo-green px-3 py-1.5 shadow-[3px_3px_0_#33FF57] bg-neo-black">
          <span className="w-2 h-2 bg-neo-green rounded-full animate-pulse inline-block" />
          <span className="font-mono text-neo-green text-xs uppercase tracking-widest">Available</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-8 max-w-6xl mx-auto w-full pb-20">
        {/* Intro line */}
        <div
          className={`mb-4 font-mono text-neo-yellow/60 text-sm uppercase tracking-[0.3em] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          &gt; Full-Stack Engineer / Automation Specialist
        </div>

        {/* Heading */}
        <h1
          className={`font-display font-black leading-[0.9] mb-8 transition-all duration-700 delay-100 glitch ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          data-text="FULL-STACK AUTOMATION ENGINEER"
        >
          <span className="block text-white" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>FULL-</span>
          <span className="block text-white" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>STACK</span>
          <span className="block text-neo-yellow" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>ENGINEER</span>
        </h1>

        {/* Description */}
        <p
          className={`text-white/70 font-body text-base md:text-lg max-w-md mb-8 border-l-4 border-neo-pink pl-4 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Building robust systems that save time and empower decisions.<br />
          Specializing in Data Processing, Web Development, and AI Integration.
        </p>

        {/* Tech tags */}
        <div
          className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {['Python', 'React', 'Docker', 'AI / Automation'].map((tech) => (
            <span key={tech} className="neo-tag text-neo-yellow border-neo-yellow">
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-wrap gap-4 transition-all duration-700 delay-[400ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a href="#works" className="neo-btn neo-btn-yellow">
            View Works
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </a>
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn-outline"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t-2 border-neo-yellow/20 bg-neo-black/80">
        <div className="marquee-wrapper py-3">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mx-10 font-mono text-xs text-neo-yellow/50 uppercase tracking-widest whitespace-nowrap">
                {item}
                <span className="text-neo-pink mx-4">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-neo-yellow/50 animate-bounce" />
      </div>
    </section>
  );
};

export default Home;
