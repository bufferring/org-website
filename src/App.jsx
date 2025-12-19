import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Layout from './layouts/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: false,
      offset: 120,
    });

    const createStars = () => {
      const container = document.querySelector('.star-container');
      if (!container) return;

      container.innerHTML = '';

      const starsCount = 220;
      const { clientWidth: containerWidth, clientHeight: containerHeight } = container;

      for (let i = 0; i < starsCount; i += 1) {
        const star = document.createElement('div');
        star.className = 'star';

        const left = Math.random() * containerWidth;
        const top = Math.random() * containerHeight;
        const size = Math.random() * 1.5 + 0.4;
        const opacity = Math.random() * 0.7 + 0.3;
        const delay = Math.random() * 6;

        star.style.left = `${left}px`;
        star.style.top = `${top}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animation = `twinkle ${Math.random() * 6 + 4}s infinite ${delay}s`;
        star.setAttribute('data-speed', (Math.random() * 0.25 + 0.05).toFixed(3));

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
    <ErrorBoundary>
      <Layout>
        <HeroSection id="hero" />
        <ProjectsSection id="projects" />
        <ContactSection id="contact" />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
