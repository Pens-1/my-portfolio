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
      className={`fixed top-0 left-0 right-0 z-50 border-b-2 transition-all duration-300 ${
        scrolled
          ? 'bg-neo-black/95 backdrop-blur-sm border-neo-yellow/30'
          : 'bg-neo-black/80 backdrop-blur-sm border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="font-display font-black text-lg tracking-widest text-neo-yellow hover:text-white transition-colors uppercase"
          >
            PORTFOLIO<span className="text-neo-pink">.</span>
          </button>

          <ul className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-xs tracking-widest px-4 py-2 uppercase border-2 transition-all duration-150 ${
                    activeSection === item.id
                      ? 'bg-neo-yellow text-neo-black border-neo-yellow font-bold'
                      : 'text-white/60 border-transparent hover:border-white/20 hover:text-white'
                  }`}
                >
                  {item.label}
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
