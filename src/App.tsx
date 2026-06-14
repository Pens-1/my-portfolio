import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import NotFound from './components/NotFound';
import GridBackground from './components/GridBackground';
import HeroParallax from './components/HeroParallax';

// 背景は設計図グリッド＋光追従が既定。?hero=1 で廊下画像の偽3D、?three=1 で旧3D版（比較用）
const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const THREE_MODE = params?.has('three') ?? false;
const HERO_MODE = params?.has('hero') ?? false;
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import ActivitiesSection from './components/sections/ActivitiesSection';
import PostsSection from './components/sections/PostsSection';
import { scrollManager } from './lib/scroll';
import { useReducedMotion } from './hooks/useReducedMotion';

// 背景3D（クリーンルーム・ジャーニー）。重いので遅延ロード
const SceneRoot = lazy(() => import('./components/scene/SceneRoot'));

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

      {THREE_MODE ? (
        <Suspense fallback={null}>
          <SceneRoot />
        </Suspense>
      ) : HERO_MODE ? (
        <HeroParallax />
      ) : (
        <GridBackground />
      )}

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
