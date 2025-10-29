import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-slow"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          filter: 'brightness(0.3)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-shift" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-gold/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-gold/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-gold/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        <h1
          className={`text-7xl md:text-8xl lg:text-9xl mb-8 text-shine transform-gpu ${
            isVisible ? 'fade-in animate-float' : 'opacity-0'
          }`}
        >
          Automation & Data
        </h1>
        <p
          className={`text-xl md:text-2xl text-white/80 font-light tracking-wide leading-relaxed max-w-2xl mx-auto ${
            isVisible ? 'fade-in delay-300' : 'opacity-0'
          }`}
        >
          Pythonを中心としたバックエンド開発。業務自動化とデータ処理により、
          <br />
          課題を解決するシステムを設計・実装します。
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-float">
        <span className="text-xs tracking-widest text-white/60 uppercase">Scroll</span>
        <ChevronDown
          className="w-6 h-6 text-gold"
          style={{ animation: 'scrollDown 2s infinite' }}
        />
      </div>
    </section>
  );
};

export default Home;
