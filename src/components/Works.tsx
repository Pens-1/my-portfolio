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
      { threshold: 0.2 }
    );

    workRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="works" className="min-h-screen bg-black py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-6xl md:text-7xl mb-6 font-thin tracking-tight">Selected Works</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
          <p className="mt-8 text-white/60 font-light max-w-2xl mx-auto">
            A collection of projects focusing on automation, data efficiency, and modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={work.id}
              ref={(el) => (workRefs.current[index] = el)}
              data-index={index}
              onClick={() => navigate(`/work/${work.id}`)}
              className={`group relative bg-white/5 border border-white/10 overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10 ${
                visibleItems.includes(index)
                  ? `slide-up delay-${Math.min(index * 100, 800)}`
                  : 'opacity-0'
              }`}
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-video overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Floating Action Buttons */}
                <div className="absolute top-3 right-3 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {work.githubUrl && (
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-black/90 text-gold hover:text-white rounded-full transition-colors border border-gold/30"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {work.demoUrl && (
                    <a
                      href={work.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-black/90 text-gold hover:text-white rounded-full transition-colors border border-gold/30"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                   <span className="text-gold text-xs tracking-widest uppercase font-medium">{work.category}</span>
                </div>

                <h3 className="text-2xl font-light mb-4 text-white group-hover:text-gold transition-colors">{work.title}</h3>
                
                <p className="text-white/60 text-sm line-clamp-3 mb-6 flex-grow font-light leading-relaxed">
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {work.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-white/50 uppercase tracking-wider"
                    >
                      {tech} {idx < Math.min(work.technologies.length, 3) - 1 && "•"}
                    </span>
                  ))}
                  {work.technologies.length > 3 && (
                     <span className="text-[10px] text-white/50 uppercase tracking-wider">+ {work.technologies.length - 3}</span>
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
