import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SectionContext } from '../context/SectionContext';

export default function Layout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star) => {
      const speed = parseFloat(star.getAttribute('data-speed')) || 0.12;
      const x = (window.innerWidth * 0.5 - mousePosition.x) * speed;
      const y = (window.innerHeight * 0.5 - mousePosition.y) * speed;
      star.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, [mousePosition]);

  const sectionIds = useMemo(() => (
    React.Children.toArray(children)
      .map((child) => (React.isValidElement(child) ? child.props.id : undefined))
      .filter(Boolean)
  ), [children]);

  useEffect(() => {
    if (!sectionIds.length) {
      return undefined;
    }

    const resolveSections = () => sectionIds
      .map((id) => {
        const node = document.querySelector(`[data-section-id="${id}"]`) || document.getElementById(id);
        return node ? { id, node } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.node.offsetTop - b.node.offsetTop);

    let sections = resolveSections();
    let frameId = null;

    const updateActiveSection = () => {
      frameId = null;
      if (!sections.length) {
        sections = resolveSections();
      }

      if (!sections.length) {
        return;
      }

      const viewportMid = window.scrollY + window.innerHeight * 0.5;

      let nextActive = sections[0].id;
      for (let index = 0; index < sections.length; index += 1) {
        const { id, node } = sections[index];
        const rect = node.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;

        if (viewportMid >= absoluteTop - 1) {
          nextActive = id;
        } else {
          break;
        }
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    const handleResize = () => {
      sections = resolveSections();
      requestUpdate();
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const observer = new MutationObserver(requestUpdate);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [sectionIds]);

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      <div className="relative flex flex-col min-h-screen overflow-hidden">
        <div className="star-container fixed inset-0 w-full h-full pointer-events-none z-0" />

        <Navbar sectionIds={sectionIds} />

        <main className="relative flex-grow z-10">
          {children}
        </main>

        <Footer />
      </div>
    </SectionContext.Provider>
  );
}
