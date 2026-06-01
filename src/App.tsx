import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
import WorkDetail from './components/WorkDetail';
import NotFound from './components/NotFound';

const HashScroll = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/') return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const tryScroll = (retry = 0) => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: retry === 0 ? 'auto' : 'smooth' });
      } else if (retry < 10) {
        setTimeout(() => tryScroll(retry + 1), 100);
      }
    };
    tryScroll();
  }, [location.pathname]);
  return null;
};

const HomePage = () => (
  <>
    <a href="#main" className="skip-link">Skip to content</a>
    <HashScroll />
    <Navigation />
    <main id="main">
      <Home />
      <Works />
      <About />
      <Contact />
    </main>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
