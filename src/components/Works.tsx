import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { getAllWorks } from '../lib/works';

const Works = () => {
  const works = getAllWorks();
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const workRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.15 }
    );

    workRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="works" className="relative min-h-screen bg-neo-black py-32 px-8 overflow-hidden">
      <span className="section-num">02</span>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="font-mono text-neo-pink/60 text-xs uppercase tracking-[0.3em] mb-3">
            &gt; Selected Projects
          </div>
          <h2 className="font-display font-black text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            SELECTED<br />
            <span className="text-neo-pink">WORKS</span>
          </h2>
          <div className="mt-6 w-16 h-1 bg-neo-pink" />
          <p className="mt-6 text-white/50 font-body max-w-xl">
            A collection of projects focusing on automation, data efficiency, and modern web development.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, index) => (
            <div
              key={work.id}
              ref={(el) => (workRefs.current[index] = el)}
              data-index={index}
              onClick={() => navigate(`/work/${work.id}`)}
              className={`group neo-card overflow-hidden flex flex-col transition-all duration-300 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden border-b-2 border-white/10 group-hover:border-neo-yellow/50 transition-colors">
                <div className="absolute inset-0 bg-neo-pink/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                {/* Action buttons */}
                <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  {work.githubUrl && (
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-neo-black border-2 border-neo-yellow text-neo-yellow hover:bg-neo-yellow hover:text-neo-black transition-colors shadow-[2px_2px_0_#FBFF48]"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {work.demoUrl && (
                    <a
                      href={work.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-neo-black border-2 border-neo-yellow text-neo-yellow hover:bg-neo-yellow hover:text-neo-black transition-colors shadow-[2px_2px_0_#FBFF48]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="font-mono text-neo-pink text-[10px] uppercase tracking-widest mb-2">
                  {work.category}
                </span>
                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-neo-yellow transition-colors leading-tight">
                  {work.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-3 mb-5 flex-grow leading-relaxed font-body">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t-2 border-white/5">
                  {work.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                      {tech}{idx < Math.min(work.technologies.length, 4) - 1 && <span className="text-neo-pink mx-1">·</span>}
                    </span>
                  ))}
                  {work.technologies.length > 4 && (
                    <span className="font-mono text-[9px] text-neo-pink uppercase tracking-wider">
                      +{work.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
