import { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'works', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      setScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50'
          : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-light tracking-widest text-gold hover:opacity-70 transition-all duration-300 hover:scale-105 transform-gpu"
          >
            PORTFOLIO
          </button>

          <ul className="flex gap-12">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-wider transition-all duration-300 relative ${
                    activeSection === item.id
                      ? 'text-gold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold animate-pulse-glow transform origin-left" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
