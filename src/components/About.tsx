import { useEffect, useRef, useState } from 'react';
import { Code2, Cpu, Database, Github, GraduationCap, Trophy } from 'lucide-react';

const About = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections((prev) => [...new Set([...prev, sectionId])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      year: '2024.08',
      title: 'Global Experience in Canada',
      subtitle: 'Vancouver, Canada',
      description: '語学留学を経験。異文化環境でのコミュニケーション能力と、多様な価値観への適応力を習得。',
      icon: <GlobeIcon />,
    },
    {
      year: '2025.04',
      title: 'Joined Student Dev Ecosystem',
      subtitle: 'Tokyo, Japan',
      description: '学生開発コミュニティに参加。チーム開発のベストプラクティスとモダンな開発フローを実践的に学習。',
      icon: <UsersIcon />,
    },
    {
      year: '2025.08',
      title: "Track Job Beginner's Hackathon",
      subtitle: 'Team Leader',
      description: 'ハッカソンに参加し、リーダーとしてチームを牽引。短期間でのプロトタイプ開発とプレゼンテーションを実施。',
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      year: 'Present',
      title: 'Continuing Education & Dev',
      subtitle: 'University / Personal Projects',
      description: '大学での研究に加え、個人開発でAI統合アプリケーションや業務効率化ツールを継続的に開発中。',
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ];

  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 className="w-5 h-5 text-gold" />,
      skills: ['Python', 'TypeScript', 'JavaScript', 'SQL (PostgreSQL)', 'HTML5/CSS3'],
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Cpu className="w-5 h-5 text-gold" />,
      skills: ['React', 'Next.js', 'FastAPI', 'Flask', 'Pandas', 'Selenium', 'Playwright'],
    },
    {
      title: 'Infrastructure & Tools',
      icon: <Database className="w-5 h-5 text-gold" />,
      skills: ['Docker', 'Git / GitHub', 'Linux (Ubuntu)', 'VS Code', 'Vercel'],
    },
  ];

  const qualifications = ['Python 3 Engineering Certification (Basic)'];

  return (
    <section id="about" className="min-h-screen bg-black py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-32">
          {/* Intro Section - Centered and Clean */}
          <div
            ref={(el) => (sectionRefs.current['intro'] = el)}
            data-section="intro"
            className={`text-center max-w-3xl mx-auto mb-20 ${visibleSections.includes('intro') ? 'fade-in' : 'opacity-0'}`}
          >
            <h2 className="text-5xl font-light mb-8">About Me</h2>
            <p className="text-white/80 leading-relaxed text-lg mb-8 font-light">
               「自動化」と「最適化」に情熱を注ぐエンジニア。
               <br className="hidden md:block" />
               単調な作業をプログラムに任せ、人間がより創造的な活動に集中できる世界を目指しています。
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/Pens-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold border border-gold/30 px-6 py-2 rounded-full hover:bg-gold hover:text-black transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>

          {/* Technical Skills - 3 Column Grid */}
          <div
             ref={(el) => (sectionRefs.current['skills'] = el)}
             data-section="skills"
             className={`grid md:grid-cols-3 gap-8 ${visibleSections.includes('skills') ? 'slide-up delay-200' : 'opacity-0'}`}
          >
             {skillCategories.map((cat, i) => (
               <div key={i} className="bg-white/5 p-6 border border-white/10 hover:border-gold/30 transition-colors">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-black rounded-full border border-gold/20 text-gold">
                      {cat.icon}
                   </div>
                   <h3 className="text-lg font-medium tracking-wide">{cat.title}</h3>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {cat.skills.map((skill, j) => (
                     <span key={j} className="text-xs text-white/70 bg-black/50 px-2.5 py-1.5 rounded border border-white/10">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
          </div>
          
          <div className={`mt-12 text-center ${visibleSections.includes('skills') ? 'fade-in delay-300' : 'opacity-0'}`}>
              <span className="text-sm text-gold tracking-widest uppercase mr-3">Qualifications</span>
              <span className="text-white/60 text-sm font-light">
                {qualifications.join(" • ")}
              </span>
          </div>
        </div>

        {/* Timeline Section */}
        <div
          ref={(el) => (sectionRefs.current['timeline'] = el)}
          data-section="timeline"
          className={`max-w-4xl mx-auto ${visibleSections.includes('timeline') ? 'fade-in' : 'opacity-0'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Journey</h2>
            <div className="w-12 h-px bg-gold mx-auto opacity-50"></div>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12 pb-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative md:grid md:grid-cols-[120px_1fr] gap-8 pl-8 md:pl-0">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-black border border-gold rounded-full z-10"></div>

                {/* Date (Left on Desktop) */}
                <div className="hidden md:flex flex-col items-end text-right pt-0.5">
                   <span className="text-gold font-mono text-lg">{item.year}</span>
                </div>

                {/* Content (Right) */}
                <div className="group">
                   <div className="md:hidden text-gold font-mono text-sm mb-1">{item.year}</div>
                   <div className="flex items-center gap-2 mb-2">
                     <div className="p-1.5 bg-white/5 rounded-full text-gold/80 group-hover:text-gold transition-colors">
                       {item.icon}
                     </div>
                     <h3 className="text-xl font-medium text-white group-hover:text-gold transition-colors">{item.title}</h3>
                   </div>
                   <p className="text-sm text-white/50 mb-2 uppercase tracking-wide">{item.subtitle}</p>
                   <p className="text-white/70 leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Icons
const GlobeIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const UsersIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default About;
