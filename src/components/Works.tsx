import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  size: 'large' | 'medium' | 'small';
  githubUrl?: string;
  demoUrl?: string;
  technologies: string[];
  description: string;
}

export const works: Work[] = [
  {
    id: 1,
    title: '数理最適化スケジュール管理サイト',
    category: 'Web Application',
    imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'large',
    githubUrl: 'https://github.com/Pens-1/ortools-scheduling-verify',
    technologies: ['Python', 'OR-Tools', 'Google Optimization Tools'],
    description: 'Google OR-Toolsを使用したスケジュール最適化モジュール。複雑な条件（優先順位など）を考慮したスケジュールを自動作成するWebアプリケーション。',
  },
  {
    id: 2,
    title: 'AIを用いたWeb自動操作システム',
    category: 'Automation',
    imageUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'large',
    technologies: ['Python', 'Selenium', 'Playwright'],
    description: 'Python（Selenium/Playwrightなど）を使用し、ブラウザ操作を自動化するシステム。Google検索や特定のWebサイトからの情報収集・操作自動化を実装。',
  },
  {
    id: 3,
    title: 'My Portfolio',
    category: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
    githubUrl: 'https://github.com/Pens-1/my-portfolio',
    technologies: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    description: 'モダンなポートフォリオサイト。React、TypeScript、Tailwind CSSを使用して構築。レスポンシブデザインと洗練されたアニメーションを実装。',
  },
  {
    id: 4,
    title: '部内練習管理システム',
    category: 'Development',
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
    technologies: ['Python', 'Web Framework', 'Database'],
    description: '部活動の練習スケジュールと進捗を管理するシステム。効率的なリソース管理とチーム運営を支援。',
  },
  {
    id: 5,
    title: '学習支援アプリ',
    category: 'Development',
    imageUrl: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
    technologies: ['Python', 'Web Application', 'Data Processing'],
    description: '学習進捗の管理と支援を行うアプリケーション。データ処理と可視化機能を実装。',
  },
  {
    id: 6,
    title: '部屋の人数管理アプリ',
    category: 'Development',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
    technologies: ['Python', 'Web Application', 'Real-time'],
    description: '部屋の人数をリアルタイムで管理するアプリケーション。実用的な業務自動化システム。',
  },
];

const Works = () => {
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

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 h-[600px]';
      case 'medium':
        return 'col-span-1 row-span-1 h-[400px]';
      case 'small':
        return 'col-span-1 row-span-1 h-[280px]';
      default:
        return 'col-span-1 row-span-1 h-[400px]';
    }
  };

  return (
    <section id="works" className="min-h-screen bg-black py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-6xl md:text-7xl mb-6">Selected Works</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-auto">
          {works.map((work, index) => (
            <div
              key={work.id}
              ref={(el) => (workRefs.current[index] = el)}
              data-index={index}
              onClick={() => navigate(`/work/${work.id}`)}
              className={`group relative overflow-hidden cursor-pointer transform-gpu transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold/20 ${getSizeClasses(
                work.size
              )} ${
                visibleItems.includes(index)
                  ? `slide-up delay-${Math.min(index * 100, 800)}`
                  : 'opacity-0'
              }`}
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
              />

              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-gold transition-all duration-300 hover:scale-110 hover:rotate-12"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {work.demoUrl && (
                  <a
                    href={work.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-gold transition-all duration-300 hover:scale-110 hover:rotate-12"
                    aria-label="View demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold text-sm tracking-widest mb-2 uppercase">
                  {work.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-light mb-3">{work.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {work.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded border border-white/20 hover:bg-gold/20 hover:border-gold transition-all duration-300 hover:scale-105 hover:translate-y-[-2px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {work.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded border border-white/20 hover:bg-gold/20 hover:border-gold transition-all duration-300 hover:scale-105">
                      +{work.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <p className="text-white/70 text-sm line-clamp-2">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
