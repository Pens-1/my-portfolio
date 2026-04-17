import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
import WorkDetail from './components/WorkDetail';

const HomePage = () => (
  <>
    <a href="#main" className="skip-link">Skip to content</a>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
