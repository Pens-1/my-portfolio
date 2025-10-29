import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
import WorkDetail from './components/WorkDetail';

function App() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const HomePage = () => (
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:id" element={<WorkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
