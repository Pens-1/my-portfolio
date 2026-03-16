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
            const id = entry.target.getAttribute('data-section');
            if (id) setVisibleSections((prev) => [...new Set([...prev, id])]);
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

  const isVisible = (id: string) => visibleSections.includes(id);

  const timeline = [
    {
      year: '2024.08',
      title: 'Global Experience in Canada',
      subtitle: 'Vancouver, Canada',
      description: '語学留学を経験。異文化環境でのコミュニケーション能力と、多様な価値観への適応力を習得。',
      icon: <GlobeIcon />,
      color: 'neo-yellow',
    },
    {
      year: '2025.04',
      title: 'Joined Student Dev Ecosystem',
      subtitle: 'Tokyo, Japan',
      description: '学生開発コミュニティに参加。チーム開発のベストプラクティスとモダンな開発フローを実践的に学習。',
      icon: <UsersIcon />,
      color: 'neo-pink',
    },
    {
      year: '2025.08',
      title: "Track Job Beginner's Hackathon",
      subtitle: 'Team Leader',
      description: 'ハッカソンに参加し、リーダーとしてチームを牽引。短期間でのプロトタイプ開発とプレゼンテーションを実施。',
      icon: <Trophy className="w-4 h-4" />,
      color: 'neo-green',
    },
    {
      year: 'Present',
      title: 'Continuing Education & Dev',
      subtitle: 'University / Personal Projects',
      description: '大学での研究に加え、個人開発でAI統合アプリケーションや業務効率化ツールを継続的に開発中。',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'neo-blue',
    },
  ];

  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 className="w-4 h-4" />,
      color: 'neo-yellow',
      skills: ['Python', 'TypeScript', 'JavaScript', 'SQL (PostgreSQL)', 'HTML5/CSS3'],
    },
    {
      title: 'Frameworks',
      icon: <Cpu className="w-4 h-4" />,
      color: 'neo-pink',
      skills: ['React', 'Next.js', 'FastAPI', 'Flask', 'Pandas', 'Selenium', 'Playwright'],
    },
    {
      title: 'Infra & Tools',
      icon: <Database className="w-4 h-4" />,
      color: 'neo-green',
      skills: ['Docker', 'Git / GitHub', 'Linux (Ubuntu)', 'VS Code', 'Vercel'],
    },
  ];

  const colorMap: Record<string, string> = {
    'neo-yellow': '#FBFF48',
    'neo-pink': '#FF70A6',
    'neo-green': '#33FF57',
    'neo-blue': '#3B82F6',
  };

  return (
    <section id="about" className="relative min-h-screen bg-neo-black py-32 px-8 overflow-hidden">
      <span className="section-num">03</span>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <div className="font-mono text-neo-green/60 text-xs uppercase tracking-[0.3em] mb-3">
            &gt; Background / Skills
          </div>
          <h2
            className="font-display font-black text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            ABOUT<br />
            <span className="text-neo-green">ME</span>
          </h2>
          <div className="mt-6 w-16 h-1 bg-neo-green" />
        </div>

        {/* Intro */}
        <div
          ref={(el) => (sectionRefs.current['intro'] = el)}
          data-section="intro"
          className={`mb-16 max-w-2xl border-l-4 border-neo-green pl-6 transition-all duration-700 ${
            isVisible('intro') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-white/70 font-body text-lg leading-relaxed mb-6">
            「自動化」と「最適化」に情熱を注ぐエンジニア。<br />
            単調な作業をプログラムに任せ、人間がより創造的な活動に集中できる世界を目指しています。
          </p>
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex border-2 border-neo-green text-neo-green bg-transparent shadow-[4px_4px_0_#33FF57] hover:shadow-[1px_1px_0_#33FF57] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
          >
            <Github className="w-4 h-4" />
            GitHub Profile
          </a>
        </div>

        {/* Skill Cards */}
        <div
          ref={(el) => (sectionRefs.current['skills'] = el)}
          data-section="skills"
          className={`grid md:grid-cols-3 gap-5 mb-8 transition-all duration-700 delay-100 ${
            isVisible('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="border-2 bg-neo-black p-6"
              style={{
                borderColor: colorMap[cat.color],
                boxShadow: `5px 5px 0 ${colorMap[cat.color]}`,
              }}
            >
              <div className="flex items-center gap-2 mb-5" style={{ color: colorMap[cat.color] }}>
                {cat.icon}
                <span className="font-mono text-xs uppercase tracking-widest">{cat.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="font-mono text-[10px] text-white/60 bg-white/5 px-2 py-1 border border-white/10 uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Qualification */}
        <div
          className={`mb-24 transition-all duration-700 delay-200 ${
            isVisible('skills') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-xs text-neo-green/70 uppercase tracking-widest mr-3">
            Qualification
          </span>
          <span className="font-body text-white/50 text-sm">
            Python 3 Engineering Certification (Basic)
          </span>
        </div>

        {/* Timeline */}
        <div
          ref={(el) => (sectionRefs.current['timeline'] = el)}
          data-section="timeline"
          className={`transition-all duration-700 delay-150 ${
            isVisible('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="font-mono text-neo-green/60 text-xs uppercase tracking-[0.3em] mb-3">
            &gt; Career Journey
          </div>
          <h3
            className="font-display font-black text-white mb-12"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            JOURNEY
          </h3>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 border-2 border-white/10 p-6 transition-all duration-200 hover:border-opacity-100"
                style={{
                  ['--hover-color' as string]: colorMap[item.color],
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = colorMap[item.color];
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 4px 0 ${colorMap[item.color]}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Year */}
                <div className="flex-shrink-0 w-24">
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: colorMap[item.color] }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="flex-shrink-0 w-8 h-8 border-2 flex items-center justify-center"
                  style={{ borderColor: colorMap[item.color], color: colorMap[item.color] }}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-display font-bold text-white text-lg leading-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                    {item.subtitle}
                  </p>
                  <p className="font-body text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default About;
