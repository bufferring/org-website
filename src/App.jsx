import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Layout from './layouts/Layout';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    // Create stars
    const createStars = () => {
      const container = document.querySelector('.star-container');
      if (!container) return;
      
      // Clear existing stars
      container.innerHTML = '';
      
      const starsCount = 200;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const left = Math.random() * containerWidth;
        const top = Math.random() * containerHeight;
        
        // Random size (0.5px to 2px)
        const size = Math.random() * 1.5 + 0.5;
        
        // Random opacity and animation delay
        const opacity = Math.random() * 0.7 + 0.3;
        const delay = Math.random() * 5;
        
        star.style.left = `${left}px`;
        star.style.top = `${top}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite ${delay}s`;
        
        container.appendChild(star);
      }
    };
    
    createStars();
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
