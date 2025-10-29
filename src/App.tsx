import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main>
        <Home />
        <Works />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
