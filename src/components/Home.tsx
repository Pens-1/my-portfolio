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

      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <div className={`mb-6 flex justify-center gap-4 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
          {['Python', 'React', 'Docker', 'Automation'].map((tech, i) => (
             <span key={i} className="text-gold/80 text-sm tracking-widest uppercase border border-gold/30 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
               {tech}
             </span>
          ))}
        </div>

        <h1
          className={`text-5xl md:text-7xl lg:text-8xl mb-8 font-light tracking-tight text-white ${
            isVisible ? 'fade-in animate-float' : 'opacity-0'
          }`}
        >
          Full-Stack <span className="text-gold font-normal">Automation</span> Engineer
        </h1>
        
        <p
          className={`text-xl md:text-2xl text-white/80 font-light tracking-wide leading-relaxed max-w-2xl mx-auto mb-10 ${
            isVisible ? 'fade-in delay-300' : 'opacity-0'
          }`}
        >
          Building robust systems that save time and empower decisions.
          <br />
          Specializing in Data Processing, Web Development, and AI Integration.
        </p>

        <div className={`flex flex-col md:flex-row gap-6 justify-center ${isVisible ? 'fade-in delay-500' : 'opacity-0'}`}>
          <a
             href="#works"
             className="px-8 py-3 bg-gold text-black font-medium tracking-wide rounded-sm hover:bg-white transition-colors duration-300 transform hover:-translate-y-1"
          >
            View Selected Works
          </a>
          <a
             href="https://github.com/Pens-1"
             target="_blank"
             rel="noopener noreferrer"
             className="px-8 py-3 border border-white/30 text-white font-medium tracking-wide rounded-sm hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Contact / GitHub
          </a>
        </div>
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
