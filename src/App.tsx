import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Works from './components/Works';
import About, { Leadership } from './components/About';
import Contact from './components/Contact';
import WorkDetail from './components/WorkDetail';
import NotFound from './components/NotFound';

const HomePage = () => (
  <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Navigation />
    <main id="main">
      <Home />
      <Works />
      <Leadership />
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
