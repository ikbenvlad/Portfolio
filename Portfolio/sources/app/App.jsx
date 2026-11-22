import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Welcome from '../pages/Welcome';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Resume from '../pages/Resume';
import Testing from '../pages/Testing';
import '../styles/App.css';

// The devlog pages pull in the Markdown renderer, so they load only when visited.
const Devlog = lazy(() => import('../pages/Devlog'));
const DevlogAdmin = lazy(() => import('../pages/DevlogAdmin'));

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Suspense fallback={<section className="container"><p>Loading...</p></section>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/devlog" element={<Devlog />} />
            <Route path="/devlog/admin" element={<DevlogAdmin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/testing" element={<Testing />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
