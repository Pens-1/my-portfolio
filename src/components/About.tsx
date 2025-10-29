import { useEffect, useRef, useState } from 'react';
import { Globe, Users, Zap } from 'lucide-react';

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
      title: 'Global Perspective',
      subtitle: 'グローバルな視点',
      description:
        '海外留学を通じて培った国際的な視野。異なる文化や価値観の中で学んだ、柔軟な思考力とコミュニケーション能力。多様性を理解し、グローバルな視点から課題を捉える力を身につけました。',
    },
    {
      icon: Users,
      title: 'Collaboration & Leadership',
      subtitle: '協調性とリーダーシップ',
      description:
        'サークル活動を通じて磨いた、チームワークとリーダーシップ。メンバーの個性を活かしながら、共通の目標に向かって組織を導く経験。協調性と主体性のバランスを学びました。',
    },
    {
      icon: Zap,
      title: 'Intensive Challenge',
      subtitle: '集中的な挑戦',
      description:
        'ハッカソンでの短期集中開発経験。限られた時間の中で、アイデアを形にし、プレゼンテーションまで完遂する実行力。プレッシャーの中で最高のパフォーマンスを発揮する力を養いました。',
    },
  ];

  const expertise = [
    'Frontend Development',
    'UI/UX Design',
    'Brand Strategy',
    'Web3 Integration',
  ];

  const qualifications = [
    'Bachelor of Engineering',
    'AWS Certified Solutions Architect',
    'Google UX Design Certificate',
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
                <h2 className="text-5xl md:text-6xl mb-6">Philosophy</h2>
                <div className="w-16 h-px bg-gold mb-8" />
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  完璧なデザインとは、何も加えるものがなくなった時ではなく、
                  何も削るものがなくなった時に完成する。
                </p>
                <p className="text-white/70 leading-relaxed">
                  私は、シンプルさの中に潜む本質的な美しさを追求します。
                  技術とデザインの調和により、ユーザーに真の価値を提供することを信念としています。
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
                <div className="border border-white/10 p-8 h-full hover:border-gold/50 transition-colors duration-500">
                  <exp.icon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl mb-2">{exp.title}</h3>
                  <p className="text-gold text-sm mb-6 font-light">
                    {exp.subtitle}
                  </p>
                  <p className="text-white/70 leading-relaxed text-sm">
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
