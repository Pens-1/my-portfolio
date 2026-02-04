import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { getWorkById, Work } from '../lib/works';
import MDXComponents from './MDXComponents';

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [work, setWork] = useState<Work | undefined>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const foundWork = getWorkById(parseInt(id));
      setWork(foundWork);
      setIsVisible(true);
    }
  }, [id]);

  if (!work) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gold hover:opacity-70 transition-opacity"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${work.imageUrl})`,
            filter: 'brightness(0.3)',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Parallax effect background */}
        <div className="absolute inset-0 animate-gradient-shift" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <button
            onClick={() => navigate('/')}
            className={`mb-8 flex items-center gap-2 text-white/60 hover:text-gold transition-colors ${
              isVisible ? 'fade-in' : 'opacity-0'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>

          <div className={`${isVisible ? 'slide-up' : 'opacity-0'}`}>
            <p className="text-gold text-sm tracking-widest mb-4 uppercase">{work.category}</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 font-light">
              {work.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed">
              {work.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-24 items-start">
            {/* Main Content */}
            <div className="min-w-0"> {/* min-w-0 prevents flex item from overflowing */}
              <div className={`${isVisible ? 'fade-in delay-200' : 'opacity-0'}`}>
                <work.Content components={MDXComponents} />
              </div>

              {/* Back to Top */}
              <div className="mt-24 pt-12 border-t border-white/10 text-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gold hover:text-white transition-colors text-sm tracking-widest uppercase hover:underline underline-offset-4"
                >
                  Back to Top
                </button>
              </div>
            </div>

            {/* Sidebar (Sticky) */}
            <div className={`space-y-8 lg:sticky lg:top-32 ${isVisible ? 'fade-in delay-400' : 'opacity-0'}`}>
              <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-gold/30 transition-colors">
                <h3 className="text-gold text-xs tracking-widest mb-6 uppercase flex items-center gap-2">
                  <span className="w-8 h-px bg-gold"></span>
                  Project Info
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Category</p>
                    <p className="text-white font-light">{work.category}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Type</p>
                    <p className="text-white font-light text-sm">{work.size === 'large' ? 'Large Scale Project' : 'Project'}</p>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Links</p>
                    <div className="flex flex-col gap-3">
                      {work.githubUrl && (
                        <a
                          href={work.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-white/80 hover:text-gold transition-colors group"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                        </a>
                      )}
                      {work.demoUrl && (
                        <a
                          href={work.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-white/80 hover:text-gold transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-white/10 rounded-lg hover:border-gold/30 transition-colors">
                 <h3 className="text-white/40 text-xs tracking-widest mb-6 uppercase">Technologies</h3>
                 <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs bg-white/5 text-white/80 border border-white/10 rounded-sm hover:bg-gold/10 hover:border-gold/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkDetail;

