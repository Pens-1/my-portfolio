import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SectionMotion from './components/SectionMotion';
import BottomNav from './components/BottomNav';
import NotFound from './components/NotFound';
import GridBackground from './components/GridBackground';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import ActivitiesSection from './components/sections/ActivitiesSection';
import PostsSection from './components/sections/PostsSection';
import { scrollManager } from './lib/scroll';
import { useReducedMotion } from './hooks/useReducedMotion';

const Page = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    scrollManager.init(reduced);
    return () => scrollManager.destroy();
  }, [reduced]);

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <GridBackground />
      <SectionMotion />

      <main>
        <HomeSection />
        <AboutSection />
        <ActivitiesSection />
        <PostsSection />
      </main>

      <BottomNav />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        {/* 旧詳細ページは activities アンカーへ恒久リダイレクト */}
        <Route path="/work/:id" element={<Navigate to={{ pathname: '/', hash: '#activities' }} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
