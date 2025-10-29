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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          filter: 'brightness(0.3)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        <h1
          className={`text-7xl md:text-8xl lg:text-9xl mb-8 ${
            isVisible ? 'fade-in' : 'opacity-0'
          }`}
        >
          Excellence
        </h1>
        <p
          className={`text-xl md:text-2xl text-white/80 font-light tracking-wide leading-relaxed max-w-2xl mx-auto ${
            isVisible ? 'fade-in delay-300' : 'opacity-0'
          }`}
        >
          品質への妥協なき追求。デザインと技術の融合により、
          <br />
          唯一無二の体験を創造します。
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs tracking-widest text-white/60 uppercase">Scroll</span>
        <ChevronDown
          className="w-6 h-6 text-gold animate-bounce"
          style={{ animation: 'scrollDown 2s infinite' }}
        />
      </div>
    </section>
  );
};

export default Home;
