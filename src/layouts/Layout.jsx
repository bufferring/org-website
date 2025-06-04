import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate parallax effect for stars
  useEffect(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      const speed = parseFloat(star.getAttribute('data-speed')) || 0.1;
      const x = (window.innerWidth - mousePosition.x) * speed;
      const y = (window.innerHeight - mousePosition.y) * speed;
      
      star.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, [mousePosition]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="star-container fixed inset-0 w-full h-full pointer-events-none z-0" />
      
      <Navbar />
      <main className="flex-grow z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
