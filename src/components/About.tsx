import { useEffect, useRef, useState } from 'react';
import { Globe, Users, Zap, Github } from 'lucide-react';

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
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      icon: Globe,
      title: 'International Experience',
      subtitle: '国際経験',
      description:
        '2024年8月にカナダ留学を経験。異なる文化や価値観の中で学んだ、柔軟な思考力とコミュニケーション能力。グローバルな視点から課題を捉える力を身につけました。',
    },
    {
      icon: Zap,
      title: 'Hackathon Participation',
      subtitle: 'ハッカソン参加',
      description:
        '学生開発エコシステム（2025年4月）、Track Job Beginner\'s Hackathon（2025年8月）に参加。限られた時間の中で、アイデアを形にし、課題を解決するシステムを設計・実装する実行力を養いました。',
    },
    {
      icon: Users,
      title: 'Technical Expertise',
      subtitle: '技術的専門性',
      description:
        '機械学習、データサイエンス、基幹システムに強みを持ち、業務自動化やデータ処理システムの構築を得意としています。技術的好奇心を持ち、積極的に学習・導入を進めています。',
    },
  ];

  const expertise = [
    'Python',
    'TypeScript',
    'React',
    'Docker',
    'Git',
  ];

  const qualifications = [
    'Python基礎技術者認定',
  ];

  return (
    <section id="about" className="min-h-screen bg-black py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div
          ref={(el) => (sectionRefs.current['philosophy'] = el)}
          data-section="philosophy"
          className="mb-32"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className={`${
                visibleSections.includes('philosophy')
                  ? 'slide-up'
                  : 'opacity-0'
              }`}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div
              className={`space-y-8 ${
                visibleSections.includes('philosophy')
                  ? 'slide-up delay-200'
                  : 'opacity-0'
              }`}
            >
              <div>
                <h2 className="text-5xl md:text-6xl mb-6">About</h2>
                <div className="w-16 h-px bg-gold mb-8" />
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  Pythonを中心としたバックエンド開発、特に業務自動化やデータ処理システムの構築を得意としております。
                </p>
                <p className="text-white/70 leading-relaxed">
                  学生の身ではありますが、個人開発やハッカソンへの参加を通じて、単にコードを書くだけでなく、
                  「課題を解決するためのシステム」を設計・実装する実践的なスキルを磨いてまいりました。
                  機械学習、データサイエンス、基幹システムに興味を持ち、日々技術を学んでいます。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h3 className="text-gold text-sm tracking-widest mb-4 uppercase">
                    Expertise
                  </h3>
                  <ul className="space-y-2">
                    {expertise.map((skill, index) => (
                      <li
                        key={index}
                        className="text-white/80 font-light text-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-gold text-sm tracking-widest mb-4 uppercase">
                    Qualifications
                  </h3>
                  <ul className="space-y-2">
                    {qualifications.map((qual, index) => (
                      <li
                        key={index}
                        className="text-white/80 font-light text-sm"
                      >
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <a
                  href="https://github.com/Pens-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/80 hover:text-gold transition-colors group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-light">View my work on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={(el) => (sectionRefs.current['experiences'] = el)}
          data-section="experiences"
          className="pt-16"
        >
          <div className="text-center mb-20">
            <h2
              className={`text-5xl md:text-6xl mb-6 ${
                visibleSections.includes('experiences')
                  ? 'fade-in'
                  : 'opacity-0'
              }`}
            >
              Key Experiences
            </h2>
            <div
              className={`w-24 h-px bg-gold mx-auto ${
                visibleSections.includes('experiences')
                  ? 'fade-in delay-200'
                  : 'opacity-0'
              }`}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group ${
                  visibleSections.includes('experiences')
                    ? `slide-up delay-${(index + 1) * 200}`
                    : 'opacity-0'
                }`}
              >
                <div className="border border-white/10 p-8 h-full hover:border-gold/50 transition-all duration-500 hover:shadow-lg hover:shadow-gold/20 transform-gpu hover:translate-y-[-4px]">
                  <div className="relative">
                    <exp.icon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 transform-gpu" />
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gold/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                  </div>
                  <h3 className="text-2xl mb-2 group-hover:text-gold transition-colors duration-300">{exp.title}</h3>
                  <p className="text-gold text-sm mb-6 font-light">
                    {exp.subtitle}
                  </p>
                  <p className="text-white/70 leading-relaxed text-sm group-hover:text-white/90 transition-colors duration-300">
                    {exp.description}
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

export default About;
