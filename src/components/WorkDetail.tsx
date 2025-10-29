import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft, Code2, Calendar } from 'lucide-react';
import { works } from './Works';

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [work, setWork] = useState<typeof works[0] | undefined>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const foundWork = works.find((w) => w.id === parseInt(id));
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
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              <div className={`${isVisible ? 'fade-in delay-200' : 'opacity-0'}`}>
                <h2 className="text-4xl mb-6">Project Overview</h2>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    {work.description}
                  </p>
                  <p>
                    このプロジェクトでは、最新の技術とベストプラクティスを活用して、
                    ユーザーに価値のある体験を提供することを目指しています。
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className={`${isVisible ? 'fade-in delay-300' : 'opacity-0'}`}>
                <h2 className="text-4xl mb-6">Key Features</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="border border-white/10 p-6 hover:border-gold/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Code2 className="w-6 h-6 text-gold" />
                      <h3 className="text-xl">Modern Architecture</h3>
                    </div>
                    <p className="text-white/70 text-sm">
                      スケーラブルで保守性の高いアーキテクチャを採用。モジュール設計により拡張性を確保。
                    </p>
                  </div>
                  <div className="border border-white/10 p-6 hover:border-gold/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-6 h-6 text-gold" />
                      <h3 className="text-xl">Performance Optimized</h3>
                    </div>
                    <p className="text-white/70 text-sm">
                      パフォーマンスを最優先に設計。効率的なデータ処理と最適化されたレンダリングを実現。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className={`border border-white/10 p-6 ${isVisible ? 'fade-in delay-400' : 'opacity-0'}`}>
                <h3 className="text-gold text-sm tracking-widest mb-4 uppercase">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-white/10 text-white/80 rounded-full border border-white/20 hover:bg-gold/20 hover:border-gold transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className={`border border-white/10 p-6 space-y-4 ${isVisible ? 'fade-in delay-500' : 'opacity-0'}`}>
                <h3 className="text-gold text-sm tracking-widest mb-4 uppercase">Links</h3>
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors group"
                  >
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">View on GitHub</span>
                  </a>
                )}
                {work.demoUrl && (
                  <a
                    href={work.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors group"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">View Demo</span>
                  </a>
                )}
              </div>

              {/* Project Info */}
              <div className={`border border-white/10 p-6 ${isVisible ? 'fade-in delay-600' : 'opacity-0'}`}>
                <h3 className="text-gold text-sm tracking-widest mb-4 uppercase">Project Info</h3>
                <div className="space-y-3 text-sm text-white/70">
                  <div>
                    <p className="text-gold text-xs mb-1">Category</p>
                    <p>{work.category}</p>
                  </div>
                  <div>
                    <p className="text-gold text-xs mb-1">Type</p>
                    <p>{work.size === 'large' ? 'Large Project' : work.size === 'medium' ? 'Medium Project' : 'Small Project'}</p>
                  </div>
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

